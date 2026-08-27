---
sidebar_position: 5
title: "Issues"
---

# Issues: what to fix first

A misconfigured instance rarely has one problem. It has a public address, an
unpatched library, an over-privileged role, and a path to something sensitive.
Listed as findings, that is four rows and one attack path — five things that all
say "critical", none of which tells you whether this instance matters more than
the next one.

An **issue** is that instance, once. It carries a single score built from
everything Armor knows about the resource, and where a recognisable pattern
holds, it says which one.

Ask the assistant *"what should we fix first"* and this is the list it reads.

## What an issue looks like

> **Internet-facing web-1 is running exploitable software** — score 94, critical
>
> This EC2 instance is reachable from the internet, carries 3 known
> vulnerabilities, at least one of which is being actively exploited in the
> wild, holds administrative permissions, and fails 2 posture checks.
>
> `public exploitable` · 2 findings · 3 vulnerabilities · 1 secret · 1 attack path

The sentence is the point. It states only what Armor established — if exposure
was never determined, it says so rather than implying the resource is safe.

## Named combinations

Some pairings are worse than the sum of their parts. When one genuinely applies,
the issue is labelled with it:

| Combination | What it means |
|---|---|
| **Public exploitable** | Reachable from the internet and running software with a vulnerability that is being exploited right now |
| **Leaked credential** | A credential is sitting in the configuration of something an attacker can reach |
| **Public admin** | Internet-facing and holding administrative permissions — a foothold becomes account takeover |
| **Exposed sensitive data** | Reachable, and can get to a store holding data you have classified as sensitive |
| **Malware present** | Something matched a malware or crypto-miner detector |
| **Lateral pivot** | Sits on a verified attack path as a stepping stone rather than as the target |

Most issues have no label, and that is deliberate. A product that calls
everything a toxic combination has invented a synonym for "finding".

## How the score is built

Open any issue and it shows the arithmetic:

- **The worst single signal** sets the floor. An issue is never rated less
  serious than its most serious component.
- **The combination multiplies it**, if one applies.
- **Volume adds a little**, capped. Two hundred informational findings will
  never outrank one critical — which is exactly the failure the issue list
  exists to fix.
- **Crown-jewel resources** score slightly higher.
- **Unowned resources** score slightly higher, so they stay visible without
  becoming urgent.

Every one of those contributions is shown, so you can disagree with the number
and see precisely where the disagreement is.

## Working the list

- **Sort is already done.** The list comes back in risk order.
- **Filter by combination** when you want a specific conversation: everything
  publicly exploitable, everything with a leaked credential.
- **Assign an owner** and it survives the next scan.
- **Open the evidence** to jump to the underlying finding, vulnerability or
  secret.

An issue closes when the resource stops producing signals — not when somebody
marks it done. If the misconfiguration comes back, so does the issue, with its
original first-seen date intact.
