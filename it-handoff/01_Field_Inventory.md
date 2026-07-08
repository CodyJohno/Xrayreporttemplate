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
| "Your three scanned paddocks did not all behave the same way." | Fixed intro line above table | Text | **To confirm: always this exact sentence regardless of whether paddocks vary much, or does it adapt?** | Regular, 10pt, Black |

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

