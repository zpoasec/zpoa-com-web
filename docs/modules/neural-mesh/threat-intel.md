---
sidebar_position: 3
title: "Threat Intelligence"
---

# Threat Intelligence

Neural Mesh aggregates, normalizes, and correlates threat intelligence from over 12 external feeds and internal telemetry to provide comprehensive, actionable intelligence. By continuously matching indicators of compromise (IOCs) against your environment and tracking threat actor activity, Neural Mesh transforms raw intelligence into proactive defense.

## Multi-Source Intelligence Aggregation

Neural Mesh ingests intelligence from a diverse set of commercial, open-source, and proprietary feeds:

### Included Intelligence Sources

- **Commercial feeds** -- Premium threat intelligence providers with curated, high-fidelity indicators
- **Open-source feeds** -- Community-maintained intelligence including AlienVault OTX, Abuse.ch, and PhishTank
- **Government advisories** -- CISA, CERT, and national cybersecurity agency bulletins
- **Industry ISACs** -- Sector-specific intelligence sharing communities (Financial, Healthcare, Energy)
- **Dark web monitoring** -- Credential leaks, ransomware leak sites, and underground forum activity
- **ZPOA Shield Research** -- Proprietary intelligence from ZPOA Shield's threat research team
- **Custom feeds** -- STIX/TAXII and CSV-based feeds from your existing intelligence subscriptions

All intelligence is normalized into a common format, deduplicated, and enriched with confidence scores and context before correlation.

## IOC Matching

Neural Mesh continuously matches incoming intelligence against your environment's telemetry:

### Supported Indicator Types

| Indicator Type | Sources Checked |
|---------------|----------------|
| **IP Addresses** | Network flow logs, DNS queries, cloud audit trails |
| **Domains / URLs** | DNS logs, proxy logs, web application traffic |
| **File Hashes** (MD5, SHA-1, SHA-256) | Endpoint telemetry, container image scans |
| **Email Addresses** | Identity provider logs, phishing reports |
| **CVE Identifiers** | Discover vulnerability findings |
| **MITRE ATT&CK Techniques** | Behavioral detections across all modules |

When a match is found, Neural Mesh generates an alert with full context:

- The matched indicator and its intelligence source
- Confidence score and indicator freshness
- Affected assets, identities, and network segments
- Associated threat actor or campaign (if known)
- Recommended response actions

## Threat Actor Tracking

Neural Mesh maintains profiles of known threat actors and maps observed activity to their known TTPs:

- **Actor profiles** -- Detailed dossiers including known aliases, motivation, target sectors, and operational history
- **TTP mapping** -- MITRE ATT&CK technique associations for each tracked actor
- **Campaign tracking** -- Group related IOCs and activity into coherent campaigns
- **Relevance scoring** -- Prioritize actors based on their likelihood of targeting your industry, geography, and technology stack

### Example Actor Alert

```
Threat Actor: APT-EXAMPLE-42
Relevance: HIGH (targets financial sector, uses techniques observed in your environment)
Matched IOCs: 3 IP addresses, 1 domain
Affected Assets: 2 production web servers
MITRE Techniques: T1190 (Exploit Public-Facing Application), T1078 (Valid Accounts)
Recommended Action: Review access logs for affected servers, verify no unauthorized sessions
```

## Intelligence Sharing

Neural Mesh supports bidirectional intelligence sharing to strengthen collective defense:

- **STIX/TAXII integration** -- Publish and subscribe to intelligence using industry-standard protocols
- **ISAC participation** -- Share anonymized indicators with your industry's Information Sharing and Analysis Center
- **Internal distribution** -- Route relevant intelligence to specific teams based on asset ownership and responsibility
- **Automated enrichment** -- Outgoing indicators are automatically enriched with sighting data and confidence updates

## Intelligence Dashboard

The threat intelligence dashboard provides a centralized view of your intelligence posture:

- **Active IOCs** -- Count of indicators currently being monitored, organized by type and source
- **Recent matches** -- IOC matches detected in your environment within the selected time window
- **Feed health** -- Status and freshness of all connected intelligence feeds
- **Top threat actors** -- Most relevant actors based on your organization's risk profile
- **Intelligence coverage** -- Mapping of monitored indicator types against your data sources to identify coverage gaps

```
GET /api/v1/threat-intel/matches?severity_gte=high&time_range=7d
```
