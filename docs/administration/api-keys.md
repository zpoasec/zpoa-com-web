---
sidebar_position: 2
title: API Key Management
---

# API Key Management

Z Shield uses API keys to authenticate programmatic access to the REST API. Administrators can create, rotate, and revoke API keys with fine-grained scope controls to ensure that each integration or automation has only the permissions it needs.

## Creating API Keys

1. Navigate to **Settings > API Keys**.
2. Click **Create API Key**.
3. Provide a descriptive **name** for the key (e.g., "SOAR Integration", "CI/CD Pipeline", "Reporting Script").
4. Select the **scopes** (permissions) the key should have.
5. Set an **expiration** date (optional but recommended).
6. Click **Generate**.

The API key is displayed only once. Copy it immediately and store it securely in a secrets manager (e.g., HashiCorp Vault, AWS Secrets Manager, Azure Key Vault).

```
API Key: zpoa_live_k8f2Gx9mPqR4tY7wZ1bN3cD5eF8hJ0kL...
```

**Important:** Z Shield does not store the full API key after generation. If you lose it, you must revoke the existing key and create a new one.

## Scopes and Permissions

API keys support granular scopes that limit what the key can access. Assign only the scopes required for the intended use case.

| Scope | Description | Example Use Case |
|---|---|---|
| `alerts:read` | Read alerts and alert details | Dashboard widgets, reporting |
| `alerts:write` | Update alert status, add notes | SOAR playbook integration |
| `assets:read` | Read asset inventory | CMDB sync |
| `assets:write` | Create, update, delete assets | Asset import automation |
| `connectors:read` | View connector status and config | Health monitoring |
| `connectors:write` | Create, update, activate connectors | Infrastructure-as-code |
| `rules:read` | Read detection rules | Rule backup and audit |
| `rules:write` | Create, update, enable/disable rules | Rule deployment pipeline |
| `compliance:read` | Read compliance reports and posture | Executive reporting |
| `search:read` | Execute log searches | Threat hunting scripts |
| `users:read` | Read user and team information | Access review automation |
| `users:write` | Manage users and roles | Provisioning automation |

Multiple scopes can be combined on a single key:

```json
{
  "name": "SOAR Integration Key",
  "scopes": ["alerts:read", "alerts:write", "assets:read", "search:read"],
  "expires_at": "2026-01-15T00:00:00Z"
}
```

## Rate Limits

API keys are subject to rate limits to ensure platform stability. Limits vary by plan tier:

| Plan | Requests per Minute | Requests per Day | Burst Limit |
|---|---|---|---|
| Starter | 60 | 10,000 | 20 |
| Professional | 300 | 100,000 | 50 |
| Enterprise | 1,000 | 1,000,000 | 200 |

Rate limit information is included in API response headers:

```
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 287
X-RateLimit-Reset: 1718460120
```

When the rate limit is exceeded, the API returns HTTP `429 Too Many Requests` with a `Retry-After` header indicating when the next request can be made.

## Key Rotation

Regular key rotation reduces the risk of compromised credentials. Z Shield supports zero-downtime key rotation:

1. Navigate to **Settings > API Keys** and find the key to rotate.
2. Click **Rotate Key**.
3. A new key is generated and both the old and new keys are valid during a **grace period** (configurable, default 24 hours).
4. Update your integrations and scripts with the new key.
5. After the grace period expires, the old key is automatically revoked.

Alternatively, use the API to rotate keys programmatically:

```bash
curl -X POST https://api.zpoashield.com/api/v1/api-keys/{key_id}/rotate \
  -H "Authorization: Bearer <ADMIN_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"grace_period_hours": 48}'
```

## Revoking API Keys

To immediately revoke an API key:

1. Navigate to **Settings > API Keys**.
2. Find the key and click **Revoke**.
3. Confirm the revocation.

Revoked keys are immediately invalid. Any request using a revoked key receives HTTP `401 Unauthorized`.

You can also revoke keys via the API:

```bash
curl -X DELETE https://api.zpoashield.com/api/v1/api-keys/{key_id} \
  -H "Authorization: Bearer <ADMIN_API_KEY>"
```

## Key Expiration

Setting an expiration date on API keys is strongly recommended. Expired keys automatically stop working at the configured expiration timestamp. Z Shield sends email notifications to the key creator at 30, 14, and 7 days before expiration.

## Audit Trail

All API key operations are recorded in the audit log:

- Key creation (including assigned scopes)
- Key rotation (old key ID, new key ID, grace period)
- Key revocation
- Key expiration
- Authentication attempts (successful and failed)

## Best Practices

- **Use separate keys** for each integration or automation script to isolate blast radius.
- **Set expiration dates** on all keys and track them in your secrets management system.
- **Apply least-privilege scopes** -- never issue a key with more permissions than the integration requires.
- **Rotate keys every 90 days** as part of your credential hygiene policy.
- **Monitor failed authentication attempts** in the audit log to detect potential key compromise.
- **Never embed API keys** in source code, commit histories, or client-side applications.
