---
sidebar_position: 4
title: Billing and Subscription
---

# Billing and Subscription

ZPOA Shield offers flexible subscription plans designed to scale with your organization's security needs. This page covers plan management, usage monitoring, invoice history, payment methods, and how to upgrade or downgrade your subscription.

## Subscription Plans

ZPOA Shield uses a hybrid pricing model: **SIEM priced by data volume** (GB ingested per day) and **IGA priced by managed identities** (human users + non-human identities).

| Feature | Free | Pro | Business | Enterprise | MSSP |
|---|---|---|---|---|---|
| **Price** | $0/mo | $499/mo | $1,999/mo | Custom | Custom |
| **SIEM Log Ingestion** | 1 GB/day | 10 GB/day | 50 GB/day | Unlimited | Unlimited |
| **Managed Identities** | 25 | 500 | 5,000 | Unlimited | Unlimited |
| **Data Retention** | 7 days | 90 days | 1 year | Custom | Custom |
| **Connectors** | 10 | 100 | 690+ | 690+ | 690+ |
| **Compliance Frameworks** | 1 | 4 | All | All | All |
| **ITDR & JIT Access** | — | — | Included | Included | Included |
| **NHI Governance** | — | — | Included | Included | Included |
| **SSO / SAML** | — | — | Included | Included | Included |
| **API Rate** | 100 req/min | 1,000 req/min | 5,000 req/min | 10,000 req/min | 10,000 req/min |
| **Multi-Tenant** | — | — | — | — | Included |
| **White-Label** | — | — | — | — | Included |
| **Support** | Community | Email & Chat | 24/7 Priority | Dedicated CSM | Dedicated CSM |

All plans include access to the ZPOA Shield web console and core SIEM + IGA capabilities. Plans are billed monthly or annually (annual billing provides a 20% discount).

### Overage Pricing

If your usage exceeds the included limits, ZPOA Shield continues to operate without interruption. Overage charges are applied automatically:

| Plan | Log Ingestion Overage | Identity Overage |
|---|---|---|
| Pro | $5 per GB/day | $2 per identity/month |
| Business | $3 per GB/day | $1 per identity/month |
| Enterprise | Volume discounts | Volume discounts |

## Managing Your Subscription

### Viewing Your Current Plan

Navigate to **Settings > Billing > Subscription** to view:

- Current plan name and billing cycle (monthly/annual)
- Plan start date and next renewal date
- Current SIEM log ingestion usage vs. plan limit
- Managed identity count vs. plan limit
- Active connector count vs. plan limit

### Upgrading Your Plan

1. Navigate to **Settings > Billing > Subscription**.
2. Click **Change Plan**.
3. Select the desired plan tier.
4. Review the prorated charge for the remainder of the current billing cycle.
5. Confirm the upgrade.

Upgrades take effect immediately. New features and higher limits are available as soon as the upgrade is confirmed. Prorated charges are applied to the next invoice.

### Downgrading Your Plan

1. Navigate to **Settings > Billing > Subscription**.
2. Click **Change Plan**.
3. Select a lower plan tier.
4. Review the impact assessment, which highlights features and resources that exceed the new plan's limits.
5. Resolve any conflicts (e.g., reduce active connectors, deactivate users).
6. Confirm the downgrade.

Downgrades take effect at the end of the current billing cycle. You retain full access to your current plan until the cycle ends.

## Usage Monitoring

Track your resource consumption in real time under **Settings > Billing > Usage**:

- **SIEM Log Ingestion** -- Daily and monthly ingestion volume with a trend chart. A visual indicator shows your current usage relative to the plan limit.
- **Managed Identities** -- Total human and non-human identities governed by Fortress IGA.
- **Connectors** -- Active connector count by category.
- **Compliance Frameworks** -- Active frameworks vs. plan limit.
- **API Calls** -- Total API requests by day/week/month, broken down by key.

### Usage Alerts

Configure usage alerts to receive notifications before hitting plan limits:

```json
{
  "usage_alerts": [
    {
      "metric": "data_ingestion_daily",
      "threshold_percent": 80,
      "notification_channel": "email"
    },
    {
      "metric": "data_ingestion_daily",
      "threshold_percent": 95,
      "notification_channel": ["email", "slack"]
    }
  ]
}
```

Alerts are sent when usage reaches 80% and 95% of your plan limit by default. Customize thresholds under **Settings > Billing > Usage Alerts**.

## Invoice History

View and download all past invoices under **Settings > Billing > Invoices**:

- Each invoice includes a line-item breakdown (base subscription, overages, add-ons).
- Invoices are available in PDF format.
- Filter invoices by date range, status (paid, pending, overdue), or amount.

## Payment Methods

ZPOA Shield accepts the following payment methods:

- **Credit/Debit Card** -- Visa, Mastercard, American Express (for monthly and annual plans)
- **ACH Bank Transfer** -- Available for annual plans (US-based organizations)
- **Wire Transfer** -- Available for Enterprise annual plans
- **Purchase Order** -- Available for Enterprise customers with approved credit

Manage payment methods under **Settings > Billing > Payment Methods**:

- Add, update, or remove payment methods.
- Set a default payment method for automatic billing.
- View payment history and transaction status.

## Overages

If your log ingestion or managed identity count exceeds the plan limit, ZPOA Shield continues to operate to ensure no gaps in security coverage. Overage charges are billed at the per-GB or per-identity rate for your plan tier and appear as a line item on your next invoice. Configure overage limits to cap maximum spend:

1. Navigate to **Settings > Billing > Overage Policy**.
2. Set a **hard cap** (ingestion stops when the limit is reached) or a **soft cap** (ingestion continues but you are notified).
3. Configure the maximum overage allowance in GB or dollars.

## Best Practices

- **Review usage monthly** to right-size your plan and avoid unexpected overages.
- **Enable usage alerts** at 80% to give your team time to optimize ingestion or upgrade proactively.
- **Choose annual billing** for a 20% cost savings if your organization can commit to a year.
- **Audit active connectors** periodically and deactivate any that are no longer needed to stay within plan limits.
- **Keep payment methods current** to avoid service interruptions due to failed payments.
