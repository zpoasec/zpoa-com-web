---
sidebar_position: 6
title: "AI Governance"
---

# AI Tool Governance

As AI tools like ChatGPT, Claude, GitHub Copilot, and others become ubiquitous in the workplace, organizations need visibility and control over how these tools are being used. Fortress AI Governance provides a dedicated view of all AI/ML tools across your organization.

## Why AI Governance?

AI tools introduce unique risks that traditional SaaS management does not address:

- **Data leakage** -- Employees may paste sensitive code, customer data, or proprietary information into AI assistants
- **Shadow AI** -- Teams may adopt AI tools without IT or security awareness
- **Compliance risk** -- AI tool usage may violate data residency, privacy, or regulatory requirements
- **Cost proliferation** -- AI tool subscriptions can grow rapidly across departments
- **IP exposure** -- Code, designs, and business logic shared with AI models may be used for training

## AI Tool Inventory

Fortress tracks AI tools as a special category of SaaS applications. Applications are automatically flagged as AI tools when:

1. The application category is `ai_ml`
2. The `is_ai_tool` flag is set to `true`
3. The application matches known AI tool vendors (OpenAI, Anthropic, Google AI, Microsoft Copilot, etc.)

### Supported AI Tools

Fortress ships with 40+ pre-registered AI tool connectors including:

| Category | Tools |
|----------|-------|
| AI Assistants | Claude (Anthropic), ChatGPT (OpenAI), Google Gemini, Microsoft Copilot |
| Code Assistants | GitHub Copilot, Cursor, Tabnine, Codeium, Amazon Q Developer |
| Image/Video | Midjourney, DALL-E, Stability AI, Runway, Synthesia |
| Writing | Jasper, Copy.ai, Writer, Grammarly AI |
| ML Platforms | Hugging Face, Replicate, Together AI, AWS Bedrock, Azure OpenAI |
| Data Science | DataRobot, H2O.ai, Weights & Biases |

## Shadow AI Detection

Shadow AI is the unsanctioned use of AI tools within the organization. Fortress detects shadow AI through:

- **SSO/OAuth logs** -- Discover when employees authenticate with AI services
- **Network monitoring** -- Detect API calls to known AI endpoints (api.openai.com, api.anthropic.com, etc.)
- **Expense data** -- Match AI-related charges on corporate cards
- **Browser extensions** -- Detect AI assistant browser plugins

When shadow AI is detected, security teams can:

1. **Sanction** the tool after security review
2. **Block** the tool and notify users of approved alternatives
3. **Monitor** usage patterns before making a decision

## Risk Assessment

Each AI tool is assessed across multiple risk dimensions:

- **Data Sensitivity** -- What data does the tool process? (public, internal, confidential, restricted)
- **Data Residency** -- Where is data stored and processed?
- **Training Data Usage** -- Does the vendor use customer data for model training?
- **SOC 2 / ISO 27001** -- Does the vendor maintain security certifications?
- **BAA Availability** -- Can the vendor sign a Business Associate Agreement (for HIPAA)?
- **DPA Compliance** -- Does the vendor offer GDPR-compliant data processing agreements?

## Usage Monitoring

Track how AI tools are being used across the organization:

- **Login frequency** -- How often do users access the tool?
- **User count** -- How many unique users are active?
- **Department distribution** -- Which teams use which AI tools?
- **Cost per user** -- Average monthly cost per active user

## Governance Workflow

1. **Discover** -- Automatically detect AI tool usage across the organization
2. **Assess** -- Evaluate each tool against security, privacy, and compliance criteria
3. **Decide** -- Sanction, block, or flag tools for further review
4. **Enforce** -- Apply policies through IdP integration (block SSO, require MFA, etc.)
5. **Monitor** -- Continuously track usage and detect new tools

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/fortress/saas/ai-tools` | List all AI/ML tools |
| PUT | `/fortress/saas/apps/:id` | Update AI tool status (sanction/block) |
| GET | `/fortress/saas/apps/:id/licenses` | List users with access to an AI tool |
| GET | `/fortress/saas/apps/:id/usage` | List AI tool usage events |

All endpoints are prefixed with `/api/v1` and require a valid Bearer token.
