---
sidebar_position: 3
title: "Rotation"
---

# Credential Rotation

Rotation changes vaulted credentials on a schedule so that a secret which leaks
has a limited useful life.

## How a rotation runs

1. A new secret is generated to the policy's length and complexity
2. It is checked against the credential's password history so it is not a reuse
3. It is applied on the target system
4. It is encrypted and stored in the vault
5. If the policy asks for it, ZPOA authenticates with the new secret to confirm it works
6. The attempt is written to the rotation log either way

If verification fails, ZPOA puts the previous secret back on the target and in
the vault, then reports the failure. That matters: a rotation that changed the
target but produced a secret the target does not accept would otherwise lock
everyone out of that account.

If the rollback also fails, the credential is reported as being in an unknown
state and needs manual recovery. This is rare and always surfaced loudly rather
than logged quietly.

## Creating a rotation policy

**Rotation → Policies → New Policy**

| Setting | What it does |
|---|---|
| Interval | How often to rotate, in days |
| Password length | Generated secret length. 24+ unless the target cannot accept it. |
| Complexity | Character classes required |
| Rotate after check-in | Rotate as soon as a checkout is returned, making each checkout single-use |
| Verify after rotate | Authenticate with the new secret to confirm it works. Leave this on. |
| Notify on failure | Alert when a rotation fails |
| Notify channels | Email addresses to notify |

Attach the policy to credentials from the credential's own screen.

### Choosing an interval

Rotation interval is a trade-off, not a maximisation. Every rotation is a chance
to break something that had the old password embedded in it. Common starting
points:

- **Domain and cloud admin accounts** — 30 days
- **Database superusers** — 60 to 90 days
- **Service accounts** — 90 days, and only after you know what consumes them
- **Anything checked out by a human** — turn on rotate-after-check-in and let
  the interval be a backstop

## Supported platforms

| Platform | How the secret is changed | Verified by |
|---|---|---|
| Linux | `chpasswd` over SSH | SSH login |
| Windows | `net user` over WinRM | WinRM connection |
| Active Directory | LDAP password change over LDAPS | Directory bind |
| Entra ID | Microsoft Graph app secret replacement | Token request |
| PostgreSQL | `ALTER USER` | Database login |
| MySQL | `ALTER USER` | Database login |
| AWS IAM | Access key replacement | — |
| SSH keys | New keypair installed, old key removed | Key authentication |

A credential on a platform not listed here can still be stored, checked out and
audited. It just will not rotate automatically — you rotate it yourself and
update the stored secret.

### Platform notes

**Active Directory** requires LDAPS. Active Directory refuses password changes
over an unencrypted connection, so a plain `ldap://` URL is rejected up front.

By default ZPOA changes the password by authenticating as the account itself,
which enforces your password history and minimum-age rules. Configure a
dedicated rotator account instead when the target cannot log in on its own — for
example an account whose password has already expired, or one that requires a
smartcard.

**Entra ID** adds the new secret before removing the old one, so an interruption
leaves you with a working credential rather than none. If the removal fails, the
old secret is still live on the app registration and needs removing by hand;
ZPOA says so explicitly when this happens.

**SSH keys** install the new public key, prove it authenticates, and only then
remove the old one. If the new key does not work it is withdrawn and the old key
kept.

**AWS IAM** creates the new access key before deleting the old one, with the same
partial-failure behaviour as Entra ID.

## Scheduled rotation

Credentials with a policy attached rotate on their own. The scheduler checks
every few minutes for credentials that are due.

It deliberately skips some:

- **Checked-out credentials.** Rotating one out from under someone mid-session
  would leave them with a secret that no longer works. It rotates once checked in.
- **Credentials whose policy is paused.**
- **Credentials that have failed five times in a row.** Something needs a human:
  the target is unreachable, the stored secret is wrong, or the platform is
  unsupported. You will be notified, and a manual rotation resets the count.

## Rotating now

**Rotation → Credentials → *credential* → Rotate Now**, or **Bulk Rotate** to
drain everything currently overdue.

Use bulk rotation after an incident, when the concern is that current secrets
are known.

## Reading the rotation log

**Rotation → History**

| Status | Meaning |
|---|---|
| Completed | Changed and, if configured, verified |
| Failed | Not changed. The old secret still works. |
| Rolled back | Changed, verification failed, previous secret restored |
| Pending / Rotating | In progress |

A rotation that succeeded but produced a warning — for example a new AWS key
created while the old one could not be deleted — shows as completed with the
warning attached. The credential works; something needs cleaning up.

## Encryption keys

Vaulted secrets are encrypted with a key belonging to your organisation, not one
shared across customers.

**Vault → Keys** lists your key versions. **Rotate Key** issues a new one.

Rotating the encryption key does not re-encrypt existing secrets — they keep
their key version and stay readable, and new writes use the new key. So key
rotation limits future exposure. **If you believe a key has been compromised,
rotate the credentials themselves as well**, because existing stored secrets
remain readable to anyone holding the old key.

## Related

- [Credential Vault](./credential-vault.md)
- [Password Policies](./password-policies.md)
