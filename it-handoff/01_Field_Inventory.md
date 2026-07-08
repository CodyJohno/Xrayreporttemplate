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
| "Stone and dirt are the largest factors..." paragraph | Fixed-ish narrative | Text | **To confirm: is this paragraph boilerplate, or does it adapt to which categories actually rank #1/#2?** | Regular, 10pt, Black |

