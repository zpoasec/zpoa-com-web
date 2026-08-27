---
sidebar_position: 14
title: "Unused permissions"
---

# Finding permissions nobody uses

Access accumulates. Somebody joins a project, gets a role, the project ends, and
the role stays. Multiply that across a few years and most people hold
substantially more access than they use.

Right-sizing finds it, and — this is the important part — tells you how much to
trust each finding.

## The dashboard

**Access Control → Right-Sizing.**

| Figure | What it means |
|---|---|
| **Unused** | Not used within the window (90 days by default) |
| **Never used** | Not used once since it was granted |
| **Tracked** | Entitlements ZPOA has usage data for |
| **Reducible** | Unused as a share of tracked |
| **High confidence** | How much of the above rests on strong evidence |

## Why the confidence figure comes first

**Evidence of absence is not evidence of non-use.**

A permission on a system ZPOA can see into, that nobody has exercised, is a
finding. A permission on a system ZPOA has no visibility into looks exactly the
same in the data and means nothing at all.

Every observation records where it came from:

| Evidence | Confidence | What it means |
|---|---|---|
| Cloud access advisor | High | The provider's own record. AWS knows when the permission was last used. |
| Brokered session | Medium | Somebody used it through ZPOA. Precise, but only covers access taken through ZPOA. |
| JIT telemetry | Medium | An elevation was granted for it and never activated. |
| No source | Low | Nothing is watching this system. |

If the banner says only a small share of findings rest on high-confidence
evidence, connect a usage source before revoking anything in bulk. Taking away
production access on the strength of a blind spot is a bad afternoon.

### Improving your evidence

Press **Pull AWS access advisor**. It reads AWS's own last-accessed data and
records it as high-confidence usage.

## The three recommendations

**Revoke** — not used within the window, or never used. Take it away.

**Convert to JIT** — used a handful of times and not recently. This is the best
outcome available: the access is clearly needed sometimes and clearly not needed
continuously, which is exactly what just-in-time elevation is for. Standing
access is doing nothing between uses.

**Downgrade** — used, but only in ways a narrower entitlement would cover.

## Acting on one

**Accept** records that you agree. **Keep** records that you do not, and asks
why.

The reason is required for the same reason it is required when excluding a
discovered account: a dismissal nobody can review is one that will be repeated,
and "used only during the annual DR exercise" is exactly the kind of thing that
should be written down once rather than rediscovered every quarter.

A recommendation you have dispositioned does not come back on the next analysis
run.
