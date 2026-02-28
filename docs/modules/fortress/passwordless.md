---
sidebar_position: 18
title: "Passwordless Governance"
---

# Passwordless Governance

Fortress Passwordless Governance provides visibility and policy enforcement over the transition from passwords to passwordless authentication. Track passkey and FIDO2 credential adoption, enforce passwordless policies, and identify users still relying on passwords.

## How It Works

### Credential Inventory

Maintain a complete inventory of passwordless credentials:

- **Passkeys** -- Platform-bound and cross-platform passkeys (FIDO2 discoverable credentials)
- **Security keys** -- Hardware FIDO2 keys (YubiKey, Titan, etc.)
- **Windows Hello** -- Windows Hello for Business credentials
- **Touch ID / Face ID** -- Biometric-bound platform credentials
- **Certificate-based** -- Smart card and certificate-based authentication

Each credential record includes:
- **Provider** -- Which identity provider registered the credential
- **Device** -- The device or hardware key bound to the credential
- **Registration date** -- When the credential was created
- **Last used** -- When the credential was last used for authentication
- **Backup eligible** -- Whether the credential supports multi-device sync

### Enforcement Policies

Define policies that govern the passwordless transition:

- **Department-level enforcement** -- Require passwordless by department with staggered rollout
- **Role-level enforcement** -- Admins and privileged users required first
- **Grace periods** -- Allow configurable transition periods before enforcement
- **Exceptions** -- Temporary exceptions for users with accessibility needs or legacy devices
- **Enforcement modes** -- Monitor (log only), warn (notify users), enforce (block password auth)

### Adoption Tracking

Monitor passwordless adoption across the organization:

**By method:**
- Passkey adoption percentage
- Hardware key adoption percentage
- Biometric adoption percentage
- Password-only users count

**By department:**
- Per-department adoption rates
- Department comparison rankings
- Lagging departments identified

**By timeline:**
- Weekly adoption trend
- Projected full-adoption date based on current velocity
- Registration rate vs. target rate

### Grace Periods

Manage the transition timeline:

- **Default grace period** -- 90 days from policy activation (configurable)
- **Department-specific** -- Override grace periods per department
- **Individual exceptions** -- Per-user grace period extensions with justification
- **Expiry notifications** -- Automated reminders at 30, 14, 7, and 1 day before grace expires
- **Auto-enforcement** -- After grace period, password authentication is blocked

### Password-Only User Detection

Identify users who have not registered any passwordless credential:

- **Password-only list** -- All users relying solely on passwords
- **Nudge campaigns** -- Automated email campaigns encouraging registration
- **Risk escalation** -- Password-only users receive higher risk scores
- **Manager notifications** -- Notify managers of team members who have not adopted passwordless