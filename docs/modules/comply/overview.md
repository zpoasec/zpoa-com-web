---
sidebar_position: 1
title: Comply (GRC) Overview
---

The Comply module is ZPOA Shield's Governance, Risk, and Compliance (GRC) engine. It automates compliance posture assessment, maps your security controls to regulatory frameworks, and streamlines evidence collection for audits.

## Automated Compliance Posture Assessment

Traditional compliance management relies on manual spreadsheets, periodic assessments, and point-in-time snapshots. ZPOA Shield replaces this approach with continuous, automated evaluation. The Comply module constantly assesses your environment against the frameworks you have activated and provides a real-time compliance score.

The assessment engine works by:

1. **Collecting telemetry** from your connected data sources (cloud configurations, identity provider settings, endpoint states, network policies).
2. **Evaluating controls** against the specific requirements of each active framework.
3. **Scoring compliance** on a per-control, per-category, and overall basis.
4. **Identifying gaps** where controls are missing, misconfigured, or insufficient.

Compliance scores update automatically as your environment changes, giving you an always-current view of your posture.

## Framework Mapping

Each regulatory and industry framework defines a set of controls or requirements. The Comply module maintains a comprehensive mapping between these controls and the technical checks performed against your infrastructure. When you activate a framework, ZPOA Shield automatically:

- Maps your connected data sources to the relevant controls.
- Identifies which controls can be assessed automatically and which require manual evidence.
- Generates a gap report showing controls that are not yet addressed.

Multiple frameworks can be active simultaneously, and overlapping controls are evaluated once and mapped to all applicable frameworks. See [Supported Frameworks](/docs/modules/comply/frameworks) for the full list.

## Evidence Collection

Auditors require evidence that controls are implemented and operating effectively. The Comply module automates evidence gathering wherever possible:

- **Automated evidence** is collected directly from connected systems (screenshots of configurations, API responses, log samples).
- **Manual evidence** can be uploaded for controls that require human-generated artifacts such as policies, training records, or meeting minutes.

All evidence is version-controlled, timestamped, and linked to the specific controls it supports. See [Evidence Collection](/docs/modules/comply/evidence) for details.

## AI-Powered Intelligence

The Comply module includes a suite of AI features that automate workflows traditionally performed manually by GRC analysts and auditors. Each feature uses your live compliance data to produce actionable, context-specific outputs.

- **[Compliance Copilot](/docs/modules/comply/ai-copilot)** -- A conversational AI assistant that answers compliance questions using your live framework data, control statuses, and evidence artifacts.
- **[AI Policy Generation](/docs/modules/comply/ai-features#ai-policy-generation)** -- Generate structured compliance policy documents for any control with a single click.
- **[AI Evidence Validation](/docs/modules/comply/ai-features#ai-evidence-validation)** -- Automated sufficiency review of collected evidence, identifying gaps before auditors do.
- **[AI Audit Readiness Report](/docs/modules/comply/ai-features#ai-audit-readiness-report)** -- Simulate a full audit and receive a predicted outcome with detailed per-control analysis.
- **[AI Remediation Plans](/docs/modules/comply/ai-features#ai-remediation-plans)** -- Actionable, step-by-step remediation plans for failing or partially compliant controls.

All AI features require an active AI provider. See [AI / LLM Settings](/docs/administration/ai-settings) for setup instructions.

## Cross-Framework Inheritance

When you satisfy a control in one framework, mapped controls in other frameworks can be updated automatically -- eliminating redundant assessment work. The inheritance engine is rule-based and fully auditable, with no AI involved. See [Cross-Framework Inheritance](/docs/modules/comply/cross-framework-mapping) for details.

## Key Features

- **Real-time compliance dashboard** with drill-down from overall score to individual controls.
- **Multi-framework support** with shared control mapping to reduce duplicate effort.
- **Cross-framework inheritance** that automatically propagates compliance status across related controls.
- **AI Compliance Copilot** for natural-language compliance queries backed by live data.
- **AI-powered policy generation, evidence validation, audit readiness reports, and remediation plans.**
- **Audit-ready reports** exportable as PDF for auditor review.
- **Risk register integration** connecting compliance gaps to organizational risk tracking. See [Risk Register](/docs/modules/comply/risks).
- **Role-based access** so auditors can view compliance data without accessing sensitive security operations.
