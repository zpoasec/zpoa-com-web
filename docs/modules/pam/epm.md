---
sidebar_position: 8
title: "Endpoint Privilege Management"
---

# Endpoint Privilege Management

EPM removes standing administrator rights from laptops and servers, and replaces
them with rules about which applications may run elevated, by whom.

Most people need admin rights for a handful of specific tasks — installing an
approved package, restarting a service, running a debugger. EPM grants exactly
those and nothing else.

## Requirements

The ZPOA agent must be installed and running as root or LocalSystem. Enforcement
writes system-level policy, so an agent running as an ordinary user cannot apply
it — it logs that it is skipping EPM rather than failing quietly.

Enforcement is currently implemented for **Linux**. On Windows and macOS the
agent reports that enforcement is unavailable rather than showing the host as
covered.

## Creating a policy

**PAM → Endpoint Privileges → New Policy**

| Setting | What it does |
|---|---|
| OS type | Which platform the policy applies to |
| Target groups | Which host groups receive it |
| Rules | Which applications may be elevated, and by whom |
| Allowlist mode | Deny anything no rule permits |
| Blocklist | Applications that may never be elevated |
| Remove local admin | Strip users from the local administrators group |
| Admin exceptions | Accounts never stripped |
| Priority | Lower number wins where policies overlap |

## Writing rules

A rule names an application and who may elevate it:

| Field | Notes |
|---|---|
| Name | Shown in logs and in the generated policy |
| Path | Absolute path to the binary |
| Hash | SHA-256, to pin one specific build |
| Action | Allow, deny, or prompt |
| Users / Groups | Who it applies to. Empty means everyone. |
| Arguments | Restrict to specific arguments |
| No password | Skip the password prompt when elevating |

### Pin the hash for anything sensitive

A path-only rule allows whatever is at that path. Anyone who can replace the
binary inherits the permission. Pinning the hash means the rule matches that
exact build and nothing else.

Pinned rules need updating when the software updates, which is the cost of the
protection.

### Rule order

1. **Blocklist** is checked first. An explicit block always wins, whatever any
   rule says.
2. **The first matching rule** decides.
3. **Allowlist mode**, if on, denies anything that matched nothing.

## Removing local administrator rights

`Remove local admin` strips users from the local administrators group on
receiving hosts.

Several protections apply and cannot be turned off:

- `root` and uid 0 are never touched
- System accounts (uid below 1000) are never touched — service accounts are
  usually in that group because something needs them there
- Anyone on the exception list is never touched
- **The group is never emptied.** If the policy would remove every member, the
  agent refuses and reports it instead

That last one exists because a machine where nobody can elevate needs console
access to recover, and doing that to a fleet is a serious outage.

Always put at least one break-glass administrator in the exception list before
enabling this.

### Rolling it out

1. Create the policy with `Remove local admin` **off** and your rules in place
2. Apply it to a small pilot group
3. Watch elevation requests for a week — this tells you what people actually need
4. Add rules for the legitimate cases you find
5. Only then turn on `Remove local admin`, still on the pilot group
6. Widen once the pilot is quiet

## What people experience

With a matching allow rule, elevation is granted — with or without a password
prompt depending on the rule.

Without one, it depends on the mode. In allowlist mode elevation is refused and
the user can request it: the request appears under
**PAM → Endpoint Privileges → Requests** for an administrator to approve, and
approval grants elevation for a limited window.

## Offline hosts

The agent caches its policy and keeps enforcing it when it cannot reach ZPOA. A
laptop off the network stays governed by the last policy it received.

A failed policy check never relaxes enforcement. The agent distinguishes "this
host has no policy" — which does stop enforcement — from "I could not reach the
server", which does not.

Policy changes reach connected hosts within a few minutes.

## Reviewing

**PAM → Endpoint Privileges → Dashboard** shows policies in force, elevation
requests, and what was allowed or blocked.

Blocked elevations raise an alert. A rise in them usually means a policy is too
tight rather than that people are misbehaving — read them as feedback on the
rules.

## Related

- [Overview](./overview.md)
- [JIT Access](../fortress/jit-access.md)
