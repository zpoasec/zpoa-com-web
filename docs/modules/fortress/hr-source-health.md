---
sidebar_position: 22
title: "HR Source Health"
---

Fortress drives joiner, mover and leaver automation from your HR system. A
worker who appears is onboarded; a worker who disappears is offboarded, and
their access is revoked everywhere.

That second rule is powerful and, on a bad day, dangerous. If your HR system
returns a partial list — during maintenance, because an API key was scoped to
one legal entity, or because a page of results was dropped — then every missing
employee looks like a departure. Without a check, Fortress would revoke access
for all of them, quickly, and the audit trail would look entirely correct.

HR Source Health is the check. It decides what each sync is allowed to do before
anything is revoked.

## Where to find it

**Fortress → Identities → HR Sources.** Each connected HR system shows a status:

| Status | What it means |
|---|---|
| **Healthy** | Synced recently and completely. Everything runs normally |
| **Stale** | No successful sync within your tolerance. New joiners still flow; departures are held |
| **Suspect** | The last sync returned implausibly fewer people than before. Departures are held until you review it |
| **Never synced** | No successful sync has completed yet |

## What gets held, and why

Fortress deliberately treats granting and revoking differently. A delayed
revocation is a risk you can measure and close. A wrongful mass revocation is an
outage — people cannot work, and restoring access takes far longer than removing
it did.

So when a feed cannot be fully trusted, **joiners and movers continue and
leavers wait**.

The specific rules:

- **An empty feed is never accepted** against a population that previously had
  people in it. A company does not lose every employee between two syncs.
- **A drop of 25% or more holds departures** for review. Real attrition does not
  look like that; a partial feed routinely does.
- **The comparison uses your highest-ever headcount**, not just the previous
  sync, so a feed that degrades slowly over several syncs cannot gradually move
  the goalposts.
- **Small populations skip the percentage rule.** In a ten-person company three
  genuine departures is 30%, and blocking those would be useless.
- **The first sync never infers departures.** There is no previous population
  for anyone to be missing from.

## Reviewing a suspect source

When a source is marked suspect, Fortress tells you what it saw — the previous
headcount, the new one, and the percentage drop.

1. Check whether the drop is real. A genuine restructure or the end of a large
   contract can produce one.
2. If it is real, click **Clear and resume**. Held departures process on the
   next sync.
3. If it is not, fix the source — the usual causes are an API credential scoped
   to fewer people than intended, or a filter left applied in the HR system —
   then clear it once the next sync returns the expected headcount.

A source stays suspect until you clear it. One normal-looking sync afterwards is
not enough on its own, because a source that recovers on its own leaves the
original problem unreviewed.

## Choosing a policy

**Fortress → Identities → HR Sources → Settings** offers three behaviours for a
stale feed:

| Policy | Behaviour | Suits |
|---|---|---|
| **Hold departures** (default) | Joiners and movers continue; leavers wait | Most organisations |
| **Freeze everything** | No provisioning at all until the feed recovers | Organisations that would rather stall onboarding than act on old data |
| **Continue and alert** | Nothing is held; an alert is raised | Where the HR source is known-reliable and you accept the risk |

You can also set how long a feed may go without a successful sync before it is
treated as stale (48 hours by default, which survives an overnight outage and a
weekend maintenance window), and tighten the headcount-drop threshold below 25%.

## Related

- [Identities](./identities.md) — the worker record and its sources
- [Onboarding](./onboarding.md) — joiner automation
- [Policies](./policies.md) — lifecycle policy configuration
