---
sidebar_position: 14
title: "SOD Simulation"
---

# Separation of Duties Simulation

Fortress SOD Simulation provides what-if analysis for access changes before they are implemented. Propose a role assignment, permission grant, or organizational change and instantly see the resulting SoD conflicts, risk score delta, and compliance impact -- all without making actual changes.

## How It Works

### What-If Analysis

Run simulations to evaluate proposed access changes:

1. **Define the change** -- Specify the identity, the proposed access (role, entitlement, application), and the operation (grant, revoke, transfer)
2. **Simulate** -- The engine evaluates the proposed state against all active SoD rules
3. **Results** -- See a complete breakdown of new violations, risk score changes, and compliance impact
4. **Decision** -- Proceed with the change, modify it, or cancel based on simulation results

### Simulation Types

- **Role assignment** -- What happens if this user gets a specific role
- **Permission grant** -- Impact of adding a specific entitlement
- **Bulk change** -- Evaluate organizational restructuring or role consolidation
- **Transfer simulation** -- Evaluate SoD impact when moving an identity between departments

### SoD Rules

The simulation engine evaluates against three categories of rules:

**Toxic combinations** -- Two or more permissions that should never coexist:
- Create vendor + approve payments
- Deploy code + approve deployments
- Manage users + access audit logs

**Excessive privilege** -- Single identities with too much access:
- Admin access across 3 or more production systems
- Both read and write access to sensitive data stores
- Cross-environment admin (dev + prod)

**Cross-application conflicts** -- Conflicts spanning multiple systems:
- AWS admin + Azure admin (cloud separation)
- HR system write + payroll approve (financial separation)
- Code repository admin + CI/CD pipeline admin (DevOps separation)

### Risk Score Delta

Each simulation shows the before/after risk impact:

- **Current risk score** -- The identity's existing risk level
- **Projected risk score** -- What the risk level would be after the change
- **Delta** -- The numerical change (positive = increased risk)
- **Contributing factors** -- Which SoD rules and risk factors are affected

### Violation Management

When simulations reveal violations:

- **Violation details** -- Which rules are violated and why
- **Severity** -- Critical, high, medium, low
- **Compensating controls** -- Suggested mitigations if the change must proceed
- **Exception workflow** -- Request an approved exception with justification, approver, and expiry

### Exception Workflow

For legitimate business needs that create SoD conflicts:

1. **Request exception** -- Provide business justification for the violation
2. **Risk assessment** -- System calculates the residual risk with compensating controls
3. **Approval** -- Security officer reviews and approves with conditions
4. **Time-bound** -- Exceptions expire automatically and must be re-approved
5. **Audit trail** -- Full history of exception grants, renewals, and expirations

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/fortress/sod-sim/simulations` | Run a new simulation |
| GET | `/fortress/sod-sim/simulations` | List past simulations |
| GET | `/fortress/sod-sim/simulations/:id` | Get simulation details |
| GET | `/fortress/sod-sim/violations` | List simulation violations |
| PATCH | `/fortress/sod-sim/violations/:id/status` | Update violation status |
| POST | `/fortress/sod-sim/violations/:id/exception` | Grant exception |
| GET | `/fortress/sod-sim/rules` | List SoD simulation rules |
| POST | `/fortress/sod-sim/rules` | Create SoD simulation rule |
| GET | `/fortress/sod-sim/dashboard` | Dashboard statistics |

All endpoints are prefixed with `/api/v1` and require a valid Bearer token.
