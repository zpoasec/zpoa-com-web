---
sidebar_position: 7
title: Email Security Integrations
---

# Email Security Integrations

Email remains the primary attack vector for phishing, business email compromise (BEC), and malware delivery. Z Shield integrates with leading email security gateways and platforms to ingest email threat data, correlate it with identity and endpoint signals, and accelerate incident response.

## Supported Platforms

### Proofpoint

Ingest email security events from Proofpoint Email Protection, including blocked messages, quarantined threats, URL defense clicks, and TAP (Targeted Attack Protection) alerts.

- **Connection Method:** Proofpoint TAP API (SIEM API)
- **Required:** Service principal with TAP API access
- **Data Types:** Messages blocked, messages delivered, clicks permitted, clicks blocked
- **Poll Interval:** 5 minutes (configurable)

```yaml
connector:
  type: proofpoint
  base_url: https://tap-api-v2.proofpoint.com
  auth:
    service_principal: "${PROOFPOINT_PRINCIPAL}"
    secret: "${PROOFPOINT_SECRET}"
  data_streams:
    - messages_blocked
    - messages_delivered
    - clicks_blocked
    - clicks_permitted
```

**Key Detection Signals:**
- Phishing URLs and malicious attachments identified pre-delivery
- Post-delivery URL rewriting and click tracking
- Impostor/BEC attempts based on header analysis
- Threat actor campaign attribution via Proofpoint Threat Intelligence

### Mimecast

Collect email security logs from Mimecast Secure Email Gateway, including rejected and held messages, URL protection logs, attachment protection events, and impersonation detections.

- **Connection Method:** Mimecast API (OAuth 2.0 or Application Key)
- **Required Permissions:** Basic read access to SIEM logs
- **Data Types:** Receipt logs, process logs, URL logs, attachment protect logs, impersonation protect logs

**Key Detection Signals:**
- URL rewriting and sandbox detonation results
- Attachment sandboxing verdicts
- Impersonation detection (display name, domain similarity)
- Internal email protect (lateral phishing detection)

### Microsoft Exchange Online (Microsoft 365)

Ingest message trace logs, Safe Attachments verdicts, Safe Links click data, and threat explorer findings from Microsoft Defender for Office 365.

- **Connection Method:** Microsoft Graph API and Office 365 Management Activity API (OAuth 2.0)
- **Required Permissions:** `ThreatAssessment.Read.All`, `MailboxSettings.Read`
- **Data Types:** Message traces, threat detections, DLP policy matches, mail flow rules

```bash
# Verify API access (optional)
curl -H "Authorization: Bearer <ACCESS_TOKEN>" \
  "https://graph.microsoft.com/v1.0/security/alerts?$filter=category eq 'email'"
```

**Key Detection Signals:**
- Zero-hour auto purge (ZAP) actions
- Safe Attachments detonation verdicts
- Phish and spam confidence levels
- Mail flow rule violations

### Barracuda Email Gateway

Collect security event logs from Barracuda Email Security Gateway, including spam, virus, and advanced threat detection events.

- **Connection Method:** Syslog forwarding or Barracuda REST API
- **Data Types:** Message log, action log, ATP (Advanced Threat Protection) events

**Key Detection Signals:**
- Inbound/outbound threat verdicts
- ATP sandbox results for attachments and URLs
- Encryption policy enforcement events

## Phishing Detection and Response

Z Shield enhances raw email security data with cross-platform correlation:

- **URL Enrichment** -- Submitted URLs are checked against threat intelligence feeds (VirusTotal, Abuse.ch, Mandiant) in real time.
- **Attachment Analysis** -- File hashes from email attachments are correlated with EDR detections and sandbox results.
- **Identity Correlation** -- Email recipients are mapped to identity provider accounts to detect compromised users who clicked phishing links and subsequently exhibited anomalous login behavior.
- **Campaign Clustering** -- Z Shield groups related phishing emails by sender infrastructure, subject line patterns, and payload similarity to identify coordinated campaigns.

## Email Threat Analytics

The **Email Security Dashboard** provides at-a-glance metrics:

- Total messages scanned vs. threats detected (daily/weekly/monthly)
- Top targeted users and departments
- Phishing link click rates (pre- and post-awareness training)
- Threat type breakdown (phishing, BEC, malware, spam)
- Mean time to detect and mean time to quarantine

## Best Practices

- **Enable retroactive scanning** where supported, so that newly identified IOCs trigger re-evaluation of previously delivered emails.
- **Integrate with ticketing** (Jira, ServiceNow) to automatically create incidents when high-confidence BEC or credential phishing is detected.
- **Combine with identity monitoring** to detect the full kill chain from phishing email to account compromise to lateral movement.
