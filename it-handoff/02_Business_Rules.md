# Business Rules — Grower X-Ray Quality Report

The logic that looks automatic but is currently applied manually by Cody. IT needs this to build Power BI expressions/DAX that reproduce it.

Status: **DRAFT — in progress**

## Rule: Paddock count tile ("X of Y paddocks")

- **Y (denominator)** = total paddocks (ARGTs) registered to the grower, regardless of season or scan activity.
- **X (numerator)** = count of ARGTs with **at least 1** scanned bale in the reporting season. No minimum bale threshold — any scan activity counts the paddock as "scanned."

## Rule: "What Our X-Ray Found" table — Notes column

**This column is not fully automatable — it requires a manual review/edit step before send.**

- The Notes column is a free-text field per category row. It is **not** something the Power BI report should compute and lock in automatically.
- **Suggested defaults** (pre-fill these, but they must remain editable by whoever prepares the report):
  - Category ranked **#1 by flag count** → default text "Main contributor"
  - Category ranked **#2 by flag count** → default text "Second largest contributor"
  - **Wire** category → standing default note "Usually old fencing wire", regardless of its rank (this is Cody's standard go-to commentary for Wire and should stay as the default going forward)
  - All other categories → blank by default
- The report preparer can and does override/add to any row's note before the report is sent — this is a deliberate manual step, not a bug in the process.
- **Historical caution:** the Yarranabee report's Moisture row showed "Do not be concerned" — this was **situational commentary**, not a permanent rule. It referred to a moisture-flagging issue on Johnson's factory/scanning side (not the grower's fault) that has since been resolved. **Do not hardcode "Do not be concerned" as a default for Moisture.** Leave Moisture blank by default like other non-ranked categories; Cody (or whoever prepares the report) adds situational notes like this manually when a similar issue is active.
- **Implication for IT:** the RDL/Power BI build needs some kind of pre-send review/annotation step (e.g. a text field the report preparer fills in per grower/season before the report is finalised and sent), not a fully hands-off auto-generate-and-send pipeline for this column.

## Rule: Reject-rate colour thresholds

Applies everywhere a reject-rate percentage is shown a colour (glance-row tile, paddock table "Reject Rate" column, "Your Reject Rate" table).

| Band | Threshold | Colour | Hex |
|---|---|---|---|
| Green | < 3% | Green | `#12AA66` (brand primary) |
| Amber | 3% – 10% | Amber | `#F39C12` (new — not in brand guide, agreed with Cody 2026-07-08 as the standard amber for this band) |
| Red | > 10% | Red | `#C0392B` (already in use, not in brand guide) |

**Important — discrepancy in the shipped Yarranabee report:** this 3-tier rule is the *intended* standard, but the Yarranabee report as actually sent only used 2 colours (green under 10%, red at/above 10%) — the amber band was never implemented. Yarranabee's overall rate (4.9%) and Pip's paddock (4.0%) both fall in the amber band but were rendered green in the shipped docx. **Confirmed with Cody (2026-07-08): IT should build the correct 3-tier rule going forward — do not replicate the 2-tier gap from the Yarranabee report.**

Open question for Cody: exact boundary behaviour at 3% and 10% (e.g. is exactly 3.0% green or amber; is exactly 10.0% amber or red) — assume inclusive-lower-bound (≥3% and <10% = amber, ≥10% = red, <3% = green) until confirmed otherwise.

## Rule: Paddock table "Status" column

Same 3 bands as the reject-rate colour rule, mapped to fixed status words — confirmed by Cody (2026-07-08):

| Band | Reject rate | Status text |
|---|---|---|
| Green | < 3% | "Very clean" |
| Amber | 3% – 10% | "Solid" |
| Red | > 10% | "Could improve" |

Note: the Yarranabee report's Rosies row read "Could improve" for 13.2% — consistent. Tom's (2.4%, "Very clean") and Pip's (4.0%, "Solid") are also consistent with this rule even though Pip's reject-rate *colour* was rendered green instead of amber (the colour gap noted above) — the status *word* "Solid" was correct even where the colour wasn't. So the word-mapping logic was applied correctly in the shipped report; only the colour-fill logic had the gap.

## Rule: "Exported To" column (paddock table)

Source system not yet confirmed — likely PULSE or the Power BI dataset, both of which may hold shipment/destination data at the ARGT level. **Open item for IT to investigate**: locate which system/table authoritatively holds export destination per ARGT per season, and confirm the one-destination-per-paddock-per-season assumption holds across the full grower base (not just Yarranabee).

## Rule: Flags-table narrative paragraph (template + per-category cause bank)

The paragraph following the "What Our X-Ray Found" table (e.g. "Stone and dirt are the largest factors this season...") follows a repeatable template, populated per-report based on whichever category(ies) actually rank at the top by flag count:

**Template shape:** `[Top category/categories] are the largest factor(s) this season. [Cause explanation for the top category, from the bank below].`

**Cause-explanation bank per category** (insert whichever corresponds to the top-ranked category; if two categories are close/tied at the top, both may be named and the explanation adapted to cover both, as in the Yarranabee example which named Stone and Dirt together):

| Category | Standard cause-explanation sentence |
|---|---|
| Stone | "That usually points to ground and soil picked up during cutting, raking or baling, rather than anything wrong with the hay." |
| Dirt | Shares the Stone explanation (same ground/soil-pickup cause) — used together when Stone and Dirt are both top contributors, as in Yarranabee's report. |
| Moisture | "Ensure correct humidity levels are monitored during baling and hay is properly cured." |
| Wire | "Please drive removed fence lines and please notify us if you remove or repair big area of fencing so Johnson's can also inspect." |
| Others | **Open item — no standard sentence defined yet. Confirm with Cody if "Others" becomes a top contributor.** |

This is manually-authored per report (like the Notes column) — not something Power BI can fully automate. IT should build this as a templated text block with a category → cause-sentence lookup, surfaced for the report preparer to select/edit before send, not a locked auto-generated paragraph.

**This same per-category cause-sentence bank is reused in the "What This Means for You" paragraph's advice sentence** (page 1) — see that rule below. One lookup table serves both locations.

## Rule: Company reject-rate target

Fixed constant: **"3.0% or under"**. Same for every grower, product, and season. Confirmed by Cody (2026-07-08). Only changes if the company itself changes its target — should be a single configurable value in the Power BI model, not hardcoded per-report.

## Rule: "What This Means for You" paragraph structure

Three parts:
1. **Fixed opening** — always the same, not grower-dependent: "Because we run a slicer plant rather than a decontamination line, what we record is what ships, so every reject is one we have stopped before it reaches your customer."
2. **Adaptive advice sentence** — built from the *same* category → cause-sentence bank as the flags-table paragraph (see above), reworded slightly toward action/advice rather than pure cause explanation, keyed to whichever category ranks #1 this season. E.g. Stone/Dirt top → cutting/baler-height/ground-conditions advice; Moisture top → humidity/curing advice; Wire top → fencing-inspection advice.
3. **Fixed closing** — always the same: "We are happy to talk it through if it helps."

## Rule: Season-on-Season Improvement section (page 1, after the first banner)

- **Appears only if the grower has at least one prior season of scan data.** If this is the grower's first reported season, the section is **omitted entirely** — do not show a blank/zero comparison.
- **Colour always reflects good vs. bad, not old vs. new.** The lower (better) reject rate is shown in green; the higher (worse) reject rate is shown in red — regardless of which season is more recent. So for a grower whose rate got worse year-on-year, the colours flip relative to the Yarranabee example (old season = green, new/current season = red).
- Confirmed by Cody (2026-07-08).
- Open item: exact wording of the surrounding sentence ("Your reject rate has dropped from X% to Y%, a Z percentage point reduction year on year!") presumably also needs to flip tone/verb when the grower went backwards (e.g. "increased" instead of "dropped", no exclamation mark) — **see Content Standards for tone guidance; exact phrasing not yet confirmed with Cody.**

