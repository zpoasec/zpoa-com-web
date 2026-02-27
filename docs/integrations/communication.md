---
sidebar_position: 10
title: Communication Integrations
---

# Communication Integrations

ZPOA Shield delivers real-time alert notifications, incident updates, and escalation triggers through your team's existing communication channels. These integrations ensure that the right people are informed at the right time, reducing mean time to acknowledge (MTTA) and mean time to respond (MTTR).

## Supported Platforms

### Slack

Send alert notifications, incident summaries, and interactive response actions to Slack channels.

#### Setup

1. Navigate to **Settings > Integrations > Communication > Slack**.
2. Click **Connect to Slack** to initiate the OAuth 2.0 authorization flow.
3. Select the Slack workspace and authorize ZPOA Shield.
4. Configure default notification channels and routing rules.

#### Capabilities

- **Channel-based routing** -- Route alerts to specific channels based on severity, category, or affected asset group (e.g., `#soc-critical`, `#cloud-alerts`, `#endpoint-alerts`).
- **Interactive actions** -- Analysts can acknowledge, escalate, or suppress alerts directly from Slack using message buttons.
- **Incident channels** -- Automatically create a dedicated Slack channel for each high-severity incident with relevant stakeholders invited.
- **Threaded updates** -- Subsequent updates to an alert (status changes, new evidence, analyst notes) are posted as thread replies to the original notification.

```json
{
  "notification_rules": [
    {
      "condition": "severity >= critical",
      "channel": "#soc-critical",
      "mention": "@oncall-soc"
    },
    {
      "condition": "category == 'phishing'",
      "channel": "#email-security",
      "mention": "@email-security-team"
    }
  ]
}
```

### Microsoft Teams

Deliver alert notifications and incident summaries to Microsoft Teams channels via incoming webhooks or the ZPOA Shield Teams app.

#### Setup

1. Navigate to **Settings > Integrations > Communication > Microsoft Teams**.
2. Choose the connection method:
   - **Incoming Webhook** -- Generate a webhook URL in your Teams channel and paste it into ZPOA Shield.
   - **Teams App (Bot)** -- Install the ZPOA Shield app from the Teams App Store for richer interactive features.
3. Configure notification routing rules.

#### Capabilities

- **Adaptive Cards** -- Notifications are rendered as rich Adaptive Cards with severity indicators, affected asset details, and action buttons.
- **Channel routing** -- Direct alerts to specific Teams channels based on configurable rules.
- **Incident tabs** -- Pin an incident investigation tab in a Teams channel for collaborative triage.

### PagerDuty

Trigger PagerDuty incidents for critical security alerts, leveraging PagerDuty's on-call scheduling, escalation policies, and multi-channel notification capabilities.

#### Setup

1. Navigate to **Settings > Integrations > Communication > PagerDuty**.
2. Enter your PagerDuty **Integration Key** (Events API v2) or authenticate via OAuth 2.0.
3. Map ZPOA Shield severity levels to PagerDuty urgency levels.

#### Capabilities

- **Automatic incident creation** -- Critical and high-severity alerts automatically trigger PagerDuty incidents.
- **Escalation policies** -- Leverage existing PagerDuty escalation chains to ensure alerts are never missed.
- **Auto-resolve** -- When a ZPOA Shield alert is closed or marked as false positive, the corresponding PagerDuty incident is automatically resolved.
- **Severity mapping** -- Map ZPOA Shield severity levels (Critical, High, Medium, Low, Info) to PagerDuty urgency (High, Low).

```yaml
pagerduty:
  integration_key: "${PAGERDUTY_INTEGRATION_KEY}"
  severity_mapping:
    critical: high
    high: high
    medium: low
    low: low
  auto_resolve: true
```

### Generic Webhooks

Send alert notifications to any HTTP endpoint via configurable webhooks. This enables integration with custom tools, ChatOps bots, SOAR platforms, or any system that accepts HTTP POST requests.

#### Setup

1. Navigate to **Settings > Integrations > Communication > Webhooks**.
2. Click **Add Webhook** and enter the target URL.
3. Configure authentication (Bearer token, Basic auth, HMAC signature, or none).
4. Customize the JSON payload template.
5. Set trigger conditions (severity, category, source filters).

```bash
POST https://your-system.example.com/api/security-alerts
Content-Type: application/json
Authorization: Bearer <YOUR_TOKEN>
X-ZPOA-Signature: sha256=<HMAC_SIGNATURE>

{
  "alert_id": "ALT-2025-00847",
  "title": "Brute force attack detected",
  "severity": "high",
  "source": "okta",
  "timestamp": "2025-06-15T14:32:00Z",
  "affected_user": "jdoe@example.com",
  "mitre_technique": "T1110.001"
}
```

#### Capabilities

- **Custom payload templates** -- Use Handlebars-style templating to structure the webhook payload to match your target system's expected format.
- **Retry logic** -- Failed webhook deliveries are retried with exponential backoff (up to 5 retries).
- **HMAC verification** -- ZPOA Shield signs every webhook payload with a shared secret so the receiver can verify authenticity.
- **Delivery logs** -- View delivery status, response codes, and latency for every webhook invocation under **Settings > Webhooks > Delivery Log**.

## Notification Management

### Alert Fatigue Prevention

- **Deduplication** -- Repeated alerts for the same event are consolidated into a single notification with an updated count.
- **Quiet hours** -- Suppress non-critical notifications during defined maintenance windows or off-hours.
- **Digest mode** -- Aggregate low-severity alerts into periodic summary messages (hourly or daily) instead of individual notifications.

### Routing Rules

Configure granular routing rules under **Settings > Integrations > Communication > Routing Rules** to control which alerts reach which channels and recipients. Rules support conditions based on severity, source connector, asset group, MITRE technique, and custom tags.
