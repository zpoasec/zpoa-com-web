---
sidebar_position: 11
title: DevOps Integrations
---

# DevOps Integrations

Z Shield extends security monitoring into the software development lifecycle by integrating with CI/CD pipelines, source code repositories, container orchestrators, and infrastructure-as-code tools. These connectors enable shift-left security practices and provide runtime visibility into your DevOps infrastructure.

## Supported Platforms

### GitHub

Ingest audit log events, code scanning alerts, Dependabot alerts, and secret scanning findings from GitHub Cloud or GitHub Enterprise.

- **Connection Method:** GitHub App or Personal Access Token (PAT)
- **Required Permissions:** `admin:org` (audit log), `security_events` (code scanning), `read:org`
- **Data Types:** Audit log events, code scanning alerts, Dependabot alerts, secret scanning alerts, push events

```yaml
connector:
  type: github
  auth:
    method: github_app
    app_id: "${GITHUB_APP_ID}"
    installation_id: "${GITHUB_INSTALLATION_ID}"
    private_key_path: "${GITHUB_APP_KEY_PATH}"
  organizations:
    - your-org
  data_streams:
    - audit_log
    - code_scanning
    - dependabot
    - secret_scanning
```

**Key Use Cases:**
- Detect leaked secrets (API keys, credentials) committed to repositories.
- Monitor repository permission changes and branch protection modifications.
- Track vulnerable dependencies across your organization's repositories.
- Correlate code scanning findings with runtime detections.

### Bitbucket

Collect audit events, pipeline build logs, and repository access events from Bitbucket Cloud or Bitbucket Data Center.

- **Connection Method:** Bitbucket REST API (App Password or OAuth 2.0)
- **Data Types:** Audit events, pipeline logs, repository events, pull request activity

### Jenkins

Monitor CI/CD pipeline execution, build artifacts, and security-related build failures from Jenkins.

- **Connection Method:** Jenkins REST API (API Token) or Webhook
- **Data Types:** Build events, pipeline stage results, console output (filtered), plugin audit events

**Key Use Cases:**
- Alert on pipeline failures in security-critical build stages (SAST, DAST, dependency scanning).
- Track deployment events to correlate configuration changes with security incidents.
- Detect unauthorized job configuration changes.

### Docker

Ingest Docker daemon events, image vulnerability scan results, and container runtime events from Docker hosts and Docker Hub.

- **Connection Method:** Docker Engine API (Unix socket or TCP), Docker Hub Webhooks
- **Data Types:** Container lifecycle events, image events, daemon audit events

**Key Use Cases:**
- Detect containers running as root or with privileged mode.
- Monitor image pulls from untrusted registries.
- Alert on container escape attempts or unusual syscall patterns.

### Kubernetes Audit

Collect Kubernetes API server audit logs to monitor cluster activity, RBAC changes, workload deployments, and security policy violations.

- **Connection Method:** Webhook audit backend or log file ingestion via agent
- **Data Types:** API server audit events (RequestReceived, ResponseComplete), admission controller decisions

```yaml
# Example: Kubernetes audit policy to capture security-relevant events
# Configure your API server to forward audit events to Z Shield
# Key events: secrets access, RBAC changes, pod creation, namespace modifications
```

**Key Use Cases:**
- Detect privilege escalation through RBAC modifications (ClusterRoleBindings, RoleBindings).
- Monitor creation of privileged pods or pods with host network access.
- Track secrets access patterns and detect potential credential harvesting.
- Alert on deployment of containers from unsigned or untrusted images.

### Ansible

Ingest Ansible playbook execution logs and audit events from Ansible Tower / AWX or Ansible Automation Platform.

- **Connection Method:** Ansible Tower REST API (OAuth 2.0 Token) or Webhook callback
- **Data Types:** Job events, playbook runs, inventory changes, credential usage

**Key Use Cases:**
- Track infrastructure-as-code changes that modify security configurations (firewall rules, user accounts, SSH keys).
- Detect unauthorized playbook executions or modifications to critical automation workflows.
- Correlate configuration changes with security incidents for root cause analysis.

## CI/CD Pipeline Security

Z Shield provides a unified view of security findings across your CI/CD pipelines:

| Stage | Security Check | Integrations |
|---|---|---|
| Source | Secret scanning, dependency audit | GitHub, Bitbucket |
| Build | SAST, container image scanning | Jenkins, GitHub Actions |
| Test | DAST, compliance validation | Jenkins, webhooks |
| Deploy | Kubernetes admission control, IaC audit | Kubernetes, Ansible |
| Runtime | Container monitoring, API audit | Docker, Kubernetes |

## Best Practices

- **Enable audit logging** on all Kubernetes clusters, even in development environments, to establish behavioral baselines.
- **Use webhook callbacks** from CI/CD tools for real-time event ingestion rather than relying solely on periodic polling.
- **Correlate DevOps events with runtime detections** to rapidly identify whether a security incident was caused by a recent deployment or configuration change.
- **Restrict API token scopes** for each integration to the minimum permissions required, following the principle of least privilege.
