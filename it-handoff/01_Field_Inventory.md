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

