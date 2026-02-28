---
sidebar_position: 7
title: "Access Intelligence"
---

# AI Access Intelligence

Fortress Access Intelligence uses AI to automatically determine what access a person should have based on their role, department, peer group, and organizational context. Instead of manually configuring access for every new hire or transfer, Access Intelligence recommends the right access with high confidence.

## How It Works

Access Intelligence operates through three complementary engines:

### 1. Birthright Rule Engine

Birthright rules define access that should be automatically granted based on identity attributes. Rules support multi-attribute conditions:

```json
{
  "operator": "AND",
  "conditions": [
    {"field": "department", "op": "eq", "value": "Engineering"},
    {"field": "location", "op": "in", "values": ["US", "CA", "UK"]},
    {"field": "worker_type", "op": "neq", "value": "contractor"}
  ]
}
```

**Supported fields:** `title`, `department`, `cost_center`, `location`, `manager_id`, `worker_type`, `business_unit`, `division`, `company`, `employment_type`, and any custom HR attribute.

**Enhanced birthright rules** include:
- **Priority** -- Rule evaluation order (lower number = higher priority)
- **Fallback chains** -- If a rule does not match, fall back to the next rule in the chain
- **Auto-expiry** -- Time-bounded access for contractors and temporary workers
- **Approval gates** -- Some rules trigger manager approval instead of auto-provisioning

### 2. Peer Group Analysis

Peer groups cluster identities that share similar access patterns. When a new hire does not match any birthright rule, Access Intelligence finds the closest peer group and recommends access based on what peers already have.

**How peer groups are formed:**
- **HR attributes** -- Department + location + title combinations
- **Access patterns** -- Identities with similar application portfolios are clustered together
- **AI discovery** -- Machine learning identifies natural groupings that may not align with org chart

**Peer group properties:**
- **Match criteria** -- The attributes that define group membership
- **Member count** -- Number of identities in the group
- **Common apps** -- Applications used by most group members, with adoption percentages
- **Outlier threshold** -- Below this adoption percentage, access is considered non-standard

### 3. Role Mining

Role mining analyzes existing access patterns across the organization to discover implicit roles that should be formalized:

- **Pattern detection** -- Identify clusters of entitlements that frequently appear together
- **Role suggestions** -- Propose named roles with specific entitlements and confidence scores
- **Member matching** -- Show how many current users match each suggested role
- **Approval workflow** -- Security teams review and approve or reject suggested roles

## Fallback Strategy

For organizations without clean HR data (titles, departments), Access Intelligence uses a fallback chain:

| Priority | Source | When Available |
|----------|--------|----------------|
| 1 | Title + Department | When HRIS is connected and data is clean |
| 2 | Department only | When titles are inconsistent but departments are reliable |
| 3 | Cost Center | Usually accurate (finance maintains it) |
| 4 | Manager's access profile | Almost always available -- recommend what the manager's other reports have |
| 5 | Slack channels / project membership | When collaboration tools are connected |
| 6 | Default new-hire bundle | Universal fallback -- email, chat, calendar |

## Access Recommendations

When a recommendation is generated, it includes:

- **Recommended applications** -- Each with a confidence score and reason
- **Priority levels:**
  - **Critical (Day-1)** -- Email, chat, calendar -- auto-provisioned immediately
  - **Standard** -- Based on peer group with 80%+ confidence -- auto-provisioned
  - **Optional** -- Lower confidence -- requires manager approval
- **Basis** -- Why this recommendation was made (birthright rule, peer group, role mining)
- **Peer group context** -- Which peer group was used and how closely the identity matches

### Recommendation Lifecycle

1. **Generated** -- AI creates the recommendation (`status: pending`)
2. **Reviewed** -- Admin or manager reviews the recommendation
3. **Applied** -- Access is provisioned (`status: applied`)
4. **Rejected** -- Recommendation is rejected with reason (`status: rejected`)