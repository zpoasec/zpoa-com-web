---
sidebar_position: 2
title: "Security Posture"
---

# Security Posture

Your posture is four questions, and Armor is built to answer them in this
order.

## 1. What should we fix first?

Not "what is critical" — **what is critical, reachable, and sitting in front of
something valuable**.

Armor ranks every open finding by a 0-100 risk score that starts from the
check's severity and then adjusts for this specific resource: whether an
attacker can reach it, how sensitive the data behind it is, whether it is
production, and whether anyone owns it.

That is why an unencrypted volume on an isolated test box ranks below the same
rule on an internet-reachable production database, even though both come from
the same check at the same severity.

Ask *"what should we fix first"* and you get that list. Ask *"why is this
critical"* about any finding and Armor shows the base severity, every adjustment
it applied, and the exact configuration values the check read.

## 2. What can't you see?

A check that never ran is not a check that passed, and Armor keeps the two
apart.

If a permission is missing or a provider did not return a field, that becomes a
**coverage** entry naming the exact permission to grant. It is never a finding
about the resource, and never a silent pass.

Ask *"what can't Armor see"* before treating a clean report as a clean
environment. Coverage also reports how much of your fleet has an agent, so
workload-level results are never mistaken for whole-estate results.

## 3. How compliant are we?

Every check is mapped to the controls it satisfies across CIS Benchmarks, NIST
800-53, PCI DSS, SOC 2, HIPAA and ISO 27001.

For each framework Armor reports:

| | Meaning |
|---|---|
| **Passed** | Every check mapped to this control ran and none failed |
| **Failed** | At least one mapped check has an open finding |
| **Not covered** | No mapped check has evaluated anything yet |

**Not covered is not a pass.** It usually means discovery has not reached the
resources that control applies to, and it is reported as its own number so it
cannot be mistaken for compliance.

Ask *"what's blocking our SOC 2"* to get the failing controls and the rules
behind each.

## 4. Are we getting better?

Findings persist. Each one has a first-seen date, so you can see:

- how long things have been open, by severity
- what is new this week
- your oldest unresolved finding
- what got fixed, rather than what quietly disappeared

When a misconfiguration is corrected, the finding is marked resolved and keeps
its history. Attack paths work the same way: closing one is a result you can
point at.

## Working through findings

Each finding carries a workflow state that a scan never touches:

- **Open** — nobody has looked at it yet
- **Acknowledged** — someone has seen it and accepted it as real work
- **False positive** — the check is wrong here
- **Resolved** — Armor confirmed the misconfiguration is gone

Assign an owner, link the ticket the work happens under, and both survive every
subsequent scan.

## Accepting a risk

To stop reporting a finding, create an **exception**. Scope it to a rule, a
resource, a resource type or a set of tags.

Every exception needs a reason, an approver, and an expiry of at most a year.
Creating one does not suppress anything — a second person approves it, and when
it lapses the finding comes back. There is no permanent suppression, because
that is how a posture tool quietly stops reporting a real risk.

## Fixing things

For most checks Armor generates the actual change: a Terraform fragment or a CLI
command rendered against that specific resource, with its blast radius and
whether it can be reversed.

Review the exact artefact, approve it, then apply. Nothing runs automatically,
and an irreversible change requires you to acknowledge that explicitly.

Where Armor knows which infrastructure code created the resource, it says so —
fix the module rather than make a console change the next deploy undoes.

## Staying current

Connect your cloud provider's activity feed and Armor re-evaluates a resource
within seconds of it changing. A full sweep runs every fifteen minutes as a
backstop.

Every security-relevant change is recorded with who made it, so *"who made this
bucket public"* has an answer.
