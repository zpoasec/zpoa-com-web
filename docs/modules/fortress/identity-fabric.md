---
sidebar_position: 20
title: "Identity Fabric"
---

# Identity Fabric

Fortress Identity Fabric creates a unified policy mesh across all connected identity providers. Instead of managing separate policies for Okta, Azure AD, AWS IAM, and other providers, Identity Fabric enforces consistent rules across all systems with centralized event correlation and identity mapping.

## How It Works

### Cross-Provider Policy Mesh

Define policies once and enforce everywhere:

- **Unified policy model** -- Single policy definition that translates to each provider's native format
- **Provider adapters** -- Pre-built adapters for Okta, Azure AD (Entra ID), AWS IAM, Google Workspace, Ping Identity, and more
- **Enforcement modes** -- Enforce (block non-compliant actions), audit (log but allow), and monitor (observe only)
- **Conflict resolution** -- When providers have conflicting states, policies define which provider is authoritative

### Supported Providers

Identity Fabric connects to all major identity providers:

| Provider | Capabilities |
|----------|-------------|
| Okta | User lifecycle, group management, MFA policies, application assignments |
| Azure AD (Entra ID) | Conditional access, group membership, role assignments, security defaults |
| AWS IAM | IAM users, roles, policies, service-linked roles, permission boundaries |
| Google Workspace | User management, group membership, organizational units, 2FA |
| Ping Identity | Authentication policies, directory integration, federation |
| Active Directory | On-premises user and group management, GPO enforcement |

### Event Correlation

Correlate identity events across providers in real time:

- **Cross-provider timeline** -- Unified view of all actions for a canonical identity across all providers
- **Correlation keys** -- Link events using email, employee ID, or custom correlation attributes
- **Risk signal aggregation** -- Combine risk signals from multiple providers into a unified risk assessment
- **Anomaly detection** -- Identify inconsistencies across providers (e.g., disabled in Okta but active in AWS)

### Identity Mapping

Map identities across providers to a canonical identity:

- **Automatic matching** -- Match by email address, employee ID, or UPN
- **Fuzzy matching** -- Handle name variations, email aliases, and format differences
- **Confidence scoring** -- Each mapping includes a confidence score (0-100%)
- **Manual resolution** -- Admins can manually link or unlink identity mappings
- **Conflict detection** -- Flag when multiple provider accounts map to the same canonical identity with conflicting attributes

### Conflict Resolution

When providers disagree:

- **Authoritative source** -- Define which provider is the source of truth for each attribute
- **Merge strategies** -- Union (combine all), intersect (keep common), or priority-based
- **Resolution queue** -- Conflicts that cannot be auto-resolved are queued for admin review
- **Audit trail** -- Every resolution decision is logged with who resolved it and why

### Enforcement Modes

Three enforcement levels for gradual rollout:

- **Monitor** -- Observe cross-provider inconsistencies without taking action
- **Audit** -- Log violations and notify admins but allow the action to proceed
- **Enforce** -- Block non-compliant actions and require remediation before proceeding