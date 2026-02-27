---
sidebar_position: 2
title: "AI Investigations"
---

# AI Investigations

Neural Mesh AI Investigations automate the end-to-end incident investigation workflow. When a security event is detected -- whether from an alert, anomaly, or manual trigger -- Neural Mesh orchestrates a structured investigation that gathers evidence, reconstructs timelines, identifies root causes, and recommends response actions.

## Investigation Workflow

Each AI investigation follows a systematic process:

### 1. Trigger

Investigations can be initiated from multiple sources:

- **Automated** -- Triggered by high-severity alerts, critical anomalies, or attack path changes
- **Manual** -- Launched by an analyst from any finding, alert, or asset in the platform
- **Natural language** -- Started by asking Neural Mesh a question such as *"Investigate why user jdoe accessed the production database at 3 AM"*
- **Scheduled** -- Periodic investigations based on hunt hypotheses or compliance requirements

### 2. Evidence Gathering

Neural Mesh automatically collects and correlates relevant data from across the platform:

- **Identity activity** -- Authentication logs, permission changes, API calls from Fortress
- **Cloud configuration** -- Resource changes, security group modifications, policy updates from Armor
- **Vulnerability context** -- Relevant CVEs, exploit availability, and patch status from Discover
- **Network data** -- Flow logs, DNS queries, and connection metadata
- **Threat intelligence** -- IOC matches and threat actor context from intelligence feeds

Evidence is assembled into a structured evidence package that analysts can review and augment.

### 3. Timeline Reconstruction

Neural Mesh builds a chronological timeline of all events related to the investigation:

- Events are ordered by timestamp and correlated across data sources
- Causal relationships are inferred (e.g., a permission change followed by sensitive data access)
- Gaps in the timeline are identified and flagged for further data collection
- The timeline is presented as both a visual graph and a narrative summary

### 4. Root Cause Analysis

Using the collected evidence and timeline, Neural Mesh determines the most likely root cause:

- **Kill chain mapping** -- Maps observed events to the MITRE ATT&CK framework
- **Causal chain analysis** -- Identifies the sequence of conditions and actions that led to the incident
- **Contributing factors** -- Highlights misconfigurations, policy gaps, or vulnerabilities that enabled the attack
- **Confidence scoring** -- Each root cause hypothesis includes a confidence level based on evidence strength

### 5. Suggested Response Actions

Neural Mesh generates prioritized response recommendations:

| Action Category | Examples |
|----------------|----------|
| **Containment** | Disable compromised account, isolate affected instance, block malicious IP |
| **Eradication** | Rotate credentials, patch vulnerability, remove persistence mechanism |
| **Recovery** | Restore from clean backup, re-enable services, validate integrity |
| **Prevention** | Tighten IAM policy, update security group rules, enable additional monitoring |

Response actions can be executed directly from the investigation interface (with appropriate approval workflows) or exported as tickets for manual execution.

## Investigation Management

### Investigation Dashboard

Track all active and completed investigations from a centralized dashboard:

- **Status tracking** -- Open, in progress, awaiting review, closed
- **Severity classification** -- Critical, high, medium, low
- **Analyst assignment** -- Route investigations to team members based on expertise or workload
- **SLA monitoring** -- Track time-to-investigate and time-to-resolve metrics

### Collaboration

Investigations support multi-analyst collaboration:

- **Notes and annotations** -- Add context, hypotheses, and observations to the investigation timeline
- **Evidence tagging** -- Mark evidence as relevant, irrelevant, or requiring further analysis
- **Handoff support** -- Transfer investigations between analysts with full context preservation

```
POST /api/v1/investigations
{
  "trigger": "manual",
  "description": "Investigate unusual S3 data access by service account deploy-bot",
  "priority": "high",
  "related_entities": [
    "arn:aws:iam::123456789012:user/deploy-bot",
    "arn:aws:s3:::customer-data-prod"
  ]
}
```
