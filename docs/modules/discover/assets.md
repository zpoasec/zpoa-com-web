---
sidebar_position: 2
title: "Asset Inventory"
---

# Asset Inventory

The Asset Inventory provides a unified, continuously updated catalog of every asset across your organization. Assets are auto-discovered from all connected sources and enriched with security context, ownership data, and risk scores to drive informed decision-making.

## Auto-Discovered Asset Types

Discover automatically identifies and classifies assets from every connected integration:

- **Cloud Instances** -- Virtual machines, managed databases, storage buckets, and serverless functions across AWS, Azure, and GCP.
- **Containers** -- Running containers, images, registries, and Kubernetes clusters with full pod-level visibility.
- **Endpoints** -- Workstations, laptops, and servers enrolled through the ZPOA Shield agent or MDM integrations.
- **Network Devices** -- Routers, switches, firewalls, VPN gateways, and load balancers discovered via network scanning and SNMP.
- **Applications** -- Web applications, APIs, SaaS subscriptions, and internally hosted services.

## Asset Attributes

Each asset record is enriched with a comprehensive set of attributes:

| Attribute | Description |
|-----------|-------------|
| **Name / Hostname** | The primary identifier for the asset |
| **Type** | Classification (e.g., VM, container, endpoint, network device) |
| **Environment** | Production, staging, development, or custom labels |
| **Owner** | Assigned team or individual responsible for the asset |
| **Cloud Account** | Source account or subscription where the asset resides |
| **Tags** | Inherited cloud tags and custom ZPOA Shield labels |
| **Last Seen** | Timestamp of the most recent discovery or heartbeat |
| **OS / Platform** | Operating system, runtime, or firmware version |

## Risk Scoring

Every asset receives a dynamic **Asset Risk Score** (0--100) calculated from multiple factors:

- **Vulnerability exposure** -- Number and severity of unpatched vulnerabilities
- **Internet exposure** -- Whether the asset is publicly reachable
- **Privilege level** -- Administrative or elevated access associated with the asset
- **Data sensitivity** -- Classification of data stored or processed
- **Compliance posture** -- Alignment with applicable regulatory frameworks

Risk scores update in near real-time as new findings are detected or remediated.

## Asset Grouping

Organize assets into logical groups for reporting, policy assignment, and access control:

- **Dynamic groups** -- Rule-based groups that automatically include assets matching specified criteria (e.g., all production Linux servers in AWS `us-east-1`).
- **Static groups** -- Manually curated collections for specific projects or initiatives.
- **Business units** -- Map assets to organizational units for executive reporting.

Asset groups can be used as targets for scan policies, alerting rules, and compliance benchmarks.

## Working with the Asset Inventory

Use the search bar and filter panel to locate assets by any combination of attributes. Export results as CSV or JSON for offline analysis, or use the ZPOA Shield API to integrate asset data into your existing CMDB or ITSM workflows.

```
GET /api/v1/assets?type=cloud_instance&environment=production&risk_score_gte=75
```

This query returns all production cloud instances with a risk score of 75 or higher.
