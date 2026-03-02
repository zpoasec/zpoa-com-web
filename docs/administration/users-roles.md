---
sidebar_position: 1
title: User Management and RBAC
---

# User Management and Role-Based Access Control

Z Shield uses role-based access control (RBAC) to govern what each user can see and do within the platform. Administrators can invite users, assign roles, organize teams, and audit all access activity from a centralized management console.

## Built-in Roles

Z Shield ships with four built-in roles. Each role inherits the permissions of the roles below it.

### Admin

Full administrative access to the entire Z Shield tenant. Admins can manage users, configure integrations, modify detection rules, update billing, and access all data.

**Permissions include:**
- All Analyst permissions
- User and team management (invite, suspend, delete)
- Integration and connector configuration
- Detection rule creation and modification
- System settings and billing management
- API key management
- SSO/SAML configuration
- Audit log access

### Analyst

Operational access for security analysts performing day-to-day investigation and response. Analysts can view all security data, manage alerts, and execute response actions.

**Permissions include:**
- All Viewer permissions
- Alert triage (acknowledge, assign, escalate, close)
- Incident investigation and case management
- Response action execution (isolate host, block IP, disable user)
- Detection rule tuning (suppress, adjust threshold)
- Report generation and export
- Saved search and dashboard creation

### Viewer

Read-only access for stakeholders who need visibility into the security posture without operational capabilities.

**Permissions include:**
- View dashboards and reports
- View alerts and incidents (read-only)
- View asset inventory
- View compliance posture
- Export reports (if permitted by admin policy)

### Custom Roles

Admins can create custom roles with granular permission sets. Navigate to **Settings > Users & Roles > Custom Roles** and define permissions across the following categories:

- **Alerts** -- View, acknowledge, assign, escalate, close, suppress
- **Incidents** -- View, create, update, close
- **Assets** -- View, edit, delete
- **Integrations** -- View, configure, test, activate, deactivate
- **Detection Rules** -- View, create, edit, enable, disable, delete
- **Reports** -- View, create, export, schedule
- **Administration** -- Users, API keys, SSO, billing

```json
{
  "role_name": "Junior Analyst",
  "description": "Limited analyst role for L1 SOC analysts",
  "permissions": {
    "alerts": ["view", "acknowledge", "assign"],
    "incidents": ["view"],
    "assets": ["view"],
    "integrations": ["view"],
    "detection_rules": ["view"],
    "reports": ["view", "export"],
    "administration": []
  }
}
```

## User Management

### Inviting Users

1. Navigate to **Settings > Users & Roles > Users**.
2. Click **Invite User**.
3. Enter the user's email address and select a role.
4. Optionally assign the user to one or more teams.
5. Click **Send Invitation**.

The invited user receives an email with a link to set up their account. Invitations expire after 7 days. Admins can resend or revoke pending invitations.

### Managing Existing Users

From the user management page, admins can:

- **Change role** -- Update a user's assigned role at any time.
- **Suspend** -- Temporarily disable a user's access without deleting their account.
- **Reactivate** -- Restore access for a suspended user.
- **Delete** -- Permanently remove a user and revoke all their sessions and API keys.
- **Force logout** -- Terminate all active sessions for a specific user.

### Team Management

Teams allow you to organize users into functional groups for alert routing and access scoping:

- Create teams under **Settings > Users & Roles > Teams**.
- Assign users to one or more teams.
- Route alerts and incidents to specific teams based on asset group, category, or severity.
- Scope dashboard visibility and report access by team.

## Audit Log

Every administrative action in Z Shield is recorded in the **Audit Log**, accessible under **Settings > Audit Log**. The audit log captures:

- User login and logout events
- Role assignments and permission changes
- User invitations, suspensions, and deletions
- Integration configuration changes
- Detection rule modifications
- API key creation and revocation
- SSO configuration changes

Each audit log entry includes the timestamp, acting user, action type, target resource, and source IP address. Audit logs are retained for a minimum of one year and can be exported in CSV or JSON format.

```json
{
  "timestamp": "2025-06-15T10:30:00Z",
  "actor": "admin@example.com",
  "action": "user.role.update",
  "target": "analyst@example.com",
  "details": {
    "previous_role": "Viewer",
    "new_role": "Analyst"
  },
  "source_ip": "203.0.113.42"
}
```

## Best Practices

- **Follow the principle of least privilege** -- Assign the minimum role needed for each user's responsibilities.
- **Use custom roles** for specialized teams (e.g., compliance auditors, threat hunters) to avoid over-provisioning.
- **Review user access quarterly** and remove accounts for departed employees promptly.
- **Enable SSO** to centralize authentication and enforce organizational password policies.
- **Monitor the audit log** for suspicious administrative activity, such as unauthorized role changes or bulk user modifications.
