---
sidebar_position: 15
title: "Entitlement Intelligence"
---

# Entitlement Intelligence

Fortress Entitlement Intelligence provides deep permission mapping across all connected applications. It tracks granular entitlements, monitors usage patterns, detects permission creep, and identifies unused access -- enabling organizations to enforce true least-privilege.

## How It Works

### Deep Permission Mapping

Entitlement Intelligence maps permissions at the most granular level available:

- **Application-level** -- Which apps an identity can access
- **Resource-level** -- Specific resources within each app (databases, repos, projects)
- **Action-level** -- What actions are permitted (read, write, admin, delete)
- **Scope-level** -- Permission boundaries (specific teams, projects, or organizational units)

### Entitlement Grants with Usage Tracking

Every entitlement grant is tracked with usage data:

- **Grant date** -- When the entitlement was assigned
- **Grant source** -- How it was granted (birthright, request, manual, migration)
- **Last used** -- When the entitlement was last exercised
- **Usage frequency** -- How often the entitlement is used (daily, weekly, monthly, never)
- **Usage trend** -- Whether usage is increasing, stable, or declining

### Unused Entitlement Detection

Automatically identify access that is no longer needed:

- **Never used** -- Entitlements granted but never exercised
- **Dormant** -- Entitlements not used in 30, 60, or 90 days (configurable)
- **Declining usage** -- Entitlements with steadily decreasing usage
- **Waste percentage** -- The portion of granted entitlements that are unused per identity

Detection thresholds are configurable per application, role, and risk level.

### Permission Creep Alerts

Detect gradual accumulation of unnecessary access:

- **Role accumulation** -- Identity collecting roles across multiple transfers without revocation
- **Orphaned grants** -- Entitlements from deprovisioned applications or defunct projects
- **Scope expansion** -- Permissions that have broadened beyond the original intent
- **Cross-application creep** -- Gaining similar entitlements across multiple apps without cleanup

Each alert includes:
- Severity rating
- Affected entitlements
- Recommended remediations
- One-click remediation action

### Identity Comparison

Compare entitlements between two identities to identify discrepancies:

- **Shared entitlements** -- Permissions both identities have
- **Unique to A** -- Permissions only the first identity has
- **Unique to B** -- Permissions only the second identity has
- **Suggested alignment** -- Recommended changes to align access (useful for role transfers)

### Waste Percentage

Calculate access waste at identity, department, and organization levels:

- **Identity waste** -- Percentage of unused entitlements per person
- **Department waste** -- Average waste across a department
- **Application waste** -- Which applications have the most unused licenses and permissions
- **Cost impact** -- Estimated dollar savings from revoking unused access

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/fortress/entitlements` | List entitlements with filtering |
| GET | `/fortress/entitlements/:id` | Get entitlement details |
| GET | `/fortress/entitlements/:id/grants` | List grants for an entitlement |
| GET | `/fortress/entitlements/identity/:id` | Entitlements for an identity |
| POST | `/fortress/entitlements/grants` | Create entitlement grant |
| DELETE | `/fortress/entitlements/grants/:id` | Revoke entitlement grant |
| GET | `/fortress/entitlements/unused` | List unused entitlements |
| GET | `/fortress/entitlements/creep-alerts` | List permission creep alerts |
| POST | `/fortress/entitlements/creep-alerts/:id/resolve` | Resolve creep alert |
| GET | `/fortress/entitlements/compare` | Compare two identities |
| GET | `/fortress/entitlements/dashboard` | Dashboard statistics |

All endpoints are prefixed with `/api/v1` and require a valid Bearer token.
