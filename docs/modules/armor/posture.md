---
sidebar_position: 2
title: "Security Posture Dashboard"
---

# Security Posture Dashboard

The Armor Security Posture Dashboard provides an at-a-glance view of your organization's cloud security health. It aggregates findings across all connected cloud accounts into a single, actionable interface that helps security teams measure progress and prioritize efforts.

## Posture Score

The **Posture Score** is a normalized metric (0--100) representing the overall security health of your cloud environment. It is calculated by evaluating all monitored resources against applicable security policies and weighting results by severity.

- **90--100** -- Strong posture with minimal findings
- **70--89** -- Good posture with some areas requiring attention
- **50--69** -- Moderate risk; significant misconfigurations present
- **Below 50** -- Critical risk; immediate remediation recommended

The score is broken down by:

- **Cloud provider** -- Compare posture across AWS, Azure, and GCP accounts
- **Business unit** -- Track posture by team or organizational division
- **Environment** -- Separate production, staging, and development scores
- **Resource type** -- Identify which service categories are weakest

## Trend Analysis

Track posture changes over time with configurable trend views:

- **Daily, weekly, and monthly** posture score history
- **Rolling 30/60/90-day** trend lines to identify improvement or regression
- **Event markers** highlighting major configuration changes, new integrations, or policy updates
- **Comparative analysis** across accounts, regions, or business units

Trend data helps demonstrate program maturity to leadership and auditors, and surfaces regressions before they escalate.

## Benchmark Compliance

Armor evaluates your cloud resources against industry-recognized benchmarks:

| Benchmark | Coverage |
|-----------|----------|
| **CIS AWS Foundations** | v1.5, v2.0, v3.0 |
| **CIS Azure Foundations** | v1.5, v2.0 |
| **CIS GCP Foundations** | v1.3, v2.0 |
| **NIST 800-53 Rev 5** | Moderate and High baselines |
| **SOC 2 Type II** | Trust Services Criteria |
| **PCI DSS v4.0** | Applicable cloud controls |
| **HIPAA** | Technical safeguards |

Each benchmark produces a pass/fail report at the individual control level. Compliance percentages are displayed on the dashboard and available as downloadable reports for audit evidence.

## Findings by Severity

All misconfiguration findings are categorized by severity:

- **Critical** -- Immediate exploitation risk (e.g., publicly writable S3 buckets with sensitive data)
- **High** -- Significant risk requiring prompt remediation (e.g., security groups allowing unrestricted SSH)
- **Medium** -- Moderate risk that should be addressed within standard SLA windows
- **Low** -- Informational or best-practice recommendations
- **Info** -- Non-risk observations for awareness

The dashboard displays finding counts by severity, affected resource types, and remediation status. Use filters to drill down into specific accounts, regions, or resource categories.

## Exporting and Reporting

Generate posture reports for stakeholders and compliance evidence:

- **Executive summary** -- High-level posture score and trend with key metrics
- **Detailed findings report** -- Full list of findings with remediation guidance
- **Compliance report** -- Benchmark-specific pass/fail results
- **Scheduled delivery** -- Automatic report generation and distribution via email or Slack
