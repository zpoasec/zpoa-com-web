---
sidebar_position: 13
title: "Access Storefront"
---

# Access Storefront

Fortress Access Storefront provides a self-service app catalog where employees can browse, request, and receive access to applications and resources. Combined with AI-powered recommendations, the Storefront reduces IT ticket volume while maintaining governance and approval workflows.

## How It Works

### App Catalog

The Storefront presents a curated catalog of requestable access items:

- **Applications** -- SaaS apps, internal tools, databases, cloud resources
- **Roles** -- Predefined role bundles with specific permissions
- **Entitlements** -- Granular permissions within applications
- **Groups** -- Security and distribution group memberships

Each catalog item includes:
- **Description** -- What the item provides and who typically needs it
- **Category** -- Productivity, engineering, finance, HR, security, etc.
- **Approval workflow** -- Who needs to approve (auto, manager, resource owner, multi-level)
- **Estimated provision time** -- How long until access is granted
- **Prerequisites** -- Required training, certifications, or prior approvals

### AI Recommendations

The "People Like You" engine recommends access based on:

- **Peer group analysis** -- What applications do people with similar roles, departments, and titles use
- **New hire context** -- Recommended Day-1 apps based on position and location
- **Usage patterns** -- Popular and trending apps within the organization
- **Seasonal patterns** -- Apps commonly requested during specific business cycles

Recommendations include confidence scores and adoption percentages to help users make informed decisions.

### Request Workflow

1. **Browse** -- User searches or browses the catalog
2. **Select** -- User selects items and provides business justification
3. **AI Review** -- System evaluates the request against policies and SoD rules
4. **Approval routing** -- Request is routed to the appropriate approver(s)
5. **Multi-step approval** -- Complex requests may require sequential approvals
6. **Provisioning** -- Approved access is automatically provisioned via SCIM or API
7. **Confirmation** -- User receives notification with access details

### Popular and Trending Items

The Storefront tracks:

- **Most requested** -- Top items by request volume across the organization
- **Trending** -- Items with rapidly increasing request rates
- **New additions** -- Recently added catalog items
- **Department favorites** -- Most popular items within each department

### Provision Time Tracking

Track the end-to-end time from request to access:

- **Average provision time** -- Per item and per approval workflow
- **Bottleneck identification** -- Which approval steps take the longest
- **SLA tracking** -- Measure against target provision times
- **Historical trends** -- Track improvement over time