#!/usr/bin/env python3
"""
Regenerate every PROD-* hero image (PROD-NN-v1.png) using one of the
already-generated PDP thumbs as a reference image, so the hero shows the
SAME PRODUCT as the thumb set (front/back/detail/packaging).

Why: we previously regenerated heroes from a cleaned text prompt only,
which gave the model freedom to invent a different brace / cassette /
gloves than the thumbs depict. Result: hero says "4-strap knee brace,"
thumbs say "3-strap knee brace." Embarrassing on the PDP.

This script fixes that by passing the chosen thumb as the SOLE reference
image to OpenAI's images.edit endpoint, with strict identity-lock prompt
language asking the model to render the same product in a hero pose
(centered, slightly off-axis, generous negative space).

Usage:
    OPENAI_API_KEY=sk-... python3 scripts/regenerate_heroes_from_thumb.py \\
        [--ref-angle front] [--quality high] [--concurrency 8] \\
        [--only PROD-01,PROD-02] [--skip-existing] [--dry-run]
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
MANIFEST_PATH = OUT_DIR / "heroes-manifest.json"

VALID_REF_ANGLES = ("front", "back", "detail", "packaging")

# Same regex used in generate_images.py — strips the "Plus 4 ... 4) packaging
# (...)." block out of PROD prompts so we render a hero, not a contact sheet.
THUMB_BLOCK_RE = re.compile(
    r"\s*Plus\s+4\b[\s\S]*?\b4\)\s*packaging[^.]*\.\s*",
    re.IGNORECASE,
)


def clean_hero_prompt(prompt: str) -> str:
    cleaned = THUMB_BLOCK_RE.sub(" ", prompt)
    return re.sub(r"  +", " ", cleaned).strip()


# Identity-lock language identical in spirit to generate_thumbs.py — we want
# the model to honor the reference image's product geometry exactly.
HERO_PREAMBLE = (
    "BRAND VISUAL LANGUAGE — UNITE MEDICAL. Editorial product photography "
    "in the spirit of Aesop, Kinfolk, and Monocle. Shot on medium-format "
    "film with subtle natural grain. Warm cream seamless paper background "
    "(#f7f2ea). Soft natural daylight from camera-left, gentle drop "
    "shadow. STRICT RULES: no visible brand logos, no readable text, no "
    "glossy retouching, no HDR, no fluorescent overhead glare. NO contact "
    "sheet — render exactly ONE photograph of ONE product, occupying the "
    "center-right of the frame with generous negative space at left for "
    "headline overlay. Do NOT add any small inset thumbnails, alternate "
    "angles, or split-frame compositions inside this image. "
    "IDENTITY LOCK: the attached reference image shows the SAME PRODUCT "
    "this hero must depict. Match its materials, colors, surface "
    "textures, strap count, hinge geometry, packaging design, and label "
    "layout EXACTLY. The hero may show the product from a slightly more "
    "editorial three-quarter angle than the reference, but the product "
    "itself must be unmistakably the same item. "
    "SCENE BRIEF FOLLOWS:\n\n"
)


@dataclass
class Job:
    row_id: str
    ref_path: Path
    out_path: Path
    scene_prompt: str

    def prompt(self) -> str:
        return HERO_PREAMBLE + self.scene_prompt


def load_jobs(ref_angle: str, only: Optional[set[str]]) -> list[Job]:
    jobs: list[Job] = []
    missing_refs: list[str] = []

    with CSV_PATH.open(newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rid = row["id"]
            if not rid.startswith("PROD-"):
                continue
            if only and rid not in only:
                continue

            ref_path = OUT_DIR / f"{rid}-thumb-{ref_angle}.png"
            if not ref_path.exists():
                missing_refs.append(rid)
                continue

            jobs.append(
                Job(
                    row_id=rid,
                    ref_path=ref_path,
                    out_path=OUT_DIR / f"{rid}-v1.png",
                    scene_prompt=clean_hero_prompt(row["prompt"].strip()),
                )
            )

    if missing_refs:
        print(
            f"WARN: skipping rows with no thumb-{ref_angle} on disk: "
            + ", ".join(missing_refs),
            file=sys.stderr,
        )
    return jobs


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
                with job.ref_path.open("rb") as ref:
                    result = await client.images.edit(
                        model="gpt-image-1",
                        image=ref,
                        prompt=job.prompt(),
                        size="1024x1024",
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
                    f"[{done:3d}/{total}] OK   {job.row_id}-v1 "
                    f"<- {job.ref_path.name} ({dur:.1f}s)",
                    flush=True,
                )
                return job, True, None
            except RateLimitError as e:
                wait = min(60, 2 ** attempt)
                print(
                    f"[{progress['done']:3d}/{progress['total']}] RATE "
                    f"{job.row_id}-v1 -> sleep {wait}s ({e})",
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
                    f"[{progress['done']:3d}/{progress['total']}] ERR  "
                    f"{job.row_id}-v1 attempt {attempt}: {msg}",
                    flush=True,
                )
                if attempt >= max_attempts:
                    progress["done"] += 1
                    return job, False, msg
                await asyncio.sleep(wait)
            except Exception as e:  # noqa: BLE001
                msg = f"{type(e).__name__}: {e}"[:200]
                print(
                    f"[{progress['done']:3d}/{progress['total']}] FAIL "
                    f"{job.row_id}-v1: {msg}",
                    flush=True,
                )
                progress["done"] += 1
                return job, False, msg


async def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--ref-angle", default="front", choices=VALID_REF_ANGLES,
        help="which thumb angle to use as the identity reference (default: front)",
    )
    ap.add_argument(
        "--quality", default="high",
        choices=["low", "medium", "high", "auto"],
    )
    ap.add_argument("--concurrency", type=int, default=8)
    ap.add_argument(
        "--only", default="",
        help="comma-separated row IDs (e.g. PROD-01,PROD-02)",
    )
    ap.add_argument(
        "--skip-existing", action="store_true",
        help="skip hero files that already exist on disk",
    )
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("ERROR: OPENAI_API_KEY not set in environment.", file=sys.stderr)
        return 2

    only = set(filter(None, [s.strip() for s in args.only.split(",")])) or None
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    jobs = load_jobs(args.ref_angle, only)
    if args.skip_existing:
        jobs = [j for j in jobs if not j.out_path.exists()]
    if not jobs:
        print("Nothing to do.")
        return 0

    px_cost = {"high": 0.19, "medium": 0.05, "low": 0.006, "auto": 0.19}
    est = px_cost.get(args.quality, 0.19) * len(jobs)

    print(f"Reference: {args.ref_angle} thumb per row")
    print(f"Jobs queued: {len(jobs)}")
    print(f"Quality:     {args.quality}")
    print(f"Concurrency: {args.concurrency}")
    print(f"Output dir:  {OUT_DIR}")
    print(f"Est. cost:   ~${est:.2f} (USD)")
    print()

    if args.dry_run:
        for j in jobs[:24]:
            print(f"  {j.row_id:<8} hero <- {j.ref_path.name}")
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

    manifest = {
        "generated_at": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        "model": "gpt-image-1",
        "endpoint": "images.edit",
        "ref_angle": args.ref_angle,
        "quality": args.quality,
        "total": len(jobs),
        "ok": ok,
        "failed": len(failed),
        "duration_seconds": round(dur, 1),
        "rows": {
            j.row_id: {
                "ok": success,
                "file": str(j.out_path.relative_to(ROOT)),
                "ref": str(j.ref_path.relative_to(ROOT)),
                "error": err,
            }
            for j, success, err in results
        },
    }
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2))

    print()
    print(f"Done in {dur:.1f}s. OK: {ok}/{len(jobs)}.  Failed: {len(failed)}")
    if failed:
        for j, err in failed[:20]:
            print(f"  {j.row_id}-v1: {err}")
    print(f"Manifest: {MANIFEST_PATH.relative_to(ROOT)}")
    return 0 if not failed else 1


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
