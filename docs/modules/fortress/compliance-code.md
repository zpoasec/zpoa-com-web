---
sidebar_position: 19
title: "Compliance-as-Code"
---

# Compliance-as-Code

Fortress Compliance-as-Code enables organizations to define identity compliance policies as code using Rego, CEL, or JSON Logic. Policies are versioned, testable, and automatically evaluated against all identities -- with drift detection and auto-remediation ensuring continuous compliance.

## How It Works

### Policy Languages

Three policy languages are supported:

**Rego (Open Policy Agent):**
```
package fortress.compliance

deny[msg] {
  input.identity.mfa_enabled == false
  input.identity.risk_level == "high"
  msg := sprintf("High-risk identity %s must have MFA enabled", [input.identity.email])
}
```

**CEL (Common Expression Language):**
```
identity.role == "admin" && identity.last_password_change > duration("90d")
```

**JSON Logic:**
```json
{
  "and": [
    {"==": [{"var": "identity.department"}, "finance"]},
    {"!": {"var": "identity.mfa_enabled"}}
  ]
}
```

### Policy Evaluation Runs

Policies are evaluated on schedule or on demand:

- **Scheduled runs** -- Daily, weekly, or custom cron schedules
- **On-demand** -- Trigger evaluation from the UI or API
- **Event-driven** -- Re-evaluate when identity attributes change
- **Incremental** -- Only evaluate identities that changed since the last run

Each run produces:
- **Identities evaluated** -- How many identities were checked
- **Violations found** -- How many policy violations were detected
- **Duration** -- How long the evaluation took
- **Status** -- Completed, failed, or in progress

### Drift Detection

Detect when identity states drift from policy-defined expectations:

- **Attribute drift** -- Identity attributes changed in a way that violates policy
- **Permission drift** -- Permissions were modified outside of approved workflows
- **Configuration drift** -- IdP or application settings changed unexpectedly
- **Compliance drift** -- A previously compliant identity is no longer compliant

Each drift record includes:
- The policy that detected the drift
- The affected identity
- The expected value vs. the actual value
- Whether auto-remediation was applied

### Auto-Remediation

When drift is detected, policies can trigger automatic remediation:

- **Revert to expected state** -- Automatically restore the identity to the compliant state
- **Notification only** -- Alert the identity owner and security team
- **Escalation** -- Create a ticket or alert for manual remediation
- **Conditional** -- Auto-remediate low-severity drifts, escalate high-severity

### Version Tracking and GitOps

Policies are versioned for auditability:

- **Version history** -- Every policy change is tracked with author, timestamp, and diff
- **Git integration** -- Policies can be synced from a Git repository
- **Pull request workflow** -- Policy changes require review and approval before activation
- **Rollback** -- Instantly revert to a previous policy version