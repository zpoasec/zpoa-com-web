---
sidebar_position: 11
title: "Vault MFA"
---

# Vault MFA

Vault MFA requires a second factor at the moment a credential is retrieved,
rather than only at sign-in.

Signing in proves who you are at the start of the day. Retrieving a domain admin
password an hour later is a different act, and a session hijacked in between
would otherwise inherit that ability.

## Setting up a policy

**PAM → Vault MFA → Policies → New Policy**

| Setting | Notes |
|---|---|
| Scope | Which credentials or folders it covers |
| Methods | WebAuthn security keys, platform authenticators, or TOTP |
| Re-prompt interval | How long a successful challenge is honoured |
| Bypass groups | Accounts exempt. Use sparingly. |

Applying MFA to every credential trains people to reach for their key
reflexively, which defeats the purpose. Scope it to the credentials where a
challenge should make someone pause.

## Registering a security key

**Profile → Security → Register Security Key**

Follow the browser prompt. Hardware keys and platform authenticators — Touch ID,
Windows Hello — both work.

Register **at least two**. A lost key with no backup means an administrator has
to reset your enrolment, and that path is deliberately slow.

## Being challenged

When a covered credential is retrieved you are prompted before it is released.
Complete the challenge and the checkout proceeds; the credential is not released
until you do.

Within the re-prompt interval, further retrievals in the same session do not
challenge again.

## When a key is lost

Ask an administrator to reset your enrolment under
**PAM → Vault MFA → Registered Keys**. Registered keys can be revoked
individually — if one of two keys is lost, revoke just that one and register a
replacement.

## Related

- [Credential Vault](./credential-vault.md)
- [Passwordless](../fortress/passwordless.md)
