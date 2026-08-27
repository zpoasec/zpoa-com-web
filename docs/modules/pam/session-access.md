---
sidebar_position: 4
title: "Session Access"
---

# Session Access

Session access connects you to a server, desktop, database or cluster without
handing you the credential. ZPOA holds the secret, opens the connection, and
gives you a terminal or screen in the browser.

Two things follow from that. You never see the password, so it cannot be reused,
shared or written down. And because the connection runs through ZPOA, it can be
recorded, filtered and supervised.

## Connecting

**Assets → *asset* → Connect**, then choose a protocol.

| Protocol | You get | Requires |
|---|---|---|
| SSH | A terminal in the browser | An SSH credential for the asset |
| RDP | A Windows desktop in the browser | An RDP credential for the asset |
| Database | A SQL console | A database credential |
| Kubernetes | A namespace-scoped kubectl session | Cluster access configured |
| Cloud console | A signed-in AWS, Azure or GCP console | A cloud role mapping |
| Mainframe | A 3270 terminal | Mainframe gateway configured |

Nothing needs installing. No VPN, no client, no local key.

## During a session

The session is recorded from the moment it opens. In an SSH session the commands
you type are captured individually and checked against your organisation's
command rules — most rules only record, some warn, a few block. If something is
blocked you will see why on your own terminal.

An administrator may attach to watch, may send you a message, and may end the
session. If a session is ended you are told why before the connection closes.

Sessions have a maximum duration set by policy, and idle sessions close on their
own.

## Just-in-time access

If you do not currently have access to an asset, request it rather than asking
someone for a credential:

**Assets → *asset* → Request Access**

Give a reason and how long you need. Depending on policy it is auto-approved or
routed to an approver. Approved access is granted for the window you asked for
and expires on its own. See [JIT Access](../fortress/jit-access.md).

## Windows ephemeral accounts

For some Windows hosts, rather than sharing an administrator account, ZPOA
creates a temporary local account for your session and deletes it afterwards.
Nothing to check out, nothing left behind.

You do not need to do anything differently — connect as usual.

## Incident access

During a declared incident, responders can be granted broader access than usual
for the duration. Grants are tied to the incident reference and are revoked when
it is resolved. See [Break-Glass Access](./break-glass.md).

## After a session

Recordings and command history are available under
**Sessions → *session***. See [Session Recording](./session-recording.md).

Every session is scored for risk when it closes, based on the commands run, how
much data moved, the time of day, and how long it lasted. High-scoring sessions
are surfaced for review — a score is a prompt to look, not an accusation.

## Related

- [Session Recording](./session-recording.md)
- [Command Controls](./command-controls.md)
- [SSH Certificates](./ssh-certificates.md)
