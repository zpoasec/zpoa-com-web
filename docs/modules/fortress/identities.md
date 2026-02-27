---
sidebar_position: 2
title: "Identity Inventory"
---

# Identity Inventory

The Fortress Identity Inventory provides a unified catalog of every human and machine identity across your organization. By aggregating data from all connected identity providers, cloud platforms, and SaaS applications, Fortress eliminates identity blind spots and enables comprehensive security governance.

## Identity Types

Fortress discovers and tracks the following identity categories:

### Human Identities

- **Employees** -- Full-time and part-time staff with corporate credentials
- **Contractors** -- External users with time-bound or project-scoped access
- **Administrators** -- Privileged users with elevated access to infrastructure and applications
- **Executives** -- High-value targets requiring enhanced monitoring

### Machine Identities

- **Service Accounts** -- Accounts used by applications and automated processes
- **API Keys** -- Programmatic access credentials for cloud services and third-party APIs
- **OAuth Tokens** -- Delegated access tokens for application-to-application communication
- **Certificates** -- TLS/SSL certificates and SSH keys used for authentication

## Connected Identity Providers

Fortress integrates with all major identity sources:

| Provider | Data Collected |
|----------|---------------|
| **AWS IAM** | Users, roles, policies, access keys, MFA status |
| **Azure AD / Entra ID** | Users, groups, app registrations, service principals, conditional access |
| **GCP IAM** | Users, service accounts, roles, workload identity |
| **Okta** | Users, groups, applications, authentication policies |
| **Google Workspace** | Users, groups, OAuth grants, admin roles |
| **Active Directory** | Users, groups, OUs, GPO assignments |

## Identity Risk Scoring

Each identity receives a dynamic risk score (0--100) based on multiple factors:

- **Permission scope** -- Breadth and sensitivity of granted permissions
- **Activity patterns** -- Regularity of usage and deviation from baselines
- **Authentication posture** -- MFA enrollment, password age, credential hygiene
- **Account status** -- Active, dormant, or disabled
- **Anomaly history** -- Past behavioral anomalies associated with the identity

The risk score recalculates continuously as new data is ingested.

## Dormant Account Detection

Fortress automatically identifies accounts that have not been used within a configurable inactivity window (default: 90 days). Dormant accounts represent unnecessary risk because they:

- Increase the attack surface without providing business value
- May retain permissions from a prior role or project
- Are frequently targeted in credential stuffing and account takeover attacks

Dormant account reports can be routed to managers for review or fed into automated deprovisioning workflows.

## Over-Privileged User Identification

Fortress compares granted permissions against actual usage to identify over-privileged identities:

- **Unused permissions** -- Permissions granted but never exercised within the analysis window
- **Excessive admin access** -- Users with administrative privileges who perform only routine operations
- **Cross-account over-privilege** -- Identities with broad access across multiple cloud accounts without justification

For each over-privileged identity, Fortress generates a recommended right-sized policy based on observed activity.

```
GET /api/v1/identities?risk_score_gte=80&status=active&over_privileged=true
```

This query returns all active identities with a risk score of 80 or higher that are flagged as over-privileged.
