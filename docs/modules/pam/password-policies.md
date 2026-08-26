---
sidebar_position: 10
title: "Password Policies"
---

# Password Policies

Password policies set the rules for secrets stored in the vault: how long, how
complex, how often they must change, and whether they may repeat.

These govern **vaulted credentials**, not the passwords your people use to sign
in to ZPOA. Sign-in passwords are governed by your identity provider — see
[SSO](../../administration/sso.md).

## Creating a policy

**PAM → Password Policies → New Policy**

| Setting | Notes |
|---|---|
| Minimum length | 16 or more for generated secrets. The main thing that matters. |
| Character classes | Upper, lower, digits, symbols |
| Maximum age | Days before rotation is due |
| History depth | How many previous secrets may not be reused |
| Dictionary check | Reject secrets containing common words |
| Breach check | Reject secrets found in known breach corpora |

For secrets ZPOA generates, length does the work. Complexity requirements matter
mostly for credentials entered by hand.

## Checking a password

**PAM → Password Policies → Evaluate** tests a candidate against every active
policy and shows which pass and which fail, and why.

Useful when onboarding an existing credential and you want to know whether it
will be flagged before you store it.

## Breach checking

**PAM → Password Policies → Breach Check** tests whether a password appears in
known breach data.

The check uses k-anonymity: only the first five characters of the password's
hash leave your environment, and the full password never does. It is not
possible to reconstruct the password from what is sent.

The vault also flags credentials found in breach data under
**Vault → Health → Breached**. Rotate those immediately — a breached credential
is not "weak", it is known.

## Compliance report

**PAM → Password Policies → Compliance Report** lists stored credentials that
violate an active policy: too short, too old, reused, or breached.

Work it top down by risk rather than trying to clear it in one pass. A
production domain admin credential that is 400 days old matters more than a
staging account that is 100.

## Related

- [Credential Vault](./credential-vault.md)
- [Rotation](./rotation.md)
