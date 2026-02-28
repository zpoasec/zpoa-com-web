---
sidebar_position: 11
title: "JIT Access"
---

# Just-in-Time Access

Fortress JIT Access eliminates standing privileges by providing temporary, on-demand elevated access with automatic revocation. Instead of permanent admin rights, users request access when needed and it expires automatically -- reducing the attack surface from months to minutes.

## How It Works

### Request Workflow

1. **Request** -- A user requests elevated access to a specific resource, role, or application
2. **AI Duration Recommendation** -- The system recommends an optimal duration based on historical patterns and task complexity
3. **Policy Evaluation** -- JIT policies determine the approval requirements (auto-approve, single approver, multi-level)
4. **Approval** -- Designated approvers review and approve or deny the request
5. **Activation** -- Access is provisioned immediately upon approval
6. **Active Session** -- The user has access with full audit logging of all actions
7. **Auto-Expiry** -- Access is automatically revoked when the session expires

### Approval Policies

JIT policies define how requests are handled:

- **Auto-approve** -- Low-risk access to non-production environments (e.g., dev database read access)
- **Single approval** -- Standard access requiring one manager or resource owner approval
- **Multi-level approval** -- High-risk access requiring approval from both manager and security team
- **Emergency (break-glass)** -- Immediate access with post-hoc approval and enhanced audit trail

Policy conditions can include:
- **Resource sensitivity** -- Production vs. staging vs. development
- **Role risk level** -- Admin roles require stricter approval
- **Time of day** -- After-hours requests may require additional approval
- **Requester history** -- Frequent requesters with good track records may get fast-tracked

### Session Management

Active JIT sessions are fully managed:

- **Real-time monitoring** -- Track all actions performed during the elevated session
- **Extension requests** -- Users can request time extensions with justification
- **Extension limits** -- Maximum 2 extensions per session (configurable)
- **Early revocation** -- Admins can revoke access before the session expires
- **Grace period** -- Optional 5-minute warning before expiry to save work

### AI-Recommended Durations

The AI engine recommends session durations based on:

- **Historical data** -- How long similar requests typically last
- **Task type** -- Database migrations take longer than config changes
- **Resource type** -- Production access defaults shorter than staging
- **Time patterns** -- If the user typically needs 2 hours, suggest 2 hours

### Dashboard

The JIT dashboard shows:

- **Active sessions** -- Currently provisioned JIT access
- **Pending requests** -- Requests awaiting approval
- **Expired (24h)** -- Sessions that auto-expired in the last 24 hours
- **Average duration** -- Mean session length across all JIT requests
- **Approval rate** -- Percentage of requests approved vs. denied