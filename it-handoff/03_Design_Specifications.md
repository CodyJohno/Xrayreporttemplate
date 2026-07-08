# Design Specifications — Grower X-Ray Quality Report

Reference: `reference/Yarranabee_Reject_Report.docx` (shipped output), `reference/build_snapshot.js` (build script), `reference/JTJ_Brand_Style_Guide.pdf` (official brand guide).

## Colour Palette

| Name | Hex | Pantone | CMYK | RGB | Source | Used for |
|---|---|---|---|---|---|---|
| Johnson's Green | `#12AA66` | PANTONE 3405 | C80 M5 Y80 K0 | R18 G170 B102 | Brand guide, p.10 (Primary) | Headline stat figures, positive reject-rate figures, banner accent text, "Feeding the animals..." tagline |
| Navy | `#1A2E4C` | PANTONE 295 | C95 M81 Y43 K40 | R26 G46 B76 | Brand guide, p.10 (Primary) | Table header row fill, section heading text, banner background, bale-example header bar |
| Dark Grey | `#626D7C` | — | C65 M50 Y40 K12 | R98 G109 B124 | Brand guide, p.10 (Secondary) | Subtitle line under report title, image captions/attributions |
| Light Grey | `#C4C8CC` | — | C23 M16 Y15 K0 | R196 G200 B204 | Brand guide, p.10 (Secondary) | Not currently used in this report — available for future use |
| Reject Red | `#C0392B` | — | — | — | **Not in brand guide** — used consistently in shipped report | "REJECTED" status tags, reject-rate figures ≥10% (see Business Rules: Reject-rate colour thresholds) |
| Amber (new) | `#F39C12` | — | — | — | **Not in brand guide, not in shipped report** — agreed with Cody 2026-07-08 to fill a gap: the intended 3-tier reject-rate threshold rule was never actually implemented with a 3rd colour | Reject-rate figures 3%–10% (see Business Rules) |
| Pale Green tint | `#E8F4EE` | — | — | — | **Not in brand guide** — appears to be a ~12% tint of Johnson's Green over white | Glance-row stat tile backgrounds, status-tag caption backgrounds |
| Row stripe grey | `#F7F9FA` | — | — | — | Not in brand guide | Alternating table row shading (even rows) |
| Border grey | `#D9DDE2` | — | — | — | Not in brand guide | Thin table cell borders |
| Black | `#000000` | — | — | — | Standard | Body text |
| White | `#FFFFFF` | — | — | — | Standard | Text on navy/red/green fills, odd table rows |

**Confirmed with Cody (2026-07-08):** Reject Red (`C0392B`) and the pale green tint (`E8F4EE`) are not in the official brand guide, but are locked in as fixed, report-specific colours. IT should build to these exact hex values — do not substitute brand-guide colours or attempt to "correct" them.

## Typography

- **Font:** Arial (brand guide's documented master-brand font; body copy sample was captured in the primary brand green). Brand guide notes "Arial/Helvetica can be used in instances when [the primary font] is not available" — for this report, Arial is used throughout with no exceptions found.
- **No bold/italic variants used outside standard Arial Bold/Italic.**

### Type scale (from shipped document, half-points → pt)
| Element | Size | Weight | Colour |
|---|---|---|---|
| Report title ("Grower X-Ray Quality Report") | 18pt | Bold | Navy |
| Page section headers (e.g. "What Our X-Ray Found") | 12pt | Bold | Navy |
| "Supporting Data" / page 2–3 headers | 16pt | Bold | Navy |
| Subtitle line (grower name / season / location / date) | 10pt | Bold (name only) | Dark Grey |
| Body paragraph text | 10pt | Regular | Black |
| Glance-row big stat number | 18pt | Bold | Green |
| Glance-row stat label | 8pt | Bold | Navy |
| Table header text | 10pt | Bold | White |
| Table body text | 10pt | Regular/Bold per cell | Black/Green/Red per rule |
| Banner heading line | 11pt | Bold Italic | Green |
| Banner body line | 9pt | Regular | White |
| Bale-example header label | 11pt | Bold | White |
| Bale-example header meta | 9pt | Regular | White |
| Status tag ("REJECTED"/"CLEAN") | 9pt | Bold | White |
| Image caption / attribution | 8pt | Italic | Dark Grey |

## Layout

- Page size: A4 (210mm x 297mm / 11906 x 16838 twips)
- Margins: top/bottom 0.5in (720 twips), left/right 1in (1440 twips), header 0.33in (480 twips), footer 0.33in (480 twips)
- Content width: 9026 twips (~6.27in)
- Logo: top-right of every page header, combined wordmark+wheatsheaf lockup, fixed size (see build script: 160x34 units)
- **Note:** the brand guide's letterhead/EDM templates use a full-width navy banner ("Johnson's / Australian Grown Stockfeed" + separate wheatsheaf circle). This report intentionally does not follow that layout — confirmed with Cody (2026-07-08) that the simpler top-right combined-logo treatment is the deliberate standard for this report type. IT should build to the report as shipped, not reconcile it with the letterhead template.

## Images

| Asset | Approx. size (shipped doc) | Notes |
|---|---|---|
| Header logo | 160 x 34 (script units) | Fixed, top-right every page |
| Power BI screenshot | 540 x 251 px | Centered, page 2 |
| Bale scan photos | ~390-420 x 170-236 px (varies per photo aspect ratio) | Centered, one per bale example block on page 3 |

**Open item:** confirm with Cody whether bale photo dimensions should be a fixed box (crop/pad to fit) or preserve native aspect ratio (current approach — this is why the three bale images differ slightly in height despite similar width).

## Table & Banner Styling

- Table header row: Navy fill, white bold text
- Table body rows: alternating white / `#F7F9FA` stripe
- Table borders: thin (0.25pt), `#D9DDE2`
- Branded banner (navy full-width block): used at end of page 1 and page 2, center-aligned text, green bold italic first line + white regular body line(s)
- Status tag cells (REJECTED/CLEAN): colour fill matches semantic colour (red/green), white bold text, paired with a pale-green caption cell to the right

---
*Status: colours and fonts verified against official brand guide (2026-07-08). Layout/type-scale figures extracted directly from the shipped .docx XML — not yet confirmed by Cody as intentional in all cases. Flagged items above need sign-off before handoff.*
