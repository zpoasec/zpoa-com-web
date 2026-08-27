---
sidebar_position: 16
title: "Sealing the vault, and recovering it"
---

# Sealing the vault, and recovering it

Two questions that need an answer before anyone will accept a credential vault
in production:

1. If the encryption key is compromised, what stops the vault handing out
   credentials while you deal with it?
2. If the encryption key is lost, is everything in the vault gone?

## Sealing

A sealed vault refuses to decrypt anything. Immediately, without a redeploy, for
every tenant in the deployment.

**Settings → Vault → Seal.** A reason is required.

The reason is not bureaucracy. "The vault is sealed" arriving at 3am with no
explanation is the worst possible page to receive, and the reason is what tells
the next responder whether this was a drill, a suspected compromise, or somebody
testing in the wrong environment.

While sealed:

- Credential check-out fails.
- Rotation fails.
- Session brokering that needs a vaulted credential fails.
- Everything says *the vault is sealed* rather than reporting a decryption error,
  so nobody spends an hour debugging the wrong thing.

Keys already held in memory are discarded as part of sealing. A seal that kept
serving whichever tenants happened to be warm would be the worst of both.

### Unsealing

**Settings → Vault → Unseal.** This is the ordinary path after a precautionary
seal, where the master key never left the deployment and only the refusal needs
lifting.

## Recovery shares

If the master key is genuinely lost — the secret store was deleted, the
environment could not be rebuilt — recovery shares are how you get the vault
back.

**Settings → Vault → Generate recovery shares.**

The shares are displayed **once** and stored nowhere. Distribute them to
separate people before you close the page. A system that can show you the
recovery shares is a system where the recovery shares add nothing.

### How the split works, and its limitation

Every share is required. Three shares means all three holders must be present;
two is not enough.

This is simpler than the k-of-n schemes some products use, and the trade is
deliberate. A scheme simple enough to be reconstructed by hand from a runbook is
worth something in exactly the situation recovery keys exist for — the tooling
is unavailable and somebody is working from a printed procedure. It also means
**losing one share loses the recovery path**, so store them somewhere durable and
separate.

### Using them

1. Seal state shows *sealed* and the vault is refusing to decrypt.
2. Each holder submits their share.
3. When the last one arrives, the shares are combined and checked against a
   stored digest. If they do not reconstruct the key, all submitted shares are
   discarded and everyone starts again — so a wrong share cannot be narrowed
   down by trial.
4. The vault unseals.

### Rotating them

Generating a new set voids the previous one. Do it when somebody who held a
share leaves.

## Who can do this

Sealing, unsealing and generating shares are administrator-only, and they affect
the whole deployment rather than one tenant — the master key protects every
tenant's data, so a per-tenant seal would be a control that does not match what
it is protecting.

Reading the seal *status* is available to any tenant administrator, so somebody
whose credentials suddenly stopped resolving can see why.
