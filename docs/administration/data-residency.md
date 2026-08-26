---
sidebar_position: 7
title: Data Residency
---

# Data Residency

Data residency controls where your organisation's data is stored and whether it
may leave that region. If you are subject to CERT-In, DPDP, RBI or IRDAI
requirements, this is usually the first thing an examiner asks about, and
"it's in the cloud" is not an answer to any of them.

## Choosing a region

**Settings → Data Residency** shows your region and how strictly it is enforced.

| Setting | Behaviour |
|---|---|
| **Strict** | Data must not leave the region. Any operation that would move it is refused |
| **Preferred** | Data stays in region where practical. A cross-region operation is allowed, and recorded |
| **None** | No constraint |

The difference between strict and preferred matters more than it looks.
**Preferred permits the movement and records it; strict refuses it.** If you are
under RBI or IRDAI examination, you want the operation to fail rather than to
succeed and appear in a log afterwards.

An Indian region defaults to **strict** with 180-day log retention, because
organisations choosing India are usually doing so for a regulatory reason rather
than for latency.

## Allowing specific regions

You can permit a specific additional region without abandoning the constraint
entirely — useful where one dependency legitimately lives elsewhere. Everything
outside the primary region and the list you allow stays refused.

Any data placed outside your primary region is recorded whether it was allowed
or merely permitted, so the question "did anything leave India" always has an
answer.

## Compliance gaps

**Settings → Data Residency** reports where your configuration falls short of
what an Indian regulated organisation typically needs:

- **Log retention below 180 days.** CERT-In requires 180 days.
- **A residency requirement below strict.** CERT-In requires logs retained
  within Indian jurisdiction; anything less than strict means data may leave.
- **Foreign regions on your allowed list.** DPDP restricts transfer to
  territories that have not been notified as permitted.

These are reported, not enforced. You may knowingly run a configuration that
does not meet CERT-In — you may not be in scope — and the platform's job is to
tell you plainly rather than to stop working.

## Evidence

**Settings → Data Residency → Export** produces a residency statement showing
your region, enforcement level, retention period, and any recorded
cross-region movements over a chosen period. This is what to attach when an
examiner asks you to demonstrate rather than assert.

## Related

- [India Regulatory Pack](../modules/comply/india-regulatory-pack.md)
- [Billing and Subscription](./billing.md) — GST and Indian invoicing
