---
sidebar_position: 1
title: "AI Security - Overview"
---

# AI Security

Z Shield **AI Security** gives security teams complete visibility and control over how artificial intelligence tools are used across the organization. As employees adopt AI assistants, coding copilots, image generators, and AI-powered search tools without IT authorization, AI Security closes the gap between shadow AI risk and enterprise data governance.

AI Security comprises two tightly integrated capabilities:

- **Shadow AI Discovery** -- Detect and inventory every AI tool in use across your organization, assess risk, and enforce sanctioned-tool policies
- **AI Data Loss Prevention (AI-DLP)** -- Inspect what sensitive data is being shared with AI tools, enforce content policies, and respond automatically to violations

## Why AI Security Matters

AI adoption is outpacing enterprise controls. Employees share customer PII with ChatGPT, paste source code into Copilot, and submit financial projections to Gemini -- often unaware of the data residency, model training, or compliance implications. Traditional DLP and CASB tools were not built to handle the conversational, prompt-based interaction model of modern AI tools.

Z Shield AI Security addresses this with purpose-built detection and policy enforcement for AI-specific data flows:

- **Shadow AI exposure** -- AI tools operating outside IT's view are the fastest-growing source of unsanctioned data egress
- **Sensitive data exfiltration** -- PII, credentials, source code, and financial data routinely appear in AI prompts
- **Compliance violations** -- GDPR, HIPAA, SOX, and PCI-DSS all impose restrictions that AI tool sharing may violate
- **Vendor risk** -- AI vendors have varying data retention policies, training practices, and geographic data residency

## Key Capabilities

### Shadow AI Discovery

- **Automatic AI tool detection** -- Continuously discover every AI tool in use across your organization, categorized by type: generative AI, code assistant, image generation, voice AI, video AI, and AI search
- **Risk-level assessment** -- Every discovered tool is rated high, medium, or low risk based on data handling practices, vendor reputation, and usage patterns
- **Per-tool governance** -- Mark tools as Sanctioned (approved for use), Unauthorized (detected but unapproved), or Blocked (prohibited); changes take effect across your policy controls immediately
- **Usage analytics** -- See which users are using each tool, how many sessions they have initiated, and how much data has been sent to each tool
- **Organization risk score** -- A composite risk score (0--100) aggregates tool risk levels, unauthorized tool prevalence, and DLP violation rates into a single indicator

### AI Data Loss Prevention

- **Content inspection policies** -- Define policies that scan AI interactions for PII, credentials, source code, IP, financial data, health information, or custom patterns
- **Regex and keyword matching** -- Write precise regex patterns (e.g., `\b\d{3}-\d{2}-\d{4}\b` for SSNs) or comma-separated keyword lists to detect sensitive content
- **Automated response** -- Configure each policy to Alert (notify security team), Block (prevent the interaction), or Log (record for audit)
- **Severity grading** -- Assign Critical, High, Medium, or Low severity to each policy so violations are prioritized correctly in your SOC workflow
- **Violation audit trail** -- Every DLP event is recorded with the user, tool, data type, redacted content preview, and the action taken

## How It Works

1. **Enable AI Security** -- AI Security is available on Pro and Enterprise plans. No agent deployment is required for discovery; AI-DLP works through integration with your network monitoring or proxy layer.
2. **Review discovered tools** -- Visit **Shadow AI → Dashboard** to see the tools already detected in your environment. The dashboard shows total tools, unauthorized count, affected users, and the overall risk score.
3. **Classify tools** -- Open **Shadow AI → Tool Inventory** and set the status of each discovered tool. Sanctioned tools are approved; block any tool that violates policy.
4. **Create DLP policies** -- Navigate to **AI-DLP → Policies** and create content inspection policies for the sensitive data types your organization handles (PII, credentials, source code, etc.).
5. **Monitor violations** -- The **AI-DLP → Violations** page shows every detected violation with the user, tool, data classification, severity, and the action taken. Use filters to focus on critical events or specific data types.
6. **Investigate** -- Drill into any violation to see the full context: content preview (redacted), URL, timestamp, and linked policy. Escalate to Fortress ITDR for identity-level response.

## Integration with Z Shield

AI Security connects with the rest of the Z Shield platform:

- **Fortress Identity** -- Users identified as high-risk through AI-DLP violations are automatically linked to Fortress identity risk scores and can trigger ITDR responses or step-up MFA via Continuous Adaptive Engine (CAE)
- **Monitor** -- Endpoint activity data from Monitor feeds AI tool usage patterns, correlating AI tool access with file access and data exfiltration signals
- **Comply** -- AI-DLP violation records and policy configurations serve as audit evidence for data protection frameworks (GDPR Article 25, NIST AI RMF, ISO 42001)
- **Detect (SIEM)** -- DLP events and shadow AI detections appear as alerts in the SIEM for correlation with other threat signals

## Next Steps

- [Shadow AI Discovery](./shadow-ai.md) -- Discover, inventory, and govern AI tool usage across your organization
- [AI Data Loss Prevention](./dlp.md) -- Define content inspection policies and monitor AI-related data violations
