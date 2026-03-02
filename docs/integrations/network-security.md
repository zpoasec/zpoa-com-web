---
sidebar_position: 6
title: Network Security Integrations
---

# Network Security Integrations

Z Shield integrates with firewalls, web application firewalls, proxies, load balancers, DNS security appliances, and SASE/CASB platforms. Network telemetry is critical for detecting lateral movement, command-and-control traffic, data exfiltration, and unauthorized access.

## Next-Generation Firewalls

### Palo Alto Networks

Ingest traffic logs, threat logs, URL filtering logs, and WildFire submissions from PAN-OS firewalls and Panorama.

- **Connection Method:** Syslog (CEF/LEEF) or Cortex Data Lake API
- **Log Types:** Traffic, Threat, URL Filtering, WildFire, GlobalProtect
- **Configuration:** Configure a syslog server profile in PAN-OS pointing to the Z Shield syslog listener.

### Fortinet FortiGate

Collect traffic logs, UTM logs (AV, IPS, web filter, application control), and VPN session logs.

- **Connection Method:** Syslog or FortiAnalyzer REST API
- **Log Types:** Traffic, UTM, Event, VPN
- **Configuration:** Enable remote logging under **Log & Report > Log Settings** and set the Z Shield syslog target.

### Cisco ASA / Firepower / Meraki / Umbrella

- **Cisco ASA** -- Syslog-based ingestion of connection, threat, and VPN events.
- **Cisco Firepower (FTD)** -- eStreamer or syslog for intrusion events, connection events, and file/malware events.
- **Cisco Meraki** -- Syslog forwarding from Meraki MX appliances for security and flow data.
- **Cisco Umbrella** -- REST API ingestion of DNS request logs, proxy logs, and security events.

### Check Point

Ingest SmartEvent logs, firewall blade logs, and threat prevention data via Log Exporter or LEA (Log Export API).

- **Connection Method:** Syslog (CEF) or Check Point Open Telemetry Exporter
- **Log Types:** Firewall, IPS, Anti-Bot, Threat Extraction

### Sophos

Collect firewall events, web filtering logs, and ATP detections from Sophos XG/XGS Firewall.

- **Connection Method:** Syslog or Sophos Central API
- **Log Types:** Firewall, IDP, Web, ATP

### SonicWall

Ingest firewall logs, intrusion prevention events, and VPN activity from SonicWall appliances.

- **Connection Method:** Syslog
- **Log Types:** Firewall, IPS, VPN, Content Filtering

### Juniper SRX

Collect security logs, IDP events, and session data from Juniper SRX Series firewalls.

- **Connection Method:** Syslog (structured or unstructured)
- **Log Types:** Traffic, IDP, Screen, NAT

### WatchGuard

Ingest Firebox traffic logs, intrusion prevention events, and proxy logs.

- **Connection Method:** Syslog or WatchGuard Cloud API
- **Log Types:** Traffic, Proxy, IPS, APT Blocker

### pfSense

Collect firewall filter logs, OpenVPN logs, and Suricata/Snort IDS alerts from pfSense deployments.

- **Connection Method:** Syslog forwarding
- **Log Types:** Filter log, DHCP, OpenVPN, IDS/IPS

## Web Application Firewalls and Proxies

### F5 BIG-IP

Ingest ASM (Application Security Manager) events, APM (Access Policy Manager) logs, and LTM traffic logs.

- **Connection Method:** Syslog, iRules logging, or F5 Telemetry Streaming
- **Log Types:** WAF violations, access events, traffic statistics

### Imperva WAF

Collect WAF events, DDoS mitigation data, and API security alerts from Imperva Cloud WAF or on-premise SecureSphere.

- **Connection Method:** CEF syslog or Imperva API
- **Log Types:** Security events, access logs, bot mitigation

### Akamai

Ingest Akamai Security Events from Kona Site Defender, Bot Manager, and API Security.

- **Connection Method:** Akamai SIEM Integration API (SIEM API)
- **Log Types:** WAF events, bot detections, API security events

### HAProxy

Collect access logs and error logs from HAProxy load balancers for traffic analysis and anomaly detection.

- **Connection Method:** Syslog forwarding
- **Log Types:** HTTP access logs, TCP connection logs, error logs

### Nginx

Ingest Nginx access and error logs, including ModSecurity WAF events if enabled.

- **Connection Method:** Syslog, file-based ingestion via agent, or Nginx Plus API

### Apache HTTP Server

Collect access logs, error logs, and ModSecurity audit logs from Apache web servers.

- **Connection Method:** Syslog or file-based ingestion via agent

### Squid Proxy

Ingest Squid access logs for web proxy traffic monitoring and data loss prevention.

- **Connection Method:** Syslog or file-based ingestion via agent

## DNS and Network Infrastructure

### Infoblox

Collect DNS query logs, DHCP lease data, and DNS threat intelligence events from Infoblox DDI appliances.

- **Connection Method:** Syslog or Infoblox REST API
- **Log Types:** DNS queries, DHCP events, DNS RPZ hits

## SASE and Cloud Security

### Netskope

Ingest cloud application activity, DLP violations, threat events, and user behavior analytics from Netskope Security Cloud.

- **Connection Method:** Netskope REST API v2 (API Token)
- **Log Types:** Application events, alerts, DLP incidents, page events

## Configuration Example

Most network security devices use syslog forwarding. Below is a generic syslog configuration pattern:

```bash
# Configure syslog forwarding on most network appliances
# Target: Z Shield syslog listener
# Protocol: TCP with TLS (recommended)
# Port: 6514
# Format: CEF or RFC 5424

# Example rsyslog relay configuration
$DefaultNetstreamDriverCAFile /etc/ssl/certs/zpoa-ca.pem
$ActionSendStreamDriver gtls
$ActionSendStreamDriverMode 1
$ActionSendStreamDriverAuthMode anon
*.* @@ingest.zpoashield.com:6514;RSYSLOG_SyslogProtocol23Format
```

## Best Practices

- **Use TLS** for all syslog transport to prevent credential and event data exposure in transit.
- **Tag sources** with the device hostname and function to streamline investigation and filtering.
- **Configure log rate limits** on high-throughput appliances to avoid overwhelming ingestion during attack surges; Z Shield supports back-pressure signaling for TCP syslog.
