---
sidebar_position: 1
title: Integration Architecture Overview
---

# Integration Architecture Overview

Z Shield connects to your entire security ecosystem through a unified connector framework. With over 690 pre-built connectors spanning 23 categories, the platform ingests, normalizes, and correlates data from virtually any security tool in your environment.

## How Connectors Work

Every integration in Z Shield is powered by a **connector** -- a managed component that handles authentication, data retrieval, normalization, and delivery into the platform. Connectors are isolated from one another, ensuring that a failure in one integration never impacts another.

Each connector supports one or more **data modes**:

- **Pull Mode** -- The connector periodically polls the source system's API for new events, logs, or alerts.
- **Push Mode** -- The source system sends data directly to a Z Shield ingestion endpoint (webhook, syslog, HEC).
- **Streaming Mode** -- A persistent connection (e.g., Kafka consumer, WebSocket) maintains real-time data flow.

## Data Flow

```
Source System
    |
    v
Connector (authenticate, fetch/receive, normalize)
    |
    v
Platform (validate, enrich, detect)
    |
    v
Alerts, Dashboards, Compliance Reports
```

1. **Connector** -- Authenticates with the source, fetches or receives raw data, and normalizes it into the ZPOA Common Event Format (ZCEF).
2. **Platform** -- Validates, enriches with asset and threat intelligence context, and deduplicates events.
3. **Detection** -- Correlation rules, ML models, and behavioral analytics run against incoming events in real time, generating alerts when conditions are met.
4. **Storage** -- Normalized events are persisted for search, investigation, and long-term compliance retention.

## Connector Lifecycle

Every connector follows a three-phase lifecycle:

### 1. Configure

Navigate to **Settings > Integrations** and select the connector you need. Provide the required credentials (API keys, OAuth tokens, service account JSON, etc.) and choose which data types to ingest.

### 2. Test

Click **Test Connection** to verify that Z Shield can authenticate and retrieve a sample payload from the source. The test validates network connectivity, credential validity, and data format compatibility.

### 3. Activate

Once the test passes, activate the connector. It immediately begins ingesting data according to the configured schedule or listener. Monitor health and throughput on the **Connector Health** dashboard.

## Connector Categories

Z Shield organizes its 690+ connectors into the following 23 categories:

| Category | Examples | Count |
|---|---|---|
| SaaS Applications | Salesforce, Google Workspace, Slack, Zoom | 160 |
| HR / HCM | Workday, BambooHR, ADP, SAP SuccessFactors | 112 |
| AI / ML | OpenAI, AWS Bedrock, Hugging Face, Databricks | 40 |
| ERP | SAP, Oracle ERP, NetSuite, Dynamics 365 | 36 |
| Miscellaneous | Custom apps, legacy systems, niche tools | 35 |
| IGA / Directory | Active Directory, LDAP, Azure AD, SCIM | 30 |
| Generic / Custom | REST API, Webhook, File Upload, JDBC | 28 |
| SIEM / Log Sources | Splunk, Syslog, CEF, Elastic, Sentinel | 26 |
| Marketing | HubSpot, Marketo, Mailchimp, Salesforce Marketing | 24 |
| Network Security | Palo Alto, Fortinet, Cisco, Check Point | 24 |
| Financial | Stripe, QuickBooks, Xero, Sage | 20 |
| ITSM | ServiceNow, Jira, Freshservice, BMC | 20 |
| LMS | Cornerstone, Moodle, Canvas, Docebo | 17 |
| Mainframe | IBM z/OS, AS/400, RACF, ACF2 | 15 |
| Legal | DocuSign, Ironclad, ContractPodAi | 14 |
| Identity Providers | Okta, Entra ID, Duo, Ping, OneLogin | 14 |
| EDR | CrowdStrike, SentinelOne, Defender, Carbon Black | 14 |
| CRM | Salesforce, HubSpot CRM, Dynamics CRM | 14 |
| Healthcare | Epic, Cerner, Meditech, athenahealth | 12 |
| PAM | CyberArk, BeyondTrust, Delinea, HashiCorp Vault | 12 |
| Databases | MySQL, PostgreSQL, MongoDB, Oracle, SQL Server | 5 |
| Email Security | Proofpoint, Mimecast, Abnormal, Barracuda | 4 |
| Cloud Providers | AWS, Azure, GCP | 3 |

## What's Next

Browse the category-specific pages in this section to find detailed configuration guides, required permissions, and supported data types for every connector.
