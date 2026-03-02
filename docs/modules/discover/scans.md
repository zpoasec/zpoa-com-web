---
sidebar_position: 4
title: "Scanning"
---

# Scanning

Z Shield Discover supports flexible scanning configurations to detect vulnerabilities across your entire infrastructure. Choose between agent-based and agentless approaches, schedule recurring scans, or launch on-demand assessments as needed.

## Scan Types

### Scheduled Scans

Configure recurring scans to run automatically at defined intervals. Scheduled scans ensure continuous coverage without manual intervention.

- **Daily, weekly, or monthly** cadences with customizable start windows
- **Maintenance window awareness** to avoid scanning during change freezes
- **Staggered execution** to distribute load across large environments
- **Automatic retry** on transient failures with configurable retry limits

### On-Demand Scans

Launch immediate scans against any asset, asset group, or network range. On-demand scans are ideal for:

- Verifying that a remediation was successful
- Assessing newly deployed infrastructure before go-live
- Investigating a specific threat advisory or zero-day disclosure
- Ad hoc security assessments requested by stakeholders

### Continuous Monitoring

For critical assets, enable continuous monitoring to detect new vulnerabilities as soon as updated signatures or advisories become available -- without waiting for the next scheduled scan window.

## Scan Profiles

Scan profiles define what checks are performed and how aggressively the scanner operates. Z Shield includes several built-in profiles, and you can create custom profiles tailored to your environment.

| Profile | Description |
|---------|-------------|
| **Full Assessment** | Comprehensive scan covering OS, application, and configuration checks |
| **Quick Scan** | Lightweight scan targeting critical and high-severity CVEs only |
| **Compliance** | Checks aligned to specific benchmarks (CIS, NIST, PCI DSS) |
| **Container Image** | Scans container images for vulnerable packages and misconfigurations |
| **IaC Review** | Analyzes Terraform, CloudFormation, and Helm templates for security issues |

Custom profiles allow you to include or exclude specific check families, set authentication credentials, and define port ranges.

## Agent-Based vs. Agentless Scanning

Z Shield supports both scanning approaches to accommodate diverse infrastructure requirements:

**Agent-Based Scanning**
- Deployed as a lightweight agent on endpoints and servers
- Provides deep, authenticated visibility into installed packages, configurations, and running processes
- Operates behind firewalls without requiring inbound network access
- Supports real-time vulnerability detection as new signatures are published

**Agentless Scanning**
- Connects via cloud provider APIs, SSH, or WinRM -- no software installation required
- Ideal for environments where agent deployment is impractical (legacy systems, IoT, third-party managed hosts)
- Leverages cloud-native snapshot scanning for zero-impact assessments
- Covers network devices, appliances, and other non-standard targets

## Scan Results

Scan results are available within minutes of completion and include:

- **Vulnerability findings** with severity, affected packages, and remediation guidance
- **Asset coverage summary** showing scanned vs. unreachable assets
- **Delta analysis** comparing results against the previous scan to highlight new, resolved, and recurring findings
- **Exportable reports** in PDF, CSV, and JSON formats

Access scan results through the Discover dashboard, the Z Shield API, or configure automated delivery to email and Slack channels.

```
POST /api/v1/scans
{
  "name": "Ad-hoc production scan",
  "targets": ["group:production-servers"],
  "profile": "full-assessment",
  "notify": ["security-team@example.com"]
}
```
