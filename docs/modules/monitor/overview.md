---
sidebar_position: 1
title: "Monitor - Overview"
---

# Monitor: User Activity Intelligence

Z Shield **Monitor** gives security teams and managers complete visibility into how people interact with sensitive data, applications, and systems across the organization. Purpose-built for insider threat detection, workforce analytics, and data loss prevention, Monitor combines metadata-first privacy with enterprise-grade surveillance capabilities when investigations demand it.

## Key Capabilities

### Real-Time Activity Monitoring

Monitor captures every meaningful user action across endpoints, applications, and the web:

- **Application tracking** -- See which apps each user is actively using, for how long, and how they are categorized (productive, unproductive, neutral)
- **Web activity** -- Domain-level web tracking via DNS monitoring, with optional full-URL capture for investigations
- **File operations** -- Track file creates, copies, moves, deletes, and renames across monitored directories, with special detection for USB and cloud sync destinations
- **USB and removable media** -- Detect device insertions, track file copies to external storage, and enforce device policies
- **Idle and session tracking** -- Distinguish active work from idle time, track login/logout/lock/unlock events, and monitor remote sessions (RDP, SSH)

### Insider Threat Detection

Monitor identifies insider risk through behavioral analysis, peer-group comparison, and policy-driven alerting:

- **Composite risk scoring** -- Every user receives a continuously updated insider threat score (0-100) based on data exfiltration signals, behavioral anomalies, access patterns, and policy violations
- **Peer-group baselines** -- Automatically discover peer groups by role, department, or access pattern. Flag individuals deviating significantly from their group norm
- **Slow-moving threat detection** -- Multi-week correlation windows catch gradual data exfiltration, privilege accumulation, and behavioral shifts that point-in-time tools miss
- **Pre-departure risk** -- Correlate resume activity, job board visits, external communication spikes, and data download patterns to surface flight risk before data walks out the door

### Data Loss Prevention

Monitor provides deep visibility into how sensitive data moves through the organization:

- **File volume anomalies** -- Detect unusual spikes in file downloads, copies, or transfers that exceed historical baselines
- **Data exfiltration patterns** -- Correlate USB usage, cloud upload activity, large email attachments, and print jobs to identify multi-channel data theft
- **Data classification integration** -- Cross-reference file activity with data sensitivity labels to prioritize alerts on classified or regulated data
- **Shadow IT detection** -- DNS monitoring and application tracking surface unauthorized SaaS apps, personal cloud storage, and file-sharing services

### Workforce Productivity Analytics

Monitor helps managers understand work patterns and optimize team performance:

- **Productivity scoring** -- Daily and weekly productivity metrics based on time spent in categorized applications
- **Active vs. idle analysis** -- Understand actual productive hours vs. idle time per user and per team
- **Top apps and websites** -- Rank applications and web domains by usage time to understand work patterns
- **Department benchmarking** -- Compare productivity metrics across teams and departments

### Session Recording (3-Tier)

Three levels of visual evidence collection, configurable per tenant and per user:

- **Screenshots on alert** -- Capture a screenshot automatically when a policy triggers (USB insert, blacklisted app, data exfil pattern). Low storage, high value
- **Selective recording** -- Continuous screen recording for specific users under investigation. Requires approval and legal consent with automatic expiration
- **Always-on recording** -- Full continuous recording for all monitored users. Configurable quality, frame rate, and working hours. Employee notification mandatory

### Audio Intelligence

Full audio capture with AI-powered transcription and keyword detection:

- **Microphone and system audio capture** -- Record conversations during meetings or ambient audio, with configurable sources (microphone, system audio, or both)
- **AI transcription** -- Automatic speech-to-text with speaker diarization (who said what)
- **Keyword dictionaries** -- Define custom keyword and phrase lists for DLP. Get alerted when sensitive terms are spoken in conversations
- **Sentiment analysis** -- Detect distress, coercion, or anomalous emotional patterns in voice communications

### AI-Powered Analysis

Vision and language AI models analyze screenshots, recordings, and transcripts automatically:

- **Sensitive data detection** -- AI scans screenshots and recordings for PII, credentials, financial data, and classified documents visible on screen
- **Content classification** -- Automatically categorize what users are doing (coding, browsing, data entry, social media) from visual evidence
- **Compliance violation detection** -- AI flags unauthorized data handling, phishing pages, and social engineering attempts
- **On-demand investigation** -- Analysts can submit any screenshot, recording, or transcript for instant AI analysis with structured findings

### Remote Monitoring and Management (RMM)

Full remote control and management capabilities built on the endpoint agent:

- **Remote desktop** -- Low-latency screen sharing with full mouse and keyboard control. Consent prompt configurable per tenant
- **Remote shell** -- Interactive terminal sessions (PowerShell, Bash) with command logging and configurable blocklists
- **File transfer** -- Bidirectional file transfer with DLP scanning. Browse the remote filesystem from your browser
- **Software deployment** -- Push packages to individual agents or groups with scheduling, rollback, and status tracking
- **Patch management** -- Scan endpoints for missing patches, track compliance scores, and deploy patches with approval workflows
- **System diagnostics** -- Live CPU, memory, disk, and network monitoring. Remote service management and event log viewing

### Timesheet and Time Tracking

Employee time tracking powered by activity monitoring data:

- **Auto-populated timesheets** -- Time entries generated automatically from application usage and active/idle detection
- **Project tracking** -- Assign time to projects and tasks, with billable vs. non-billable classification
- **Approval workflows** -- Weekly timesheet submission with manager review and approval
- **Overtime and wellness alerts** -- Detect overwork patterns (>10h/day, >50h/week, weekend work) and notify managers of burnout risk

## Privacy by Design

Monitor is built with a metadata-first privacy architecture that gives organizations full control over what data is collected and how it is used:

- **Metadata-only default** -- Window titles are hashed, URLs are domain-only, file paths are anonymized. Content is never captured unless explicitly configured
- **Per-tenant privacy levels** -- Choose between metadata-only, balanced, or full monitoring modes for each tenant
- **Excluded groups** -- Exempt specific user groups (executives, HR, legal) from monitoring entirely
- **Employee notification** -- Mandatory tray icon notification for always-on recording. Optional GDPR consent dialogs
- **Retention controls** -- Configurable data retention periods with automatic deletion. Default: 90 days for activity data, 30 days for recordings
- **Audit trail** -- Every privacy configuration change, investigation activation, and recording access is logged

## How It Works

1. **Deploy agents** -- The Z Shield endpoint agent includes a monitor module that captures user activity. Enable monitoring from the console.
2. **Configure privacy** -- Set the privacy level, excluded groups, and recording mode for your organization.
3. **Define policies** -- Create activity policies for file volume thresholds, application blacklists, web category blocking, USB detection, after-hours work, and data exfiltration patterns.
4. **Monitor in real time** -- The Monitor dashboard shows active, idle, and offline users with live productivity metrics, policy violations, and insider threat scores.
5. **Investigate** -- When anomalies surface, open an investigation for targeted users with enhanced monitoring, session recording, and AI-powered analysis.
6. **Integrate** -- Insider threat scores feed into Fortress identity governance and ITDR. Activity anomalies auto-create identity threats with automated response.

## What Makes Monitor Different

Monitor is not a standalone surveillance tool -- it is deeply integrated with Z Shield's identity governance, threat detection, and compliance capabilities:

- **Behavioral Access Control** -- High insider threat scores degrade identity trust scores in Fortress CAE, automatically triggering step-up MFA, access reviews, or session termination
- **ITDR integration** -- Activity anomalies (data exfiltration, after-hours access, suspicious file patterns) automatically create identity threats in Fortress ITDR with full auto-response workflows
- **Identity context** -- Every activity event is enriched with full identity context from Fortress IGA: roles, groups, department, entitlements, risk score
- **AI agent monitoring** -- AI agents and bots monitored through Fortress agent governance receive the same insider threat scoring and UEBA baselines as human users
- **Compliance evidence** -- Activity logs and policy compliance data feed into Comply for audit evidence and regulatory reporting

## Next Steps

- [Activity Dashboard](./dashboard.md) -- Real-time overview of user activity, productivity, and violations
- [Activities and Timeline](./activities.md) -- Search, filter, and replay user activity events
- [Productivity Analytics](./productivity.md) -- Workforce productivity metrics and benchmarking
- [Activity Policies](./policies.md) -- Configure monitoring rules and alert triggers
- [Insider Threat Scoring](./insider-threats.md) -- Composite risk scores and peer-group analysis
- [Investigations](./investigations.md) -- Enhanced monitoring with approval workflows
- [Session Recording](./recordings.md) -- Screenshots and screen recording management
- [Audio Intelligence](./audio.md) -- Audio capture, transcription, and keyword detection
- [AI Analysis](./ai-analysis.md) -- Vision and language AI for media analysis
- [Data Exfiltration](./data-exfiltration.md) -- File movement tracking and DLP alerts
- [Remote Management](./remote.md) -- Remote desktop, shell, file transfer, and diagnostics
- [Software Deployment](./deployment.md) -- Package management and patch compliance
- [Timesheet](./timesheet.md) -- Time tracking and approval workflows
- [Wellness](./wellness.md) -- Burnout detection and work-life balance monitoring
- [Privacy Settings](./privacy.md) -- Privacy level configuration and compliance controls
