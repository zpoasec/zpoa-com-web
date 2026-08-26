---
sidebar_position: 9
title: "SSH Certificates"
---

# SSH Certificates

SSH certificates replace long-lived SSH keys with short-lived credentials issued
on demand.

An SSH key, once copied into `authorized_keys`, works until someone removes it —
and in practice nobody does. Keys accumulate on hosts for years, belonging to
people who left. A certificate expires on its own, usually within hours.

## How it works

1. ZPOA holds a certificate authority for your organisation
2. Each host is configured to trust that CA
3. When you connect, ZPOA issues you a certificate valid for a short window
4. The host accepts it because it trusts the CA
5. The certificate expires; nothing is left behind

No per-user keys on hosts. Nothing to clean up when someone leaves — remove
their access in ZPOA and they can no longer be issued a certificate.

## Setting it up

**PAM → SSH Certificates**

1. **Get the CA public key** — shown on the SSH Certificates page
2. **Deploy trust to your hosts** — add the CA key to each host's
   `sshd_config` as a `TrustedUserCAKeys` entry
3. **Confirm deployment** — the Trust Deployments tab shows which hosts have it

Do this on a test host first. Misconfiguring `sshd_config` can lock you out of a
machine, so keep an existing session open while you verify.

## Connecting

Nothing changes for users. Connect through [Session Access](./session-access.md)
and certificate issuance happens automatically.

## Certificate lifetime

Short by default — typically a few hours. Long enough for a working session,
short enough that a leaked certificate is nearly worthless.

A session that outlives its certificate stays connected; SSH checks the
certificate at authentication, not continuously.

## Revoking

**PAM → SSH Certificates → Certificates → Revoke**

Because certificates are short-lived, revocation matters less than with keys —
but it exists for when someone leaves mid-session or a laptop is lost.

## Rotating the CA

**PAM → SSH Certificates → Rotate CA** issues a new certificate authority key.

Deploy the new CA public key to your hosts **before** retiring the old one.
Hosts trusting only the old CA will reject certificates signed by the new one,
which locks out every user of those hosts at once.

The recommended order:

1. Rotate the CA — both keys are now valid
2. Deploy the new CA key alongside the old one everywhere
3. Confirm every host shows both under Trust Deployments
4. Remove the old CA key from hosts

## Related

- [Session Access](./session-access.md)
- [Credential Vault](./credential-vault.md)
