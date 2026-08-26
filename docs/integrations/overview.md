---
sidebar_position: 1
title: Integration Architecture Overview
---

# Integration Architecture Overview

Z Shield connects to your entire security ecosystem through a unified connector framework. With over 690 pre-built connectors spanning 23 categories, the platform ingests, normalizes, and correlates data from virtually any security tool in your environment.

## How Connectors Work

Every integration in Z Shield is powered by a **connector** - a managed component that handles authentication, data retrieval, normalization, and delivery into the platform. Connectors are isolated from one another, ensuring that a failure in one integration never impacts another.

Each connector supports one or more **data modes**:

- **Pull Mode** - The connector periodically polls the source system's API for new events, logs, or alerts.
- **Push Mode** - The source system sends data directly to a Z Shield ingestion endpoint (webhook, syslog, HEC).
- **Streaming Mode** - A persistent connection (e.g., Kafka consumer, WebSocket) maintains real-time data flow.

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

1. **Connector** - Authenticates with the source, fetches or receives raw data, and normalizes it into the ZPOA Common Event Format (ZCEF).
2. **Platform** - Validates, enriches with asset and threat intelligence context, and deduplicates events.
3. **Detection** - Correlation rules, ML models, and behavioral analytics run against incoming events in real time, generating alerts when conditions are met.
4. **Storage** - Normalized events are persisted for search, investigation, and long-term compliance retention.

## Connector Lifecycle

Every connector follows a three-phase lifecycle:

### 1. Configure

Navigate to **Settings > Integrations** and select the connector you need. Provide the required credentials (API keys, OAuth tokens, service account JSON, etc.) and choose which data types to ingest.

### 2. Test

Click **Test Connection** to verify that Z Shield can authenticate and retrieve a sample payload from the source. The test validates network connectivity, credential validity, and data format compatibility.

### 3. Activate

Once the test passes, activate the connector. It immediately begins ingesting data according to the configured schedule or listener. Monitor health and throughput on the **Connector Health** dashboard.

## Connector Tiers

Not every connector does the same job, and the difference matters when you are
planning around one. Each connector is classified by what it can actually do,
and the tier is shown in the connector picker before you connect anything.

| Tier | What it does | Use it for |
|---|---|---|
| **Governed** | Reads accounts, and reads entitlements or drives joiner-mover-leaver | Full identity governance: access reviews, provisioning, lifecycle automation |
| **Connected** | A real integration, but not governance — non-human identity discovery, ticketing, log ingestion, or account read alone | Visibility and workflow, not access certification |
| **Catalog** | Authenticates, proves reachability, reports health | Confirming a system is reachable and its credential is valid |

The tier is derived from what the connector implements rather than declared, so
it always reflects what you will actually get.

**If you are planning an access review, a provisioning flow or lifecycle
automation, check that the connector is governed tier first.** A catalog-tier
connector will connect successfully and return no accounts, which is a
confusing place to discover the limitation.

Governed-tier coverage is strongest in HR, identity providers, cloud platforms,
directories, ITSM and the major SaaS applications.

## Connector Categories

Z Shield organizes its connectors into the following 23 categories. The counts
below are catalogue entries across all three tiers:

| Category | Examples | Count |
|---|---|---|
| SaaS Applications | Salesforce, Google Workspace, Slack, Zoom | 160 |
| HR / HCM | Workday, Darwinbox, Keka, greytHR, BambooHR, ADP, SAP SuccessFactors | 112 |
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
