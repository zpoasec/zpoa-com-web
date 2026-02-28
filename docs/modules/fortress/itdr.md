---
sidebar_position: 10
title: "ITDR"
---

# Identity Threat Detection and Response

Fortress ITDR detects, investigates, and responds to identity-based attacks in real-time. As identity becomes the new perimeter, ITDR provides the detection rules, behavioral analytics, and automated response capabilities needed to stop credential-based attacks before they succeed.

## How It Works

### Threat Types

ITDR detects 10 core threat categories:

1. **Credential stuffing** -- Automated login attempts using stolen credential lists
2. **MFA fatigue** -- Repeated MFA push notifications to exhaust the user into approving
3. **Session hijacking** -- Stolen session tokens replayed from a different device or location
4. **Privilege escalation** -- Unauthorized elevation of permissions or role assignments
5. **Lateral movement** -- Compromised identity accessing resources outside its normal scope
6. **Account takeover** -- Complete compromise of an identity through phishing or social engineering
7. **Token abuse** -- OAuth/SAML token manipulation, replay, or theft
8. **Impossible travel** -- Authentication from geographically distant locations within implausible timeframes
9. **Dormant account activation** -- Sudden activity from long-inactive accounts
10. **SIM swap** -- Phone number takeover for MFA bypass

### Detection Rules

Three detection engines work together:

- **Behavioral rules** -- Baseline normal identity behavior and alert on deviations (login times, access patterns, resource usage)
- **Signature rules** -- Pattern-matching rules for known attack techniques (e.g., specific credential stuffing tool fingerprints)
- **ML-based rules** -- Machine learning models trained on organizational data to detect novel attack patterns

Each rule has:
- **Severity** -- Critical, high, medium, low
- **MITRE ATT&CK mapping** -- Links to relevant tactics and techniques
- **Confidence score** -- How likely the detection represents a true positive
- **Auto-response policy** -- What action to take when the rule fires

### Auto-Response Actions

When a threat is detected, ITDR can automatically:

- **Disable account** -- Immediately lock out the compromised identity
- **Force MFA** -- Require step-up authentication before the next action
- **Revoke sessions** -- Invalidate all active sessions for the identity
- **Block IP** -- Add the source IP to the deny list
- **Notify SOC** -- Send an alert to the security operations team
- **Quarantine** -- Place the identity in a restricted access state

All automated responses include a **rollback** capability -- security teams can undo any automated action with full audit trail.

### MITRE ATT&CK Mapping

Every threat detection maps to the MITRE ATT&CK framework:

- **Initial Access** -- T1078 (Valid Accounts), T1566 (Phishing)
- **Persistence** -- T1098 (Account Manipulation), T1136 (Create Account)
- **Privilege Escalation** -- T1078.004 (Cloud Accounts), T1484 (Domain Policy Modification)
- **Credential Access** -- T1110 (Brute Force), T1557 (Adversary-in-the-Middle)
- **Lateral Movement** -- T1550 (Use Alternate Authentication Material)

### Threat Timeline

Each threat includes a complete timeline showing:

- When the threat was first detected
- Which detection rules fired and in what order
- What automated responses were taken
- When human analysts reviewed and made decisions
- Resolution status and time-to-contain