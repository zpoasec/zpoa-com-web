---
sidebar_position: 7
title: "Break-Glass Access"
---

# Break-Glass Access

Break-glass is emergency access for when the normal path is not available — the
approver is unreachable, the identity provider is down, or a production incident
cannot wait for a queue.

It is deliberately uncomfortable to use. Every break-glass activation is
high-visibility, time-boxed, and reviewed afterwards.

## Requesting

**PAM → Break-Glass → Request Access**

| Field | Notes |
|---|---|
| Target system | What you need to reach |
| Target account | Which account |
| Reason | What is happening and why normal access will not do |
| Severity | Drives who is notified and how urgently |

Write the reason as though someone will read it in a post-incident review,
because they will. "Prod down" is not enough. "Checkout service returning 500s,
on-call DBA unreachable, need to inspect connection pool on db-prod-01" is.

## Approval

Break-glass requires a second person. Requesting does not grant anything.

The request raises an immediate alert rather than joining a queue, so the
approver sees it now.

Some organisations configure two approvers for the highest-severity targets.
Neither can be the requester.

## While access is active

Once approved:

- Access is granted for a fixed window, normally four hours
- The session is recorded like any other
- A prominent alert stays open for the duration
- Every action is attributed to you, not to the shared account

Access expires automatically. If you still need it after that, request again,
which is intentionally more friction than an open-ended grant.

## Revoking early

**PAM → Break-Glass → *activation* → Revoke** ends it immediately. Do this as
soon as the incident is handled — do not let a grant run to expiry out of
convenience.

## Break-glass keys

Some organisations keep sealed break-glass credentials for the case where ZPOA
itself is unavailable. These are stored separately, require dual control to
retrieve, and their retrieval is alerted on.

They exist for total-outage scenarios. Using one should be a notable event, not
a routine one.

## Afterwards

**PAM → Break-Glass → History** is the review record: who requested, who
approved, why, when, how long, and what was done.

Review these regularly — monthly is common. Two patterns are worth watching for:

- **The same person breaking glass repeatedly** usually means their normal
  access is wrong. Fix the access rather than normalising the emergency path.
- **Break-glass used outside incidents** means the normal request path is too
  slow. Fix the path.

## Related

- [Session Access](./session-access.md)
- [Credential Vault](./credential-vault.md)
- [Approval Center](../fortress/approval-center.md)
