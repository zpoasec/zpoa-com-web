---
sidebar_position: 3
title: Evidence Collection
---

Audits require proof that security controls are not only defined but actively operating. The Comply module's evidence collection system automates the gathering, organization, and linking of evidence artifacts to the controls they support.

## Automated Evidence Gathering

For controls that can be verified programmatically, ZPOA Shield collects evidence automatically from your connected systems. Automated evidence types include:

- **Configuration snapshots** -- Point-in-time captures of security-relevant settings from cloud providers, identity providers, and SaaS applications (for example, S3 bucket policies, MFA enforcement settings, or firewall rules).
- **API response records** -- Structured data retrieved from system APIs that demonstrate control effectiveness, such as user access lists or encryption status.
- **Log samples** -- Representative log entries proving that monitoring, alerting, or auditing capabilities are active and functioning.
- **Scan results** -- Vulnerability scan outputs, CIS Benchmark assessment results, and configuration audit findings.

Automated evidence is collected on a scheduled basis (daily by default, configurable per control) and stored with a timestamp and cryptographic hash to ensure integrity.

## Manual Evidence Upload

Some controls require human-generated artifacts that cannot be collected automatically. Examples include:

- Security policies and procedures documents.
- Employee training completion records.
- Board meeting minutes discussing security governance.
- Vendor risk assessment questionnaires.
- Business continuity and disaster recovery test reports.

To upload manual evidence, navigate to **Comply > Evidence**, select the relevant control, and click **Upload Evidence**. Supported file formats include PDF, DOCX, XLSX, PNG, and JPG. Each upload must include a description and an effective date.

## Evidence Linking to Controls

Every evidence artifact is linked to one or more compliance controls. This linking ensures that auditors can trace from any control requirement directly to the supporting evidence. The evidence-to-control mapping works bidirectionally:

- **From the control view**: Each control displays all linked evidence artifacts, both automated and manual, with their collection timestamps and current validity status.
- **From the evidence view**: Each artifact shows which controls it supports across all active frameworks.

## Evidence Lifecycle

Evidence artifacts follow a defined lifecycle:

- **Current** -- The artifact is within its validity period and actively supports its linked controls.
- **Expiring** -- The artifact's validity period will end within 30 days. A notification is sent to the control owner.
- **Expired** -- The artifact is no longer valid. The linked controls are flagged as lacking current evidence.
- **Superseded** -- A newer version of the evidence has been uploaded, replacing this artifact.

## Audit-Ready Exports

When preparing for an audit, use the **Export Evidence Package** feature to generate a comprehensive download containing all evidence artifacts organized by framework and control. The export includes an index document listing every control, its current status, and links to the supporting evidence files.
