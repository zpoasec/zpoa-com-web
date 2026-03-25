---
sidebar_position: 6
title: "Approval Policies"
---

# Approval Policies

Approval policies let administrators define automated rules for handling approval requests. Policies determine whether a request is auto-approved, requires manual review, or is automatically denied based on configurable conditions.

## How Policies Work

When a new approval request is created (access request, JIT access, enrollment, cloud provisioning, etc.), the system evaluates all active policies in **priority order** (lowest number = highest priority). The **first matching policy** determines the action.

If no policy matches, the request defaults to requiring one manual approval with a 24-hour SLA.

## Managing Policies

Navigate to **Command Center > Approval Center > Policies** tab.

### Creating a Policy

Click **Add Policy** and configure:

| Field | Description |
|-------|-------------|
| **Name** | A descriptive name (e.g., "Auto-approve low-risk access") |
| **Description** | Optional explanation of the policy's purpose |
| **Category** | Which request category this applies to: access, jit, enrollment, cloud, identity, review, or "all" |
| **Action** | What happens when the policy matches: `auto_approve`, `require_approval`, or `deny` |
| **Priority** | Evaluation order (1 = highest priority). First match wins. |
| **Required Approvals** | Number of reviewers that must approve (for `require_approval` action) |
| **SLA Hours** | Deadline for reviewers to act before escalation |

### Policy Actions

- **auto_approve**: The request is immediately approved with no manual review. Use for low-risk, routine requests.
- **require_approval**: The request is assigned to reviewers who must approve within the SLA window. Configure the number of required approvals and reviewer assignment strategy.
- **deny**: The request is immediately denied. Use for requests that violate compliance rules or organizational policy.

### Reviewer Assignment Strategies

When a policy uses `require_approval`, reviewers are assigned using one of these strategies:

- **Manager**: The requester's direct manager (from the identity hierarchy)
- **Group**: All members of a specified role or security group
- **Role Owner**: The designated owner of the requested resource or role
- **Custom**: A specific list of reviewer IDs defined in the policy

### Examples

**Auto-approve low-risk access requests:**
- Category: access
- Action: auto_approve
- Priority: 10
- Conditions: risk_level = "low"

**Require dual approval for admin JIT access:**
- Category: jit
- Action: require_approval
- Priority: 5
- Required Approvals: 2
- SLA Hours: 4
- Reviewer Strategy: manager

**Deny all break-glass requests outside business hours:**
- Category: access
- Action: deny
- Priority: 1
- Conditions: entity_type = "break_glass"

## Monitoring Policy Effectiveness

The Approval Center stats cards show how many requests are pending, overdue, and auto-processed. Use these metrics to tune your policies:

- High overdue count? Reduce SLA hours or add more reviewers.
- Too many pending requests? Create auto-approve policies for routine, low-risk categories.
- Security concerns? Add deny policies for high-risk patterns.
