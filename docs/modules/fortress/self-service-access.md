---
sidebar_position: 25
title: "Self-Service Access"
---

Most of what people contact IT about is access: they need something new, they
have forgotten a password, or they are locked out. Self-service handles all
three without a ticket, and records the ones it could not so you can see the
real deflection rate rather than an optimistic one.

## For your people

### Requesting access

**Portal → Request** lists what they can ask for, with recommendations based on
what people in similar roles hold. A request goes to the right approver
automatically.

**Portal → My requests** tracks progress, and **Portal → My access** shows what
they currently hold and when it expires.

### Recovering access

If someone cannot sign in, **Forgot password?** on the sign-in page starts a
verified recovery. It covers:

- A forgotten password
- An account locked by too many failed attempts
- A lost or replaced authenticator app

They verify who they are, and the change is applied.

## Why recovery asks for more than an emailed code

A password reset flow is, by design, a way to get a credential without knowing
the current one. What keeps it from being an easy way in is how strongly the
person is verified.

**An emailed link is not enough on its own.** Whoever controls the mailbox
controls the account, and a compromised mailbox is how most account takeovers
begin. A text message alone is no better — SIM swap is a routine technique.

So ZPOA counts those as supplementary. They help start the process but do not
complete it. Completing a reset needs verification that proves possession of
something enrolled earlier — an authenticator app, a security key — or
confirmation from a person, meaning a manager or your helpdesk.

Your people see a progress indicator, and steps that do not count toward it are
labelled so nobody wonders why entering an emailed code did not advance them.

### Accounts with elevated permissions

Where someone holds administrative access, a manager approval or helpdesk vouch
is required regardless of what else they have verified. An unattended reset of
an administrator account is the worst thing this feature could do, so it is not
possible.

## Configuring it

**Settings → Self-Service → Verification.**

| Setting | What it does |
|---|---|
| **Verification methods** | Which methods your organisation allows |
| **Require a person for elevated accounts** | On by default |
| **Attempts per day** | Bounds abuse without blocking someone genuinely struggling |
| **Challenge validity** | How long a started verification stays open |
| **Minimum verification steps** | Can be raised above the default, never lowered |

That last one is deliberate. You can be stricter than the platform default but
not more permissive, because the defaults are what stop a misconfiguration from
opening a route into every account.

## Measuring what it saves

**Settings → Self-Service → Activity** reports, per action, how many were
completed without an agent and how many escalated to your helpdesk.

Escalations are counted. A deflection figure that treated every attempt as a
saving would overstate the benefit, and the first time you compared it against
your real ticket volume you would stop trusting the number.

Compare the completed figure against your helpdesk's password and lockout ticket
volume for the same period. That difference is the saving, and it is one you can
verify rather than take on trust.

## Related

- [Approval Center](./approval-center.md)
- [Storefront](./storefront.md) — the access request catalogue
- [Service Desk Bridge](./service-desk-bridge.md) — recording requests in your ITSM
