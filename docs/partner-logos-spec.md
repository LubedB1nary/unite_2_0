# Partner Logo Sourcing Spec — Hero Marquee

**Target file:** `src/components/shared/PartnerMarquee.jsx`
**Drop assets into:** `public/logos/partners/`
**Last updated:** April 2026

---

## 1. Logos to source (11 brands)

| # | Brand (display) | Official name | Notes |
|---|---|---|---|
| 1 | VA Health | Veterans Health Administration (VHA) | Healthcare sub-brand of #6. Pick one of #1 / #6. |
| 2 | CVS | CVS Health | |
| 3 | GoPuff | goPuff | |
| 4 | Amazon | Amazon (or Amazon Business / Amazon Pharmacy) | Pick the mark closest to the actual relationship |
| 5 | Publix | Publix Super Markets | |
| 6 | Dept. of Veteran Affairs | U.S. Department of Veterans Affairs | See #1 note — same org. |
| 7 | Kaiser | Kaiser Permanente | |
| 8 | ASCOA | Ambulatory Surgical Centers of America | |
| 9 | Surgery Partners | Surgery Partners, Inc. | |
| 10 | Walgreens | Walgreens | |
| 11 | HCA Healthcare | HCA Healthcare | |

> **Dedupe decision:** #1 and #6 are the same entity (VHA is part of the VA). Keep only one unless there is a specific reason to show both marks.

---

## 2. Format

- **Primary format:** `SVG` (1.1 or 2.0)
- **Secondary / fallback:** 2× transparent PNG at ~96 px tall for each variant, in case any SVG renders incorrectly in an ancient browser.

### SVG authoring requirements

- **`viewBox`** set tightly to the mark's bounding box — no internal padding.
- **Fills:** single color. Prefer `fill="currentColor"` so one file can be tinted via CSS. If the brand's identity requires multiple colors (e.g. Amazon's orange swoosh), keep brand colors for the multicolor variant only.
- **Text:** convert all text to paths / outlines (no font dependencies).
- **Stroke widths:** avoid hairlines thinner than 1 px at the authored height.
- **Optimization:** run through SVGO. Target **< 8 KB** per file.
- **Filename:** `kebab-case--variant.svg`
  - Examples: `cvs-health--ink.svg`, `veterans-affairs--paper.svg`, `kaiser-permanente--plum.svg`

---

## 3. Color variants (3 per brand)

| Variant | Hex | Use case |
|---|---|---|
| `--ink` | `#241a28` | Light backgrounds — homepage marquee on `#ede5d6` paperAlt, and anywhere on `#f7f2ea` paper. **If only one variant is sourced, this is the one.** |
| `--paper` | `#f7f2ea` | Dark backgrounds — Solutions CTA, Login's plum panel, inverted CTA sections. |
| `--plum` | `#5e2963` | Brand-tinted placements where the logo should read as part of our palette. Nice-to-have. |

**Delivery check:** every brand should arrive with at least `--ink` and `--paper`. `--plum` is optional.

---

## 4. Sizing spec

All SVGs should scale cleanly at any size, but normalize authoring heights to these two buckets before export so rhythm in the marquee stays consistent.

| Bucket | Authored height | Width | Rendered height (in marquee) | Examples |
|---|---|---|---|---|
| **Tall / square mark** | 64 px | proportional, ~64 px | ~32 px | VA seal, Kaiser K, ASCOA mark |
| **Horizontal wordmark** | 48 px | proportional, 80 – 200 px | ~24 px | CVS, Walgreens, Publix, Amazon, GoPuff, Surgery Partners, HCA Healthcare, VHA wordmark |

- Do **not** add whitespace padding inside the artboard.
- Do **not** crop the mark — let the wordmarks breathe horizontally.
- The marquee will normalize by rendered height; width is allowed to float.

---

## 5. File naming & delivery

```
public/
└── logos/
    └── partners/
        ├── veterans-affairs--ink.svg
        ├── veterans-affairs--paper.svg
        ├── veterans-affairs--plum.svg
        ├── cvs-health--ink.svg
        ├── cvs-health--paper.svg
        ├── cvs-health--plum.svg
        ├── gopuff--ink.svg
        ├── gopuff--paper.svg
        ├── gopuff--plum.svg
        ├── amazon--ink.svg
        ├── amazon--paper.svg
        ├── amazon--plum.svg
        ├── publix--ink.svg
        ├── publix--paper.svg
        ├── publix--plum.svg
        ├── kaiser-permanente--ink.svg
        ├── kaiser-permanente--paper.svg
        ├── kaiser-permanente--plum.svg
        ├── ascoa--ink.svg
        ├── ascoa--paper.svg
        ├── ascoa--plum.svg
        ├── surgery-partners--ink.svg
        ├── surgery-partners--paper.svg
        ├── surgery-partners--plum.svg
        ├── walgreens--ink.svg
        ├── walgreens--paper.svg
        ├── walgreens--plum.svg
        ├── hca-healthcare--ink.svg
        ├── hca-healthcare--paper.svg
        ├── hca-healthcare--plum.svg
        └── raster-fallback/
            ├── veterans-affairs--ink@2x.png
            ├── ...etc
```

---

## 6. Integration notes (for reference, not for the asset agent)

Once the assets land in `public/logos/partners/`, `PartnerMarquee.jsx` will swap from:

```jsx
const DEFAULT_PARTNERS = ['VA HEALTH', 'CVS', ...];
// renders <span>{name}</span>
```

…to:

```jsx
const DEFAULT_PARTNERS = [
  { id: 'vha', name: 'Veterans Health Administration', src: '/logos/partners/veterans-affairs' },
  { id: 'cvs', name: 'CVS Health', src: '/logos/partners/cvs-health' },
  // ...
];
// renders <img src={`${src}--${variant}.svg`} alt={name} height={28} loading="lazy" />
```

with `variant` chosen per-placement (`ink` on light, `paper` on dark).

---

## 7. Legal / brand-guideline caveats

Several of these brands (**VA/VHA**, **Kaiser Permanente**, **Amazon**, **HCA Healthcare**) have strict logo-usage rules. Using a brand's logo as a "trusted by" endorsement when there is no signed partnership or contract in place is a legal and reputational risk.

Before the agent sources these assets, confirm for each brand one of:

1. **Signed partnership / contract** — ok to use the logo.
2. **Active customer** using Unite Medical in production — usually ok (check terms).
3. **Neither** — either drop the logo from the marquee, or swap to a category label ("VA hospitals", "national retail pharmacies", "regional ASCs", etc.).

Flag this list to legal before shipping to production.

---

## 8. Deliverable checklist

For each brand:

- [ ] `--ink` SVG, path-outlined, < 8 KB
- [ ] `--paper` SVG, path-outlined, < 8 KB
- [ ] `--plum` SVG (optional), path-outlined, < 8 KB
- [ ] 2× PNG raster fallback for each variant at ~96 px tall, transparent background
- [ ] Authored to the correct height bucket (64 px for tall marks, 48 px for horizontal wordmarks)
- [ ] `viewBox` tight to the mark
- [ ] Correct filename (`kebab-case--variant.svg`)
- [ ] Legal clearance confirmed

Total files expected: **11 brands × 3 variants × (1 SVG + 1 PNG) = 66 files**, or **44 files** if `--plum` is skipped.
