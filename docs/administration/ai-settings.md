---
sidebar_position: 5
title: AI / LLM Settings
---

Z Shield's AI-powered features (Compliance Copilot, AI Policy Generation, AI Evidence Validation, AI Audit Readiness Reports, and AI Remediation Plans) require a configured AI provider. This page explains how to set up and manage your AI provider connection.

## Supported Providers

| Provider | Type | Description |
|----------|------|-------------|
| **Ollama** | Self-hosted | Run open-source models (Llama, Mistral, etc.) on your own infrastructure. Full data sovereignty. |
| **AWS Bedrock** | Cloud | Access foundation models (Claude, Titan, Llama) through your AWS account. Data stays in your AWS region. |
| **OpenAI** | Cloud | GPT-4o and other OpenAI models via API key. |
| **Anthropic** | Cloud | Claude models via API key. |

## Configuring a Provider

1. Navigate to **Settings > AI / LLM**.
2. Click **Add Provider**.
3. Select the provider type.
4. Enter the required configuration:

### Ollama

| Field | Description |
|-------|-------------|
| Endpoint URL | The URL of your Ollama instance (e.g., `http://ollama.internal:11434`) |
| Model | The model name to use (e.g., `llama3.1`, `mistral`) |

### AWS Bedrock

| Field | Description |
|-------|-------------|
| Region | The AWS region where Bedrock is available (e.g., `us-east-1`) |
| Model ID | The Bedrock model identifier (e.g., `anthropic.claude-3-sonnet`) |
| Access Key ID | Your AWS access key with Bedrock permissions |
| Secret Access Key | Your AWS secret key |

### OpenAI

| Field | Description |
|-------|-------------|
| API Key | Your OpenAI API key |
| Model | The model to use (e.g., `gpt-4o`, `gpt-4o-mini`) |

### Anthropic

| Field | Description |
|-------|-------------|
| API Key | Your Anthropic API key |
| Model | The model to use (e.g., `claude-sonnet-4-20250514`) |

## Setting the Active Provider

After adding a provider, click **Set Active** to designate it as the provider for all AI features. Only one provider can be active at a time. Changing the active provider takes effect immediately.

## Testing the Connection

Click **Test Connection** to verify that Z Shield can reach the configured provider and that the credentials are valid. A successful test confirms the provider is ready for use.

## Graceful Degradation

If no AI provider is configured or the active provider is unreachable:

- All AI buttons and features remain visible in the interface.
- Clicking any AI feature displays a clear message: "No active AI provider configured -- go to Settings > AI / LLM to configure one."
- Non-AI features (manual compliance assessment, evidence collection, framework mapping) are unaffected.

## Security Considerations

- **Data sent to the provider** includes compliance context (framework names, control descriptions, control statuses, evidence metadata, and risk summaries). Raw evidence files are not sent.
- **Self-hosted providers** (Ollama) keep all data within your infrastructure.
- **Cloud providers** process data according to their respective data handling policies. Review your provider's terms before configuring.
- **API keys** are encrypted at rest and never displayed after initial entry.
