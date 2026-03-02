---
sidebar_position: 9
title: Ticketing Integrations
---

# Ticketing Integrations

Z Shield integrates with enterprise ticketing and IT service management (ITSM) platforms to bridge the gap between security detection and operational response. When the platform identifies a security incident, it can automatically create, update, and track tickets in your existing workflow tools.

## Supported Platforms

### Jira (Atlassian)

Z Shield integrates with Jira Cloud and Jira Data Center to create and manage security incident tickets within your existing project workflows.

#### Configuration

1. Navigate to **Settings > Integrations > Ticketing > Jira**.
2. Enter your Jira instance URL (e.g., `https://yourorg.atlassian.net`).
3. Authenticate using one of the following methods:
   - **API Token** (Jira Cloud) -- Generate a token at `id.atlassian.com/manage-profile/security/api-tokens`.
   - **OAuth 2.0** (Jira Cloud) -- Register a Z Shield OAuth app in Atlassian Developer Console.
   - **Personal Access Token** (Jira Data Center) -- Generate a PAT in your Jira profile settings.
4. Select the target **project** and **issue type** for security tickets.
5. Map Z Shield alert fields to Jira issue fields.

```json
{
  "project": "SEC",
  "issue_type": "Bug",
  "field_mapping": {
    "summary": "{{alert.title}}",
    "description": "{{alert.description}}\n\nSeverity: {{alert.severity}}\nSource: {{alert.source}}\nMITRE ATT&CK: {{alert.mitre_technique}}",
    "priority": "{{alert.severity | jira_priority}}",
    "labels": ["zpoa-shield", "{{alert.category}}"],
    "assignee": "{{alert.assigned_analyst}}"
  }
}
```

#### Capabilities

- **Auto-create tickets** -- Automatically generate Jira issues when alerts exceed a configured severity threshold.
- **Bidirectional sync** -- Status changes in Jira (e.g., "In Progress", "Done") are reflected back in Z Shield, and vice versa.
- **Comment sync** -- Investigation notes added in Z Shield appear as Jira comments, keeping all stakeholders informed.
- **Attachment support** -- Z Shield can attach evidence files (PCAP excerpts, screenshots, IOC lists) to Jira tickets.
- **Custom workflows** -- Map Z Shield alert states to your Jira workflow transitions.

### ServiceNow

Z Shield integrates with ServiceNow ITSM and Security Incident Response (SIR) to create and manage incidents within the ServiceNow platform.

#### Configuration

1. Navigate to **Settings > Integrations > Ticketing > ServiceNow**.
2. Enter your ServiceNow instance URL (e.g., `https://yourorg.service-now.com`).
3. Authenticate using:
   - **OAuth 2.0** (recommended) -- Register Z Shield as an OAuth application in ServiceNow.
   - **Basic Authentication** -- Service account with `sn_si.analyst` and `itil` roles.
4. Select the target table (`sn_si_incident` for Security Incidents, `incident` for standard ITSM incidents).
5. Map Z Shield fields to ServiceNow columns.

```json
{
  "table": "sn_si_incident",
  "field_mapping": {
    "short_description": "{{alert.title}}",
    "description": "{{alert.description}}",
    "severity": "{{alert.severity | snow_severity}}",
    "category": "Security",
    "subcategory": "{{alert.category}}",
    "assignment_group": "Security Operations",
    "caller_id": "zpoa-shield-service"
  }
}
```

#### Capabilities

- **Auto-create incidents** -- Generate ServiceNow security incidents or standard incidents from Z Shield alerts.
- **Bidirectional sync** -- Incident state changes in ServiceNow update the corresponding alert in Z Shield.
- **CMDB enrichment** -- Z Shield maps affected assets to ServiceNow CMDB Configuration Items (CIs) for impact analysis.
- **SLA tracking** -- Leverage ServiceNow SLA policies to track response and resolution times for security incidents.
- **Runbook attachment** -- Attach Z Shield playbook steps as work notes on the ServiceNow incident.

## Workflow Automation

Both ticketing integrations support rule-based automation:

- **Severity-based routing** -- Route critical alerts to dedicated Jira projects or ServiceNow assignment groups.
- **Auto-assignment** -- Assign tickets to specific analysts based on alert category, asset owner, or on-call rotation.
- **Escalation rules** -- Automatically escalate tickets that remain unacknowledged beyond a configurable time window.
- **Bulk operations** -- Close or update multiple related tickets when a parent incident is resolved.

Configure automation rules under **Settings > Integrations > Ticketing > Automation Rules**.

## Best Practices

- **Define clear field mappings** before enabling auto-creation to ensure tickets contain actionable context.
- **Use bidirectional sync** to maintain a single source of truth and avoid status drift between platforms.
- **Set severity thresholds** for auto-creation to prevent ticket fatigue from low-priority informational alerts.
- **Test with a staging project** before routing production alerts to your primary ticketing workspace.
