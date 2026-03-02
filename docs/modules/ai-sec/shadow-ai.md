---
sidebar_position: 2
title: "Shadow AI Discovery"
---

# Shadow AI Discovery

Shadow AI Discovery gives security teams complete visibility into every AI tool being used across the organization -- whether it was approved by IT or not. From the Shadow AI dashboard you can assess organizational risk, inventory every detected tool, and enforce governance policies in real time.

## Shadow AI Dashboard

The dashboard is your command center for AI tool risk. It surfaces the most important signals at a glance:

### Summary Statistics

Five stat cards show the current state of AI tool exposure:

| Metric | What It Measures |
|--------|-----------------|
| **AI Tools Detected** | Total distinct AI tools discovered in use across the organization |
| **Unauthorized** | Tools that are in use but have not been approved by IT |
| **Blocked** | Tools explicitly prohibited and blocked by policy |
| **Users Affected** | Distinct users who have accessed at least one AI tool |
| **DLP Violations Today** | Number of data loss prevention policy violations triggered through AI tools today |

### AI Risk Score

The **AI Risk Score** (0--100) is a composite metric that reflects the overall risk posture of AI tool usage in your organization:

- **0--39**: Low risk -- most tools are sanctioned; few DLP violations
- **40--69**: Medium risk -- mix of authorized and unauthorized tools; moderate violation rate
- **70--100**: High risk -- significant unauthorized tool presence; elevated DLP violation rate

The score bar is color-coded green (low), amber (medium), or red (high), with a breakdown panel showing the count of Sanctioned, Unauthorized, and Blocked tools contributing to the score.

### Top AI Tools by Usage

A ranked table of the most actively used AI tools across your organization:

- **Tool** -- Name and vendor of the AI service
- **Category** -- Type of AI tool (generative AI, code assistant, image generation, AI search, voice AI, video AI)
- **Users** -- Number of distinct users who have accessed the tool
- **Data Sent** -- Estimated volume of data transmitted to this tool (KB, MB, or GB)
- **Risk** -- Tool-level risk rating: High, Medium, or Low
- **Status** -- Current governance status: Sanctioned, Unauthorized, or Blocked

### Top At-Risk Users

A table of users with the highest AI tool usage and risk exposure, showing tool count, sessions, data volume, and risk level. Use this to prioritize investigations and targeted user awareness training.

## AI Tool Inventory

The Tool Inventory page provides a complete, filterable list of every AI tool detected in your environment. It is the primary place to classify tools and take governance action.

### Filtering and Search

Use the filter bar to narrow the tool list:

- **Search** -- Filter by tool name or vendor name
- **Category** -- Filter to a specific AI tool type (generative AI, code assistant, image generation, AI search, voice AI, video AI)
- **Status** -- Show only tools with a specific governance status (Unauthorized, Sanctioned, Blocked)
- **Clear filters** -- Reset all filters with a single click

### Tool Table Columns

| Column | Description |
|--------|-------------|
| **Tool** | Tool name and vendor |
| **Category** | AI tool type |
| **Domains** | Domains associated with this tool (e.g., `chat.openai.com`) |
| **Users** | Number of users who have accessed the tool |
| **Sessions** | Total number of sessions recorded |
| **Data Sent** | Estimated data volume transmitted to this tool |
| **Risk** | Risk level: High (red), Medium (amber), Low (green) |
| **Status** | Current governance status |
| **Action** | Governance action buttons |

### Governing AI Tools

Each tool row has three action buttons for governance:

- **Sanction** (green shield check icon) -- Mark the tool as approved for organizational use. The tool's status changes to Sanctioned and it will no longer appear in unauthorized tool counts.
- **Block** (red ban icon) -- Mark the tool as prohibited. Blocked status is used by enforcement controls (proxy/firewall integrations) to restrict access.
- **Mark Unauthorized** (amber shield-X icon) -- Reset the tool to Unauthorized status if a previously sanctioned tool should no longer be approved.

Only the action buttons for states different from the tool's current status are shown. For example, a Sanctioned tool shows Block and Mark Unauthorized; a Blocked tool shows Sanction and Mark Unauthorized.

## Discovered AI Tool Categories

Z Shield automatically categorizes detected AI tools:

| Category | Examples |
|----------|---------|
| **Generative AI** | ChatGPT, Claude, Gemini, Grok |
| **Code Assistant** | GitHub Copilot, Cursor, Replit AI, Tabnine |
| **Image Generation** | Midjourney, DALL-E, Stable Diffusion, Adobe Firefly |
| **AI Search** | Perplexity, You.com, Bing Copilot |
| **Voice AI** | ElevenLabs, Murf, Synthesia |
| **Video AI** | Runway ML, Pika, HeyGen |

## Risk Level Definitions

| Risk Level | Criteria |
|-----------|---------|
| **High** | Tool collects and potentially trains on submitted data; no enterprise DPA available; data processed outside approved regions; no SOC 2 certification |
| **Medium** | Tool has enterprise tier with data isolation options; some compliance certifications; data retention policy unclear |
| **Low** | Enterprise-grade data processing agreements; data isolation guaranteed; SOC 2 Type II certified; GDPR and CCPA compliant; no model training on customer data |

## Interpreting Usage Patterns

Use the inventory data to identify shadow AI risk patterns:

- **High data volume to unauthorized tools** -- Prioritize tools where significant data is flowing to unauthorized services. This indicates active, ongoing data exposure.
- **Many users on a single unauthorized tool** -- Wide adoption of an unauthorized tool suggests an unmet business need. Consider sanctioning an approved alternative or creating an enterprise agreement with the vendor.
- **Blocked tool still showing usage** -- If a blocked tool continues to show sessions, your enforcement controls may not be fully deployed. Verify proxy or firewall integration configuration.

## Next Steps

- [AI-DLP](./dlp.md) -- Define content inspection policies and respond to sensitive data violations in AI interactions
- [Overview](./overview.md) -- Return to the AI Security module overview
