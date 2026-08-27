---
sidebar_position: 12
title: "Finding unmanaged accounts"
---

# Finding unmanaged privileged accounts

Most organisations have more privileged accounts than they think. A local
administrator created during a server build in 2019, a service account with
Domain Admin because that was the quickest way to make something work, an AWS
IAM user with `AdministratorAccess` attached directly rather than through a
group. None of them are in your vault, because nobody remembers they exist.

Account discovery finds them.

## What it looks at

Discovery uses the same connections you have already configured for
just-in-time access — a system ZPOA can grant on is a system it can enumerate.

| Source | What it looks for |
|---|---|
| Active Directory | Membership of the built-in privileged groups, including through nested groups; accounts protected by AdminSDHolder; service accounts whose password never expires |
| AWS IAM | Users with administrative policies attached directly, through a group, or inline; users with no MFA; old access keys |
| Entra ID | Directory role assignments — Global Administrator, User Administrator, and the rest |

## Running a scan

1. Go to **Access Control → Account Discovery**.
2. Press **Scan active directory** (or AWS IAM, or Entra ID).
3. Wait. A large forest takes a few minutes.

The **Unmanaged** tab is where to start. It shows privileged accounts that are
not in your vault.

## Reading a finding

Every account carries the reasons it was flagged, not just a score:

> **svc-backup** — member of Backup Operators (transitively); has a
> servicePrincipalName — a service account, shared by construction;
> DONT_EXPIRE_PASSWORD is set, so no rotation will ever be forced; password is
> 1,240 days old

Somebody will dispute at least one finding eventually, and "the score was 87" is
not an answer. The reasons are there so the conversation can be about the
evidence.

Flags worth acting on quickly:

- **stale** — not used in 90 days. An account nobody uses that can do anything
  is the one an attacker wants.
- **shared** — a service account. Nobody is individually accountable for what it
  does.
- **no MFA** — on a privileged cloud account.

## Bringing an account under management

Press **Vault it**.

The account is added to your credential vault immediately, **without a
password**. That is deliberate: ZPOA does not know the account's current
password and should not ask you to type it in.

What you do next is the part that matters. Attach a rotation policy and rotate.
After that the vault holds a password that nobody else has ever seen — which is
the actual security improvement, not the fact that a row appeared in a list.

If you genuinely know the password — it came out of a sealed envelope, or a
handover document — you can supply it when you vault the account, and rotate
afterwards anyway.

## Deciding not to manage an account

Some accounts should stay outside the vault. A break-glass account held in a
physical safe is the usual example.

Press **Exclude** and give a reason. The reason is required, and it is required
for one reason: an exclusion list nobody can review is a list that quietly
grows. "Why is this account excluded?" is the first question an auditor asks
about one, and the answer should not be "nobody remembers".

An excluded account keeps its exclusion across rescans, so the same findings do
not come back every time discovery runs.

## When the numbers look too good

If the dashboard shows zero unmanaged accounts, check the banner at the top. It
tells you whether a scan has ever run.

Zero unmanaged accounts because everything is vaulted, and zero because nothing
has been looked for, are very different situations — and the second is far more
likely.
