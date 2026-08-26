---
sidebar_position: 24
title: "Service Desk Bridge"
---

An access grant that leaves no record where your auditor looks is, to them, an
ungoverned change. If your organisation keeps that record in ServiceNow,
Freshservice, Jira Service Management or ServiceDesk Plus, the Service Desk
Bridge puts it there automatically.

It works in both directions, because organisations differ on where a request
should start.

## Two modes

### ZPOA-fronted

Your people request access in ZPOA. A ticket is raised in your service desk as
the audit record, updated as the request moves through approval, and closed when
the access is granted or refused.

Use this when you want the request experience in ZPOA but the audit trail where
your auditors already look.

### ITSM-fronted

Your people request access in your service desk, exactly as they do today. ZPOA
picks the request up, runs the approval and provisioning, and closes the ticket
when it is done.

Use this when introducing a second portal is not acceptable — which is common in
larger organisations where the service desk is the single front door by policy.

### Choosing

**Fortress → Connectors → \[your service desk\] → Access Requests.**

The mode decides who has the final say. In ZPOA-fronted, the approval in ZPOA
decides and the ticket follows. In ITSM-fronted, the ticket decides and ZPOA
follows. That is deliberate — if both sides could overrule each other, a request
would flip back and forth between them.

## When the two sides disagree

Occasionally the ticket and the request end up saying different things. Someone
closes the ticket by hand while the approval is still open, or the request is
approved in ZPOA while an agent rejects the ticket.

ZPOA does not pick a winner. Guessing would either grant access that was refused
or revoke access that was granted, and both are worse than asking.

Instead the link is marked **needs review** in **Fortress → Connectors → Access
Requests → Needs review**, showing what each side says and when each changed.
You decide which stands, and the other side is updated to match.

## When your service desk is unavailable

An access request is never blocked by your service desk being unreachable. The
request proceeds, approvals run, and the ticket is created on a later sync pass
once the desk is back.

The alternative — failing the request — would make people unable to get access
because a different system was down.

Links waiting for a ticket show as **pending** until they succeed.

## If you have no service desk

The bridge is entirely optional. Plenty of organisations run access requests
through ZPOA alone, and that is a supported configuration rather than a
compromise:

- Requests are raised in the employee portal.
- Approvals go to the approver's inbox in ZPOA.
- The full audit trail — who asked, who approved, when, and what was granted —
  lives in ZPOA and exports from **Comply → Evidence**.

Connect a service desk later if you adopt one. Nothing needs re-doing.

## Reading the status

**Fortress → Connectors → Access Requests** shows every link:

| State | Meaning |
|---|---|
| **Pending** | The ticket has not been created yet |
| **Linked** | Both sides exist and agree |
| **Needs review** | The two sides disagree; you decide |
| **Closed** | The request and the ticket are both finished |
| **Failed** | Ticket creation failed. The reason is shown, and it will retry |

**Oldest unsynced** on the same page is the one number worth watching. If it
climbs steadily, the sync has stopped running and tickets are drifting out of
date.

## What agents see

Tickets raised by ZPOA name the requester and what they asked for, rather than
saying "Access request" — a queue full of identical subjects is unusable.

The description states that approval and provisioning happen in ZPOA and the
ticket updates itself. Without that, an agent picks the ticket up and tries to
provision by hand, doing the work twice and sometimes granting more than was
approved.

## Related

- [Approval Center](./approval-center.md) — where approvals are actioned
- [Storefront](./storefront.md) — the access request catalogue
- [Ticketing Integrations](../../integrations/ticketing.md)
