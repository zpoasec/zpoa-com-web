---
sidebar_position: 3
title: First Connector
---

Connectors are the bridges between your infrastructure and Z Shield. This guide walks you through connecting your first data source using AWS as an example. The process is similar for all supported integrations.

## Prerequisites

Before you begin, ensure you have:

- An active Z Shield account with Administrator or Analyst privileges.
- Access credentials for the data source you want to connect (for AWS, this means an IAM access key or a cross-account IAM role ARN).

## Step 1: Navigate to Integrations

From the Z Shield dashboard, open the left sidebar and go to **Settings > Integrations**. This page displays all available connectors organized by category: Cloud Providers, Identity Providers, SaaS Applications, Endpoint Agents, Network Devices, and Custom Sources.

## Step 2: Choose a Connector

Browse or search for the connector you need. For this guide, select **AWS** under the Cloud Providers category. Click the **Connect** button to open the configuration form.

## Step 3: Fill In Credentials

Each connector requires specific credentials. For AWS, you have two options:

- **IAM Access Key**: Provide an Access Key ID and Secret Access Key for an IAM user with the required read permissions.
- **Cross-Account Role (recommended)**: Provide the Role ARN of an IAM role in your AWS account that grants Z Shield read access. This method avoids storing long-lived credentials.

The configuration form includes a link to a CloudFormation template that automatically creates the required IAM role with least-privilege permissions.

## Step 4: Test Connection

Click **Test Connection**. Z Shield will attempt to authenticate with the provided credentials and verify that it can reach the necessary AWS APIs. If the test succeeds, you will see a green confirmation message. If it fails, review the error details, correct your credentials or network configuration, and test again.

## Step 5: Verify Data Flow

After saving the connector, navigate to **Settings > Integrations** and locate your new AWS connector. The status indicator should change from **Pending** to **Active** within a few minutes. You can verify data flow by:

- Checking the **Last Event Received** timestamp on the connector detail page.
- Opening the **Detect > Logs** view and filtering by source to confirm that log events are appearing.
- Reviewing the **Discover** module to see newly inventoried AWS resources.

## Troubleshooting

If data does not appear within ten minutes:

- Confirm that the IAM credentials or role have the correct permissions.
- Verify that your AWS account's CloudTrail or other logging services are enabled.
- Check the connector status page for error messages.
- Review the [System Requirements](/docs/getting-started/system-requirements) to ensure network connectivity is not blocked.

## Next Steps

With your first connector active, explore the [Detect module](/docs/modules/detect/overview) to see alerts generated from your ingested data, or visit the [Comply module](/docs/modules/comply/overview) to map your cloud posture against compliance frameworks.
