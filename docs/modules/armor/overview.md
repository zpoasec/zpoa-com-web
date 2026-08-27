---
sidebar_position: 1
title: "Armor - Overview"
---

# Armor: Cloud Security

Armor watches your cloud accounts end to end: how they are configured, what is
running inside the workloads, what is vulnerable in it, what credentials are
lying where they should not be, and what is happening in the control plane right
now. It tells you which of that an attacker could actually reach, and — when you
approve it — gives you the exact change that fixes it.

You work with Armor by asking. There is no separate posture console to learn:
ask the assistant "what should we fix first", "who can read our customer data
bucket", or "what's blocking our SOC 2", and it answers from your live
environment. Everything on this page is also available over the API.

## What you connect

| Provider | What Armor reads |
|---|---|
| **Amazon Web Services** | EC2 instances and EBS volumes, S3 buckets, RDS databases, Lambda functions, VPCs and security groups, load balancers, CloudTrail, KMS keys, and IAM users, roles and policies |
| **Microsoft Azure** | Virtual machines, storage accounts, SQL servers and databases, key vaults, network security groups, AKS clusters, and managed identities |
| **Google Cloud** | Compute Engine instances, Cloud Storage buckets, firewall rules, Cloud SQL, GKE clusters, and service accounts |
| **Kubernetes** | Cluster configuration, workloads, RBAC bindings, namespaces, network policies and exposed services — in any cluster, including EKS, AKS and GKE |
| **OVHcloud** | Dedicated servers, VPS, public cloud instances, volumes, object-storage containers, managed databases, networks and managed Kubernetes |
| **OpenStack** | Servers, volumes, networks and object-storage containers in any OpenStack cloud |

Connect an account with read-only credentials. Armor never needs write access
to find anything; write access is only involved if you later choose to let it
apply a fix, and even then only after you approve the specific change.

## What Armor checks

Armor ships **103 checks** across six areas, each mapped to the compliance
controls it satisfies:

- **Storage** — public buckets and containers, missing encryption, disabled
  versioning, absent access logging
- **Network** — administrative and database ports open to the internet,
  permissive default groups, missing flow logs, weak TLS on load balancers
- **Identity** — over-privileged roles, wildcard grants, privilege-escalation
  paths, missing MFA, stale access keys, ungoverned machine identities
- **Data** — databases reachable from the internet, unencrypted storage, absent
  backups, missing deletion protection
- **Logging** — audit trails switched off or scoped to one region, log-file
  validation disabled, database auditing off
- **Kubernetes** — publicly reachable API servers, anonymous authentication,
  privileged containers, host-namespace sharing, cluster-admin bindings,
  namespaces with no network policy

You can add your own checks. A custom rule is written as a small condition over
the fields Armor discovered, and runs exactly like a built-in one.

## What makes a finding urgent

Every finding gets a **risk score from 0 to 100**, and that number — not the
rule's severity label — is what Armor sorts by.

The score starts from the check's severity and then adjusts for what is true
about *this* resource:

- **Can an attacker reach it?** Armor marks a resource *public* when it is
  directly reachable, and *reachable via path* when something public can get to
  it through a relationship Armor actually observed — a security group binding,
  an attached role, a policy grant. Reachability is corroborated against what
  Zpoa's external scanning independently found from outside your network, not
  inferred from configuration alone.
- **What data is behind it?** A finding on a store holding regulated data
  outranks the same finding on an empty test bucket.
- **Is it production?**
- **Does anyone own it?**

Ask "why is this critical" about any finding and Armor shows the base severity
and every adjustment it applied, alongside the exact configuration values the
check read.

## One list, not five

Configuration findings, vulnerabilities, exposed secrets, malware hits and
attack paths all land on the same resources. Armor collapses them into
**issues** — one scored row per resource, with the sentence that explains it and
a named pattern where one genuinely applies.

That is the list to work from, and the one the assistant reads when you ask what
to fix first. See [Issues](issues.md).

## Attack paths

An attack path is a chain Armor can walk: from something reachable from the
internet, through relationships it has observed, to something worth reaching —
a database, a data store, an administrative identity.

Every hop carries its evidence. A path reads as *"this instance is reachable and
allows IMDSv1 → it carries this role via this instance profile → that role's
policy allows reads on this customer-data bucket"*, and you can click through to
each piece.

Armor does not report a path unless it has observed every relationship along it.
Two problems in the same account with nothing connecting them is not a path.

## Fixing things

For most checks Armor generates the actual change:

- a **Terraform** fragment, with the `terraform import` line if the resource is
  not yet under code, or
- a **CLI command** rendered against that specific resource.

Each proposal states its **blast radius** — what breaks if you apply it — and
whether it can be reversed. Nothing is applied automatically. You review the
exact artefact, approve it, and only then does it run. Irreversible changes
require you to acknowledge that explicitly.

Where Armor knows which infrastructure code created a resource, it tells you, so
you can fix the module rather than make a console change the next deploy undoes.

## Catching it before it ships

Point Armor at your infrastructure repositories and it checks Terraform in your
pipeline, before anything reaches the cloud. The checks use the same rule
identifiers as the runtime ones, so an issue caught in a pull request and the
same issue found in production are recognisably one problem. The same scan reads
your CI workflows, where the credentials that can change your cloud live.

In Kubernetes, Armor can go further and refuse the workload at admission — the
same checks, applied as the object is submitted rather than after it is running.
It defaults to warning rather than blocking. See
[Detections and response](detections.md).

## Accepting a risk

Sometimes a finding is a genuine, deliberate decision. Armor lets you record
that as an **exception**, scoped to a rule, a resource, a resource type or a set
of tags.

Every exception requires a reason, an approver, and an expiry — up to a year.
When it lapses the finding reappears. A suppression with no end date is how a
posture tool quietly stops reporting a real risk, so Armor does not offer one.

## Knowing what Armor could not check

Armor separates *"this passed"* from *"this could not be checked"*.

If discovery lacked a permission, or a provider did not return a field, that
becomes a **coverage** entry naming the exact permission to grant — not a
finding, and never a silent pass. Ask "what can't Armor see" before treating a
clean report as a clean environment.

## Compliance

Every check is mapped to the controls it satisfies across **CIS Benchmarks,
NIST 800-53, PCI DSS, SOC 2, HIPAA and ISO 27001**, and you can define your own
control set. Armor reports, per framework, how many controls pass, how many
fail, and how many are **not covered** — controls no check has evaluated yet,
usually because discovery has not reached the resources they apply to.

Not-covered controls are excluded from the score and listed in full, so a high
number cannot be produced by having evaluated very little. Generate an
auditor-facing report at any time. See
[Compliance, history and scale](compliance-and-scale.md).

## Where to go next

- [Issues](issues.md) — the prioritized list, and how its scores are built
- [Workloads and images](workloads.md) — what is running inside, vulnerabilities,
  secrets and malware
- [Detections and response](detections.md) — attacks in the control plane,
  containment, and Kubernetes admission control
- [Compliance, history and scale](compliance-and-scale.md) — reports, trends,
  deadlines, fixes as pull requests, and connecting a whole organisation

Not-covered controls are reported separately and are never counted as passes.

## Identities

Armor discovers the identities in your cloud accounts — IAM users and roles,
service accounts, managed identities, Kubernetes service accounts — and works
out what each can actually do: which hold administrative grants, which can
escalate their own privileges, which have not been used, and which lack MFA.

Where an identity also appears in Zpoa Fortress, Armor links the two, so you can
see which machine identities in your cloud have no owner and no review cycle.

## Data and AI

Armor identifies which resources hold data, classifies how sensitive it is, and
combines that with reachability — so *"a store holding regulated data is
reachable from the internet"* is a single finding rather than three facts in
three places.

It also builds an inventory of the AI services, model endpoints and SDK
integrations running in your accounts, and flags the ones nobody registered.

## Staying current

Armor re-evaluates a resource within seconds of a change when you connect your
cloud provider's activity feed, and runs a full sweep every fifteen minutes as a
backstop. Changes are recorded with **who made them and when**, so "who made
this bucket public" has an answer.

## Next steps

- [Security Posture Dashboard](./posture.md) — reading your posture
- [Cloud Resource Inventory](./resources.md) — what Armor found
- [Attack Path Analysis](./attack-paths.md) — what an attacker could chain
