---
sidebar_position: 1
title: "Discover - Overview"
---

# Discover: Asset Discovery and Vulnerability Management

ZPOA Shield **Discover** provides comprehensive asset discovery and vulnerability management across your entire infrastructure. Whether your workloads run in the cloud, on-premises, or in hybrid environments, Discover delivers continuous visibility into your attack surface and the vulnerabilities that threaten it.

## Key Capabilities

### Automated Asset Inventory

Discover continuously identifies and catalogs every asset in your environment through deep integrations with cloud providers, endpoint agents, network scanners, and container orchestrators. Assets are automatically classified, tagged, and enriched with contextual metadata -- eliminating blind spots and reducing manual inventory effort.

- **Cloud instances** -- EC2, Azure VMs, GCP Compute Engine, and more
- **Containers and serverless** -- Kubernetes pods, ECS tasks, Lambda functions
- **Endpoints** -- Workstations, servers, and mobile devices
- **Network devices** -- Routers, switches, firewalls, and load balancers
- **Applications and services** -- Web applications, APIs, databases

### Vulnerability Scanning

Discover integrates agent-based and agentless scanning to detect known vulnerabilities across operating systems, applications, container images, and infrastructure-as-code templates. Scan results are correlated with threat intelligence to surface the vulnerabilities that matter most.

- Continuous and scheduled scanning with minimal performance impact
- Support for CVE, NVD, and vendor-specific advisory databases
- Container image scanning within CI/CD pipelines
- Infrastructure-as-code (IaC) scanning for pre-deployment detection

### Attack Surface Mapping

Discover maps your external and internal attack surface by identifying exposed services, open ports, misconfigured assets, and shadow IT. The attack surface view provides a real-time picture of what an adversary can see and target.

- External attack surface discovery via passive and active reconnaissance
- Internal asset relationship mapping
- Identification of unmanaged and rogue assets
- Risk-ranked surface area prioritization

## How It Works

1. **Connect** your cloud accounts, identity providers, and network environments through the Integrations page.
2. **Discover** automatically begins scanning and inventorying all reachable assets.
3. **Assess** vulnerabilities are detected, scored, and prioritized using CVSS, EPSS, and contextual risk factors.
4. **Remediate** findings through integrated ticketing, automated patching guidance, and SLA tracking.

## Next Steps

- [Asset Inventory](./assets.md) -- Explore your discovered assets
- [Vulnerability Management](./vulnerabilities.md) -- Prioritize and remediate vulnerabilities
- [Scanning](./scans.md) -- Configure and manage scan operations
