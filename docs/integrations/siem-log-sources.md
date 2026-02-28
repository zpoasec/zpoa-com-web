---
sidebar_position: 4
title: SIEM and Log Source Integrations
---

# SIEM and Log Source Integrations

ZPOA Shield supports a broad range of log ingestion methods -- from enterprise SIEM forwarders to raw syslog streams and cloud object storage. These connectors ensure that no matter where your logs originate, they reach the ZPOA Shield detection engine in a normalized, queryable format.

## Log Forwarders and SIEM Integrations

### Splunk HTTP Event Collector (HEC)

Forward events from Splunk to ZPOA Shield using the HEC protocol. Configure a Splunk saved search or alert action to send events to the ZPOA Shield HEC endpoint.

```bash
# Example: send an event to ZPOA Shield HEC endpoint
curl -k https://ingest.zpoashield.com/services/collector/event \
  -H "Authorization: Splunk <YOUR_HEC_TOKEN>" \
  -d '{"event": "Failed login attempt", "sourcetype": "auth", "source": "sshd"}'
```

- **Use Case:** Migrate from or augment an existing Splunk deployment without changing existing data pipelines.
- **Configuration:** Generate an HEC token in ZPOA Shield under **Settings > Ingestion Endpoints**.

### CEF (Common Event Format)

Ingest logs formatted in ArcSight CEF. Many security appliances natively output CEF over syslog.

```
CEF:0|SecurityVendor|Product|1.0|100|Login Failed|7|src=10.0.0.1 dst=192.168.1.1 suser=admin
```

### LEEF (Log Event Extended Format)

Support for IBM QRadar LEEF format. ZPOA Shield automatically parses LEEF headers and key-value extensions.

### Syslog (RFC 3164 / RFC 5424)

Receive syslog messages over UDP, TCP, or TLS on dedicated listener ports.

- **UDP:** Port 514 (unencrypted, suitable for internal networks)
- **TCP:** Port 601 (reliable delivery)
- **TLS:** Port 6514 (encrypted, recommended for production)

```bash
# Configure rsyslog to forward to ZPOA Shield
# /etc/rsyslog.d/zpoa-shield.conf
*.* @@ingest.zpoashield.com:6514
```

### Windows Event Log

Collect Windows Security, System, and Application event logs using the ZPOA Shield Windows Agent or native Windows Event Forwarding (WEF).

- **Agent-based:** Install the lightweight ZPOA Shield agent on Windows endpoints.
- **Agentless (WEF):** Configure Windows Event Forwarding to send events to a ZPOA Shield collector.
- **Key Event IDs:** 4624 (Logon), 4625 (Failed Logon), 4672 (Special Privileges), 4688 (Process Creation), 4720 (Account Created)

### Linux auditd

Ingest Linux audit framework logs for file access, process execution, and system call monitoring.

```bash
# Configure auditd to forward via syslog
# /etc/audisp/plugins.d/syslog.conf
active = yes
direction = out
path = builtin_syslog
type = builtin
```

### Sysmon (System Monitor)

Collect enhanced Windows telemetry from Microsoft Sysmon including process creation with command-line arguments, network connections, file creation timestamps, and driver/image loads.

## Streaming and Transport

### Apache Kafka

Consume events directly from your existing Kafka topics. ZPOA Shield reads from one or more topics without disrupting other consumers.

- **Configuration:** Broker addresses, topic names, authentication credentials.
- **Formats Supported:** JSON, Avro, raw text.

### Amazon S3 Transport

Ingest log files deposited in S3 buckets. ZPOA Shield monitors the bucket via S3 Event Notifications (SNS/SQS) for near-real-time ingestion or performs periodic polling.

- **Supported Formats:** JSON, CSV, gzip-compressed, Parquet.
- **Use Case:** CloudTrail logs, VPC Flow Logs, ALB access logs stored in S3.

### Webhook Receiver

Accept HTTP POST payloads from any system capable of sending webhooks. ZPOA Shield provides a unique endpoint URL per connector instance.

```bash
POST https://ingest.zpoashield.com/webhook/v1/<connector-id>
Content-Type: application/json
Authorization: Bearer <WEBHOOK_TOKEN>

{"event_type": "alert", "severity": "high", "message": "Unauthorized access detected"}
```

### HEC Receiver

A Splunk-compatible HEC listener that accepts events from any HEC-capable forwarder (Fluentd, Filebeat, Logstash) without requiring code changes.

## Cloud Log Sources

### Oracle Cloud Infrastructure (OCI)

Ingest OCI Audit Logs and Cloud Guard findings via the OCI Streaming Service or Object Storage.

### Alibaba Cloud

Collect ActionTrail logs and Security Center alerts from Alibaba Cloud environments.

## Generic REST API Ingestion

For sources without a dedicated connector, use the **Generic REST Connector** to pull data from any REST API. Define the endpoint URL, authentication method, response parsing rules, and polling schedule through a visual configuration wizard.

```yaml
connector:
  type: generic_rest
  url: https://api.example.com/v1/events
  auth:
    method: bearer
    token: "${API_TOKEN}"
  pagination:
    type: cursor
    cursor_field: next_cursor
  schedule: "*/5 * * * *"
```
