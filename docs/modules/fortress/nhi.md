---
sidebar_position: 9
title: "NHI Governance"
---

# Non-Human Identity Governance

Fortress NHI Governance provides complete lifecycle management for non-human identities (NHIs) including service accounts, API keys, bots, certificates, and machine credentials. As organizations adopt more automation and microservices, the number of NHIs often exceeds human identities by 10x or more -- making governance critical.

## How It Works

### Identity Types

NHI Governance manages four primary categories:

- **Service accounts** -- Application-level accounts that authenticate to APIs, databases, and cloud services
- **API keys** -- Static or rotating tokens used for programmatic access
- **Bots and RPA** -- Robotic Process Automation identities and chatbot service accounts
- **Certificates** -- TLS/mTLS certificates, SSH keys, and code signing certificates

### Discovery

NHI Governance automatically discovers non-human identities across connected providers:

- **Cloud IAM scanning** -- AWS IAM roles, Azure service principals, GCP service accounts
- **IdP integration** -- Okta service accounts, Azure AD app registrations
- **Secret managers** -- HashiCorp Vault, AWS Secrets Manager, Azure Key Vault
- **CI/CD pipelines** -- GitHub Actions tokens, GitLab CI tokens, Jenkins credentials

### Rotation Policies

Define automated rotation schedules for each NHI type:

- **Policy rules** -- Set rotation intervals (30, 60, 90 days) by identity type, risk tier, or application
- **Automated rotation** -- Integrate with secret managers to rotate credentials without downtime
- **Grace periods** -- Allow configurable grace periods before enforcement
- **Escalation** -- Auto-escalate overdue rotations to identity owners and security teams

### Orphan Detection

Identify NHIs that have lost their human owner:

- **Owner tracking** -- Every NHI must have a responsible human owner
- **Departure monitoring** -- When an owner leaves the organization, their NHIs are flagged as orphaned
- **Auto-assignment** -- Suggest new owners based on team membership and application ownership
- **Disable policies** -- Optionally auto-disable orphaned NHIs after a configurable period

### Dashboard

The NHI dashboard provides a centralized view:

- **Total NHIs** -- Count by type (service accounts, API keys, bots, certificates)
- **Orphaned** -- NHIs without a human owner
- **Overdue rotations** -- Credentials past their rotation deadline
- **Expiring soon** -- Certificates and keys expiring within 30 days
- **Risk distribution** -- Breakdown by risk tier (critical, high, medium, low)