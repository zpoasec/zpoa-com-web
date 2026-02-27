---
slug: 90-integrations
title: "90+ Integrations: Connect Your Entire Security Stack"
authors: [zpoa-team]
tags: [release, integrations]
---

ZPOA Shield now supports **90+ integrations** across 14 categories, covering the most widely deployed security tools in the industry.

<!-- truncate -->

## Integration Categories

Our connector catalog spans every layer of the security stack:

| Category | Count | Examples |
|----------|-------|---------|
| Cloud Providers | 3 | AWS, Azure, GCP |
| Identity | 14 | Okta, Entra ID, Duo, CyberArk, Vault |
| SIEM/Log Sources | 26 | Splunk HEC, CEF, Syslog, Kafka, S3 |
| EDR/XDR | 14 | CrowdStrike, SentinelOne, Defender, Carbon Black |
| Network Security | 24 | Palo Alto, Fortinet, Cisco, Check Point |
| Email Security | 4 | Proofpoint, Mimecast, Exchange Online |
| Threat Intelligence | 12 | MISP, VirusTotal, Mandiant, STIX/TAXII |
| Vulnerability Management | 6 | Qualys, Rapid7, Nessus |
| Ticketing | 2 | Jira, ServiceNow |
| Communication | 4 | Slack, Teams, PagerDuty |
| DevOps | 8 | GitHub, Jenkins, Docker, Kubernetes |
| Database | 5 | MySQL, PostgreSQL, MongoDB, MSSQL |
| Compliance | 3 | CIS Benchmarks, GCP SCC |

## How Integrations Work

Every connector follows the same pattern:

1. **Configure** -- Provide API credentials or connection details
2. **Test** -- Validate connectivity with a single click
3. **Activate** -- Start ingesting data in real-time

Data flows through our normalization pipeline using the OCSF schema, ensuring consistent querying and correlation regardless of the source.

## Generic Ingestion

For tools we don't have a dedicated connector for yet, you can use our generic ingestion methods:

- **REST API** -- Push logs via HTTP POST
- **Syslog** -- Forward syslog over UDP/TCP/TLS
- **Webhook Receiver** -- Accept webhooks from any source
- **Kafka** -- Consume from Kafka topics
- **S3** -- Pull from S3 buckets

## Browse the Full Catalog

Visit our [Integration Documentation](/docs/integrations/overview) to see the complete list of supported connectors with setup guides for each.
