---
sidebar_position: 3
title: "Cloud Resource Inventory"
---

# Cloud Resource Inventory

Armor keeps a catalogue of everything it finds across your connected accounts,
normalised so that a bucket is a bucket whether it lives in AWS, Azure, Google
Cloud or OpenStack.

## What is in the inventory

- **Compute** — virtual machines, container clusters, serverless functions,
  dedicated servers
- **Storage** — object stores and containers, block volumes, file shares
- **Databases** — managed database instances and servers
- **Networking** — virtual networks, security groups, firewall rules, load
  balancers, public address blocks
- **Identity** — users, roles, service accounts and managed identities, with the
  grants attached to each
- **Security services** — audit trails, key-management services, key vaults

## What each record tells you

Alongside the obvious attributes — name, type, region, tags, cost, when the
provider created it — each resource carries the three things that decide how
much it matters:

**Exposure.** *Public* means directly reachable. *Reachable via path* means
something public can get to it through a relationship Armor observed. *Private*
means no such path was found. *Unknown* means Armor has not collected enough to
say — and it is reported as unknown, never quietly treated as private.

**Risk score.** A 0-100 number combining exposure, whether the resource is
encrypted, what category it is in, whether it is production, and whether anyone
owns it.

**Relationships.** What reaches this resource and what it can reach, each with
the evidence — the security-group binding, the attached role, the policy grant.

## Ownership

Armor derives an owner from conventional tags (`owner`, `Owner`, `team`,
`Service` and similar) so that work can be routed. You can override it, and a
manual assignment always wins: the next scan will not overwrite a decision a
person made.

Resources with no owner are scored slightly higher, because unowned work does
not get done — the goal is to make it visible rather than urgent.

## Change history

Security-relevant changes are recorded with **who made them and when** — whether
a bucket became public, encryption was turned off, or a resource became
internet-facing. This comes from your cloud provider's activity feed, so it is
attributed rather than inferred from comparing two snapshots.

## Data classification

Resources that hold data get a second view: what kind of data was detected, how
sensitive it is, whether it is encrypted, and whether it is a store nobody
registered. That is what turns *"this bucket is public"* into *"this bucket
holds regulated data and is public"*.

## Inside your workloads

Where the Zpoa agent runs on a host, Armor links what the agent reports — the
operating system, installed packages, listening ports — to the cloud resource
that host runs on. When a vulnerability on that host is in the known-exploited
catalogue, findings on that resource are scored higher.

This only sees hosts running an agent. Coverage says so explicitly: instances
without one are **unexamined**, not verified clean.

## Finding things

Filter by provider, account, resource type, region, exposure, owner or tag — or
just ask. "Which production databases are reachable from the internet", "what
does the payments team own", and "what changed in the last day" all work.
