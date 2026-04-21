#!/usr/bin/env python3
"""
Generate PDP angle thumbs (front / back / detail / packaging) for every PROD-*
row in docs/imagery-prompts.csv, using the existing hero image as a reference
so the thumbnails depict the same product from different angles.

Reads the angle descriptions out of the existing CSV prompts (every PROD row
already specifies them inline via the pattern:
    Plus 4 alternate-angle thumbs:
        1) front (...),
        2) back (...),
        3) detail (...),
        4) packaging (...).
)

Calls OpenAI's images.edit endpoint with the hero image as a reference, so
material / color / labeling stays consistent across the five product photos.

Outputs:
    public/images/generated/{ROW_ID}-thumb-{front|back|detail|packaging}.png

Usage:
    OPENAI_API_KEY=sk-... python3 scripts/generate_thumbs.py \
        [--hero v1] [--quality high] [--concurrency 8] \
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
MANIFEST_PATH = OUT_DIR / "thumbs-manifest.json"
LOGO_PATH = ROOT / "public" / "images" / "source" / "um-logo-mark.png"

ANGLES = ("front", "back", "detail", "packaging")

# ---------------------------------------------------------------------------
# Brand preamble — same identity language used for the hero shoot, but framed
# for image-edit so the model is told to LOCK identity to the reference.
# ---------------------------------------------------------------------------
BRAND_PREAMBLE = (
    "BRAND VISUAL LANGUAGE — UNITE MEDICAL. "
    "Editorial product photography in the spirit of Aesop, Kinfolk, and "
    "Monocle. Shot on medium-format film with subtle natural grain. The "
    "product sits on a warm cream seamless paper background (#f7f2ea). "
    "Lighting is soft natural daylight from camera-left. STRICT RULES: "
    "no visible brand logos, no readable text, no glossy retouching, no "
    "HDR, no fluorescent overhead glare. "
    "IDENTITY LOCK: the attached reference image shows the SAME PRODUCT. "
    "Match its materials, colors, surface textures, packaging design, and "
    "label layout EXACTLY. Only the camera angle and crop should change. "
    "If the reference shows a navy-blue glove, the output must show a "
    "navy-blue glove of the same shade — not light blue. If the reference "
    "shows a kraft cardboard box, the output must show the SAME kraft "
    "cardboard box, not a different shade or material. "
    "OUTPUT: Square 1:1 thumbnail composition, product centered with "
    "modest negative space. ANGLE BRIEF FOLLOWS:\n\n"
)

# Pattern: pulls each angle out individually. Tolerates an optional
# parenthetical description after the angle name. When the parenthetical is
# absent we fall back to a generic description for that angle.
ANGLE_PATTERNS = {
    "front":     re.compile(r"1\)\s*front(?:\s*\(([^)]+)\))?\s*[,.]", re.IGNORECASE),
    "back":      re.compile(r"2\)\s*back(?:\s*\(([^)]+)\))?\s*[,.]", re.IGNORECASE),
    "detail":    re.compile(r"3\)\s*detail(?:\s*\(([^)]+)\))?\s*[,.]", re.IGNORECASE),
    "packaging": re.compile(r"4\)\s*packaging(?:\s*\(([^)]+)\))?\s*[,.]", re.IGNORECASE),
}

GENERIC_ANGLE_DESC = {
    "front":     "the product turned face-on toward the camera, square crop centered",
    "back":      "the product flipped to show its back side, square crop centered",
    "detail":    "an extreme close-crop on the most distinctive surface or feature of the product",
    "packaging": "the product's plain kraft retail box or outer carton, lid open enough to show the product nested inside",
}


def parse_angle_descriptions(prompt: str) -> Optional[dict[str, str]]:
    """Returns {angle: description} for all four angles, or None if the
    prompt doesn't mention any of them."""
    out: dict[str, str] = {}
    found_any = False
    for angle, regex in ANGLE_PATTERNS.items():
        m = regex.search(prompt)
        if m:
            found_any = True
            desc = (m.group(1) or "").strip()
            out[angle] = desc if desc else GENERIC_ANGLE_DESC[angle]
        else:
            out[angle] = GENERIC_ANGLE_DESC[angle]
    return out if found_any else None


PACKAGING_BRAND_INSTRUCTION = (
    "BRAND MARK ON PACKAGING. The SECOND reference image attached is the "
    "Unite Medical logomark — an orange-to-magenta gradient rounded square "
    "containing an abstract white 'UM' symbol. Render this exact logomark "
    "subtly printed on the front face of the kraft retail box / outer "
    "carton in the scene: small (about 12-18% of the carton's front face "
    "width), positioned in the upper-left corner of the box, printed flat "
    "(not embossed, not 3D), with realistic ink-on-cardboard texture. The "
    "logomark must keep its exact gradient colors and the white UM glyph. "
    "Do NOT add any wordmark text alongside it. Do NOT add any other "
    "branding, slogans, or logos. The product itself stays unbranded as "
    "before — the Unite Medical mark only appears on the kraft outer "
    "packaging. "
)


@dataclass
class Job:
    row_id: str
    angle: str
    description: str  # what the angle should show
    hero_path: Path
    out_path: Path
    extra_refs: list[Path]  # additional reference images beyond hero

    def prompt(self) -> str:
        body = (
            f"Show the same product as the reference image, but framed as "
            f"the {self.angle.upper()} view: {self.description}. "
            f"Square 1024x1024 thumbnail. Same warm cream seamless paper "
            f"background, same lighting, same product identity."
        )
        if self.angle == "packaging":
            body += " " + PACKAGING_BRAND_INSTRUCTION
        return BRAND_PREAMBLE + body


def load_jobs(hero_version: str, only: Optional[set[str]]) -> list[Job]:
    jobs: list[Job] = []
    missing_heros: list[str] = []
    no_angles: list[str] = []

    with CSV_PATH.open(newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rid = row["id"]
            if not rid.startswith("PROD-"):
                continue
            if only and rid not in only:
                continue

            hero_path = OUT_DIR / f"{rid}-{hero_version}.png"
            if not hero_path.exists():
                missing_heros.append(rid)
                continue

            descriptions = parse_angle_descriptions(row["prompt"])
            if descriptions is None:
                no_angles.append(rid)
                continue

            for angle in ANGLES:
                # Packaging frames get the Unite Medical logomark as a 2nd
                # reference image so the model can render brand identity on
                # the kraft outer carton.
                extra_refs: list[Path] = []
                if angle == "packaging" and LOGO_PATH.exists():
                    extra_refs.append(LOGO_PATH)
                jobs.append(
                    Job(
                        row_id=rid,
                        angle=angle,
                        description=descriptions[angle],
                        hero_path=hero_path,
                        out_path=OUT_DIR / f"{rid}-thumb-{angle}.png",
                        extra_refs=extra_refs,
                    )
                )

    if missing_heros:
        print(
            f"WARN: skipping rows with no {hero_version} hero on disk: "
            + ", ".join(missing_heros),
            file=sys.stderr,
        )
    if no_angles:
        print(
            f"WARN: skipping rows whose prompt has no parseable angles: "
            + ", ".join(no_angles),
            file=sys.stderr,
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
                # Re-open files each attempt so a retry doesn't read from a
                # spent stream. gpt-image-1 accepts a list of reference
                # images; we use that to attach the brand logomark on
                # packaging frames in addition to the product hero.
                ref_handles = [job.hero_path.open("rb")]
                for extra in job.extra_refs:
                    ref_handles.append(extra.open("rb"))
                try:
                    image_arg = ref_handles[0] if len(ref_handles) == 1 else ref_handles
                    result = await client.images.edit(
                        model="gpt-image-1",
                        image=image_arg,
                        prompt=job.prompt(),
                        size="1024x1024",
                        quality=quality,
                        n=1,
                    )
                finally:
                    for h in ref_handles:
                        try:
                            h.close()
                        except Exception:  # noqa: BLE001
                            pass
                b64 = result.data[0].b64_json
                job.out_path.write_bytes(base64.b64decode(b64))
                dur = time.monotonic() - t0
                progress["done"] += 1
                done = progress["done"]
                total = progress["total"]
                print(
                    f"[{done:3d}/{total}] OK   {job.row_id}-thumb-{job.angle:<9} "
                    f"({dur:.1f}s)",
                    flush=True,
                )
                return job, True, None
            except RateLimitError as e:
                wait = min(60, 2 ** attempt)
                print(
                    f"[{progress['done']:3d}/{progress['total']}] RATE "
                    f"{job.row_id}-thumb-{job.angle} -> sleep {wait}s ({e})",
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
                    f"{job.row_id}-thumb-{job.angle} attempt {attempt}: {msg}",
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
                    f"{job.row_id}-thumb-{job.angle}: {msg}",
                    flush=True,
                )
                progress["done"] += 1
                return job, False, msg


async def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--hero", default="v1",
        help="hero variation to use as reference (default v1). "
             "E.g. 'v1', 'v2', 'v3' or any other suffix on disk.",
    )
    ap.add_argument(
        "--quality", default="high",
        choices=["low", "medium", "high", "auto"],
    )
    ap.add_argument(
        "--concurrency", type=int, default=8,
        help="parallel in-flight requests (image edits are heavier; default 8)",
    )
    ap.add_argument(
        "--only", default="",
        help="comma-separated list of row IDs to render (e.g. PROD-01,PROD-02)",
    )
    ap.add_argument(
        "--skip-existing", action="store_true",
        help="skip thumb files that already exist on disk",
    )
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("ERROR: OPENAI_API_KEY not set in environment.", file=sys.stderr)
        return 2

    only = set(filter(None, [s.strip() for s in args.only.split(",")])) or None
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    jobs = load_jobs(args.hero, only)
    if args.skip_existing:
        jobs = [j for j in jobs if not j.out_path.exists()]

    if not jobs:
        print("Nothing to do.")
        return 0

    # Cost estimate (gpt-image-1 high quality, 1024x1024 = ~$0.19/image)
    px_cost = {"high": 0.19, "medium": 0.05, "low": 0.006, "auto": 0.19}
    est = px_cost.get(args.quality, 0.19) * len(jobs)

    print(f"Hero source: -{args.hero}.png")
    print(f"Jobs queued: {len(jobs)}  ({len(jobs)//4} products × 4 angles)")
    print(f"Quality:     {args.quality}")
    print(f"Concurrency: {args.concurrency}")
    print(f"Output dir:  {OUT_DIR}")
    print(f"Est. cost:   ~${est:.2f} (USD, image output tokens only)")
    print()

    if args.dry_run:
        for j in jobs[:24]:
            print(f"  {j.row_id:<8} {j.angle:<9} <- {j.hero_path.name}")
        if len(jobs) > 24:
            print(f"  ... and {len(jobs) - 24} more")
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
        "hero_version": args.hero,
        "quality": args.quality,
        "total": len(jobs),
        "ok": ok,
        "failed": len(failed),
        "duration_seconds": round(dur, 1),
        "rows": {},
    }
    for j, success, err in results:
        manifest["rows"].setdefault(j.row_id, []).append({
            "angle": j.angle,
            "ok": success,
            "file": str(j.out_path.relative_to(ROOT)),
            "hero_ref": str(j.hero_path.relative_to(ROOT)),
            "error": err,
        })
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2))

    print()
    print(f"Done in {dur:.1f}s. OK: {ok}/{len(jobs)}.  Failed: {len(failed)}")
    if failed:
        print("Failures:")
        for j, err in failed[:20]:
            print(f"  {j.row_id}-thumb-{j.angle}: {err}")
    print(f"Manifest: {MANIFEST_PATH.relative_to(ROOT)}")
    return 0 if not failed else 1


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
