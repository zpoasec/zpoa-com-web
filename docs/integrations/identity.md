---
sidebar_position: 3
title: Identity Provider Integrations
---

# Identity Provider Integrations

Identity is the new perimeter. ZPOA Shield integrates with leading identity and access management (IAM) platforms to detect compromised accounts, monitor privilege escalation, and enforce zero-trust principles across your organization.

## Supported Identity Providers

### Okta

Ingest Okta System Log events including authentication attempts, MFA challenges, policy changes, and administrative actions.

- **Connection Method:** REST API (OAuth 2.0 or API Token)
- **Required Scope:** `okta.logs.read`, `okta.users.read`
- **Data Types:** Authentication events, user lifecycle events, policy changes

```yaml
connector:
  type: okta
  base_url: https://your-org.okta.com
  auth:
    method: api_token
    token: "${OKTA_API_TOKEN}"
  poll_interval: 60s
```

### Microsoft Entra ID (Azure AD)

Monitor sign-in logs, audit logs, risky user detections, and conditional access policy evaluations.

- **Connection Method:** Microsoft Graph API (OAuth 2.0 client credentials)
- **Required Permissions:** `AuditLog.Read.All`, `SignInLog.Read.All`, `IdentityRiskEvent.Read.All`
- **Data Types:** Sign-in events, directory audit, risk detections

### Cisco Duo

Collect authentication logs, administrator actions, and telephony events from Duo Security.

- **Connection Method:** Duo Admin API
- **Required:** Integration key, secret key, API hostname
- **Data Types:** Auth logs, admin logs, telephony logs

### CyberArk

Ingest privileged session recordings, vault audit logs, and credential checkout events.

- **Connection Method:** CyberArk REST API (CyberArk Authentication)
- **Required:** Application ID, safe permissions
- **Data Types:** Session audit, credential access, policy violations

### Ping Identity

Collect authentication events and policy decision logs from PingFederate and PingOne.

- **Connection Method:** REST API (OAuth 2.0)
- **Data Types:** SSO events, MFA events, token issuance

### Auth0

Ingest tenant logs covering login events, anomaly detection, and management API operations.

- **Connection Method:** Auth0 Management API (Machine-to-Machine application)
- **Required Scope:** `read:logs`, `read:users`
- **Data Types:** Authentication, authorization, anomaly events

### OneLogin

Monitor authentication events, user provisioning, and policy enforcement across your OneLogin directory.

- **Connection Method:** OneLogin API (OAuth 2.0 client credentials)
- **Data Types:** Event logs, user activity, app access

### 1Password

Ingest sign-in attempts, item usage events, and vault access from 1Password Business.

- **Connection Method:** 1Password Events API
- **Required:** Events API token with appropriate scopes
- **Data Types:** Sign-in attempts, item usage, audit events

### SailPoint IdentityNow

Collect identity governance events including access certifications, provisioning, and policy violations.

- **Connection Method:** SailPoint REST API (OAuth 2.0)
- **Data Types:** Certification events, provisioning, access requests

### JumpCloud

Monitor directory events, RADIUS authentication, and system agent activity.

- **Connection Method:** JumpCloud Directory Insights API
- **Required:** API key with read permissions
- **Data Types:** Directory events, RADIUS logs, system events

### RSA SecurID

Collect authentication and token events from RSA SecurID deployments.

- **Connection Method:** Syslog (CEF) or REST API
- **Data Types:** Authentication events, token operations, admin actions

### BeyondTrust

Ingest privileged remote access session logs and password safe audit trails.

- **Connection Method:** BeyondTrust REST API
- **Data Types:** Session recordings, credential checkout, policy events

### HashiCorp Vault

Monitor secrets engine access, authentication events, and policy changes in HashiCorp Vault.

- **Connection Method:** Vault Audit Device (syslog or file) or Vault API
- **Data Types:** Auth events, secret access, policy modifications

## Authentication Methods

ZPOA Shield supports multiple authentication methods depending on the identity provider:

| Method | Description | Providers |
|---|---|---|
| **API Token** | Static bearer token | Okta, JumpCloud, 1Password |
| **OAuth 2.0 Client Credentials** | Service-to-service tokens | Entra ID, Auth0, OneLogin, SailPoint |
| **SCIM** | System for Cross-domain Identity Management | Okta, Entra ID, OneLogin |
| **Syslog / CEF** | Log forwarding | RSA SecurID, CyberArk |

## Detection Use Cases

Identity provider integrations power the following detection capabilities in ZPOA Shield:

- **Impossible travel** -- Detect logins from geographically distant locations within impossible timeframes.
- **Credential stuffing** -- Identify brute-force and password spray attacks across federated providers.
- **MFA bypass** -- Alert on successful logins that skip expected MFA challenges.
- **Privilege escalation** -- Monitor role assignments and administrative permission grants.
- **Dormant account abuse** -- Flag authentication from accounts that have been inactive for extended periods.
