# Field Inventory — Grower X-Ray Quality Report

Every dynamic (grower-specific) value on the report, where it appears, its shape, and formatting rules.
Built section by section during the IT handoff working session (2026-07-08).

Status: **DRAFT — in progress**

## Section 1 — Header & Title Block (page 1, top)

| Field | Example value | Shape | Source | Formatting |
|---|---|---|---|---|
| Logo | Johnson's combined wordmark + wheatsheaf | Static image, not grower-dependent | Fixed brand asset | Top-right of every page header, fixed size |
| Report title | "Grower X-Ray Quality Report" | **Fixed boilerplate text** — same for every grower, not a dynamic field | Hardcoded | Bold, 18pt, Navy |
| Grower name | "Yarranabee Holdings Pty Ltd" | Text, full legal/trading name | Grower master data (likely PULSE — **to confirm exact table/field with IT**) | Bold, 10pt, Dark Grey |
| Season | "Season 25/26" | Text label, financial/growing season | Power BI dataset (season field) | Regular, 10pt, Dark Grey, prefixed "Season " |
| Location | "Highbury, WA" | Text, "Town, State" | Grower/plant master data (likely PULSE — **to confirm**) | Regular, 10pt, Dark Grey |
| Report date | "23 Jun 2026" | Date, format "D MMM YYYY" | Power BI dataset — **appears to be data-as-of/refresh date rather than a fixed "today" stamp; confirm exact field with IT since it differs from the "data updated" date on page 2** | Regular, 10pt, Dark Grey |
| Intro paragraph | "Thanks for another season of supplying us..." | **Fixed boilerplate text**, always identical regardless of grower | Hardcoded | Regular, 10pt, Black |

**Business rule note:** Subtitle fields are joined with `   |   ` (3 spaces either side of pipe).

## Section 2 — "At a Glance" stat row + "What Our X-Ray Found" table (page 1)

| Field | Example value | Shape | Source | Formatting |
|---|---|---|---|---|
| Bales scanned | "1,911" | Integer, thousands-separator | Count of scanned bales this season | Bold, 18pt, Green |
| Paddocks scanned note | "(3 of 9 paddocks)" | Text, "X of Y paddocks" | See Business Rules: Paddock count tile | Bold, 8pt, Navy |
| Exportable product % | "95.1%" | Percentage, 1 decimal | Clean bales ÷ total scanned bales | Bold, 18pt, Green |
| Overall reject rate % | "4.9%" | Percentage, 1 decimal | Rejected/contaminated bales ÷ total scanned bales | Bold, 18pt, Green — **see Business Rules for colour-threshold logic (still to be confirmed)** |
| Flags table rows | Stone / Dirt / Moisture / Wire / Others | Category name, fixed list (5 categories) | Power BI flag-by-reason breakdown | Category name bold on top-2 rows only (Stone, Dirt bold in shipped doc) |
| Flags Recorded (per category) | "672" | Integer | Count of flags per category this season | Regular, 10pt, Black |
| Notes (per category) | "Main contributor" | Free text, editable | **Manual field — see Business Rules.** Defaults: rank #1 = "Main contributor", rank #2 = "Second largest contributor", Wire = "Usually old fencing wire" (standing default), others blank | Regular, 10pt, Black |
| "Stone and dirt are the largest factors..." paragraph | Templated narrative | Text | Category-cause template — see Business Rules | Regular, 10pt, Black |

## Section 3 — Paddock Comparison Table (page 1)

| Field | Example value | Shape | Source | Formatting |
|---|---|---|---|---|
| Paddock name | "Tom's" / "Pip's" / "Rosies" | Text | Grower's paddock naming (grower master data) | Regular, 10pt, Black |
| ARGT code | "W20250029" | Text, fixed format "W" + 8 digits, shown in parens after paddock name | Power BI / scan records | Regular, 10pt, Black |
| Bales (per paddock) | "678" | Integer | Count of scanned bales for that ARGT this season | Regular, 10pt, Black |
| Reject Rate (per paddock) | "2.4%" | Percentage, 1 decimal | Rejected bales ÷ scanned bales for that ARGT | Bold, 10pt, colour per 3-tier threshold rule (see Business Rules) |
| Exported To | "Korea" | Text, country name | **Source system not yet confirmed — PULSE or Power BI, IT to investigate (see Business Rules)** | Regular, 10pt, Black |
| Status | "Very clean" / "Solid" / "Could improve" | Text, fixed 3-word vocabulary | Same 3-tier band as reject rate — see Business Rules | Regular, 10pt, Black |
| "Your three scanned paddocks did not all behave the same way." | Templated intro line above table, 3 variants | Text | Paddock band consistency (all-green / all-red / mixed) — see Business Rules. **All-green and all-red wording now drafted, pending Cody's final approval.** | Regular, 10pt, Black |

## Section 4 — Reject Rate table, "What This Means for You", Season-on-Season (page 1)

| Field | Example value | Shape | Source | Formatting |
|---|---|---|---|---|
| Grower's overall reject rate (repeated) | "4.9%" | Percentage, 1 decimal | Same figure as glance row | Bold, colour per 3-tier rule |
| Company target | "3.0% or under" | Fixed text | Hardcoded constant — see Business Rules | Bold, Navy |
| "What This Means for You" paragraph | 3-part templated text | Text | Fixed opening + adaptive advice sentence (category bank) + fixed closing — see Business Rules | Regular, 10pt, Black |
| Season-on-season: prior season rate | "38.2%" | Percentage, 1 decimal | Prior season's overall reject rate from Power BI, **only if prior-season data exists** | Bold, 18pt, colour = worse of the two (red in Yarranabee's case) |
| Season-on-season: current season rate | "4.9%" | Percentage, 1 decimal | Current season overall reject rate (same as glance row figure) | Bold, 18pt, colour = better of the two (green in Yarranabee's case) |
| Season-on-season narrative | "Your reject rate has dropped from 38.2% to 4.9%, a 33.3 percentage point reduction year on year!" | Text, computed % point difference + directional wording | Computed from the two rates — **directional wording (dropped/increased, tone) needs Content Standards guidance for the "went backwards" case** | Regular, 10pt, Black |
| Season-on-season section (whole block) | Present for Yarranabee | Conditional — **omitted entirely if grower has no prior-season data** | See Business Rules | — |

## Section 6 — "Supporting Data" (page 2)

| Field | Example value | Shape | Source | Formatting |
|---|---|---|---|---|
| Power BI screenshot | Reject Summary dashboard, filtered to grower | **Currently a manual screenshot — see Business Rules for rebuild recommendation** | Power BI "Raw Material Rejects → Reject Summary" report, filtered by Grower/Plant/Season | Centered, ~540x251px in shipped doc |
| Screenshot caption | "Power BI, Raw Material Rejects, Reject Summary. Yarranabee Holdings Pty Ltd, data updated 17/06/26." | Text, template with grower name + data-refresh date | Grower name = same field as title block; date = **Power BI dataset last-refresh timestamp, distinct from the page-1 report date** | Italic, 8pt, Dark Grey, centered |
| Reconciliation table | Total bales scanned / Clean bales / Contaminated or rejected / Exportable product % / Overall reject rate % / Paddocks scanned | 6 rows, figures restated from page 1 (with 2 new: Clean bales count, Contaminated/rejected count) | Same Power BI dataset as page 1 figures | Standard data table styling |
| "Every figure on the first page is drawn from this dataset..." | Fixed boilerplate | Text | Hardcoded | Regular, 10pt, Black |

## Section 7 — Bale Examples (page 3)

| Field | Example value | Shape | Source | Formatting |
|---|---|---|---|---|
| Featured categories (which 1-2 reject types) | Stone, Wire | **Curated selection, not fully automatable — see Business Rules** | Report preparer judgement, guided by Stone/Dirt-almost-always + Wire-if-present + notable-Others rule | — |
| Example header label | "Rejected: Stone Contamination" | Text, "[Rejected: / Clean:] [Category] Contamination" | Derived from chosen category + reject/clean status | Bold, 11pt, White, on navy bar |
| Paddock (ARGT) | "Rosies (W20250027)" | Text | Same paddock fields as Section 3 | Regular, 9pt, White |
| Bale number | "Bale 110" | Text, "Bale " + integer | Bale ID from scan record — **once category is chosen, bale ID selection can be automated (any representative bale from that category), per Cody 2026-07-08** | Regular, 9pt, White |
| Status tag | "REJECTED" / "CLEAN" | Fixed 2-word vocabulary | Derived from bale's flag status | Bold, 9pt, White, fill = Red (`#C0392B`) for rejected / Green (`#12AA66`) for clean |
| Capture-mode caption | "X-ray plant capture, supervisor scan mode" | Fixed text | Hardcoded | Italic, 9pt, Navy, on pale-green fill |
| Bale scan image | X-ray capture | Image, aspect ratio varies (~390-420 x 170-236px in shipped doc) | X-ray scanning app, per bale ID | Centered |
| Bale caption | "This bale was rejected for stone contamination..." | Text, per-category template with minor tweaks per image | Category → template caption lookup — see Business Rules. Stone/Clean/Wire confirmed from shipped report; Dirt and Others now drafted, pending Cody's approval (Dirt also needs a real scan image to verify marker colour) | Regular, 10pt, Black |
| AI-training disclaimer | "Note: a few stones on the rejected stone bale are not boxed..." | Fixed text | **Standing rule: show automatically whenever Stone is a featured example** — see Business Rules | Italic, 8pt, Dark Grey, centered |
| Sign-off contact line | "please get in touch with the Lachlan or myself" | Text, dynamic contact name(s) | Grower's account manager/contact — **source system to confirm with IT (likely PULSE)** | Italic, 9pt, Dark Grey, centered |

