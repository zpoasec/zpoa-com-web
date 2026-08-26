---
sidebar_position: 23
title: "Contractor Access Risk"
---

Contractors, vendor staff and outsourced teams are where access findings
concentrate, and they are the hardest population to see. Your HR system usually
does not hold them, so nothing tells you when an engagement ends.

Two patterns cause most of the findings:

- **Access that outlives the contract.** Nobody owns the offboarding — the
  vendor assumes the client does it, the client assumes the vendor said
  something.
- **One login shared across a vendor team.** The audit trail names a credential
  rather than a person, so no individual can be held to an action.

Contractor Access Risk reports both, with the evidence attached.

## Where to find it

**Fortress → Vendors → Access Risk.** The summary answers the question an
auditor opens with: how many contractors do you have, how many have findings,
and how long has the worst one been outstanding.

## What gets reported

### Access outlived the contract

The contract end date has passed and the account is still enabled. Severity
rises with how long it has been live, because three days past a contract end is
an oversight and three hundred is a governance failure.

If the account also holds administrative entitlements, it escalates faster.

### No contract end date

Access was granted with no end date at all, so nothing will ever expire it.
This is graded on structure rather than age — waiting does not make it worse in
the way an elapsed date does, but nothing will fix it on its own either.

### Shared account

One account with sign-in evidence from several distinct people. Reported at
three or more distinct sign-in subjects, not two — one person with a laptop and
a phone looks like two, and reporting that would bury the genuine findings.

A shared account holding administrative rights is reported as critical: no
administrative action taken in that system can be attributed to a person.

### Dormant contractor

A live contractor account with no sign-in for 90 days. Contractors work in
bursts, so a shorter window would flag ordinary gaps between engagements. Ninety
days usually means the engagement ended and nobody closed the account.

### Unsponsored access

Contractor access with no internal sponsor. Without one, there is no employee
you can ask whether the access is still needed — which makes an attestation
campaign impossible.

## Working the list

Findings are ordered by severity, then by how long they have been outstanding,
so the list reads as a work queue rather than an inventory.

An account can raise several findings at once, and all of them are shown rather
than only the worst. This matters because they are remediated differently: an
account past its contract end is revoked, while a shared account has to be split
into named accounts first — revoking it would cut off several people at once,
some of whom are legitimately working.

Disabled accounts raise no findings. They hold no live access, and they stay in
the record for your audit trail.

## Preventing the findings

- Set a contract end date on every vendor engagement, and enable **auto-disable
  on contract end** in **Fortress → Vendors**.
- Name an internal sponsor for each vendor. The sponsor, not HR, attests that
  the access is still needed.
- Run a vendor attestation campaign quarterly — see
  [Vendors](./vendors.md).

## Related

- [Vendors](./vendors.md) — vendor organisations, contracts and sponsors
- [Entitlements](./entitlements.md) — what access an account holds
- [Access Intelligence](./access-intelligence.md) — right-sizing access
