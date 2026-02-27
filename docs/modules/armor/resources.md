---
sidebar_position: 3
title: "Cloud Resource Inventory"
---

# Cloud Resource Inventory

The Armor Cloud Resource Inventory provides a complete, continuously synchronized catalog of every resource deployed across your connected cloud providers. Each resource is enriched with security findings, relationship data, and contextual metadata to support investigation, compliance, and remediation workflows.

## Unified Resource View

All cloud resources -- regardless of provider -- are normalized into a consistent schema and presented in a single searchable inventory. Supported resource categories include:

- **Compute** -- Virtual machines, container clusters, serverless functions, auto-scaling groups
- **Storage** -- Object stores, block volumes, file shares, database instances
- **Networking** -- Virtual networks, subnets, security groups, load balancers, DNS zones, VPN gateways
- **Identity** -- IAM users, roles, policies, service accounts, identity federation configurations
- **Management** -- Logging services, monitoring configurations, key management, secrets managers
- **Application Services** -- API gateways, message queues, notification services, CDN distributions

The inventory updates in near real-time as resources are created, modified, or deleted in your cloud accounts.

## Resource Attributes

Each resource record includes comprehensive metadata:

| Attribute | Description |
|-----------|-------------|
| **Resource ID** | Cloud-native unique identifier (e.g., ARN, Resource ID) |
| **Name** | Human-readable name or tag |
| **Provider** | AWS, Azure, or GCP |
| **Account / Subscription** | Source cloud account |
| **Region** | Deployment region or zone |
| **Type** | Specific resource type (e.g., `aws_s3_bucket`, `azure_vm`) |
| **Tags** | Cloud-native tags inherited from the provider |
| **Created** | Resource creation timestamp |
| **Last Modified** | Most recent configuration change |

## Resource Relationships

Armor maps relationships between resources to provide full architectural context:

- **Network connectivity** -- Which resources can communicate with each other via security group and firewall rules
- **IAM bindings** -- Which identities have access to which resources and at what permission level
- **Data flows** -- Storage resources connected to compute workloads
- **Dependencies** -- Load balancers to backend instances, databases to application servers

Relationship data powers the [Attack Path Analysis](./attack-paths.md) engine and enables security teams to understand blast radius during incident response.

## Security Findings per Resource

Every resource displays its associated security findings directly in the inventory view:

- **Misconfiguration findings** from Armor policy evaluations
- **Vulnerability findings** from Discover scans (where applicable)
- **Compliance status** against selected benchmarks
- **Risk score** aggregated from all associated findings

Click into any resource to see a detailed timeline of findings, configuration changes, and remediation history.

## Search and Filtering

Locate resources using the advanced query interface:

```
provider:aws type:s3_bucket public_access:true findings_severity:critical
```

Combine filters across any attribute, tag, or finding property. Save frequently used queries as bookmarks for quick access, or use them as the basis for automated alerting rules.
