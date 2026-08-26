---
sidebar_position: 2
title: "Credential Vault"
---

# Credential Vault

The vault stores privileged credentials so that no individual has to know them.
People check a credential out when they need it, with a reason, and check it
back in when they are done.

## Organising the vault

Credentials live in folders. Folders are how you control who can see what, so
organise them the way you organise responsibility — usually by team, by
environment, or by both:

```
Production
  Databases
  Linux Servers
  Network Devices
Staging
  Databases
Cloud
  AWS
  Azure
```

A folder's access policy applies to everything inside it. Nesting a folder
inside a more restricted one does not loosen it.

## Adding a credential

**Vault → Credentials → Add Credential**

| Field | Notes |
|---|---|
| Name | What people will search for. `prod-db-postgres-admin` beats `admin`. |
| Type | Password, SSH key, API key, certificate, service account, or connection string |
| Platform | Determines how rotation and verification work — see [Rotation](./rotation.md) |
| Hostname / Port | The target system |
| Username | The account on that system |
| Secret | The password or key. Encrypted immediately; never displayed again in full. |
| Folder | Controls who can see it |
| Rotation policy | Optional — see [Rotation](./rotation.md) |

Once saved, the secret is not retrievable through the UI except by check-out,
which is recorded.

## Checking a credential out

**Vault → Credentials → *credential* → Check Out**

You provide a reason and a duration. The reason is not a formality — it is what
appears in the audit log and what an auditor reads when asking why this account
was used at 2am.

While a credential is checked out:

- It is locked to you. Nobody else can check it out.
- The checkout has a deadline. It is released automatically when that passes.
- Everything is logged: who, when, why, from which IP.

**Check it back in as soon as you are done.** If the credential's policy has
rotate-on-check-in enabled, checking in immediately invalidates the secret you
were given, which is the point.

### When a checkout needs a second person

Some credentials are configured to require dual control. Checking one out raises
an approval request instead of releasing the secret, and a second person has to
approve before you can retry.

The approval is good for four hours and covers one checkout. It does not carry
over to the next one.

### When someone forgets to check in

An administrator can force a check-in. The credential is released, the event is
logged as a forced check-in, and if rotation-on-check-in is configured, it
rotates.

## Connecting without seeing the credential

For most work you do not need the password at all. Connecting through
[Session Access](./session-access.md) injects the credential for you: you get a
terminal or desktop, the secret is never displayed, and the session is recorded.

Prefer this. A credential nobody has seen cannot be written on a sticky note.

## Vault health

**Vault → Health** shows what needs attention:

| Indicator | What it means | What to do |
|---|---|---|
| Aging | Not rotated in over 90 days | Attach a rotation policy |
| Breached | Found in a known breach corpus | Rotate immediately |
| Reused | The same secret appears on more than one credential | Rotate both |
| Orphaned | The target account no longer exists | Remove the credential |
| Unverified | ZPOA has not confirmed the credential works | Run Verify |
| Checked out | Currently held by someone | Check who, and whether they still need it |

**Verify** connects to the target and confirms the stored credential still
authenticates. Run it after any change made outside ZPOA — a credential that has
drifted will fail at the worst possible moment.

## Discovering credentials you did not know about

**Vault → Discovery** scans for privileged accounts that are not yet vaulted:
local administrators, service accounts, SSH keys in home directories, hardcoded
credentials in configuration.

Discovery finds accounts; it does not onboard them. Review the results and
onboard deliberately — bringing an account into the vault changes who can reach
it.

## Audit

**Vault → Checkout Log** is the full history: every checkout and check-in, who,
when, why, from where, and how long it was held. It cannot be edited or deleted.

## Related

- [Rotation](./rotation.md)
- [Vault MFA](./vault-mfa.md)
- [Password Policies](./password-policies.md)
- [Session Access](./session-access.md)
