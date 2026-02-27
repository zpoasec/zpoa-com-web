---
sidebar_position: 4
title: "Behavioral Anomalies"
---

# Behavioral Anomalies

Fortress continuously monitors identity behavior across all connected providers to detect anomalous activity that may indicate compromised credentials, insider threats, or unauthorized access. Machine learning models establish behavioral baselines for each identity and flag deviations in real-time.

## Detection Categories

### Unusual Login Patterns

Fortress tracks authentication events and alerts when login behavior deviates from established baselines:

- **New location** -- Login from a country, region, or IP range not previously associated with the identity
- **New device** -- Authentication from an unrecognized device fingerprint or user agent
- **Unusual hours** -- Access outside the identity's normal working hours pattern
- **Failed authentication spikes** -- Sudden increase in failed login attempts indicating brute force or credential stuffing
- **Authentication method change** -- Unexpected switch from SSO to direct credentials or vice versa

### Impossible Travel

Fortress detects physically impossible login sequences by correlating the geographic locations and timestamps of successive authentication events:

- **Speed analysis** -- Calculates whether travel between two login locations is feasible within the observed time window
- **VPN awareness** -- Accounts for known corporate VPN exit nodes to reduce false positives
- **Confidence scoring** -- Each impossible travel detection includes a confidence score based on geolocation accuracy and historical patterns

### Privilege Escalation Detection

Real-time monitoring of permission changes across all connected platforms:

- **Role modifications** -- New role assignments or group membership changes that increase privilege
- **Policy changes** -- Direct or inline policy modifications that expand permissions
- **Self-service escalation** -- An identity modifying its own permissions (a high-confidence threat indicator)
- **Cross-platform escalation** -- Privilege changes that span multiple providers (e.g., gaining elevated AWS access shortly after an Azure AD group change)

### Additional Detection Patterns

- **Dormant account activation** -- A previously inactive identity suddenly becoming active
- **Unusual API activity** -- API calls outside the identity's normal operational profile
- **Data exfiltration indicators** -- Bulk data access, unusual download volumes, or access to sensitive resources outside normal scope
- **Token abuse** -- Reuse of session tokens from unexpected locations or after revocation

## Anomaly Scoring

Each detected anomaly receives a severity score based on:

| Factor | Weight |
|--------|--------|
| **Deviation magnitude** | How far the behavior deviates from the baseline |
| **Identity risk level** | Higher-risk identities (admins, privileged accounts) amplify severity |
| **Target sensitivity** | Access to critical systems or sensitive data increases the score |
| **Corroborating signals** | Multiple anomalies from the same identity within a short window compound severity |

Severity levels:

- **Critical** (90--100) -- Strong indicators of compromise requiring immediate investigation
- **High** (70--89) -- Significant deviation warranting prompt review
- **Medium** (40--69) -- Notable behavior that should be monitored
- **Low** (0--39) -- Minor deviations logged for trend analysis

## Response and Investigation

When an anomaly is detected, security teams can:

- **View the full context** -- Timeline of the identity's recent activity, permission changes, and authentication events
- **Correlate with other signals** -- Cross-reference with Armor findings, Discover vulnerabilities, and Neural Mesh intelligence
- **Take immediate action** -- Disable the account, revoke sessions, or enforce step-up authentication directly from the anomaly detail view
- **Create an investigation** -- Escalate to Neural Mesh for AI-assisted investigation and root cause analysis

```
GET /api/v1/anomalies?severity_gte=high&type=impossible_travel&status=open
```
