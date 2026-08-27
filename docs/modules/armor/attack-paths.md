---
sidebar_position: 4
title: "Attack Path Analysis"
---

# Attack Path Analysis

An attack path is a chain Armor can actually walk: from something reachable from
the internet, through relationships it has observed, to something worth
reaching.

Two properties make the list usable. Every hop is **verified** — Armor saw the
relationship, it did not infer one from two problems happening to sit in the
same account. And every path ends somewhere that matters, so the list stays
proportional to real risk rather than growing with the number of findings.

## Reading a path

A path reads end to end, with the evidence for each hop:

```
Internet
  → web-1 (EC2 instance, reachable, allows IMDSv1)
      via: confirmed reachable on 203.0.113.10
  → app-deploy-role (IAM role, wildcard administrative grant)
      via: instance profile arn:aws:iam::…:instance-profile/app-profile
  → acme-customer-data (S3 bucket, public access block disabled)
      via: policy AppReadData allows s3:GetObject
```

Each step names the resource, the finding on it, and the relationship that got
the attacker there. Ask the assistant to expand any step and it shows the
underlying finding and its evidence.

## How a path is scored

Every path carries a **risk score from 0 to 100** built from what is actually
true about it:

- **The worst finding on the chain** — a path is at least as bad as its weakest
  link
- **Whether the entry point is confirmed reachable** from outside, rather than
  merely holding a public address
- **What sits at the end** — a store of regulated data, a production database,
  or an administrative identity
- **Whether the chain crosses a privilege boundary** — assuming a role or
  gaining administrative rights
- **How short it is** — a two-hop chain is more likely to be real, and easier to
  act on, than a five-hop one

Landing on an identity scores higher than landing on a single resource, because
an attacker who reaches an identity inherits everything it can reach — not just
what this particular path showed.

## What is treated as a target

Armor treats these as worth reaching:

- Databases and managed data services
- Object storage and file shares
- Key vaults, key-management services and secret stores
- Anything tagged as production
- Anything holding data classified as sensitive
- Identities holding administrative grants

You can also mark a resource as a crown jewel yourself, which overrides the
default.

## What is deliberately not reported

- **An entry point with no findings.** Something reachable but correctly
  configured is not an attack path. Reporting it as one trains people to ignore
  the list.
- **A hop that changes nothing.** A step through a well-configured resource that
  grants no new access is topology, not an attack.
- **A path with an unobserved relationship.** If Armor has not seen the link, it
  will not claim it.
- **Chains longer than five hops.** A path nobody can hold in their head does
  not get acted on, and every extra hop makes it likelier the path is
  theoretical.

If your paths list is empty while findings are not, the usual reason is that
Armor has not yet collected the relationships in that account. Ask "what can't
Armor see" — coverage will say so directly.

## Paths persist

A path keeps its identity between scans. You can see when it first appeared,
whether it is still live, and when it was closed. When the relationship or the
finding that made it possible goes away, the path is marked resolved rather than
quietly vanishing — so breaking an attack path is a result you can point at.

## Fixing a path

Every step is an opportunity, and the cheapest one is rarely the last. Removing
the wildcard grant in the middle of the example above closes that path and every
other path through that role — usually a better move than making one bucket
private.

Ask the assistant which single change closes the most paths.
