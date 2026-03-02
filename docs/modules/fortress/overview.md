---
sidebar_position: 1
title: "Fortress - Overview"
---

# Fortress: Identity Security

Z Shield **Fortress** provides comprehensive identity security across your entire organization. As identities have become the primary attack vector in modern environments, Fortress delivers the visibility, governance, and threat detection capabilities needed to secure every user, service account, and API key.

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

### NHI Governance

Complete lifecycle management for non-human identities:

- **Identity types** -- Service accounts, API keys, bots, certificates, and machine credentials
- **Rotation policies** -- Automated rotation schedules with escalation for overdue credentials
- **Orphan detection** -- Identify NHIs that have lost their human owner
- **Owner assignment** -- Every NHI must have a responsible human owner

### Identity Threat Detection and Response (ITDR)

Detect and respond to identity-based attacks in real-time:

- **Threat detection** -- 10 threat types including credential stuffing, MFA fatigue, session hijacking, and privilege escalation
- **Detection engines** -- Behavioral, signature, and ML-based detection rules
- **Auto-response** -- Disable accounts, force MFA, revoke sessions automatically
- **MITRE ATT&CK mapping** -- Every detection maps to relevant tactics and techniques

### Just-in-Time Access

Eliminate standing privileges with temporary, on-demand elevated access:

- **Request workflow** -- Users request access when needed with business justification
- **AI-recommended durations** -- Optimal session length based on historical patterns
- **Auto-expiry** -- Access automatically revoked when the session expires
- **Extension limits** -- Maximum extensions per session with approval required

### Continuous Access Evaluation (CAE)

Real-time trust scoring with adaptive access controls:

- **Trust scores (0-100)** -- Continuously updated based on device, location, behavior, and MFA
- **Adaptive policies** -- Dynamically adjust access based on current risk level
- **Real-time evaluation** -- Re-evaluate on device change, location change, or anomalous behavior
- **Score trends** -- Track trust score history for compliance reporting

### Access Storefront

Self-service app catalog with AI-powered recommendations:

- **App catalog** -- Browse, search, and request access to applications and resources
- **AI recommendations** -- "People like you" engine suggests relevant access
- **Multi-step approval** -- Complex requests routed through sequential approval workflows
- **Provision time tracking** -- End-to-end metrics from request to access

### SOD Simulation

What-if analysis for access changes before implementation:

- **Propose changes** -- Simulate role assignments, permission grants, or transfers
- **Conflict detection** -- Identify toxic combinations, excessive privilege, and cross-app conflicts
- **Risk score delta** -- See before/after risk impact of proposed changes
- **Exception workflow** -- Request approved exceptions with justification and expiry

### Entitlement Intelligence

Deep permission mapping with usage tracking across all applications:

- **Granular entitlements** -- Map permissions at application, resource, and action levels
- **Usage tracking** -- Monitor when and how often each entitlement is used
- **Permission creep alerts** -- Detect gradual accumulation of unnecessary access
- **Identity comparison** -- Compare entitlements between two identities

### Vendor Identity Management

Third-party identity lifecycle tied to contracts and sponsors:

- **Vendor registration** -- Organizations with contract binding and risk tiers
- **Sponsor approval** -- Every vendor identity requires an internal sponsor
- **Periodic reviews** -- Automated review campaigns for vendor access
- **Auto-disable** -- Vendor identities disabled on contract expiry

### Access Analytics

Risk scoring, heatmaps, and trend analysis for identity access:

- **Per-identity and per-department risk scores** -- Composite scores based on privilege, usage, and behavior
- **Risk heatmaps** -- Visual risk distribution across the organization
- **Outlier detection** -- Identify identities deviating from peer group norms
- **MFA coverage and over-privileged tracking** -- Key metrics trending over time

### Passwordless Governance

Visibility and policy enforcement for the passwordless transition:

- **Credential inventory** -- Track passkeys, FIDO2 keys, biometrics, and certificates
- **Enforcement policies** -- Department-level and role-level passwordless requirements
- **Adoption tracking** -- Per-method and per-department adoption rates
- **Password-only detection** -- Identify users still relying solely on passwords

### Compliance-as-Code

Policy-as-code engine for identity compliance:

- **Policy languages** -- Define rules in Rego, CEL, or JSON Logic
- **Automated evaluation** -- Scheduled and on-demand policy runs against all identities
- **Drift detection** -- Detect when identity states drift from policy expectations
- **Auto-remediation** -- Automatically restore non-compliant identities to compliant state

### Identity Fabric

Unified cross-provider identity policy mesh:

- **Cross-provider policies** -- Define once, enforce across Okta, Azure AD, AWS IAM, and more
- **Event correlation** -- Unified view of identity actions across all providers
- **Identity mapping** -- Map provider accounts to canonical identities with confidence scoring
- **Conflict resolution** -- Automated and manual resolution of cross-provider inconsistencies

### AI Access Copilot

Natural language interface for identity access management:

- **Conversational queries** -- Ask "Who has admin access to production?" in plain English
- **Action execution** -- Grant, revoke, and review access through natural language commands
- **Query templates** -- Pre-built templates for common access queries
- **Action audit log** -- Every Copilot action is logged with full audit trail

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
- [NHI Governance](./nhi.md) -- Non-human identity lifecycle and rotation management
- [ITDR](./itdr.md) -- Identity threat detection and automated response
- [JIT Access](./jit-access.md) -- Just-in-time temporary elevated access
- [Continuous Access Evaluation](./cae.md) -- Real-time trust scoring and adaptive policies
- [Access Storefront](./storefront.md) -- Self-service app catalog with AI recommendations
- [SOD Simulation](./sod-simulation.md) -- What-if analysis for access changes
- [Entitlement Intelligence](./entitlements.md) -- Deep permission mapping and usage tracking
- [Vendor Identity Management](./vendors.md) -- Third-party identity lifecycle governance
- [Access Analytics](./analytics.md) -- Risk scoring, heatmaps, and trend analysis
- [Passwordless Governance](./passwordless.md) -- Passwordless transition tracking and enforcement
- [Compliance-as-Code](./compliance-code.md) -- Policy-as-code with drift detection
- [Identity Fabric](./identity-fabric.md) -- Cross-provider identity policy mesh
- [AI Access Copilot](./copilot.md) -- Natural language access management interface
