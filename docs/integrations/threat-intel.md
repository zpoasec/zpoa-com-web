---
sidebar_position: 8
title: Threat Intelligence Integrations
---

# Threat Intelligence Integrations

Z Shield enriches every event and alert with contextual threat intelligence from multiple sources. By correlating internal telemetry with external threat data, the platform reduces false positives, prioritizes high-confidence detections, and maps threats to adversary tactics and techniques.

## Supported Threat Intelligence Sources

### MISP (Malware Information Sharing Platform)

Ingest indicators of compromise (IOCs), galaxy clusters, and event metadata from MISP instances. Z Shield synchronizes with one or more MISP servers on a configurable schedule.

- **Connection Method:** MISP REST API (API Key)
- **Data Types:** Attributes (IP, domain, hash, URL), events, galaxies, taxonomies
- **Sync Modes:** Full sync, incremental (delta) sync, tag-filtered sync

```yaml
connector:
  type: misp
  url: https://misp.yourorg.com
  auth:
    api_key: "${MISP_API_KEY}"
  filters:
    tags:
      - "tlp:white"
      - "tlp:green"
    published: true
  sync_interval: 300s
```

### AlienVault OTX (Open Threat Exchange)

Subscribe to OTX pulses for community-sourced threat intelligence on IPs, domains, URLs, file hashes, and CVEs.

- **Connection Method:** OTX DirectConnect API (API Key)
- **Data Types:** Pulse indicators, adversary profiles, CVE references

### VirusTotal

Enrich file hashes, URLs, domains, and IP addresses with VirusTotal scan results and community scores.

- **Connection Method:** VirusTotal API v3 (API Key)
- **Rate Limits:** Varies by license tier (4 req/min for free, higher for premium)
- **Data Types:** File reports, URL reports, domain reports, IP reports

### Abuse.ch

Ingest threat feeds from Abuse.ch projects:

- **URLhaus** -- Malicious URL database
- **MalwareBazaar** -- Malware sample hash repository
- **ThreatFox** -- IOC sharing platform (IPs, domains, URLs)
- **Feodo Tracker** -- Botnet C2 infrastructure tracking

Connection is via HTTPS feed download or REST API (no authentication required for public feeds).

### STIX/TAXII

Connect to any TAXII 2.0 or TAXII 2.1 compliant server to receive STIX bundles containing indicators, threat actors, campaigns, attack patterns, and relationships.

- **Connection Method:** TAXII 2.x client (HTTP Basic or certificate authentication)
- **Data Types:** STIX 2.1 objects (indicators, malware, threat-actor, campaign, attack-pattern)

```yaml
connector:
  type: taxii
  discovery_url: https://taxii.example.com/taxii2/
  collection_id: "collection-uuid"
  auth:
    method: basic
    username: "${TAXII_USER}"
    password: "${TAXII_PASS}"
```

### Mandiant Threat Intelligence

Access Mandiant's curated threat intelligence including adversary profiles, malware families, vulnerability analysis, and IOCs.

- **Connection Method:** Mandiant Advantage API (API Key + Secret)
- **Data Types:** Indicators, reports, adversary profiles, malware families

### Recorded Future

Ingest risk scores, alert rules, and intelligence cards from Recorded Future for IPs, domains, hashes, URLs, and vulnerabilities.

- **Connection Method:** Recorded Future Connect API (API Token)
- **Data Types:** Risk lists, alert notifications, intelligence cards

### CrowdStrike Threat Intelligence

Leverage CrowdStrike's adversary intelligence, including actor profiles, indicators, and reports.

- **Connection Method:** CrowdStrike Falcon Intel API (OAuth 2.0)
- **Required Scopes:** `indicators:read`, `actors:read`, `reports:read`

### CISA Known Exploited Vulnerabilities (KEV)

Automatically ingest the CISA KEV catalog to flag assets with known exploited vulnerabilities, supporting compliance with BOD 22-01.

- **Connection Method:** HTTPS JSON feed (no authentication required)
- **Update Frequency:** Daily

### FIRST EPSS (Exploit Prediction Scoring System)

Enrich CVE data with EPSS probability scores to prioritize vulnerabilities most likely to be exploited in the wild.

- **Connection Method:** HTTPS CSV/JSON feed (no authentication required)
- **Update Frequency:** Daily

### NIST National Vulnerability Database (NVD)

Import CVE details, CVSS scores, CWE classifications, and CPE matching data from the NIST NVD.

- **Connection Method:** NVD REST API 2.0 (API Key recommended for higher rate limits)
- **Data Types:** CVE records, CVSS v3.1 scores, CPE dictionaries

## How Threat Intelligence Is Used

Z Shield applies threat intelligence at multiple stages of the detection pipeline:

1. **Ingestion-time enrichment** -- Incoming events are matched against IOC databases in real time. Matching indicators are tagged directly on the event record.
2. **Detection rules** -- Correlation rules reference threat intelligence lists (e.g., "alert if destination IP is in active C2 feed").
3. **Alert prioritization** -- Alerts involving high-confidence IOCs from premium feeds are automatically elevated in severity.
4. **Investigation context** -- Analysts see threat intelligence context (adversary attribution, malware family, campaign details) directly in the investigation timeline.
5. **MITRE ATT&CK mapping** -- Threat intelligence is mapped to ATT&CK techniques to provide tactical context for detection and response.

## Managing Threat Feeds

Navigate to **Settings > Threat Intelligence** to manage your feeds:

- **Enable/disable** individual feeds without removing their configuration.
- **Set confidence thresholds** to control which indicators are used for alerting vs. enrichment only.
- **Configure TLP handling** to respect Traffic Light Protocol markings on shared intelligence.
- **View feed health** metrics including last sync time, indicator count, and error rate.
