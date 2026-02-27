---
sidebar_position: 1
title: Detect (SIEM) Overview
---

The Detect module is ZPOA Shield's Security Information and Event Management (SIEM) engine. It provides real-time log ingestion, normalization, correlation, and alerting across your entire infrastructure.

## Architecture

### Log Ingestion

ZPOA Shield ingests log data from all connected sources through a high-throughput streaming pipeline powered by Apache Kafka. This architecture ensures reliable, ordered delivery of events even during peak traffic. Connectors push data into dedicated Kafka topics partitioned by source type, enabling parallel processing at scale.

### Schema Normalization (OCSF)

Raw log events arrive in dozens of vendor-specific formats. The Detect module normalizes every event into the Open Cybersecurity Schema Framework (OCSF), an open standard that provides a consistent data model across all sources. Normalization ensures that detection rules, queries, and dashboards work uniformly regardless of the originating system.

### Storage (ClickHouse)

Normalized events are stored in ClickHouse, a columnar database optimized for analytical queries over large volumes of time-series data. ClickHouse provides sub-second query performance on billions of rows, enabling fast log search, aggregation, and trend analysis. Data retention policies are configurable per tenant.

## Correlation Engine

The correlation engine continuously evaluates incoming events against your active detection rules. It supports:

- **Single-event rules** that match individual log entries against defined conditions.
- **Multi-event correlation** that detects patterns across multiple events within configurable time windows.
- **Threshold-based rules** that trigger when event counts exceed defined limits.
- **Statistical anomaly detection** that identifies deviations from established baselines.

When a rule matches, the engine generates an alert and routes it through the alert pipeline.

## Alert Pipeline

The alert pipeline processes every generated alert through the following stages:

1. **Enrichment** -- The alert is enriched with contextual data such as asset information, threat intelligence, and user identity details.
2. **Deduplication** -- Duplicate alerts from the same source within a configurable window are grouped to reduce noise.
3. **Severity Assignment** -- The final severity is calculated based on rule severity, asset criticality, and environmental context.
4. **Routing** -- The alert is delivered to the appropriate notification channels (Slack, email, PagerDuty, webhooks) based on severity-based routing rules.
5. **Dashboard** -- The alert appears in the Detect dashboard and is available for investigation.

## Key Capabilities

- Ingest logs from 90+ integrations with no custom parsing required.
- Query billions of events in sub-second response times.
- Map detections to the MITRE ATT&CK framework automatically.
- Export data to external systems via API or scheduled reports.

For details on managing alerts, see [Alerts](/docs/modules/detect/alerts). To learn about writing detection rules, see [Detection Rules](/docs/modules/detect/rules).
