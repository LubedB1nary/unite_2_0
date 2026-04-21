#!/usr/bin/env python3
"""
Renders the Unite Medical logomark (gradient rounded-square + abstract UM
strokes) to a PNG suitable for use as a reference image in the OpenAI
images.edit endpoint.

Faithful to src/components/shared/Logo.jsx (UMLogoMark): the same
135deg orange->magenta gradient, the same 22% corner radius, and the two
abstract UM path strokes scaled to the SVG's viewBox of 24x20.

Output: public/images/source/um-logo-mark.png
"""

from __future__ import annotations

import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
OUT_PATH = ROOT / "public" / "images" / "source" / "um-logo-mark.png"

SIZE = 1024  # square canvas in px
CORNER_RADIUS = int(SIZE * 0.22)
GRAD_FROM = (0xF6, 0x4F, 0x00)  # warm orange
GRAD_TO   = (0xA9, 0x00, 0xAA)  # magenta

# Mark area inside the rounded square. Matches the React component:
#   width = SIZE * 0.62, height = SIZE * 0.50, centered.
MARK_W = int(SIZE * 0.62)
MARK_H = int(SIZE * 0.50)
MARK_X = (SIZE - MARK_W) // 2
MARK_Y = (SIZE - MARK_H) // 2

VIEW_W, VIEW_H = 24, 20  # original SVG viewBox
SX = MARK_W / VIEW_W
SY = MARK_H / VIEW_H
STROKE = max(1, round(2.6 * SX))  # original strokeWidth=2.6


def to_canvas(x: float, y: float) -> tuple[float, float]:
    return (MARK_X + x * SX, MARK_Y + y * SY)


def make_gradient() -> Image.Image:
    """135deg linear gradient from GRAD_FROM (top-left) to GRAD_TO (bottom-right)."""
    coords = np.indices((SIZE, SIZE)).astype(np.float32)
    yy = coords[0]
    xx = coords[1]
    t = np.clip((xx + yy) / (2 * (SIZE - 1)), 0.0, 1.0)
    arr = np.zeros((SIZE, SIZE, 3), dtype=np.uint8)
    for i in range(3):
        arr[..., i] = (GRAD_FROM[i] * (1 - t) + GRAD_TO[i] * t).astype(np.uint8)
    return Image.fromarray(arr, mode="RGB")


def round_rect_mask() -> Image.Image:
    mask = Image.new("L", (SIZE, SIZE), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [(0, 0), (SIZE - 1, SIZE - 1)], radius=CORNER_RADIUS, fill=255
    )
    return mask


def draw_strokes(img: Image.Image) -> None:
    """Approximates the two SVG paths from UMLogoMark.

    Path 1 — U shape (the "U" in UM):
        M3 3 v9 a5 5 0 0 0 10 0 V3
        (start at (3,3), down 9 to (3,12), arc 180deg to (13,12), up to (13,3))

    Path 2 — M-ish shape (the "M" in UM, with 92% opacity):
        M13 17 V9 l4 5 l4 -5 v8
        (start at (13,17), up to (13,9), diagonal to (17,14), diagonal to (21,9), down to (21,17))
    """
    draw = ImageDraw.Draw(img, "RGBA")

    white = (255, 255, 255, 255)
    white92 = (255, 255, 255, int(255 * 0.92))

    # ---- Path 1: U shape ----
    # Left vertical: (3,3) -> (3,12)
    draw.line([to_canvas(3, 3), to_canvas(3, 12)], fill=white, width=STROKE)
    # Right vertical: (13,3) -> (13,12)
    draw.line([to_canvas(13, 3), to_canvas(13, 12)], fill=white, width=STROKE)
    # Bottom arc: half-circle from (3,12) to (13,12), bulging downward
    # Bounding box of the arc: center (8,12), radius 5 -> box (3,7) to (13,17)
    arc_box = [to_canvas(3, 7), to_canvas(13, 17)]
    draw.arc(arc_box, start=0, end=180, fill=white, width=STROKE)
    # Round line caps so the U joins smoothly with the arc
    cap_radius = STROKE // 2
    for cx, cy in [to_canvas(3, 3), to_canvas(13, 3)]:
        draw.ellipse(
            [(cx - cap_radius, cy - cap_radius), (cx + cap_radius, cy + cap_radius)],
            fill=white,
        )

    # ---- Path 2: M shape (92% opacity) ----
    pts = [to_canvas(x, y) for x, y in [(13, 17), (13, 9), (17, 14), (21, 9), (21, 17)]]
    draw.line(pts, fill=white92, width=STROKE, joint="curve")
    for cx, cy in pts:
        draw.ellipse(
            [(cx - cap_radius, cy - cap_radius), (cx + cap_radius, cy + cap_radius)],
            fill=white92,
        )


def main() -> int:
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    canvas = Image.new("RGBA", (SIZE, SIZE), (255, 255, 255, 0))
    grad = make_gradient()
    mask = round_rect_mask()
    canvas.paste(grad, (0, 0), mask=mask)

    draw_strokes(canvas)

    canvas.save(OUT_PATH, "PNG")
    print(f"Wrote {OUT_PATH.relative_to(ROOT)} ({OUT_PATH.stat().st_size:,} bytes, {SIZE}x{SIZE})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
