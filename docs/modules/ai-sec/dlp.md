---
sidebar_position: 3
title: "AI Data Loss Prevention"
---

# AI Data Loss Prevention (AI-DLP)

AI-DLP continuously inspects what data your employees share with AI tools and enforces content policies to prevent sensitive information from reaching unauthorized or risky services. Unlike traditional DLP tools that focus on email and file transfers, AI-DLP is purpose-built for the conversational, prompt-based interaction model of modern AI tools.

## How AI-DLP Works

AI-DLP operates through a two-layer system:

1. **Policies** -- You define what sensitive content to detect (e.g., PII, credentials, source code) and what action to take when it is found (alert, block, or log)
2. **Violations** -- Every time a policy matches content in an AI interaction, a violation event is recorded with full context: who, which tool, what type of data, when, and what action was taken

## DLP Violations

The Violations page is your real-time view of sensitive data exposure through AI tools.

### Summary Statistics

Four cards at the top of the Violations page show today's violation activity:

| Metric | Description |
|--------|-------------|
| **Today's Violations** | Total number of DLP policy matches recorded today |
| **Critical Violations** | Violations matched by Critical-severity policies |
| **High Violations** | Violations matched by High-severity policies |
| **Blocked Interactions** | Violations where the action taken was Block (interaction prevented) |

### Filtering Violations

Use the filter bar to focus on the violations that matter most:

- **Severity** -- Filter by Critical, High, Medium, or Low
- **Data Type** -- Filter by the type of sensitive data detected (PII, credentials, source code, IP, financial, health data, custom)
- **Action** -- Filter by the response taken (Alert, Block, Log)
- **Tool** -- Filter by the AI tool name where the violation occurred
- **User** -- Filter by specific user (identity ID or name)

### Violation Table

Each row in the violations table represents a single detected event:

| Column | Description |
|--------|-------------|
| **Time** | When the violation was detected |
| **User** | The identity that triggered the violation |
| **AI Tool** | The AI service the content was sent to |
| **Data Type** | Category of sensitive data detected |
| **Content Preview** | Redacted snippet showing the context of the match |
| **Severity** | Policy severity level (color-coded chip) |
| **Action** | What AI-DLP did in response (Alert, Block, or Log) |

### Expanding a Violation

Click the expand icon on any row to see the full violation detail panel:

- **Policy Name** -- Which DLP policy triggered the event
- **URL** -- The specific endpoint or page where the AI interaction occurred
- **Content Preview** -- A redacted content excerpt showing the matched text in context (sensitive values are masked with `***`)
- **Timestamp** -- Precise event time

Use expanded details when investigating an incident or gathering evidence for a compliance audit.

## DLP Policies

Policies define what content AI-DLP inspects for and how it responds. Navigate to **AI-DLP → Policies** to manage your policy set.

### Policy Table

The policy list shows all configured policies with their current state:

| Column | Description |
|--------|-------------|
| **Policy Name** | Descriptive name for the policy |
| **Data Type** | Category of sensitive data this policy detects |
| **Pattern** | The regex or keyword list used for detection |
| **Action** | Response when the policy matches (Alert, Block, Log) |
| **Severity** | Severity level assigned to violations from this policy |
| **Matches** | Total number of times this policy has matched content |
| **Enabled** | Toggle to enable or disable the policy without deleting it |

### Creating a Policy

Click **Create Policy** to open the policy creation dialog. Fill in the following fields:

**Policy Name** *(required)*
A clear, descriptive name that identifies what the policy detects.
Example: `SSN Detection`, `API Key Leak Prevention`, `Source Code Protection`

**Data Type** *(required)*
Select the category of sensitive data:

| Data Type | What It Covers |
|-----------|---------------|
| **PII** | Personally identifiable information (names, SSNs, emails, phone numbers, addresses) |
| **Credentials** | Passwords, API keys, tokens, private keys, secrets |
| **Source Code** | Code snippets, repository content, proprietary algorithms |
| **IP** | Intellectual property, trade secrets, internal documents |
| **Financial** | Account numbers, credit card data, financial projections, revenue figures |
| **Health Data** | Medical records, diagnoses, patient information, health insurance details |
| **Custom** | Any other sensitive content defined by your organization |

**Pattern**
A regex pattern or comma-separated keyword list to match against AI prompt content:

- **Regex examples**:
  - SSN: `\b\d{3}-\d{2}-\d{4}\b`
  - Email: `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`
  - AWS key: `AKIA[0-9A-Z]{16}`
  - Credit card: `\b(?:\d{4}[- ]){3}\d{4}\b`
- **Keyword examples**: `password, secret, api_key, private_key, bearer`

If left empty, AI-DLP uses built-in classifiers for the selected data type.

**Action**
What AI-DLP does when the policy matches:

| Action | Behavior |
|--------|---------|
| **Alert** | Notify the security team via the Violations dashboard (and configured alert channels) |
| **Block** | Prevent the AI interaction from completing and record the violation |
| **Log** | Silently record the violation without alerting. Use for baseline monitoring before enforcing |

**Severity**
Set the severity level for violations produced by this policy:

| Level | When to Use |
|-------|------------|
| **Critical** | Highly regulated data with zero-tolerance requirements (e.g., SSNs, private keys, patient records) |
| **High** | Sensitive business data requiring rapid response (e.g., financial data, proprietary source code) |
| **Medium** | Data that is sensitive but lower immediate impact (e.g., internal emails, project names) |
| **Low** | Informational monitoring with no immediate risk (e.g., brand keywords, competitor mentions) |

**Enable policy**
Policies can be created in a disabled state for testing, then enabled when ready to enforce.

### Editing a Policy

Click the **Edit** (pencil) icon on any policy row to open the edit dialog. All fields are editable. Click **Save Changes** to apply updates immediately.

### Enabling and Disabling Policies

Use the toggle in the **Enabled** column to activate or deactivate a policy without deleting it. Disabled policies stop matching new content but retain their historical violation records and match counts.

### Deleting a Policy

Click the **Delete** (trash) icon on a policy row to permanently remove it. Historical violations linked to the deleted policy are retained for audit purposes.

## Recommended Policy Set

Start with these three baseline policies to cover the most common AI data exposure scenarios:

### PII Detection
- **Data Type**: PII
- **Pattern**: `\b\d{3}-\d{2}-\d{4}\b|\b\d{9}\b` (SSNs) or leave blank for classifier
- **Action**: Alert
- **Severity**: Critical

### Credential Leak Prevention
- **Data Type**: Credentials
- **Pattern**: `password|secret|api_key|token|private_key|bearer|AKIA[0-9A-Z]{16}`
- **Action**: Block
- **Severity**: Critical

### Source Code Protection
- **Data Type**: Source Code
- **Pattern**: `def |class |import |function |SELECT \*|DROP TABLE` or leave blank for classifier
- **Action**: Alert
- **Severity**: High

## Integration with Z Shield

AI-DLP violation data flows through the Z Shield platform for correlation and response:

- **Fortress ITDR** -- Users who repeatedly trigger Critical or High violations can be automatically escalated to identity threats in Fortress ITDR with automated response workflows
- **Comply** -- Violation records serve as audit evidence for data protection regulations. AI-DLP policies align to GDPR Article 25 (privacy by design), HIPAA minimum necessary standard, and PCI-DSS data handling requirements
- **Detect (SIEM)** -- DLP events appear in the SIEM alert stream for correlation with endpoint activity, access anomalies, and threat intelligence

## Next Steps

- [Shadow AI Discovery](./shadow-ai.md) -- Discover and govern unauthorized AI tool usage across your organization
- [Overview](./overview.md) -- Return to the AI Security module overview
