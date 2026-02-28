---
sidebar_position: 16
title: "Vendor Identity Management"
---

# Vendor Identity Management

Fortress Vendor Identity Management provides complete lifecycle governance for third-party vendor identities. From onboarding through offboarding, every vendor identity is tied to a contract, assigned a sponsor, and subject to periodic access reviews -- ensuring third-party access is always justified and time-bounded.

## How It Works

### Vendor Organization Registration

Register vendor organizations with governance metadata:

- **Organization profile** -- Name, industry, primary contact, risk tier
- **Contract binding** -- Link vendor access to specific contracts with start and end dates
- **Risk assessment** -- Assign risk tiers (critical, high, medium, low) based on data access and sensitivity
- **Maximum identities** -- Set limits on how many vendor users can be provisioned
- **Auto-disable on contract end** -- Vendor identities are automatically disabled when the contract expires

### Sponsor Approval

Every vendor identity requires a human sponsor:

- **Sponsor assignment** -- An internal employee who is responsible for the vendor's access
- **Approval workflow** -- Sponsors must approve each vendor identity and its permissions
- **Sponsor accountability** -- If a sponsor leaves, their vendor identities are flagged for reassignment
- **Dual accountability** -- Both the vendor organization admin and the internal sponsor must agree

### Vendor Identity Lifecycle

- **Onboarding** -- Vendor identities are created with role description, access scope, and time limits
- **Active** -- Vendor has access per approved scope
- **Suspended** -- Temporarily disabled (e.g., project pause or security concern)
- **Offboarded** -- Permanently removed when contract ends or vendor is terminated

### Periodic Access Reviews

Automated review campaigns for vendor access:

- **Quarterly reviews** -- Default review cadence for all vendor identities
- **Risk-based frequency** -- Critical-risk vendors reviewed monthly, low-risk annually
- **Review types** -- Full access review, scope review, or continuation review
- **Reviewer assignment** -- Reviews are assigned to the sponsor and the security team
- **Auto-disable on non-response** -- If reviews are not completed by deadline, access is suspended

### Auto-Disable on Contract End

When a vendor contract expires:

1. All vendor identities receive a 7-day warning notification
2. On contract end date, all identities are automatically disabled
3. Active sessions are terminated
4. A final access report is generated for audit
5. Identities remain in disabled state for 90 days before permanent deletion