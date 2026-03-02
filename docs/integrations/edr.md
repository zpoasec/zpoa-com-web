---
sidebar_position: 5
title: EDR Integrations
---

# Endpoint Detection and Response (EDR) Integrations

Z Shield integrates with all major EDR platforms to centralize endpoint telemetry, correlate endpoint alerts with network and identity events, and orchestrate response actions from a single pane of glass.

## Supported EDR Platforms

### CrowdStrike Falcon

Ingest detections, incidents, and raw event data from CrowdStrike Falcon. Z Shield supports bidirectional communication for automated containment actions.

- **Connection Method:** CrowdStrike OAuth2 API
- **Required Scopes:** `detections:read`, `incidents:read`, `hosts:read`
- **Data Types:** Detections, incidents, host inventory, IOCs

```yaml
connector:
  type: crowdstrike
  base_url: https://api.crowdstrike.com
  auth:
    client_id: "${CS_CLIENT_ID}"
    client_secret: "${CS_CLIENT_SECRET}"
  data_streams:
    - detections
    - incidents
    - host_inventory
```

### SentinelOne

Collect threat data, deep visibility events, and agent inventory from SentinelOne Singularity.

- **Connection Method:** SentinelOne REST API (API Token)
- **Required Permissions:** Viewer role at the account or site level
- **Data Types:** Threats, activities, agents, deep visibility queries

### Microsoft Defender for Endpoint

Ingest alerts, advanced hunting results, and device inventory from Microsoft Defender for Endpoint (MDE).

- **Connection Method:** Microsoft Graph Security API (OAuth 2.0)
- **Required Permissions:** `SecurityAlert.Read.All`, `Machine.Read.All`
- **Data Types:** Alerts, incidents, device inventory, vulnerabilities

### VMware Carbon Black (Cloud and Response)

Collect alerts, watchlist hits, and process events from Carbon Black Cloud or Carbon Black Response (EDR).

- **Connection Method:** Carbon Black REST API
- **Required:** API key with Custom access level (READ permissions)
- **Data Types:** Alerts, observations, process events, binary metadata

### Symantec Endpoint Protection (Broadcom)

Ingest security events, risk detections, and client status from Symantec Endpoint Protection.

- **Connection Method:** SEPM REST API or Syslog forwarding
- **Data Types:** Threat events, client status, policy compliance

### Trend Micro Vision One / Apex One

Collect detection and response data from Trend Micro's endpoint security products.

- **Connection Method:** Trend Micro Vision One API (API Key)
- **Data Types:** Workbench alerts, detection logs, endpoint inventory

### Trellix (formerly McAfee/FireEye)

Ingest endpoint detection events and threat intelligence from Trellix Endpoint Security.

- **Connection Method:** Trellix API or ePO syslog forwarding
- **Data Types:** Threat events, EPP detections, containment actions

### BlackBerry Cylance

Collect threat events, device data, and policy violations from Cylance Protect and Cylance Optics.

- **Connection Method:** Cylance REST API (JWT authentication)
- **Data Types:** Threats, device inventory, detections

### Tanium

Ingest endpoint data and threat response findings from Tanium's real-time endpoint management platform.

- **Connection Method:** Tanium REST API (API Token)
- **Data Types:** Threat response alerts, endpoint inventory, compliance data

### ESET PROTECT

Collect detection events, firewall logs, and device inventory from ESET PROTECT (formerly ESET Security Management Center).

- **Connection Method:** ESET PROTECT REST API or Syslog
- **Data Types:** Threat detections, firewall events, device inventory

### Cybereason

Ingest MalOps (malicious operations), suspicions, and machine data from Cybereason Defense Platform.

- **Connection Method:** Cybereason REST API
- **Data Types:** MalOps, suspicions, machine inventory

### Cisco Secure Endpoint (formerly AMP)

Collect event data, retrospective detections, and file trajectory from Cisco Secure Endpoint.

- **Connection Method:** Cisco Secure Endpoint API v3
- **Required:** Third-party API client credentials
- **Data Types:** Events, file trajectory, device data

### Wazuh

Ingest HIDS alerts, file integrity monitoring events, and vulnerability detection results from Wazuh open-source security platform.

- **Connection Method:** Wazuh API or Elasticsearch/OpenSearch (Wazuh indexer)
- **Data Types:** Alerts, FIM events, vulnerability detections, SCA results

### osquery

Collect endpoint state and event data from osquery fleet deployments. Z Shield ingests scheduled query results and snapshot logs.

- **Connection Method:** Fleet server API (Fleet, Kolide) or direct log ingestion
- **Data Types:** Scheduled query results, process events, file events, socket events

## Response Actions

For supported EDR platforms, Z Shield can execute automated response actions as part of SOAR playbooks:

| Action | CrowdStrike | SentinelOne | Defender | Carbon Black |
|---|---|---|---|---|
| Isolate Host | Yes | Yes | Yes | Yes |
| Kill Process | Yes | Yes | Yes | No |
| Quarantine File | Yes | Yes | Yes | Yes |
| Run Remote Script | Yes | Yes | Yes | Yes |

Response actions require elevated API permissions and must be explicitly enabled in **Settings > Response Policies**.

## Best Practices

- **Deduplicate alerts** -- If you run multiple EDR tools, configure Z Shield deduplication rules to prevent duplicate incidents.
- **Enrich with asset context** -- Map EDR agents to your CMDB asset inventory for faster triage.
- **Tune detection thresholds** -- Use Z Shield's correlation engine to reduce noise by combining EDR signals with network and identity context.
