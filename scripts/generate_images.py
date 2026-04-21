#!/usr/bin/env python3
"""
Generate placeholder imagery for Unite Medical from docs/imagery-prompts.csv
using OpenAI's gpt-image-2 model.

- Parallel: dispatches many requests concurrently via asyncio.
- Per row: generates N variations (default 3).
- Skips rows that are pure asset reuses (BRAND-STYLE, HOME-FEATURED-*).
- For BLOG-02/03/04 (which textually reuse a SOL-* frame) we still generate
  one alternate frame so each blog cover has its own variants on disk.
- Saves to public/images/generated/{id}-v{n}.png and writes a manifest.

Usage:
    OPENAI_API_KEY=sk-... python3 scripts/generate_images.py [--variations 3] \
        [--quality high] [--concurrency 24] [--only PROD-01,SOL-01] [--dry-run]
"""

from __future__ import annotations

import argparse
import asyncio
import base64
import csv
import json
import os
import re
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

from openai import AsyncOpenAI
from openai import APIError, APIStatusError, RateLimitError

ROOT = Path(__file__).resolve().parent.parent
CSV_PATH = ROOT / "docs" / "imagery-prompts.csv"
OUT_DIR = ROOT / "public" / "images" / "generated"
MANIFEST_PATH = OUT_DIR / "manifest.json"

# ---------------------------------------------------------------------------
# Brand preamble — prepended to every prompt for cross-row consistency.
# Anchors the visual language so generations stay on-brand even with high N.
# ---------------------------------------------------------------------------
BRAND_PREAMBLE = (
    "BRAND VISUAL LANGUAGE — UNITE MEDICAL. "
    "Editorial documentary photography in the spirit of NYT Magazine, Monocle, "
    "Aesop and Kinfolk campaigns. Shot on 35mm color film (Kodak Portra 400 "
    "feel) or medium format with subtle natural grain. Color palette is warm "
    "and restrained: cream paper (#f7f2ea, #ede5d6), ink (#241a28), and small "
    "accents of deep plum (#5e2963) only when they appear naturally in the "
    "scene. Lighting is natural and quiet — late-afternoon golden hour, soft "
    "north-window light, or a single warm tungsten lamp; never bright "
    "fluorescent or clinical cyan. Compositions are calm, slightly off-center, "
    "with generous negative space so headline type can land cleanly on top of "
    "the image. Subjects feel real and slightly weathered — documentary, not "
    "stock; equipment looks used, not new-in-box. STRICT RULES: no visible "
    "brand logos, no readable text, no real letterhead or government seals, no "
    "recognizable celebrities, no glossy retouching, no HDR, no fake smiles, "
    "no fluorescent overhead glare, no neon-bright color grading. "
    "If people appear, anonymize via framing (back-of-head, three-quarter from "
    "behind, hands-only, or face soft-focus) — do not produce a recognizable "
    "likeness of any real person. "
    "SCENE BRIEF FOLLOWS:\n\n"
)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def parse_size(dimensions: str) -> str:
    """Map the CSV `dimensions` field to a gpt-image-2 size string.

    gpt-image-2 supports any size meeting the constraints, but we stick to the
    three popular sizes that the docs flag as fastest and best-tested.
    """
    d = dimensions.lower()
    if "16:9" in d or "wide" in d or "3:2" in d:
        return "1536x1024"  # landscape
    if "3:4" in d or "portrait" in d or "tall" in d:
        return "1024x1536"  # portrait
    return "1024x1024"  # square / 4:3 / product flat-lay default


SKIP_IDS = {
    "BRAND-STYLE",
    "HOME-FEATURED-01",
    "HOME-FEATURED-02",
    "HOME-FEATURED-03",
    "HOME-FEATURED-04",
}

# Strips the "Plus 4 alternate-angle thumbs..." instruction from PROD prompts
# so the hero image renders the product alone (no contact-sheet composition).
# The thumb angles are now generated separately by scripts/generate_thumbs.py
# via the images.edit endpoint with the hero as a reference.
THUMB_BLOCK_RE = re.compile(
    # Lazy-match from "Plus 4 ..." (any flavor — "angle thumbs", "alternate
    # angle thumbs", "alternate-angle frames", etc.) through the closing
    # "4) packaging (...)." sentence. Handles every variant in the CSV.
    r"\s*Plus\s+4\b[\s\S]*?\b4\)\s*packaging[^.]*\.\s*",
    re.IGNORECASE,
)


def clean_hero_prompt(prompt: str) -> str:
    """Remove the embedded thumbnail-strip instruction so the hero renders
    as a standalone product shot."""
    cleaned = THUMB_BLOCK_RE.sub(" ", prompt)
    # Collapse the double-spaces left behind by the substitution.
    cleaned = re.sub(r"  +", " ", cleaned).strip()
    return cleaned


@dataclass
class Job:
    row_id: str
    page: str
    section: str
    size: str
    prompt: str
    variation: int  # 1-indexed
    out_path: Path


def load_jobs(variations: int, only: Optional[set[str]]) -> list[Job]:
    jobs: list[Job] = []
    with CSV_PATH.open(newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rid = row["id"]
            if rid in SKIP_IDS:
                continue
            if only and rid not in only:
                continue
            size = parse_size(row["dimensions"])
            scene_prompt = row["prompt"].strip()
            # Strip the embedded thumbnail-strip instruction so PROD heroes
            # render as standalone product shots (thumbs are generated
            # separately via scripts/generate_thumbs.py).
            if rid.startswith("PROD-"):
                scene_prompt = clean_hero_prompt(scene_prompt)
            full_prompt = BRAND_PREAMBLE + scene_prompt
            for v in range(1, variations + 1):
                jobs.append(
                    Job(
                        row_id=rid,
                        page=row["page"],
                        section=row["section"],
                        size=size,
                        prompt=full_prompt,
                        variation=v,
                        out_path=OUT_DIR / f"{rid}-v{v}.png",
                    )
                )
    return jobs


# ---------------------------------------------------------------------------
# Generation
# ---------------------------------------------------------------------------
async def generate_one(
    client: AsyncOpenAI,
    job: Job,
    quality: str,
    sem: asyncio.Semaphore,
    progress: dict,
    max_attempts: int = 4,
) -> tuple[Job, bool, Optional[str]]:
    async with sem:
        attempt = 0
        while True:
            attempt += 1
            t0 = time.monotonic()
            try:
                result = await client.images.generate(
                    model="gpt-image-2",
                    prompt=job.prompt,
                    size=job.size,
                    quality=quality,
                    n=1,
                )
                b64 = result.data[0].b64_json
                job.out_path.write_bytes(base64.b64decode(b64))
                dur = time.monotonic() - t0
                progress["done"] += 1
                done = progress["done"]
                total = progress["total"]
                print(
                    f"[{done:3d}/{total}] OK   {job.row_id}-v{job.variation} "
                    f"({job.size}, {dur:.1f}s)",
                    flush=True,
                )
                return job, True, None
            except RateLimitError as e:
                wait = min(60, 2 ** attempt)
                print(
                    f"[{progress['done']:3d}/{progress['total']}] RATE {job.row_id}-v{job.variation} "
                    f"-> sleep {wait}s ({e})",
                    flush=True,
                )
                await asyncio.sleep(wait)
                if attempt >= max_attempts:
                    progress["done"] += 1
                    return job, False, f"rate-limited after {attempt} attempts"
            except (APIError, APIStatusError) as e:
                wait = min(30, 2 ** attempt)
                msg = str(e)[:200]
                print(
                    f"[{progress['done']:3d}/{progress['total']}] ERR  {job.row_id}-v{job.variation} "
                    f"attempt {attempt}: {msg}",
                    flush=True,
                )
                if attempt >= max_attempts:
                    progress["done"] += 1
                    return job, False, msg
                await asyncio.sleep(wait)
            except Exception as e:  # noqa: BLE001
                msg = f"{type(e).__name__}: {e}"[:200]
                print(
                    f"[{progress['done']:3d}/{progress['total']}] FAIL {job.row_id}-v{job.variation}: {msg}",
                    flush=True,
                )
                progress["done"] += 1
                return job, False, msg


async def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--variations", type=int, default=3, help="images per CSV row (default 3)")
    ap.add_argument("--quality", default="high", choices=["low", "medium", "high", "auto"])
    ap.add_argument("--concurrency", type=int, default=24, help="parallel in-flight requests")
    ap.add_argument("--only", default="", help="comma-separated list of row IDs to render (debug)")
    ap.add_argument("--skip-existing", action="store_true", help="skip files that already exist")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("ERROR: OPENAI_API_KEY not set in environment.", file=sys.stderr)
        return 2

    only = set(filter(None, [s.strip() for s in args.only.split(",")])) or None
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    jobs = load_jobs(args.variations, only)
    if args.skip_existing:
        jobs = [j for j in jobs if not j.out_path.exists()]

    if not jobs:
        print("Nothing to do.")
        return 0

    # Cost estimate from docs (gpt-image-2 high quality):
    #   1024x1024 = $0.211, 1536x1024 = $0.165, 1024x1536 = $0.165
    px_cost = {
        "high":   {"1024x1024": 0.211, "1536x1024": 0.165, "1024x1536": 0.165},
        "medium": {"1024x1024": 0.053, "1536x1024": 0.041, "1024x1536": 0.041},
        "low":    {"1024x1024": 0.006, "1536x1024": 0.005, "1024x1536": 0.005},
    }
    est = sum(px_cost.get(args.quality, px_cost["high"]).get(j.size, 0.2) for j in jobs)

    print(f"Jobs queued: {len(jobs)}")
    print(f"Quality:     {args.quality}")
    print(f"Concurrency: {args.concurrency}")
    print(f"Output dir:  {OUT_DIR}")
    print(f"Est. cost:   ~${est:.2f} (USD, image output tokens only)")
    print()

    if args.dry_run:
        for j in jobs[:20]:
            print(f"  {j.row_id}-v{j.variation:>2}  {j.size}  -> {j.out_path.name}")
        if len(jobs) > 20:
            print(f"  ... and {len(jobs) - 20} more")
        return 0

    client = AsyncOpenAI(api_key=api_key)
    sem = asyncio.Semaphore(args.concurrency)
    progress = {"done": 0, "total": len(jobs)}

    t0 = time.monotonic()
    results = await asyncio.gather(
        *(generate_one(client, j, args.quality, sem, progress) for j in jobs)
    )
    dur = time.monotonic() - t0

    ok = sum(1 for _, success, _ in results if success)
    failed = [(j, err) for j, success, err in results if not success]

    # Manifest
    manifest = {
        "generated_at": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        "model": "gpt-image-2",
        "quality": args.quality,
        "variations_per_row": args.variations,
        "total": len(jobs),
        "ok": ok,
        "failed": len(failed),
        "duration_seconds": round(dur, 1),
        "rows": {},
    }
    for j, success, err in results:
        manifest["rows"].setdefault(j.row_id, []).append(
            {"variation": j.variation, "size": j.size, "ok": success,
             "file": str(j.out_path.relative_to(ROOT)), "error": err}
        )
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2))

    print()
    print(f"Done in {dur:.1f}s. OK: {ok}/{len(jobs)}.  Failed: {len(failed)}")
    if failed:
        print("Failures:")
        for j, err in failed[:20]:
            print(f"  {j.row_id}-v{j.variation}: {err}")
    print(f"Manifest: {MANIFEST_PATH.relative_to(ROOT)}")
    return 0 if not failed else 1


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
