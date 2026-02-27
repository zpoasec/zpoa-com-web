---
sidebar_position: 2
title: Alert Management
---

The Alerts view is the primary workspace for security analysts working within the Detect module. It provides a centralized queue of all generated alerts with tools for triage, investigation, and resolution.

## Severity Levels

Every alert is assigned one of five severity levels:

| Severity | Description |
|----------|-------------|
| **Critical** | Indicates an active or imminent threat requiring immediate response. Examples include confirmed data exfiltration or active ransomware. |
| **High** | Represents a significant threat that should be investigated promptly. Examples include privilege escalation or lateral movement. |
| **Medium** | Denotes suspicious activity that warrants review. Examples include unusual login patterns or policy violations. |
| **Low** | Captures low-risk anomalies or informational detections that may be useful for context during investigations. |
| **Info** | Purely informational events logged for audit trail purposes, such as configuration changes or successful access reviews. |

## Alert Statuses

Alerts progress through the following statuses during their lifecycle:

- **Open** -- The alert has been generated and is awaiting analyst review.
- **Investigating** -- An analyst has claimed the alert and is actively investigating.
- **Resolved** -- The investigation is complete and the threat has been addressed.
- **False Positive** -- The alert was determined to be benign. Marking an alert as a false positive feeds back into the detection engine to improve future accuracy.

## Working with Alerts

### Alert Details

Click any alert to open the detail panel. The detail view includes:

- A summary of the triggering rule and matched conditions.
- The raw and normalized log events that contributed to the alert.
- Asset and user context enrichment data.
- A timeline showing all related events.
- MITRE ATT&CK technique and tactic mapping, displayed as tags linked to the full MITRE reference.

### Bulk Actions

Select multiple alerts from the list to perform bulk operations:

- **Assign** -- Assign selected alerts to a specific analyst.
- **Change Status** -- Move all selected alerts to a new status.
- **Change Severity** -- Override the severity of selected alerts.
- **Export** -- Export selected alerts as CSV or JSON for external reporting.

### MITRE ATT&CK Mapping

Each alert is automatically mapped to relevant MITRE ATT&CK techniques and tactics based on the detection rule that generated it. This mapping provides strategic context and helps teams understand which adversary behaviors are being observed in their environment. For a broader view of MITRE coverage, see the [MITRE ATT&CK Heatmap](/docs/modules/detect/mitre).

## Notification Routing

Alerts are delivered to notification channels based on configurable routing rules. You can define rules that send Critical and High alerts to PagerDuty, Medium alerts to a Slack channel, and Low/Info alerts to email digests. Routing rules are managed under **Settings > Notifications**.
