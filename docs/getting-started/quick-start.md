---
sidebar_position: 1
title: Quick Start
---

This guide walks you through creating your ZPOA Shield account and completing the onboarding wizard so you can start monitoring your environment in minutes.

## Step 1: Sign Up

Visit [shield.zpoa.com](https://shield.zpoa.com) and click **Get Started**. Enter your work email address, choose a strong password, and verify your email. Once verified, you will be directed to the onboarding wizard.

## Step 2: Complete the Onboarding Wizard

The onboarding wizard consists of eight steps. Each step configures a foundational element of your ZPOA Shield deployment. You can revisit and modify any of these settings later from the **Settings** menu.

### 2.1 -- Organization Setup

Provide your organization name, industry vertical, and primary region. This information is used to tailor default detection rules, compliance frameworks, and data residency settings.

### 2.2 -- Module Selection

Choose which ZPOA Shield modules to activate. You can enable any combination of Detect, Comply, Discover, Armor, Fortress, and Neural Mesh. Modules can be added or removed at any time.

### 2.3 -- First Connector

Connect your first data source. The wizard presents the most common integrations (AWS, Azure, GCP, Okta, Microsoft 365) with step-by-step credential instructions. See the [First Connector Guide](/docs/getting-started/first-connector) for a detailed walkthrough.

### 2.4 -- Configure Detection

Select from pre-built detection rule packs based on your industry and infrastructure. ZPOA Shield includes hundreds of SIGMA-compatible rules covering common threat scenarios.

### 2.5 -- Compliance Frameworks

Choose the regulatory and industry frameworks relevant to your organization (SOC 2, ISO 27001, PCI-DSS, HIPAA, NIST, GDPR, CIS Benchmarks). ZPOA Shield maps your connected data sources to framework controls automatically.

### 2.6 -- Team Invites

Invite team members by email and assign roles. Available roles include Administrator, Analyst, Auditor, and Viewer. Role-based access controls restrict visibility and actions according to each role.

### 2.7 -- Notification Channels

Configure where alerts and reports are delivered. Supported channels include email, Slack, Microsoft Teams, PagerDuty, and webhook endpoints. You can set per-severity routing rules.

### 2.8 -- Go Live

Review your configuration summary and click **Go Live**. ZPOA Shield begins ingesting data, evaluating compliance posture, and running detection rules immediately.

## What Happens Next

After completing the wizard, you will land on the unified dashboard. Initial data population typically takes between two and fifteen minutes depending on the volume of your connected sources. You can monitor ingestion progress from **Settings > Integrations**.
