---
sidebar_position: 1
title: "Neural Mesh - Overview"
---

# Neural Mesh: AI-Powered Security Operations

ZPOA Shield **Neural Mesh** is the intelligence layer that powers advanced security operations across the entire platform. By combining large language models, graph analytics, and multi-source threat intelligence, Neural Mesh transforms raw security data into actionable insights -- enabling faster investigations, proactive threat hunting, and natural language interaction with your security posture.

## Key Capabilities

### Automated Investigation

Neural Mesh accelerates incident response by automating the tedious, repetitive steps of security investigations:

- **Evidence gathering** -- Automatically collects relevant logs, alerts, asset context, identity activity, and vulnerability data related to an incident
- **Timeline reconstruction** -- Assembles a chronological narrative of events across all data sources
- **Root cause analysis** -- Traces the chain of events back to the initial trigger or entry point
- **Response recommendations** -- Suggests containment, eradication, and recovery actions based on the investigation findings

Investigations that previously took hours of manual effort can be completed in minutes with Neural Mesh orchestration.

### Threat Hunting

Neural Mesh empowers proactive threat hunting without requiring deep query language expertise:

- **Hypothesis-driven hunts** -- Describe a threat scenario in natural language and Neural Mesh generates the appropriate queries across your data
- **IOC sweeps** -- Search for indicators of compromise across all connected data sources simultaneously
- **Behavioral pattern matching** -- Identify clusters of activity that match known threat actor TTPs (Tactics, Techniques, and Procedures)
- **Hunt playbooks** -- Pre-built and customizable hunt workflows aligned to MITRE ATT&CK techniques

### Natural Language Queries

Interact with your security data using plain English questions:

- *"Which production servers have critical vulnerabilities with known exploits?"*
- *"Show me all login anomalies for users in the finance department this week."*
- *"What attack paths lead to our customer database?"*
- *"List all AWS S3 buckets that are publicly accessible and contain PII."*

Neural Mesh translates natural language into structured queries, executes them across the appropriate modules (Discover, Armor, Fortress), and returns results in a clear, contextualized format.

### Intelligence Correlation

Neural Mesh continuously correlates internal security data with external threat intelligence to surface hidden threats:

- **IOC matching** -- Automatically compares network activity, file hashes, and URLs against known malicious indicators
- **Threat actor attribution** -- Maps observed TTPs to known threat groups
- **Campaign tracking** -- Identifies coordinated attack activity across your environment
- **Early warning** -- Alerts when new intelligence matches assets or vulnerabilities in your environment

## How It Works

1. **Ingest** -- Neural Mesh continuously receives data from all ZPOA Shield modules and external intelligence feeds.
2. **Correlate** -- Graph analytics and ML models identify relationships, patterns, and anomalies across data sources.
3. **Analyze** -- AI models assess risk, generate investigation narratives, and produce actionable recommendations.
4. **Act** -- Findings are delivered as alerts, investigation reports, or interactive responses to natural language queries.

## Next Steps

- [AI Investigations](./investigations.md) -- Learn how automated investigations work
- [Threat Intelligence](./threat-intel.md) -- Explore threat intelligence aggregation and correlation
