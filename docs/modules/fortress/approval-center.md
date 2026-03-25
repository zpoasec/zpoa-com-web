---
sidebar_position: 5
title: "Approval Center"
---

# Approval Center

The **Approval Center** provides a single, unified view of all pending approvals across your organization. Instead of checking separate pages for access requests, JIT access, enrollment approvals, and cloud provisioning, you can manage everything from one place.

## Accessing the Approval Center

Navigate to **Command Center > Approval Center** in the sidebar. The page shows:

- **Stats cards** at the top: Total requests, Pending count, Overdue count, and category breakdowns (Access, Enrollment, JIT, Cloud, Identity)
- **Approval list** with filtering, search, and sorting
- **Policies tab** for configuring automated approval rules

## Reviewing Approvals

### Filtering and Search

Use the filter bar to narrow down approvals:

- **Status**: All, Pending, Approved, Denied, Expired, Cancelled
- **Category**: Access, JIT, Enrollment, Cloud, Identity, Review
- **Risk Level**: Low, Medium, High, Critical
- **Search**: Free-text search across request titles and descriptions

### Approving or Denying

For each pending approval, you can:

1. Click the **thumbs up** icon to approve or the **thumbs down** icon to deny
2. Add an optional comment explaining your decision
3. Click **Approve** or **Deny** to confirm

You can also **bulk approve or deny** by selecting multiple items with checkboxes and using the "Approve All" or "Deny All" buttons.

### Detail Panel

Click on any approval row to open the detail panel, which shows:

- Full request details (title, description, requester, category, risk level)
- Domain-specific metadata (resource name, duration, role, etc.)
- Decision history (who approved/denied and when)
- Activity timeline
- Action buttons (Approve, Deny, Cancel, Undo)

### Undo a Decision

If you made a mistake, you can undo your decision on a recently approved or denied request. This reverts the request to "Pending" status.

## Submitting Requests

Click **New Request** in the top-right corner to submit a new approval request:

1. Select a **Category** (JIT, Access, Cloud, Enrollment, Identity, Review)
2. Enter a **Title** describing what you need
3. Provide a **Description / Justification** explaining why
4. Set the **Risk Level** (Low, Medium, High, Critical)
5. Click **Submit Request**

The request will appear in the Approval Center for reviewers to act on.

## SLA Tracking

Each approval shows an SLA countdown indicator:

- **Green**: More than 50% of the SLA window remaining
- **Amber**: Between 20% and 50% remaining
- **Red (pulsing)**: Less than 20% remaining
- **OVERDUE badge**: Past the SLA deadline

Overdue approvals are automatically escalated and appear in the "Overdue" counter on the stats bar.

## Approval Policies

Switch to the **Policies** tab to configure automated approval rules. Policies allow you to:

- **Auto-approve** low-risk requests matching specific criteria
- **Require approval** with a specific number of reviewers
- **Auto-deny** requests that violate compliance rules

### Creating a Policy

1. Click **Add Policy**
2. Enter a **Name** and optional **Description**
3. Select the **Category** this policy applies to (or "all")
4. Choose an **Action**: auto_approve, require_approval, or deny
5. Set **Priority** (lower number = higher priority; first match wins)
6. Set **Required Approvals** (how many reviewers must approve)
7. Set **SLA Hours** (deadline for reviewers to act)
8. Click **Create**

Policies are evaluated in priority order. The first matching policy determines the action.

### Reviewer Assignment

When a policy requires approval, reviewers are assigned based on the configured strategy:

- **Manager**: The requester's direct manager is assigned
- **Group**: All members of a specified role or group are assigned
- **Role Owner**: The owner of the requested resource or role is assigned
- **Custom**: Specific reviewer IDs listed in the policy are assigned

## Notifications

### Sidebar Badge

The Approval Center sidebar item shows a badge with the count of pending approvals, updating automatically.

### Messaging Notifications

When a new approval is created, notifications are sent through your configured messaging platform:

- **Slack**: Interactive messages with Approve/Deny buttons
- **Microsoft Teams**: Adaptive Card notifications
- **Webhook**: Generic webhook POST to any endpoint

Configure your messaging connector in **Settings > Connectors** to enable notifications.

### Email Notifications

If SMTP is configured, email notifications are sent to:

- Assigned reviewers when a new approval arrives
- The requester when their request is approved or denied

## Category Reference

| Category | Source | Examples |
|----------|--------|----------|
| **Access** | Access requests, break-glass | "Grant admin role", "Emergency DB access" |
| **JIT** | Just-in-time access requests | "Temporary SSH access for 2 hours" |
| **Enrollment** | Agent enrollment requests | "New server requesting enrollment" |
| **Cloud** | Cloud resource provisioning | "Provision EC2 instance in prod" |
| **Identity** | Staged identity changes | "Update user department from Sales to Engineering" |
| **Review** | Access reviews, certifications | "Quarterly entitlement review" |
