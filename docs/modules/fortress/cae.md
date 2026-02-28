---
sidebar_position: 12
title: "Continuous Access Evaluation"
---

# Continuous Access Evaluation

Fortress Continuous Access Evaluation (CAE) computes real-time trust scores for every identity and dynamically adjusts access based on current risk. Instead of one-time authentication, CAE continuously evaluates trust factors and enforces adaptive policies throughout the session.

## How It Works

### Trust Scoring (0-100)

Every identity receives a continuously updated trust score:

- **90-100** -- Full trust. All access granted as normal.
- **70-89** -- Elevated trust. Standard access with enhanced logging.
- **40-69** -- Reduced trust. Step-up authentication required for sensitive resources.
- **20-39** -- Low trust. Access restricted to essential resources only.
- **0-19** -- Minimal trust. Session terminated, re-authentication required.

### Factor Breakdown

Trust scores are calculated from weighted factors:

| Factor | Weight | Description |
|--------|--------|-------------|
| Device posture | 25% | OS patch level, encryption status, MDM compliance |
| Location | 20% | Known office, VPN, new location, impossible travel |
| Behavioral pattern | 20% | Normal working hours, typical access patterns, resource usage |
| MFA strength | 15% | Hardware key vs. TOTP vs. SMS vs. no MFA |
| Session age | 10% | Time since last authentication |
| Network trust | 10% | Corporate network vs. public WiFi vs. Tor |

Each factor contributes a sub-score that combines into the overall trust score.

### Risk Levels

Based on the trust score, identities are classified into risk levels:

- **Trusted** -- Score 70 or above. No additional verification needed.
- **Cautious** -- Score 40 to 69. May require step-up authentication for sensitive actions.
- **Risky** -- Score 20 to 39. Access restricted, security team notified.
- **Blocked** -- Score below 20. All sessions terminated immediately.

### Adaptive Policies

CAE policies define automated responses to trust score changes:

- **Step-up triggers** -- When trust drops below a threshold, require MFA re-verification
- **Resource restrictions** -- Progressively limit accessible resources as trust decreases
- **Session controls** -- Shorten session timeouts for lower-trust identities
- **Alert thresholds** -- Notify security team when trust drops below critical levels

### Real-Time Evaluation Triggers

Trust scores are re-evaluated when:

- A new device is detected
- Location changes significantly
- Unusual access patterns are observed
- MFA factors change
- Network context changes
- Time-based periodic re-evaluation (every 5 minutes by default)

### Score Trends

Historical trust score data enables:

- **Trend analysis** -- Identify identities with declining trust over time
- **Department comparisons** -- Compare trust distributions across teams
- **Anomaly detection** -- Flag sudden score drops for investigation
- **Compliance reporting** -- Demonstrate continuous monitoring for auditors

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/fortress/cae/scores` | List trust scores with filtering |
| GET | `/fortress/cae/scores/:identityId` | Get trust score for identity |
| POST | `/fortress/cae/scores/:identityId/evaluate` | Trigger re-evaluation |
| GET | `/fortress/cae/policies` | List CAE policies |
| POST | `/fortress/cae/policies` | Create CAE policy |
| PUT | `/fortress/cae/policies/:id` | Update CAE policy |
| DELETE | `/fortress/cae/policies/:id` | Delete CAE policy |
| GET | `/fortress/cae/events` | List evaluation events |
| GET | `/fortress/cae/identities/:id/events` | Identity-specific events |
| GET | `/fortress/cae/dashboard` | Dashboard statistics |

All endpoints are prefixed with `/api/v1` and require a valid Bearer token.
