---
sidebar_position: 5
title: "SaaS Management"
---

# SaaS Application Management

Fortress provides comprehensive SaaS application lifecycle management -- from discovery through license optimization. Track every SaaS subscription across your organization, manage licenses, detect shadow IT, and optimize software spend.

## SaaS App Catalog

The app catalog is the central registry of all SaaS applications in your organization:

- **Discovered** -- Applications detected automatically through SSO logs, network traffic, expense reports, or browser extensions
- **Sanctioned** -- Approved applications that have been reviewed and approved for organizational use
- **Under Review** -- Applications pending security and compliance evaluation
- **Blocked** -- Applications that are prohibited due to security, compliance, or policy violations

### Adding Applications

Applications can be added to the catalog in two ways:

1. **Automatic Discovery** -- Connect identity providers (Okta, Azure AD, Google Workspace) and Fortress automatically discovers SaaS applications from SSO login events, OAuth grants, and SAML assertions
2. **Manual Registration** -- Register applications directly through the SaaS Apps page or API

### App Properties

Each application tracks:

| Property | Description |
|----------|-------------|
| Vendor | The software vendor (e.g., Slack Technologies) |
| Category | Application category (productivity, developer, security, AI/ML, etc.) |
| Risk Level | Security risk assessment (low, medium, high, critical) |
| Data Sensitivity | What type of data the app processes (public, internal, confidential, restricted) |
| Compliance Flags | Relevant compliance frameworks (SOC 2, HIPAA, GDPR, etc.) |
| Discovery Source | How the app was discovered (sso, network, expense, manual) |

## License Management

Track and manage per-user license assignments for every SaaS application:

### License Assignment

Assign licenses to identities with tier and cost tracking:

```
POST /api/v1/fortress/saas/licenses
{
  "app_id": "uuid",
  "identity_id": "uuid",
  "license_tier": "enterprise",
  "cost_per_unit": 25.00
}
```

### License Tiers

Fortress supports tiered licensing models common in SaaS:

- **Free** -- No-cost tier with limited features
- **Standard** -- Base paid tier
- **Professional** -- Mid-tier with enhanced features
- **Enterprise** -- Full-featured tier with premium support

### Unused License Detection

Fortress automatically identifies unused licenses based on login activity:

```
GET /api/v1/fortress/saas/licenses/unused?days=30
```

Returns licenses where the assigned identity has not accessed the application within the specified number of days. Use this to right-size your SaaS spend.

## Shadow IT Detection

Shadow IT refers to applications used within the organization without IT or security team approval. Fortress detects shadow IT through:

1. **SSO/IdP Logs** -- Discover OAuth grants and SAML assertions to unknown applications
2. **Network Traffic** -- Identify connections to known SaaS domains
3. **Expense Reports** -- Match software line items against the approved catalog
4. **Browser Extensions** -- Detect browser-based SaaS usage via endpoint agents

Shadow IT applications appear in the dedicated **Shadow IT** tab with risk assessments. From there you can:

- **Sanction** the application (approve for use)
- **Block** the application (prohibit use)
- **Investigate** to understand which users and departments are using it

## Cost Management

Track and optimize SaaS spend across the organization:

- **Per-app monthly and annual cost** -- Track contract costs and per-license pricing
- **Contract dates** -- Monitor contract start, end, and renewal dates
- **Wasted spend** -- Identify unused licenses and calculate potential savings
- **Department allocation** -- Attribute costs to departments and cost centers

## SaaS App Requests

Enable a self-service workflow for employees to request access to SaaS applications:

1. Employee submits a request with justification
2. Request routes to the appropriate approver (manager, IT admin, security team)
3. Upon approval, a license is automatically provisioned
4. If rejected, the requester receives the reason

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/fortress/saas/apps` | List all SaaS applications |
| GET | `/fortress/saas/apps/:id` | Get application details |
| POST | `/fortress/saas/apps` | Register a new application |
| PUT | `/fortress/saas/apps/:id` | Update application |
| DELETE | `/fortress/saas/apps/:id` | Remove application |
| GET | `/fortress/saas/shadow-it` | List shadow IT applications |
| GET | `/fortress/saas/ai-tools` | List AI/ML tools |
| POST | `/fortress/saas/licenses` | Assign a license |
| DELETE | `/fortress/saas/licenses/:id` | Revoke a license |
| GET | `/fortress/saas/apps/:id/licenses` | List licenses for an app |
| GET | `/fortress/saas/licenses/unused` | List unused licenses |
| GET | `/fortress/saas/dashboard` | Get SaaS dashboard stats |
| POST | `/fortress/saas/requests` | Create an app request |
| GET | `/fortress/saas/requests` | List app requests |

All endpoints are prefixed with `/api/v1` and require a valid Bearer token.
