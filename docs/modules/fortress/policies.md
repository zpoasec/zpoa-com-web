---
sidebar_position: 3
title: "Access Policies"
---

# Access Policies

Fortress Access Policies enable organizations to enforce least-privilege access, conduct systematic access reviews, and maintain separation of duties across all connected identity providers and cloud platforms. By continuously evaluating permissions against actual usage, Fortress ensures that every identity has only the access it needs -- and nothing more.

## Least Privilege Enforcement

Fortress analyzes granted permissions against observed API call activity to identify and remediate over-provisioned access:

### Permission Gap Analysis

- **Granted vs. used** -- Compare all permissions assigned to an identity against the permissions actually exercised over a configurable time window (30, 60, 90, or 180 days)
- **Unused permissions** -- Flag specific permissions that have never been invoked
- **High-risk unused permissions** -- Prioritize removal of powerful but unused permissions (e.g., `iam:CreateUser`, `s3:DeleteBucket`, `ec2:RunInstances`)

### Automated Right-Sizing

Fortress generates recommended policies scoped to actual usage:

```json
{
  "recommendation": "right-size-policy",
  "identity": "arn:aws:iam::123456789012:user/deploy-bot",
  "current_permissions": 847,
  "used_permissions": 23,
  "recommended_permissions": 28,
  "confidence": 0.96
}
```

Recommended policies include a small buffer above observed usage to accommodate legitimate but infrequent operations. Confidence scores indicate how reliable the recommendation is based on data completeness.

## Policy Recommendations

Fortress provides actionable recommendations organized by impact:

- **Quick wins** -- Low-risk permission reductions that can be applied immediately
- **High-impact changes** -- Significant permission reductions on sensitive accounts requiring review
- **Policy consolidation** -- Opportunities to merge redundant or overlapping policies
- **Role refactoring** -- Suggestions to restructure role hierarchies for cleaner access management

Recommendations can be exported as cloud-native policy documents (AWS IAM JSON, Azure Role Definitions, GCP IAM Bindings) for direct application.

## Access Reviews

Conduct periodic access certification campaigns to validate that access grants remain appropriate:

- **Campaign creation** -- Define scope by identity type, resource, business unit, or risk level
- **Reviewer assignment** -- Automatically route reviews to direct managers, resource owners, or designated reviewers
- **Decision workflow** -- Reviewers approve, revoke, or flag access for further investigation
- **Escalation** -- Unresponded reviews are escalated after configurable deadlines
- **Audit trail** -- Complete record of all review decisions with timestamps and justifications

Access review campaigns can be scheduled quarterly, semi-annually, or triggered on-demand for specific events such as organizational changes or audit preparation.

## Separation of Duties

Fortress detects toxic permission combinations that violate separation of duties (SoD) principles:

- **Pre-defined SoD rules** -- Built-in rules for common conflicts (e.g., a single identity should not have both "create user" and "approve access" permissions)
- **Custom SoD policies** -- Define organization-specific conflict rules based on your regulatory and operational requirements
- **Real-time alerting** -- Notify security teams immediately when a new assignment creates an SoD violation
- **Remediation guidance** -- Recommended changes to resolve the conflict while preserving required access

SoD violations are surfaced on the Fortress dashboard and included in compliance reports.
