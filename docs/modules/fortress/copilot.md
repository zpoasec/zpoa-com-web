---
sidebar_position: 21
title: "AI Access Copilot"
---

# AI Access Copilot

Fortress AI Access Copilot provides a natural language interface for querying and managing identity access. Ask questions like "Who has admin access to production?" or issue commands like "Revoke John's AWS access" -- the Copilot understands context, executes actions, and maintains a complete audit trail.

## How It Works

### Conversational Queries

The Copilot understands natural language questions about access:

**Discovery queries:**
- "Who has admin access to the production database?"
- "Show me all identities with MFA disabled"
- "Which vendors have access expiring this month?"
- "List all service accounts that haven't been rotated in 90 days"

**Analytical queries:**
- "What's our MFA adoption rate by department?"
- "Which department has the highest average risk score?"
- "How many SoD violations were created this quarter?"
- "Show me the access trend for the engineering team"

**Comparison queries:**
- "Compare John's access to Sarah's access"
- "What access does the finance team have that HR doesn't?"
- "Show me outliers in the engineering department"

### Action Execution

The Copilot can execute access management actions:

**Grant and revoke:**
- "Grant read access to the analytics dashboard for the marketing team"
- "Revoke John's AWS admin access"
- "Remove all vendor access for terminated contracts"

**Review and certify:**
- "Start an access review for the finance department"
- "Mark all low-risk recommendations as approved"

**Investigate:**
- "Investigate the latest identity threat alert"
- "Show me the blast radius for the compromised service account"

All actions require appropriate permissions and follow the standard approval workflow. High-risk actions trigger additional confirmation.

### Query Templates

Pre-built templates for common queries:

| Template | Category | Description |
|----------|----------|-------------|
| Admin audit | Audit | List all identities with admin access |
| MFA compliance | Compliance | Identities without MFA enabled |
| Vendor review | Access | Vendors with expiring contracts |
| Orphan hunt | Security | Service accounts without owners |
| Permission creep | Security | Identities with declining usage but growing access |
| Department risk | Analytics | Risk scores by department |

Templates can be customized and saved for repeated use.

### Action Audit Log

Every Copilot action is logged:

- **Conversation ID** -- Links the action to the conversation context
- **Action type** -- What was requested (query, grant, revoke, review)
- **Timestamp** -- When the action was executed
- **Actor** -- Who initiated the action
- **Result** -- Success, failure, or pending approval
- **Approval status** -- Whether the action required and received approval

### Approval Workflow

High-impact actions follow the standard approval process:

1. **Copilot proposes** -- The action is parsed and presented for confirmation
2. **User confirms** -- The user reviews the specific changes before execution
3. **Approval routing** -- If required, the action is routed to the appropriate approver
4. **Execution** -- Once approved, the action is executed via the standard provisioning pipeline
5. **Verification** -- Copilot confirms the action completed successfully