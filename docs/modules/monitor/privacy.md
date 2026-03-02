---
sidebar_position: 16
title: "Privacy Settings"
---

# Privacy Settings

Monitor's privacy architecture gives organizations full control over what data is collected, how it is stored, and who can access it. Privacy settings are configured per tenant and enforced at both the agent and server level.

## Privacy Levels

Choose the monitoring depth that matches your organization's requirements:

### Metadata Only (Default)

- Application names and categories recorded, window titles hashed
- Web domains recorded, full URLs not captured
- File operations logged with hashed file paths
- No content capture, no screenshots, no recordings
- Ideal for: productivity analytics, basic insider threat detection

### Balanced

- Application names and window titles recorded (un-hashed)
- Full URLs recorded (domain + path)
- File paths recorded in full
- Screenshots on alert only
- Ideal for: compliance monitoring, DLP, investigation support

### Full Monitoring

- All activity data captured in full detail
- Screenshots on alert + periodic screenshots
- Selective or always-on recording available
- Audio capture available
- Ideal for: high-security environments, financial services, government

## Excluded Groups

Exempt specific user groups from monitoring entirely:

- Add groups by name (e.g., "Executives", "Legal", "HR")
- Excluded users' activity is not captured or stored
- Agents on excluded users' endpoints disable the monitor module automatically
- Changes to excluded groups are logged in the audit trail

## Recording Configuration

Control session recording behavior:

- **Screenshot on alert** -- Capture screenshots when policies trigger (default: enabled)
- **Periodic screenshots** -- Capture at a configurable interval (1, 5, 10, 15, 30 minutes). Default: disabled
- **Selective recording** -- Enable recording during approved investigations. Default: enabled
- **Always-on recording** -- Continuous recording for all monitored users. Default: disabled
- **Working hours only** -- Restrict recording to configured work hours (reduces storage and privacy concerns)

## Employee Notification

Configure employee awareness of monitoring:

- **Tray icon** -- Show a system tray icon indicating monitoring is active. Mandatory for always-on recording
- **Consent dialog** -- Show a GDPR consent dialog on login. Configurable per jurisdiction
- **Notification frequency** -- One-time acknowledgment or periodic reminders

## Data Retention

Configure how long monitored data is retained:

- **Activity data** -- Default: 90 days. ClickHouse TTL automatically deletes expired data
- **Screenshots** -- Default: 30 days
- **Recordings** -- Default: 30 days
- **Audio and transcripts** -- Default: 90 days
- **Investigation evidence** -- Retained for the investigation duration + configurable hold period

## Compliance

Monitor supports compliance with privacy regulations:

- **GDPR** -- Consent dialogs, right-to-erasure via data retention TTL, excluded groups for data minimization
- **CCPA** -- Data collection disclosure, opt-out mechanism via excluded groups
- **HIPAA** -- Audit logging, access controls, data encryption at rest and in transit
- **SOC 2** -- Activity logs and privacy configuration changes feed into Comply for audit evidence
