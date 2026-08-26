---
sidebar_position: 1
title: "Overview"
---

# Privileged Access Management

PAM controls the accounts that can do the most damage — domain admins, database
superusers, root on production hosts, cloud root accounts, service accounts with
broad permissions.

The problem it solves is not that these accounts exist. It is that in most
organisations they are shared, their passwords are written down somewhere, they
never change, and when something goes wrong nobody can say who was logged in.

ZPOA PAM addresses that in four parts.

## The four parts

### 1. Nobody knows the password

Privileged credentials live in an encrypted vault. People check them out when
they need them, with a reason recorded, and check them back in when they are
done. For the most sensitive accounts the credential is never shown at all — you
connect through ZPOA and the password is injected on your behalf.

See [Credential Vault](./credential-vault.md).

### 2. Passwords change on their own

A password that never changes is a password that eventually leaks. Rotation
policies change credentials on a schedule, verify the new one works, and roll
back if it does not. Some credentials rotate the moment they are checked back
in, so a checkout is genuinely single-use.

See [Rotation](./rotation.md).

### 3. Sessions are recorded

When someone connects to a server through ZPOA, the session is recorded. You can
replay it later, search the commands that were run, and see exactly what
happened. Rules can warn on or block dangerous commands while the session is
live, and an administrator can watch or end a session in progress.

See [Session Access](./session-access.md), [Session Recording](./session-recording.md)
and [Command Controls](./command-controls.md).

### 4. Nobody keeps privileges they are not using

Standing admin rights are removed. People request elevation when they need it,
it is granted for a limited time, and it expires on its own. On laptops and
servers, endpoint policies decide which applications may run elevated and by
whom.

See [Endpoint Privilege Management](./epm.md) and, for role and application
access, [JIT Access](../fortress/jit-access.md).

## Where to start

If you are setting PAM up for the first time, this order works well:

1. **Put your most sensitive credentials in the vault.** Start with a handful —
   domain admin, the production database superuser — rather than importing
   everything at once.
2. **Turn on rotation for those.** Verify a rotation completes successfully
   before widening the policy.
3. **Move people onto brokered sessions.** Have them connect through ZPOA
   instead of using the credential directly. Recording starts automatically.
4. **Add command rules in alert mode.** Watch what they catch for a couple of
   weeks before switching any of them to block.
5. **Remove standing admin rights** once people are comfortable requesting
   elevation.

Doing step 5 first is the usual mistake. It generates a wave of support tickets
before anyone has learned the request workflow.

## What you need

- Credentials that ZPOA can use to reach each target system
- Network connectivity from ZPOA to the systems you want to manage
- For endpoint privilege management, the ZPOA agent installed on the hosts

## Related

- [Break-Glass Access](./break-glass.md) — emergency access when normal approval is not possible
- [SSH Certificates](./ssh-certificates.md) — short-lived certificate access instead of keys
- [Password Policies](./password-policies.md) — strength and reuse rules for vaulted credentials
- [Vault MFA](./vault-mfa.md) — step-up authentication before a credential is released
