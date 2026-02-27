---
sidebar_position: 4
title: "Attack Path Analysis"
---

# Attack Path Analysis

Armor's Attack Path Analysis identifies exploitable paths that an adversary could use to move from an initial foothold to high-value targets within your cloud environment. By combining resource relationships, misconfiguration findings, vulnerability data, and identity permissions, Armor constructs a graph-based model of your infrastructure and surfaces the most critical attack chains.

## Graph-Based Visualization

Attack paths are displayed as interactive directed graphs, making it straightforward to trace how an attacker could chain together multiple weaknesses:

- **Nodes** represent cloud resources, identities, network entry points, and sensitive data stores
- **Edges** represent exploitable relationships such as network access, IAM permissions, or vulnerability exploitation
- **Path highlighting** visually traces the full chain from entry point to target

The graph view supports zoom, pan, and filtering to navigate complex environments. Select any node to inspect its security findings and configuration details.

### Example Attack Path

```
Internet --> Public ALB --> EC2 (CVE-2024-XXXX) --> IAM Role (Overprivileged) --> S3 Bucket (Sensitive Data)
```

In this scenario, an internet-facing load balancer routes traffic to an EC2 instance with a known exploitable vulnerability. That instance assumes an IAM role with excessive S3 permissions, enabling access to a bucket containing sensitive data.

## Critical Path Identification

Not all attack paths carry equal risk. Armor automatically ranks paths by severity using a composite score derived from:

- **Entry point exposure** -- Internet-facing vs. internal-only starting points
- **Exploit availability** -- Whether vulnerabilities along the path have known exploits
- **Privilege escalation steps** -- Number and severity of permission boundaries crossed
- **Target sensitivity** -- Criticality and data classification of the end target
- **Path length** -- Shorter paths with fewer steps are generally higher risk

Critical paths are flagged on the dashboard and trigger priority alerting. The ranking helps teams focus remediation effort on the attack chains that pose the greatest real-world threat.

## Remediation Guidance

Each attack path includes actionable remediation recommendations to break the chain at one or more points:

- **Fix the vulnerability** -- Patch the exploitable software on the affected resource
- **Restrict network access** -- Tighten security group rules to remove unnecessary exposure
- **Reduce IAM permissions** -- Apply least-privilege to the overprivileged role or user
- **Enable compensating controls** -- Add WAF rules, enable MFA, or apply encryption

Armor identifies the **minimum remediation set** -- the smallest number of fixes that would eliminate the greatest number of attack paths. This optimization ensures teams get the maximum security improvement per remediation action.

## Continuous Analysis

Attack path analysis runs continuously as your environment changes:

- New resources or configuration changes trigger automatic re-evaluation
- Newly disclosed vulnerabilities are incorporated into existing path models
- Remediated findings update path status in near real-time
- Historical path data is retained for trend analysis and audit evidence

## Integration with Workflows

- **Ticketing** -- Create Jira or ServiceNow tickets directly from an attack path finding
- **Alerting** -- Configure alerts when new critical paths are detected
- **Reporting** -- Include attack path summaries in executive and compliance reports
- **API access** -- Query attack paths programmatically for custom automation

```
GET /api/v1/attack-paths?severity=critical&target_type=data_store
```
