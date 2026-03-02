---
sidebar_position: 5
title: "Activity Policies"
---

# Activity Policies

Activity policies define the rules that trigger alerts, screenshots, and investigations when user behavior matches specific patterns. Policies are the core detection engine for insider threats and data loss prevention.

## Policy Types

### File Volume Threshold

Alert when a user moves more files than expected within a time window:

- **Threshold** -- Number of file operations (copies, downloads, moves) within a configured window
- **Destinations** -- Filter by destination type: USB, cloud sync folder, email attachment, network share
- **File types** -- Optionally restrict to specific file extensions (documents, source code, databases)

### Application Blacklist

Alert when a user opens a prohibited application:

- **Blocked apps** -- Maintain a list of applications that should never be used on corporate endpoints
- **Response** -- Alert only, alert + screenshot, or alert + terminate process

### Web Category Blocking

Alert when a user visits websites in restricted categories:

- **Blocked categories** -- Social media, gambling, adult content, file sharing, or custom categories
- **Domain whitelist** -- Exceptions for specific domains within a blocked category

### USB Detection

Alert on any USB mass storage device insertion:

- **Device allowlist** -- Specify approved USB device serial numbers
- **Response** -- Alert, screenshot, or block file copy to USB

### After-Hours Activity

Alert when a user is active outside configured working hours:

- **Working hours** -- Define per-organization or per-department work schedules
- **Minimum duration** -- Only alert if after-hours activity exceeds a minimum threshold
- **Excluded users** -- Exempt on-call or shift workers from after-hours alerts

### Data Exfiltration Pattern

Composite detection combining multiple signals:

- **Multi-channel correlation** -- USB + email + cloud upload within a time window
- **Volume anomaly** -- File transfer volume significantly above the user's historical baseline
- **Sensitivity correlation** -- File operations involving classified or regulated data

## Policy Actions

Each policy can trigger one or more actions when matched:

- **Alert** -- Create a policy violation alert visible in the dashboard
- **Screenshot** -- Capture a screenshot of the user's screen at the moment of violation
- **Notify** -- Send a notification to the user's manager or the security team
- **Log** -- Record the event for compliance reporting without raising an alert
- **Escalate** -- Automatically escalate to Fortress ITDR as an identity threat

## Managing Policies

- Create, edit, enable, and disable policies from the Policies page
- Each policy has a name, description, severity (low/medium/high/critical), and enabled/disabled toggle
- Policies apply globally or can be scoped to specific user groups or departments
- View policy hit counts and effectiveness metrics over time
