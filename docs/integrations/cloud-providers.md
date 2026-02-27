---
sidebar_position: 2
title: Cloud Provider Integrations
---

# Cloud Provider Integrations

ZPOA Shield provides deep integrations with the three major cloud platforms -- AWS, Microsoft Azure, and Google Cloud Platform. These connectors ingest security-relevant logs, alerts, and configuration data to give you centralized visibility across multi-cloud environments.

## Amazon Web Services (AWS)

### Supported Services

- **AWS CloudTrail** -- API activity and management event logs across all AWS accounts and regions.
- **Amazon GuardDuty** -- Threat detection findings including reconnaissance, instance compromise, and account compromise.
- **AWS Security Hub** -- Aggregated security findings from AWS services and third-party tools.
- **AWS WAF** -- Web application firewall logs including blocked requests and rule match details.
- **Amazon S3 Access Logs** -- Bucket-level access logging for data exfiltration monitoring.
- **Amazon Route 53 DNS Logs** -- DNS query logs for detecting C2 communication and DNS tunneling.

### Configuration

1. Create an IAM role in your AWS account with a trust policy allowing ZPOA Shield's external account ID.
2. Attach the managed policy `ZpoaShieldReadOnly` or use the minimum permissions below:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "cloudtrail:LookupEvents",
        "guardduty:ListFindings",
        "guardduty:GetFindings",
        "securityhub:GetFindings",
        "s3:GetObject",
        "logs:FilterLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
```

3. Enter the IAM Role ARN in the ZPOA Shield connector configuration page.
4. Select the AWS regions you want to monitor and click **Test Connection**.

### Multi-Account Support

For AWS Organizations deployments, configure a single connector with a management account role that can assume roles in member accounts. ZPOA Shield will automatically discover and ingest from all member accounts.

## Microsoft Azure

### Supported Services

- **Azure Activity Log** -- Subscription-level operations and administrative events.
- **Azure Firewall Logs** -- Network and application rule logs from Azure Firewall.
- **NSG Flow Logs** -- Network Security Group traffic flow data for network forensics.
- **Azure Key Vault Audit Logs** -- Access and management events for secrets, keys, and certificates.
- **Azure Kubernetes Service (AKS)** -- Control plane audit logs and container runtime events.

### Configuration

1. Register ZPOA Shield as an application in Microsoft Entra ID (Azure AD).
2. Grant the following API permissions:
   - `SecurityEvents.Read.All`
   - `AuditLog.Read.All`
   - `ActivityLog.Read`
3. Create a client secret or upload a certificate.
4. In ZPOA Shield, enter the **Tenant ID**, **Client ID**, and **Client Secret**.

```bash
# Verify access using Azure CLI (optional)
az login --service-principal -u <client-id> -p <client-secret> --tenant <tenant-id>
az monitor activity-log list --start-time 2025-01-01
```

### Azure Lighthouse

For managed service providers monitoring multiple Azure tenants, ZPOA Shield supports Azure Lighthouse delegated access. Configure a single connector with cross-tenant permissions.

## Google Cloud Platform (GCP)

### Supported Services

- **Cloud Audit Logs** -- Admin activity, data access, system event, and policy denied logs.
- **Security Command Center (SCC)** -- Vulnerability findings, threat detections, and security health analytics.

### Configuration

1. Create a service account in your GCP project with the **Security Reviewer** and **Logs Viewer** roles.
2. Generate a JSON key file for the service account.
3. Upload the JSON key in the ZPOA Shield connector settings.
4. Specify the GCP project IDs or organization ID to monitor.

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "zpoa-shield@your-project.iam.gserviceaccount.com"
}
```

For organization-wide ingestion, grant the service account permissions at the organization level and enable the **Cloud Asset API**.

## Best Practices

- **Use dedicated service accounts** with least-privilege permissions for each cloud connector.
- **Enable multi-region ingestion** to ensure complete coverage across your cloud footprint.
- **Monitor connector health** on the Integrations dashboard to catch authentication or quota issues early.
- **Rotate credentials** on a regular schedule (every 90 days recommended) and update them in ZPOA Shield before expiration.
