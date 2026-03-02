---
sidebar_position: 3
title: "Vulnerability Management"
---

# Vulnerability Management

Z Shield Discover provides end-to-end vulnerability management -- from detection through remediation and verification. Vulnerabilities are continuously identified, scored using industry-standard and proprietary methods, and tracked through their full lifecycle.

## CVE Tracking

Every detected vulnerability is mapped to its corresponding **Common Vulnerabilities and Exposures (CVE)** identifier. The vulnerability database is updated continuously from the NVD, vendor advisories, and Z Shield's own research feeds.

- Full CVE details including description, affected software versions, and references
- Vendor patch availability and advisory links
- Exploit maturity indicators (proof-of-concept, weaponized, actively exploited)
- Related threat intelligence context from Z Shield Neural Mesh

## Scoring and Prioritization

Vulnerabilities are scored using multiple complementary frameworks to ensure accurate prioritization:

| Scoring Method | Purpose |
|----------------|---------|
| **CVSS v3.1 / v4.0** | Industry-standard severity rating (Base, Temporal, Environmental) |
| **EPSS** | Exploit Prediction Scoring System -- probability of exploitation in the wild within 30 days |
| **ZPOA Risk Score** | Contextual score incorporating asset criticality, exposure, and threat intelligence |

The ZPOA Risk Score combines technical severity with business context to surface the vulnerabilities that represent the greatest real-world risk to your organization. Factors include:

- Asset criticality and data sensitivity
- Network exposure (internet-facing vs. internal)
- Active exploitation in the wild
- Compensating controls in place
- Blast radius based on asset relationships

## Remediation Tracking

Track remediation progress from initial detection to verified resolution:

1. **Detected** -- Vulnerability identified by a scan or agent report
2. **Triaged** -- Risk accepted, deferred, or assigned for remediation
3. **In Progress** -- Remediation work underway (linked to a ticket or change request)
4. **Resolved** -- Fix applied and awaiting verification
5. **Verified** -- Subsequent scan confirms the vulnerability is no longer present

Integrate with Jira, ServiceNow, or other ITSM platforms to automatically create and track remediation tickets.

## SLA Management

Define and enforce remediation SLAs based on severity or risk score:

- **Critical** -- 7 days
- **High** -- 14 days
- **Medium** -- 30 days
- **Low** -- 90 days

SLA timers start at detection. Dashboards highlight approaching and breached SLAs, and automated notifications alert asset owners and security teams when deadlines are at risk.

## Vulnerability Trends

The trends dashboard provides historical analysis to measure your vulnerability management program's effectiveness:

- **Mean Time to Remediate (MTTR)** by severity, team, and asset group
- **Open vulnerability counts** over time with trend lines
- **SLA compliance rates** across business units
- **Recurrence tracking** to identify systemic patching gaps
- **Risk score trends** showing overall posture improvement or degradation
