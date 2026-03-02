---
sidebar_position: 4
title: Risk Register
---

The Risk Register provides a centralized inventory of organizational risks identified through compliance assessments, security operations, and manual input. It enables structured risk management with scoring, ownership, and treatment planning.

## Risk Scoring

Each risk in the register is scored using a standard likelihood-times-impact methodology:

- **Likelihood** is rated on a scale from 1 (Rare) to 5 (Almost Certain), reflecting how probable the risk event is.
- **Impact** is rated on a scale from 1 (Negligible) to 5 (Catastrophic), reflecting the potential business damage if the risk materializes.
- **Risk Score** is calculated as Likelihood multiplied by Impact, producing a value between 1 and 25.

Risk scores are categorized into bands:

| Score Range | Rating |
|-------------|--------|
| 1 -- 4 | Low |
| 5 -- 9 | Medium |
| 10 -- 15 | High |
| 16 -- 25 | Critical |

Scores can be assigned manually or derived automatically from compliance gaps and security findings detected by Z Shield.

## Risk Matrix

The Risk Matrix provides a visual representation of all risks plotted on a 5x5 grid with Likelihood on one axis and Impact on the other. This heatmap view allows leadership and risk committees to quickly assess the overall risk landscape and identify clusters of high-priority risks.

The matrix is interactive. Click any cell to view the risks within that likelihood-impact combination. Filters allow you to scope the matrix by category, owner, or treatment status.

## Treatment Plans

Every risk should have an associated treatment plan defining how the organization intends to address it. Z Shield supports four treatment strategies:

- **Mitigate** -- Implement controls or actions to reduce the likelihood or impact of the risk. The treatment plan should specify the mitigation actions, responsible parties, and target completion date.
- **Accept** -- Acknowledge the risk and choose not to take further action, typically because the cost of mitigation exceeds the potential impact. Accepted risks must be reviewed periodically.
- **Transfer** -- Shift the risk to a third party, usually through insurance or contractual arrangements.
- **Avoid** -- Eliminate the risk entirely by discontinuing the activity or system that creates it.

Each treatment plan tracks its status (Not Started, In Progress, Completed) and includes fields for notes, attachments, and milestone dates.

## Risk Owners

Every risk must be assigned an owner -- an individual accountable for monitoring the risk and driving its treatment plan to completion. Risk owners receive:

- Notifications when their risks are created or updated.
- Periodic review reminders on a configurable schedule (monthly by default).
- Alerts when associated compliance controls change status.

Ownership can be assigned to any Z Shield user. The risk register dashboard includes an owner-centric view so individuals can see all risks assigned to them in one place.

## Integration with Compliance

Risks identified through compliance gap analysis are automatically added to the risk register with pre-populated scores based on the severity of the compliance gap. When a compliance control transitions from failing to passing, the associated risk is flagged for review and potential closure.
