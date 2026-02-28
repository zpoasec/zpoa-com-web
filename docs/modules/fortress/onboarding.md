---
sidebar_position: 8
title: "Instant Onboarding"
---

# Instant Onboarding

Fortress Instant Onboarding minimizes the time from hire to full access. Instead of waiting days or weeks for IT to manually provision accounts, new employees get Day-1 access to everything they need -- automatically.

## The Onboarding Pipeline

```
HR Event → Birthright Rules → AI Recommendation → Auto-Provision → Day-1 Ready
```

### Step 1: HR Event Received

When an HR system (Workday, BambooHR, Rippling, SAP SuccessFactors, etc.) creates a new hire record, a lifecycle event is fired to Fortress. The identity is created with `lifecycle_state: pre_hire`.

Fortress supports 130+ HR/HCM connectors to receive these events, including:
- Enterprise HRIS: Workday, SAP SuccessFactors, Oracle HCM, ADP, UKG
- Mid-market: BambooHR, Gusto, Rippling, Deel, Paylocity, Personio
- Regional: Darwinbox, Keka, greytHR (India), Factorial (EU), Employment Hero (ANZ)
- EOR platforms: Remote.com, Oyster HR, Papaya Global

### Step 2: Birthright Rules Evaluate

The birthright engine evaluates all active rules against the new hire's attributes:

```
IF department=Engineering AND location=US
  → Grant: GitHub, Jira, Slack, AWS Dev Account, VS Code License

IF title CONTAINS "manager"
  → Grant: Workday Manager Self-Service, Lattice, 15Five

IF worker_type=contractor
  → Grant with 90-day auto-expiry

IF cost_center=ENG-001
  → Grant: GitHub Copilot, Claude

DEFAULT (all new hires)
  → Grant: Office 365, Slack, Zoom
```

If no rules match, the system falls back to AI-powered peer group analysis.

### Step 3: AI Recommendation Generated

For access beyond birthright rules, Access Intelligence generates a recommendation:

- Finds the closest **peer group** (people with similar department, title, or access patterns)
- Recommends applications based on **what peers already have**
- Assigns confidence scores and priority levels:
  - **Critical** (above 95% peer adoption) -- Auto-provision immediately
  - **Standard** (80-95% peer adoption) -- Auto-provision with notification
  - **Optional** (below 80% peer adoption) -- Require manager approval

### Step 4: Auto-Provisioning

On the start date, `lifecycle_state` transitions from `pre_hire` to `active` and provisioning begins:

1. **SCIM provisioning** -- Create accounts in connected SaaS applications via SCIM 2.0
2. **API provisioning** -- Create accounts via vendor-specific APIs
3. **License assignment** -- Assign appropriate license tiers (free, standard, professional, enterprise)
4. **Group membership** -- Add to appropriate IdP groups, Slack channels, Teams, etc.

Fortress supports provisioning through 690+ connectors including SCIM, REST API, LDAP, PowerShell, and custom scripts.

### Step 5: Day-1 Ready

When the new employee arrives:

- All approved applications are provisioned and accessible via SSO
- Manager receives a notification listing all provisioned access
- Any pending approval requests are highlighted for immediate action
- The employee can view their access portfolio in a self-service portal

## Day-30 Micro-Certification

30 days after onboarding, Fortress triggers a lightweight access review:

1. **Manager confirmation** -- "Is this access still appropriate for [employee]?"
2. **Usage analysis** -- Identify any provisioned applications that have never been used
3. **Auto-cleanup** -- Remove unused licenses automatically (with configurable policy)
4. **Cost optimization** -- Downgrade license tiers for underutilized applications

## Handling Transfers

When an employee transfers to a new department or role:

1. HR system fires a **transfer event**
2. Fortress evaluates new birthright rules for the target role
3. Access Intelligence generates a **delta recommendation**:
   - **Add**: Applications needed for the new role
   - **Remove**: Applications no longer needed
   - **Keep**: Applications common to both roles
4. Manager approves the delta
5. Provisioning and deprovisioning execute automatically

## Offboarding

When an employee departs:

1. HR system fires a **termination event**
2. `lifecycle_state` transitions to `termination`
3. All access is revoked immediately:
   - SSO sessions terminated
   - SaaS licenses revoked
   - API keys and tokens invalidated
   - Shared credentials rotated
4. `lifecycle_state` transitions to `offboarded`

## Metrics

Track onboarding performance:

| Metric | Target |
|--------|--------|
| Time to first access | Under 5 minutes from start date |
| Day-1 app coverage | 95%+ of needed apps provisioned |
| Recommendation accuracy | 85%+ of AI recommendations applied |
| Unused license cleanup rate | 70%+ of unused licenses recovered by Day-30 |
| Manual intervention rate | Under 10% of onboardings require manual IT action |

## Configuration

### Setting Up Onboarding

1. **Connect HR System** -- Go to Fortress > Connectors and connect your HRIS
2. **Create Birthright Rules** -- Go to Fortress > Lifecycle and define rules for each department/role
3. **Enable AI Recommendations** -- Access Intelligence activates automatically once 30+ identities have been imported
4. **Configure Provisioning** -- Ensure target applications have SCIM or API connectors configured
5. **Test** -- Create a test identity in your HR system and verify the onboarding pipeline end-to-end
