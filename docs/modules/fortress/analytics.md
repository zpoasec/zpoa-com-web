---
sidebar_position: 17
title: "Access Analytics"
---

# Access Analytics

Fortress Access Analytics provides risk scoring, heatmaps, outlier detection, and trend analysis across all identities and departments. It transforms raw access data into actionable intelligence that helps security teams prioritize remediation and demonstrate risk reduction over time.

## How It Works

### Risk Scoring

Every identity receives a composite risk score (0-100) based on:

- **Privilege level** -- Admin roles, production access, and sensitive data permissions
- **Access breadth** -- Number of applications and resources accessible
- **Unused access** -- Percentage of granted permissions that are not being used
- **SoD violations** -- Number of active separation-of-duties conflicts
- **Behavioral signals** -- Anomalous login patterns, impossible travel, unusual access times
- **MFA status** -- Whether strong MFA is enabled and regularly used
- **Account age** -- Older accounts with accumulated permissions score higher

Scores are calculated per identity and aggregated per department.

### Risk Heatmaps

Visual risk distribution across the organization:

- **Department heatmap** -- Color-coded grid showing average risk by department
- **Application heatmap** -- Which applications contribute the most to organizational risk
- **Cross-tab analysis** -- Department vs. application risk intersection
- **Temporal heatmap** -- Risk distribution by time of day and day of week

### Outlier Detection

Identify identities that deviate from their peer group:

- **Permission outliers** -- Users with significantly more access than peers in the same role
- **Behavioral outliers** -- Users with access patterns that differ from their department norms
- **Risk score outliers** -- Users whose risk scores are 2+ standard deviations above their peer group
- **Cost outliers** -- Users with significantly higher license costs than peers

Each outlier includes:
- Deviation magnitude
- Peer group comparison
- Recommended actions

### Access Trends

Track access metrics over time:

- **Risk trend** -- Organization-wide risk score over 30/60/90 days
- **MFA coverage** -- Percentage of identities with MFA enabled, trending over time
- **Over-privileged percentage** -- Proportion of identities with unused permissions
- **Remediation velocity** -- How quickly access issues are resolved
- **New access grants vs. revocations** -- Net access change over time

### Department Risk Profiles

Per-department analytics including:

- **Average risk score** -- Mean risk across all department members
- **Highest risk identity** -- The most at-risk person in the department
- **MFA adoption** -- Percentage of department members with MFA
- **Over-privileged count** -- Number of over-privileged identities
- **Compliance status** -- Whether the department meets access policy requirements