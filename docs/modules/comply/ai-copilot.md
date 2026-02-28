---
sidebar_position: 5
title: Compliance Copilot
---

The Compliance Copilot is a conversational AI assistant built into the Comply module. It answers compliance questions using your live framework data, control statuses, evidence artifacts, and risk register -- providing evidence-backed responses instead of generic guidance.

## Overview

Traditional compliance queries require analysts to manually navigate frameworks, cross-reference control statuses, and review evidence. The Compliance Copilot eliminates this workflow by letting you ask natural-language questions and receiving answers grounded in your actual compliance posture.

The Copilot draws on:

- Active framework configurations and control statuses.
- Evidence artifacts and their validity status.
- Risk register entries and treatment plans.
- Historical compliance snapshots and trend data.

## Accessing the Copilot

Navigate to **Comply > Dashboard** and click the **AI Copilot** button in the bottom-right corner of the screen. A slide-out chat panel opens on the right side of the dashboard.

## Using the Copilot

Type your question in the input field and press **Send**. The Copilot processes your question, gathers relevant compliance context, and returns an evidence-backed response.

### Example Questions

- "Am I HIPAA compliant for PHI at rest?"
- "Which SOC 2 controls are currently failing?"
- "What evidence is missing for ISO 27001 Annex A.8?"
- "Summarize my PCI-DSS compliance posture."
- "What are the highest-priority compliance gaps across all frameworks?"
- "How has my SOC 2 score changed over the past 30 days?"

### Context Awareness

Each response includes a context badge showing which data the Copilot used to formulate its answer -- for example, "Used: SOC 2 (15 controls), 8 evidence items, 3 risks." This transparency allows you to verify the scope of the analysis.

## Session Management

The Copilot supports multiple conversation sessions. Use the **New Chat** button to start a fresh session, or select a previous session from the session list to continue a prior conversation.

Conversation history is preserved per session, enabling multi-turn interactions where you can drill deeper into a topic across several exchanges.

## Prerequisites

The Compliance Copilot requires an active AI provider. Configure one under **Settings > AI / LLM** before using the Copilot. See [AI / LLM Settings](/docs/administration/ai-settings) for setup instructions.

If no provider is configured, the Copilot button displays a message directing you to the settings page.
