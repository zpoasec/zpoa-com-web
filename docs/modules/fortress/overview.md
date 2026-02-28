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

### SaaS Application Management

Fortress provides comprehensive SaaS application lifecycle management:

- **App catalog** -- Central registry of all SaaS applications (discovered, sanctioned, under review, blocked)
- **License management** -- Track per-user license assignments, costs, and utilization
- **Shadow IT detection** -- Automatically discover unsanctioned applications through SSO, network, and expense analysis
- **Cost optimization** -- Identify unused licenses, track monthly/annual spend, and reduce waste
- **Self-service requests** -- Enable employees to request SaaS access with multi-level approval workflows

### AI Tool Governance

Dedicated governance for AI/ML tools including ChatGPT, Claude, GitHub Copilot, and 40+ others:

- **Shadow AI detection** -- Discover unsanctioned AI tool usage across the organization
- **Risk assessment** -- Evaluate data sensitivity, training data policies, and compliance impact
- **Usage monitoring** -- Track who is using which AI tools and how frequently
- **Sanction/block workflows** -- Approve or prohibit AI tools with enforcement through IdP integration

### AI Access Intelligence

AI-powered access mapping that automatically determines what access a person should have:

- **Birthright rules** -- Multi-attribute condition engine (department, title, location, cost center, etc.)
- **Peer group analysis** -- Cluster identities by access patterns and recommend access based on peers
- **Role mining** -- Discover implicit roles from existing access patterns with confidence scoring
- **Fallback chains** -- Graceful degradation for organizations without clean HR data

### Instant Onboarding

Minimize time from hire to full access with automated Day-1 provisioning:

- **HR integration** -- Receive new hire events from 130+ HR/HCM systems
- **Auto-provisioning** -- SCIM 2.0 and API-based account creation across 690+ applications
- **AI recommendations** -- When birthright rules do not match, AI recommends access based on peer groups
- **Day-30 micro-certification** -- Automatic review and cleanup of unused access

## 690+ Connectors

Fortress connects to virtually every enterprise application through 690+ pre-built connectors:

- **SaaS** (160+) -- Office 365, Google Workspace, Slack, Zoom, Jira, and more
- **AI/ML** (40+) -- Claude, ChatGPT, GitHub Copilot, Gemini, Midjourney, and more
- **HR/HCM** (130+) -- Workday, BambooHR, ADP, Gusto, Rippling, regional HRIS
- **ERP** (36) -- SAP, Oracle, NetSuite, Dynamics 365
- **Identity** (30+) -- Active Directory, LDAP, Okta, Azure AD, JumpCloud
- **PAM** (12) -- CyberArk, Delinea, BeyondTrust, HashiCorp Vault
- **And more** -- CRM, Financial, Healthcare, Legal, Marketing, LMS, ITSM, Mainframe

## Next Steps

- [Identity Inventory](./identities.md) -- Explore all discovered identities and their risk profiles
- [Access Policies](./policies.md) -- Manage least-privilege enforcement and access reviews
- [Behavioral Anomalies](./anomalies.md) -- Monitor and investigate identity-based threats
- [SaaS Management](./saas-management.md) -- Manage SaaS subscriptions and licenses
- [AI Governance](./ai-governance.md) -- Govern AI tool usage across the organization
- [Access Intelligence](./access-intelligence.md) -- AI-powered access recommendations and role mining
- [Instant Onboarding](./onboarding.md) -- Day-1 provisioning and onboarding automation
