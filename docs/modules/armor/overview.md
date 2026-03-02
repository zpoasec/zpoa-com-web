---
sidebar_position: 1
title: "Armor - Overview"
---

# Armor: Cloud Security Posture Management

Z Shield **Armor** delivers Cloud Security Posture Management (CSPM) across your multi-cloud environment. Armor continuously monitors cloud configurations, detects misconfigurations before they become breaches, and enforces security policies to maintain a hardened posture.

## Key Capabilities

### Multi-Cloud Support

Armor provides unified visibility and policy enforcement across all major cloud providers:

- **Amazon Web Services (AWS)** -- EC2, S3, IAM, RDS, Lambda, VPC, and 100+ additional services
- **Microsoft Azure** -- Virtual Machines, Storage Accounts, Azure AD, AKS, SQL Database, and more
- **Google Cloud Platform (GCP)** -- Compute Engine, Cloud Storage, IAM, GKE, BigQuery, and more

All cloud resources are normalized into a common data model, enabling consistent policy evaluation and cross-cloud reporting from a single pane of glass.

### Misconfiguration Detection

Armor evaluates cloud resource configurations against an extensive rule library to identify security misconfigurations:

- **Storage exposure** -- Publicly accessible buckets, blobs, and file shares
- **Network security** -- Overly permissive security groups, missing encryption in transit, open management ports
- **Identity and access** -- Excessive permissions, unused credentials, missing MFA enforcement
- **Logging and monitoring** -- Disabled audit trails, missing alerting configurations
- **Encryption** -- Unencrypted volumes, databases, and object stores
- **Compute** -- Instances with public IPs, outdated machine images, missing patching baselines

Detections are mapped to industry frameworks including CIS Benchmarks, NIST 800-53, SOC 2, PCI DSS, and HIPAA.

### Policy Enforcement

Move beyond detection with automated and semi-automated policy enforcement:

- **Preventive guardrails** -- Block non-compliant resource creation via integration with cloud-native policy engines (AWS SCP, Azure Policy, GCP Organization Policies)
- **Auto-remediation** -- Automatically correct common misconfigurations such as removing public access from storage or enabling encryption
- **Approval workflows** -- Route high-impact remediations through approval chains before execution
- **Custom policies** -- Author organization-specific rules using Z Shield's policy language or import Open Policy Agent (OPA) Rego policies

## How It Works

1. **Connect** your cloud accounts via read-only cross-account roles or service principals.
2. **Baseline** -- Armor performs an initial full assessment of all cloud resources.
3. **Monitor** -- Continuous monitoring detects configuration drift and new misconfigurations within minutes.
4. **Enforce** -- Findings trigger alerts, auto-remediation, or ticketing workflows based on your policy configuration.

## Next Steps

- [Security Posture Dashboard](./posture.md) -- Monitor your overall cloud security posture
- [Cloud Resource Inventory](./resources.md) -- Explore your cloud resources and their findings
- [Attack Path Analysis](./attack-paths.md) -- Identify and mitigate exploitable attack paths
