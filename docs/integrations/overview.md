---
sidebar_position: 1
title: Integration Architecture Overview
---

# Integration Architecture Overview

ZPOA Shield connects to your entire security ecosystem through a unified connector framework. With over 90 pre-built connectors spanning 14 categories, the platform ingests, normalizes, and correlates data from virtually any security tool in your environment.

## How Connectors Work

Every integration in ZPOA Shield is powered by a **connector** -- a managed component that handles authentication, data retrieval, normalization, and delivery into the platform's processing pipeline. Connectors operate as isolated microservices, ensuring that a failure in one integration never impacts another.

Each connector supports one or more **data modes**:

- **Pull Mode** -- The connector periodically polls the source system's API for new events, logs, or alerts.
- **Push Mode** -- The source system sends data directly to a ZPOA Shield ingestion endpoint (webhook, syslog, HEC).
- **Streaming Mode** -- A persistent connection (e.g., Kafka consumer, WebSocket) maintains real-time data flow.

## Data Flow

```
Source System
    |
    v
Connector (auth, fetch/receive, normalize)
    |
    v
Ingestion Pipeline (validation, enrichment, dedup)
    |
    v
Apache Kafka (event bus)
   / \
  v   v
Detection Engine    Data Lake / Storage
    |
    v
Alerts, Dashboards, Compliance Reports
```

1. **Connector** -- Authenticates with the source, retrieves or receives raw data, and transforms it into the ZPOA Common Event Format (ZCEF).
2. **Ingestion Pipeline** -- Validates schema conformance, enriches events with asset and threat intelligence context, and deduplicates redundant records.
3. **Kafka Event Bus** -- Provides durable, ordered message delivery to all downstream consumers.
4. **Detection Engine** -- Applies correlation rules, ML models, and behavioral analytics in real time.
5. **Data Lake / Storage** -- Persists normalized events for search, investigation, and long-term compliance retention.

## Connector Lifecycle

Every connector follows a three-phase lifecycle:

### 1. Configure

Navigate to **Settings > Integrations** and select the connector you need. Provide the required credentials (API keys, OAuth tokens, service account JSON, etc.) and choose which data types to ingest.

### 2. Test

Click **Test Connection** to verify that ZPOA Shield can authenticate and retrieve a sample payload from the source. The test validates network connectivity, credential validity, and data format compatibility.

### 3. Activate

Once the test passes, activate the connector. It immediately begins ingesting data according to the configured schedule or listener. Monitor health and throughput on the **Connector Health** dashboard.

## Connector Categories

ZPOA Shield organizes its 90+ connectors into the following 14 categories:

| Category | Examples | Count |
|---|---|---|
| Cloud Providers | AWS, Azure, GCP | 12 |
| Identity Providers | Okta, Entra ID, Duo | 13 |
| SIEM / Log Sources | Splunk, Syslog, CEF | 13 |
| EDR | CrowdStrike, SentinelOne, Defender | 14 |
| Network Security | Palo Alto, Fortinet, Cisco | 18 |
| Email Security | Proofpoint, Mimecast | 4 |
| Threat Intelligence | MISP, VirusTotal, STIX/TAXII | 11 |
| Ticketing | Jira, ServiceNow | 2 |
| Communication | Slack, Teams, PagerDuty | 4 |
| DevOps | GitHub, Jenkins, Kubernetes | 6 |
| Databases | MySQL, PostgreSQL, MongoDB | 5 |
| Vulnerability Management | Qualys, Tenable, Rapid7 | 4 |
| Custom / Generic | REST API, Webhook, File Upload | 3+ |
| SaaS Applications | Salesforce, Google Workspace | 3+ |

## What's Next

Browse the category-specific pages in this section to find detailed configuration guides, required permissions, and supported data types for every connector.
