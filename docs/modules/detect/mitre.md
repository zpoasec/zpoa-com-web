---
sidebar_position: 5
title: MITRE ATT&CK Mapping
---

ZPOA Shield maps all detection activity to the MITRE ATT&CK framework, providing a strategic view of adversary techniques observed in your environment and highlighting gaps in your detection coverage.

## Heatmap Visualization

The MITRE ATT&CK heatmap is the centerpiece of this view. It renders the full ATT&CK matrix as an interactive grid where each cell represents a specific technique. Cells are color-coded based on detection activity:

- **Dark shading** indicates techniques with a high volume of recent detections, signaling active or frequently attempted adversary behaviors.
- **Light shading** indicates techniques with low but present detection activity.
- **No shading** indicates techniques for which no detection rules currently exist or no matches have been recorded.

Click any cell to drill down into the specific detection rules and alerts associated with that technique.

## Technique Coverage

The Technique Coverage panel provides a quantitative summary of your detection posture:

- **Total techniques** in the ATT&CK framework compared to the number your detection rules cover.
- **Coverage percentage** calculated as the ratio of covered techniques to total techniques.
- **Coverage by platform** (Windows, Linux, macOS, Cloud, Network, Containers) to highlight platform-specific blind spots.
- **Rule count per technique** showing which techniques have robust, multi-layered detection and which rely on a single rule.

Use this data to prioritize rule development efforts and ensure your detection strategy addresses the most relevant threats.

## Tactic Breakdown

The Tactic Breakdown view groups detection activity by the 14 ATT&CK tactics:

- Reconnaissance
- Resource Development
- Initial Access
- Execution
- Persistence
- Privilege Escalation
- Defense Evasion
- Credential Access
- Discovery
- Lateral Movement
- Collection
- Command and Control
- Exfiltration
- Impact

Each tactic displays the number of associated alerts and the detection rules in place. This view helps analysts understand which phases of the attack lifecycle are well-monitored and which need attention.

## Gap Analysis

The Gap Analysis report identifies techniques that are relevant to your environment but lack detection coverage. The analysis considers:

- **Your infrastructure profile** -- The platforms, services, and technologies in use as reported by the Discover module.
- **Threat intelligence** -- Techniques actively used by threat actors targeting your industry vertical.
- **Peer benchmarking** -- Anonymized, aggregated coverage data from organizations of similar size and industry.

For each identified gap, the report recommends specific detection rules from the ZPOA Shield pre-built library or provides guidance for writing custom rules. Gaps are ranked by risk priority to help you focus on the most impactful improvements first.

## Using MITRE Data in Investigations

When investigating an alert, the MITRE mapping provides critical context. Understanding which tactic and technique an alert maps to helps analysts:

- Anticipate the attacker's likely next steps in the kill chain.
- Search for related activity across other techniques in the same tactic.
- Assess the overall scope and progression of an incident.
