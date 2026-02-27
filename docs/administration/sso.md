---
sidebar_position: 3
title: SSO and SAML Configuration
---

# SSO and SAML Configuration

ZPOA Shield supports Single Sign-On (SSO) via SAML 2.0, enabling your organization to centralize authentication through your existing identity provider (IdP). SSO eliminates the need for separate ZPOA Shield credentials, enforces your organization's password and MFA policies, and simplifies user provisioning.

## Supported Identity Providers

ZPOA Shield has been tested and verified with the following identity providers:

- **Okta**
- **Microsoft Entra ID (Azure AD)**
- **Google Workspace**
- **Ping Identity (PingFederate / PingOne)**
- **OneLogin**
- **JumpCloud**
- **Auth0**
- **ADFS (Active Directory Federation Services)**

Any SAML 2.0 compliant identity provider can be configured using the generic setup instructions below.

## Prerequisites

Before configuring SSO, ensure you have:

- Admin access to your ZPOA Shield tenant.
- Admin access to your identity provider.
- The ZPOA Shield SAML metadata, available at: `https://app.zpoashield.com/saml/metadata`

## SAML 2.0 Configuration

### Step 1: Gather ZPOA Shield Service Provider (SP) Details

| Field | Value |
|---|---|
| Entity ID (Audience URI) | `https://app.zpoashield.com/saml/metadata` |
| ACS URL (Reply URL) | `https://app.zpoashield.com/saml/acs` |
| SLO URL (Logout URL) | `https://app.zpoashield.com/saml/slo` |
| NameID Format | `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` |

### Step 2: Configure Your Identity Provider

Create a new SAML application in your IdP and enter the SP details from Step 1. Configure the following attribute mappings:

| SAML Attribute | Description | Required |
|---|---|---|
| `email` | User's email address (used as the unique identifier) | Yes |
| `firstName` | User's first name | Yes |
| `lastName` | User's last name | Yes |
| `groups` | Group memberships (for group-based role mapping) | Recommended |
| `department` | User's department | Optional |

### Step 3: Enter IdP Details in ZPOA Shield

1. Navigate to **Settings > Authentication > SSO/SAML**.
2. Toggle **Enable SAML SSO** to on.
3. Enter the following details from your IdP:

```yaml
idp_entity_id: "https://idp.example.com/saml/metadata"
idp_sso_url: "https://idp.example.com/saml/sso"
idp_slo_url: "https://idp.example.com/saml/slo"
idp_certificate: |
  -----BEGIN CERTIFICATE-----
  MIIDpDCCAoygAwIBAgIGAX...
  -----END CERTIFICATE-----
```

4. Click **Test SAML Configuration** to validate the setup. This opens a new browser window and attempts a full SAML authentication flow.
5. Once the test succeeds, click **Save**.

### Provider-Specific Guides

#### Okta

1. In the Okta admin console, go to **Applications > Create App Integration > SAML 2.0**.
2. Set the Single Sign-On URL to `https://app.zpoashield.com/saml/acs`.
3. Set the Audience URI to `https://app.zpoashield.com/saml/metadata`.
4. Under Attribute Statements, map `email`, `firstName`, and `lastName`.
5. Under Group Attribute Statements, add `groups` filtered by regex matching your desired groups.
6. Copy the IdP metadata URL from the Sign On tab and paste it into ZPOA Shield.

#### Microsoft Entra ID

1. In the Azure Portal, go to **Entra ID > Enterprise Applications > New Application > Create your own application**.
2. Select **Integrate any other application you don't find in the gallery (Non-gallery)**.
3. Under **Single sign-on > SAML**, configure:
   - Identifier (Entity ID): `https://app.zpoashield.com/saml/metadata`
   - Reply URL: `https://app.zpoashield.com/saml/acs`
4. Download the **Federation Metadata XML** and upload it in ZPOA Shield, or manually enter the IdP details.
5. Assign users and groups to the enterprise application.

## Just-in-Time (JIT) Provisioning

When JIT provisioning is enabled, ZPOA Shield automatically creates user accounts the first time a user authenticates via SSO. This eliminates the need to manually invite users.

To enable JIT provisioning:

1. Navigate to **Settings > Authentication > SSO/SAML**.
2. Toggle **Just-in-Time Provisioning** to on.
3. Select the **default role** assigned to JIT-provisioned users (typically Viewer or Analyst).
4. Optionally, configure group-based role mapping to override the default role.

## Group-to-Role Mapping

Map IdP group memberships to ZPOA Shield roles for automated role assignment:

```json
{
  "group_mappings": [
    {
      "idp_group": "SOC-Admins",
      "zpoa_role": "Admin"
    },
    {
      "idp_group": "SOC-Analysts",
      "zpoa_role": "Analyst"
    },
    {
      "idp_group": "Security-Viewers",
      "zpoa_role": "Viewer"
    },
    {
      "idp_group": "Threat-Hunters",
      "zpoa_role": "Threat Hunter"
    }
  ]
}
```

When a user's group membership changes in the IdP, their ZPOA Shield role is updated at the next SSO login.

## Enforcing SSO

Once SSO is configured and tested, admins can enforce SSO as the only authentication method:

1. Navigate to **Settings > Authentication > SSO/SAML**.
2. Toggle **Enforce SSO** to on.
3. Local password authentication is disabled for all non-admin users.

**Note:** At least one admin account retains local password access as a break-glass mechanism in case the IdP is unavailable.

## Best Practices

- **Test SSO thoroughly** with multiple user accounts before enforcing it organization-wide.
- **Configure group mappings** to automate role assignment and reduce manual administration.
- **Enable JIT provisioning** to streamline onboarding for new team members.
- **Monitor SSO authentication events** in the audit log for anomalous login patterns.
- **Keep the IdP certificate up to date** -- set a calendar reminder for certificate expiration and rotate before it expires.
