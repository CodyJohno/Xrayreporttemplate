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

