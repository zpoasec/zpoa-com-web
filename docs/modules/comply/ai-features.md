---
sidebar_position: 6
title: AI-Powered Features
---

The Comply module includes four AI-powered features that automate compliance workflows traditionally performed manually by GRC analysts and auditors. Each feature uses your live compliance data to produce actionable, context-specific outputs.

All AI features require an active AI provider. Configure one under **Settings > AI / LLM** before use. See [AI / LLM Settings](/docs/administration/ai-settings) for setup instructions.

---

## AI Policy Generation

Generate structured compliance policy documents for any control with a single click.

### How to Access

Navigate to **Comply > Frameworks**, expand a control, and click the **Generate Policy** button (marked with a sparkle icon).

### What It Produces

The AI generates a complete policy document containing:

- **Policy Objective** -- The purpose and security goal the policy addresses.
- **Scope** -- Which systems, teams, or data types the policy applies to.
- **Procedures** -- Step-by-step operational procedures to satisfy the control.
- **Enforcement** -- How compliance with the policy is monitored and enforced.
- **Review Schedule** -- Recommended frequency for policy review and updates.

### Workflow

1. Click **Generate Policy** on any control.
2. Review the generated draft in the modal preview.
3. Choose one of three actions:
   - **Approve** -- The policy is saved and linked to the control.
   - **Reject** -- The draft is discarded.
   - **Regenerate** -- Request a new draft with different emphasis.

Approved policies are listed under the control's policy drafts and can be exported for auditor review.

---

## AI Evidence Validation

Get an automated sufficiency review of the evidence collected for any control, identifying gaps before auditors do.

### How to Access

Navigate to **Comply > Evidence** and click the **AI Review** button next to any control group.

### What It Produces

The validation returns:

- **Sufficiency Score** (0--100) -- A numeric assessment of how well the collected evidence supports the control.
- **Findings** -- Specific issues identified in the evidence (missing items, expired artifacts, insufficient detail).
- **Recommendations** -- Actionable steps to improve evidence coverage.

### Interpreting Results

Results are color-coded for quick assessment:

| Color | Sufficiency | Meaning |
|-------|------------|---------|
| Green | 70--100 | Evidence is sufficient for the control. |
| Yellow | 40--69 | Evidence is partial; some gaps need attention. |
| Red | 0--39 | Evidence is insufficient; significant gaps exist. |

Run evidence validation regularly, especially before scheduled audits, to ensure all controls have adequate supporting evidence.

---

## AI Audit Readiness Report

Simulate a full audit for any framework and receive a predicted outcome with detailed per-control analysis.

### How to Access

Navigate to **Comply > Frameworks** and click the **Audit Readiness Report** button at the framework level.

### What It Produces

The report includes:

- **Predicted Outcome** -- One of three verdicts:
  - **Pass** -- All critical controls are satisfied with sufficient evidence.
  - **Conditional Pass** -- Most controls pass, but specific gaps could result in findings.
  - **Fail** -- Significant control failures or evidence gaps would likely result in audit failure.
- **Per-Control Analysis** -- A table showing each control's status, evidence sufficiency, and risk level.
- **Evidence Gaps** -- A list of controls with missing, expired, or insufficient evidence.
- **Risk Factors** -- Environmental or operational risks that could affect audit outcome.
- **Prioritized Recommendations** -- Ordered list of actions to improve audit readiness, ranked by impact.

### When to Use

- **Before a scheduled audit** to identify and remediate gaps.
- **After major infrastructure changes** to verify compliance posture is maintained.
- **During quarterly reviews** to track audit readiness trends over time.

---

## AI Remediation Plans

Generate actionable, step-by-step remediation plans for failing or partially compliant controls.

### How to Access

Navigate to **Comply > Frameworks**, expand a failing control, and click the **Get AI Fix** button.

### What It Produces

Each remediation plan includes:

- **Summary** -- A brief description of the compliance gap and its business impact.
- **Remediation Steps** -- Ordered action items, each containing:
  - **Action** -- What needs to be done.
  - **Owner** -- Suggested responsible team or role.
  - **Effort** -- Estimated implementation effort (e.g., "2 hours", "1 sprint").
  - **Priority** -- Critical, High, Medium, or Low.
- **Overall Priority** -- The aggregate urgency of the remediation.
- **Estimated Total Effort** -- Combined effort across all steps.

### Tracking Progress

Each step in a remediation plan can be tracked independently:

- **Pending** -- Not yet started.
- **In Progress** -- Work has begun.
- **Completed** -- Step is done.

Click **Mark Complete** on each step as you finish it. The overall plan status updates automatically based on step progress.
