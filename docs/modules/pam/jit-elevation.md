---
sidebar_position: 13
title: "Just-in-time elevation"
---

# Just-in-time elevation

Standing privilege is the thing PAM exists to remove. Just-in-time elevation is
how: instead of holding an administrative role permanently, you ask for it when
you need it, it is granted for a fixed window, and it goes away.

:::info Where this fits
JIT is documented here alongside PAM because in practice it is the same
conversation. The Fortress guide [JIT access](../fortress/jit-access.md) covers
the identity-governance view — eligibility, certification, and the request
catalogue.
:::

## Asking for access

Three ways, all the same request underneath.

**From Slack**

```
/zpoa-request jit CN=Prod DBAs on orders-prod for "INC-4821 replication lag"
```

**From your terminal**

```bash
zpoa jit request "CN=Prod DBAs,OU=JIT Groups,DC=corp,DC=example,DC=com" \
  --for 60m --why "INC-4821 replication lag" --ticket INC-4821
```

**From the portal** — Request access, choose the role, fill in the form.

### Read what it tells you before you submit

The terminal and the portal both show the decision before the request is
created:

```
policy    Production DBA (enforce)
duration  60 minutes
risk      high
step-up   required at activation
approval  needs a human
grants    on active_directory
```

Two lines are worth reading properly.

**duration** — if the policy caps elevations at less than you asked for, it says
so here rather than after an approver has already looked at it.

**grants** — this says whether the elevation will put access on a real system.
If it says *nothing*, the elevation will be recorded and reviewed and no access
will appear anywhere. That is a legitimate configuration for a system ZPOA does
not manage; it is very rarely what you wanted.

## Being approved

Someone else approves it. You cannot approve your own request, and the product
will refuse if you try — the whole reason there is an approval step is that a
second person looked.

Some requests approve automatically. That happens when your administrator has
written conditions for it — short durations, low-risk roles, business hours —
and the approval record says which conditions were met.

## Activating

```bash
zpoa jit activate <request-id>
```

Or press **Activate** in the portal.

If the policy requires step-up, you will be asked for your security key now
rather than when you filled in the form. That is deliberate: proving who typed
the form is not the same as proving who is about to hold the privilege.

Activation is the moment the access appears on the target system. If the grant
fails, the activation fails — you will not be told you have access that is not
there.

## Using it

Access appears wherever the role lives: an Active Directory group, an Entra
role, an AWS IAM group, a Kubernetes RoleBinding, a PostgreSQL role.

If you are connecting to a host, go through the broker so the session is
recorded and joined to your elevation:

```bash
zpoa ssh db01
```

## Handing it back

You do not have to do anything. It expires on its own, and the access is removed
from the target system.

If you finish early, hand it back:

```bash
zpoa jit revoke <session-id>
```

Handing access back early is the behaviour a zero-standing-privilege programme
is trying to encourage, and the reports notice.

## Extending

If you need longer, extend — but the policy sets a limit on how many times, and
the total cannot exceed the policy's maximum duration. A grant extended a dozen
times is standing privilege with extra paperwork, and the reports treat it that
way.

## What "expired" means

An expired elevation means two things, and they are tracked separately:

- The session is over.
- The access has been removed from the target system.

Normally both happen at the same moment. When they do not — the domain
controller was unreachable, an API returned an error — the elevation shows as
**revoke failed**, it is retried, and it appears in the drift report until it is
resolved.

You can check for yourself at any time. **Check target** on a session asks the
system directly whether the access is still present. Three answers are possible:

- **gone** — the target confirmed it.
- **still present** — the target says the access is there. This is the one that
  matters.
- **could not check** — ZPOA could not reach the system. Not the same as "gone",
  and deliberately not reported as such.
