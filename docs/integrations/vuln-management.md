---
sidebar_position: 13
title: Vulnerability Management Integrations
---

# Vulnerability Management Integrations

ZPOA Shield integrates with leading vulnerability management platforms to import scan results, correlate vulnerabilities with asset inventory and threat intelligence, and prioritize remediation based on real-world exploitability.

## Supported Platforms

### Qualys

Import vulnerability scan results, asset inventories, and compliance findings from Qualys VMDR (Vulnerability Management, Detection, and Response).

- **Connection Method:** Qualys REST API v2 (Basic Authentication or OAuth 2.0)
- **Required Permissions:** Manager or Unit Manager role with API access enabled
- **Data Types:** Host detections, knowledge base (QIDs), asset inventory, compliance posture

```yaml
connector:
  type: qualys
  base_url: https://qualysapi.qualys.com
  auth:
    method: basic
    username: "${QUALYS_USER}"
    password: "${QUALYS_PASS}"
  data_streams:
    - host_detections
    - asset_inventory
    - compliance_posture
  sync_interval: 3600s
```

**Key Capabilities:**
- Import host-level vulnerability detections with QID details, severity, and fix information.
- Sync asset tags and asset groups for organizational mapping.
- Track vulnerability age and remediation SLA compliance.

### Rapid7 InsightVM

Ingest vulnerability data, asset inventory, and risk scores from Rapid7 InsightVM (formerly Nexpose).

- **Connection Method:** InsightVM REST API v3 (API Key)
- **Required Permissions:** Security Manager or Global Administrator role
- **Data Types:** Asset vulnerabilities, risk scores, scan history, remediation projects

**Key Capabilities:**
- Import real risk scores that factor in exploit availability, malware exposure, and asset criticality.
- Track remediation project progress and overdue vulnerabilities.
- Correlate InsightVM findings with ZPOA Shield asset inventory.

### Tenable Nessus / Tenable.io

Import scan results, plugin output, and asset data from Tenable Nessus Professional or Tenable.io (Tenable Vulnerability Management).

- **Connection Method:** Tenable.io REST API (API Key + Secret Key) or Nessus API
- **Required Permissions:** Standard user with scan and asset read access
- **Data Types:** Scan results, plugin details, asset inventory, vulnerability priority rating (VPR)

```bash
# Verify Tenable.io API access
curl -H "X-ApiKeys: accessKey=${TENABLE_ACCESS_KEY};secretKey=${TENABLE_SECRET_KEY}" \
  "https://cloud.tenable.com/vulns/export/status"
```

**Key Capabilities:**
- Leverage Tenable's Vulnerability Priority Rating (VPR) alongside ZPOA Shield's own risk scoring.
- Import asset operating system, installed software, and network information.
- Track scan coverage gaps to identify unscanned or stale assets.

### Rapid7 InsightVM (Standalone)

For organizations using the on-premise Rapid7 Security Console, ZPOA Shield also supports direct API connectivity to the local console.

- **Connection Method:** InsightVM Security Console API (API Key or Session Authentication)
- **Data Types:** Sites, assets, vulnerabilities, scan data

## Vulnerability Correlation and Prioritization

ZPOA Shield goes beyond raw vulnerability import by applying multi-factor prioritization:

### Risk-Based Prioritization

Each imported vulnerability is scored using a composite risk model that considers:

| Factor | Source | Weight |
|---|---|---|
| CVSS Base Score | Scanner / NVD | Medium |
| Exploit Availability | CISA KEV, Exploit-DB, Metasploit | High |
| EPSS Probability | FIRST EPSS | High |
| Threat Intelligence | MISP, Mandiant, Recorded Future | High |
| Asset Criticality | ZPOA Shield Asset Inventory | Medium |
| Network Exposure | Firewall rules, cloud security groups | Medium |

Vulnerabilities with active exploitation in the wild and high EPSS scores on internet-facing critical assets are surfaced as top remediation priorities.

### Asset Correlation

ZPOA Shield maps vulnerability scan targets to its unified asset inventory using hostname, IP address, MAC address, and cloud instance ID matching. This correlation enables:

- **Impact analysis** -- Understand which business services are affected by a vulnerability.
- **Owner assignment** -- Route remediation tasks to the correct team based on asset ownership.
- **Duplicate resolution** -- Merge vulnerability findings from multiple scanners for the same asset.

### Threat-Informed Patching

By integrating vulnerability data with threat intelligence feeds (CISA KEV, FIRST EPSS, Mandiant), ZPOA Shield identifies vulnerabilities that are actively being exploited by threat actors and highlights them on the **Vulnerability Dashboard** with clear remediation deadlines.

## Vulnerability Dashboard

The dashboard provides:

- Total open vulnerabilities by severity (Critical, High, Medium, Low)
- Mean time to remediate (MTTR) trends
- Top 10 most critical unremediated vulnerabilities
- Scanner coverage metrics (percentage of assets scanned within SLA)
- Remediation progress by team or business unit

## Best Practices

- **Schedule regular syncs** (at least daily) to ensure ZPOA Shield reflects the latest scan results.
- **Combine multiple scanners** if your organization uses more than one -- ZPOA Shield deduplicates and merges findings across platforms.
- **Integrate with ticketing** (Jira, ServiceNow) to automatically create remediation tickets for critical vulnerabilities.
- **Define remediation SLAs** by severity level and track compliance on the Vulnerability Dashboard.
