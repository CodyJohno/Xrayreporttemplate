# IT Handoff Package — Grower X-Ray Quality Report → Power BI Paginated Report

Built 2026-07-08 in a working session walking through the finished Yarranabee Holdings Pty Ltd report section by section. This package gives IT everything needed to rebuild the report as a Power BI paginated report (RDL) that auto-populates when a grower is selected from a dropdown.

## Contents

- **`01_Field_Inventory.md`** — every dynamic field on the report: where it appears, its shape, source, and formatting. Organised by report section (1–7, top of page 1 through end of page 3).
- **`02_Business_Rules.md`** — the logic behind anything that looks automatic but is currently applied manually: reject-rate colour thresholds, paddock status wording, the Notes column, adaptive narrative paragraphs, bale-example selection, season-on-season handling, and more.
- **`03_Design_Specifications.md`** — exact colours (verified against the official brand guide), fonts, type scale, layout/margins, and image sizing.
- **`04_Content_Standards.md`** — tone of voice, and how boilerplate paragraphs adapt for a grower who improved vs. one who went backwards.

## Reference materials (`reference/`)

- `Yarranabee_Reject_Report.docx` — the shipped report. **This is the ground-truth visual/output target**, not the build script (they differ in several places — see notes throughout).
- `build_snapshot.js` — the Node.js/docx build script that generated an earlier version of this report. Useful for layout/structure reference, but the shipped docx overrides it wherever they disagree.
- `JTJ_Brand_Style_Guide.pdf` — official Johnson's brand guide (47 pages). Colours and fonts in the design spec are sourced from this document.
- `assets/` — extracted images from the shipped report (logo, Power BI screenshot, bale scan photos) for visual reference.

## How the report differs from the build script

The shipped docx is not identical to `build_snapshot.js`. Differences found and noted throughout this package:
- Title wording, "Exported To" placeholder vs. filled-in country, paddock status wording ("Could improve" vs. "Worth a look")
- An entire **Season-on-Season Improvement** section exists in the shipped report but not in the script
- Sign-off name is dynamic (grower's account contact) in the shipped report vs. a generic team name in the script

Treat the docx as authoritative wherever the two disagree.

## Consolidated open items (need Cody's sign-off before/during the Power BI build)

These are called out inline in the relevant document, collected here for convenience:

1. **Grower name & Location source fields** — likely PULSE, exact table/field not yet confirmed. (Field Inventory §1)
2. **Report date field** — confirmed to come from the Power BI dataset, but exact field/logic not pinned down (it's not simply "today," since it differs from the page-2 data-refresh date). (Field Inventory §1)
3. **"Exported To" source system** — PULSE or Power BI, IT to investigate; also confirm the one-destination-per-paddock-per-season assumption holds beyond Yarranabee. (Business Rules — Exported To)
4. **Reject-rate colour threshold boundaries** — confirm exact behaviour at exactly 3% and exactly 10% (inclusive/exclusive). (Business Rules — Reject-rate colour thresholds)
5. **Paddock-intro-line wording** for the "all clean" and "all poor" variants — not yet drafted, only the "mixed" version exists (from Yarranabee). (Business Rules — Paddock table intro line)
6. **Season-on-season "got worse" sentence** — exact copy not yet drafted, only the tone direction is agreed (factual, no exclamation mark). (Content Standards)
7. **"Others" category** — no standard cause-explanation sentence or bale-caption template exists yet; needed if "Others" ever ranks as a top contributor or gets featured as a bale example. (Business Rules — flags narrative bank; bale caption bank)
8. **Dirt bale-caption template** — not yet drafted (only Stone/Clean/Wire captions exist from the shipped report). (Business Rules — Bale example captions)
9. **Sign-off contact source field** — grower → account manager/contact mapping, likely PULSE, not yet located. (Business Rules — Sign-off contact name)
10. **Power BI screenshot → live embed** — page 2's dashboard image is currently a manual screenshot; agreed this should become a live embedded Power BI visual in the rebuild rather than a static image. This is a meaningful scope item, not just a copy/paste. (Business Rules — Power BI screenshot)

## Resolved decisions from this session (for reference — don't re-litigate)

- Off-brand-guide colours (`#C0392B` red, `#E8F4EE` pale-green tint) are locked in as fixed report colours, used as-is.
- Report header stays as shipped (top-right combined logo, no navy banner) — not reconciled with the brand guide's letterhead template.
- Reject-rate threshold is 3-tier: green <3%, amber 3–10% (new colour `#F39C12`), red >10%. The shipped Yarranabee report only implemented 2 of these 3 tiers — IT should build the correct 3-tier version, not replicate that gap.
- Paddock Status words: "Very clean" (green) / "Solid" (amber) / "Could improve" (red).
- Season-on-Season section is omitted entirely for first-season growers (no prior data) — not shown as zero/blank.
- Season-on-Season colour always follows good-vs-bad (green = lower/better rate, red = higher/worse rate), not old-vs-new chronology.
- Branded banners (gratitude/relationship messaging) stay tonally constant regardless of grower performance.
- Bale example images keep native aspect ratio (fixed width, variable height) — not forced into a uniform box.
- Company reject-rate target is a fixed constant ("3.0% or under"), same for every grower.
