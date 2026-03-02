---
sidebar_position: 10
title: "AI Analysis"
---

# AI Analysis

Z Shield uses vision and language AI models to automatically analyze screenshots, screen recordings, and audio transcripts. AI analysis transforms raw visual and audio evidence into structured, actionable security findings.

## What AI Analyzes

### Screenshots and Video

- **Sensitive data on screen** -- PII (SSN, credit card numbers), passwords in plaintext, API keys, medical records, financial data visible in any application
- **Content classification** -- Automatically categorize what the user is doing: coding, data entry, browsing social media, reading documents, gaming, streaming video
- **Compliance violations** -- Screenshots of customer databases, export of protected records, unauthorized data handling
- **Phishing and social engineering** -- Suspicious login pages, impersonation attempts, social engineering conversations
- **Shadow IT** -- Unauthorized applications or websites visible on screen that DNS monitoring might miss

### Audio Transcripts

- **Sensitive information sharing** -- Verbal sharing of passwords, account numbers, customer data, trade secrets
- **Meeting summarization** -- Auto-generated meeting summaries with action items
- **Sentiment analysis** -- Detect distress, anger, fear, or unusual emotional patterns
- **Language detection** -- Flag conversations in unexpected languages

## Analysis Modes

| Mode | Trigger | Latency | Use Case |
|------|---------|---------|----------|
| Real-time | Policy violation screenshot | Seconds | Immediate DLP alert for sensitive data on screen |
| Near-real-time | Investigation mode | 1-5 minutes | Active investigation with fast analyst turnaround |
| Batch | Periodic screenshots, recordings | 15-60 minutes | Routine compliance scanning |
| On-demand | Analyst request | Seconds | Manual investigation -- "analyze this recording" |

## Analysis Results

Each analysis produces a structured finding:

- **Classification** -- Productive, unproductive, security risk, compliance violation
- **Risk score** -- 0-100 based on what was detected
- **Summary** -- One-sentence description of what was found
- **Sensitive data detected** -- List of specific sensitive data types found (PII, credentials, financial, classified)
- **Findings** -- Detailed breakdown of each finding with evidence and reasoning

## Prompt Templates

Customize what the AI looks for by managing prompt templates:

- Default templates provided for DLP, compliance, productivity, and security analysis
- Create custom templates for industry-specific requirements
- Templates define the analysis scope, output format, and risk scoring criteria
- Each tenant can use different templates based on their monitoring objectives

## AI Analysis Dashboard

Overview of AI analysis activity and findings:

- Jobs processed (total, by type, by status)
- Findings by category (DLP, compliance, security, productivity)
- Risk distribution across all analyzed media
- Top finding types and trends over time
