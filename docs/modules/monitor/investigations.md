---
sidebar_position: 7
title: "Investigations"
---

# Investigations

When insider threat indicators or policy violations warrant closer examination, open an investigation to activate enhanced monitoring for a specific user. Investigations provide a structured, auditable process with approval workflows, legal safeguards, and time-limited scope.

## Opening an Investigation

1. Navigate to the user's insider threat profile or activity timeline
2. Click **Open Investigation** and provide a business justification
3. Select the investigation scope: enhanced activity monitoring, selective recording, or both
4. Route for approval: manager approval, security team approval, or legal approval (configurable per tenant)
5. Set an expiration date (default: 30 days, maximum: 90 days)

## Investigation Capabilities

Once approved, the investigation unlocks enhanced monitoring for the target user:

- **Enhanced activity detail** -- Full URL paths (not just domains), window titles (unmasked), clipboard content, and print job details
- **Selective screen recording** -- Continuous screen recording for the duration of the investigation, with audio capture if configured
- **AI analysis** -- Automatic AI-powered analysis of recordings and screenshots with structured findings
- **Evidence collection** -- All captured data is preserved as investigation evidence with chain-of-custody logging

## Investigation Lifecycle

| Status | Meaning |
|--------|---------|
| Pending Approval | Investigation submitted, awaiting approval from required approvers |
| Active | Investigation approved and enhanced monitoring is live |
| Extended | Investigation extended beyond original expiration (requires re-approval) |
| Closed | Investigation completed or expired. Enhanced monitoring stops, evidence is retained per retention policy |
| Denied | Investigation request denied by an approver |

## Evidence and Reporting

- All investigation evidence (recordings, screenshots, activity logs, AI analysis results) is accessible from the investigation detail page
- Generate a formatted PDF investigation report for HR, legal, or compliance
- Evidence retention follows the tenant's retention policy, with option to extend for active legal holds
- Complete audit trail of every action taken during the investigation
