---
sidebar_position: 1
title: "Fortress - Overview"
---

# Fortress: Identity Security

ZPOA Shield **Fortress** provides comprehensive identity security across your entire organization. As identities have become the primary attack vector in modern environments, Fortress delivers the visibility, governance, and threat detection capabilities needed to secure every user, service account, and API key.

## Key Capabilities

### Identity Inventory

Fortress aggregates identity data from all connected providers into a single, unified view:

- **Cloud IAM** -- AWS IAM, Azure AD (Entra ID), GCP IAM users, roles, and service accounts
- **Identity Providers** -- Okta, Azure AD, Google Workspace, Ping Identity, OneLogin
- **SaaS Applications** -- Salesforce, GitHub, Slack, and other connected applications
- **On-Premises** -- Active Directory, LDAP directories
- **Machine Identities** -- Service accounts, API keys, OAuth tokens, certificates

Every identity is enriched with usage data, permission analysis, and risk scoring to provide a complete security profile.

### Access Governance

Fortress continuously evaluates access patterns and permissions to enforce least-privilege principles:

- **Permission analysis** -- Map effective permissions across all resources and services
- **Entitlement reviews** -- Automated and manager-driven access certification campaigns
- **Separation of duties** -- Detect and alert on toxic permission combinations
- **Just-in-time access** -- Provide temporary elevated access with automatic revocation
- **Policy recommendations** -- AI-generated policy suggestions based on actual usage patterns

### Privilege Analysis

Understand who has access to what, and whether that access is necessary:

- **Effective permission calculation** across inherited roles, group memberships, and direct assignments
- **Unused permission identification** based on activity logs and API call history
- **Cross-cloud privilege mapping** showing which identities have access across multiple providers
- **Admin and root account monitoring** with continuous audit trail

### Anomaly Detection

Fortress applies behavioral analytics to detect identity-based threats in real-time:

- **Unusual login patterns** -- New locations, devices, or unusual hours
- **Impossible travel** -- Logins from geographically distant locations within implausible timeframes
- **Privilege escalation** -- Unauthorized changes to roles, group memberships, or policies
- **Credential abuse** -- Brute force attempts, credential stuffing, and token replay

## How It Works

1. **Connect** identity providers, cloud accounts, and SaaS applications through the Integrations page.
2. **Discover** -- Fortress inventories all identities and maps their permissions and activity.
3. **Analyze** -- Continuous analysis identifies over-privileged accounts, dormant identities, and policy gaps.
4. **Protect** -- Real-time anomaly detection alerts on suspicious identity behavior.

## Next Steps

- [Identity Inventory](./identities.md) -- Explore all discovered identities and their risk profiles
- [Access Policies](./policies.md) -- Manage least-privilege enforcement and access reviews
- [Behavioral Anomalies](./anomalies.md) -- Monitor and investigate identity-based threats
