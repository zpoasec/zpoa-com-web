---
sidebar_position: 7
title: "Detections & Response"
---

# Detections and response

Posture tells you what is wrong. Detections tell you what is happening.

Armor reads your cloud's own audit trail — CloudTrail, Azure Activity Log,
Google Cloud audit logs, Kubernetes audit events — and raises a detection when
the activity looks like an attack rather than like operations.

## What Armor watches for

| Detection | Why it matters |
|---|---|
| **Cloud audit logging disabled** | The first move in a large share of cloud intrusions, because everything after it is unlogged |
| **Root account used** | Root should be broken-glass only; routine use means your strongest credential is in daily circulation |
| **Security service disabled** | GuardDuty, Security Hub, Config or Defender switched off |
| **Resource opened to the internet** | A bucket policy or access block changed in a way that can expose data |
| **Security group opened to 0.0.0.0/0** | An ingress rule that now admits the whole internet |
| **Access key created on a brand-new user** | The standard persistence step after a credential compromise |
| **Administrative policy attached** | A broad admin grant handed to a principal |
| **Mass deletion** | An unusual number of deletes by one actor in minutes — destruction, or track-covering |
| **Secret enumeration** | Many secrets read by one actor in a short window: credential harvesting |
| **Repeated access denials** | The signature of somebody mapping what a stolen credential can reach |
| **MFA removed** | Multi-factor taken off a principal |
| **Snapshot shared externally** | A disk image made public or shared out of the organisation — exfiltration that never touches the data plane |
| **Cluster-admin granted** | A Kubernetes binding to cluster-admin |

Some of these are single events. Others only exist as a pattern — twenty-five
deletions in four minutes is an incident; twenty-five deletions across an
afternoon is housekeeping. Armor distinguishes them by counting within a window,
per actor, so ordinary activity by many services does not add up into a false
alarm.

## Reading a detection

Every detection carries:

- **The MITRE ATT&CK technique**, so it lines up with everything else your SOC
  runs
- **The actor** — the principal that did it — and the source address
- **The events that produced it**, so you can check the verdict rather than
  trust it
- **A count**, when the detection is a pattern rather than a single call

Detections also arrive as alerts through your normal alert channels. You do not
need to watch a separate console.

## Responding

Opening a detection offers containment. Each option states its blast radius
before you choose:

| Action | Reversible | What it costs you |
|---|---|---|
| Restart audit logging | Yes | Nothing — it restores logging that should not have stopped |
| Deactivate an access key | Yes | Anything authenticating with that key stops immediately |
| Detach a policy | Yes | The principal loses those permissions |
| Re-enable a public access block | Yes | Legitimate public reads of that bucket stop |
| Remove a public snapshot share | Yes | Anyone restoring from it loses access |
| Revoke a world-open ingress rule | **No** | Drops internet traffic to that port for every instance in the group |
| Delete a cluster-admin binding | **No** | Whoever it granted loses cluster-admin, automation included |
| Quarantine an instance | **No** | The instance loses all networking; it keeps running, so memory and disk are preserved for investigation |

**Nothing is applied when you choose it.** The action goes to the same approval
queue as any other change Armor proposes to your cloud, and irreversible actions
require an explicit acknowledgement on top of the approval. You approve the exact
command that will run.

## Preventing it instead: Kubernetes admission

Everything above is detective. Armor also has one preventive control: a
Kubernetes admission webhook that evaluates a workload as it is submitted, using
the same checks that would have flagged it afterwards.

Three modes:

- **Off** — nothing is evaluated
- **Warn** (the default) — violations are recorded and returned to whoever
  deployed, and the deploy proceeds
- **Enforce** — deploys violating a critical or high check are **denied**

It defaults to warn and never to enforce. Turn enforcement on after you have
looked at a week of warn decisions and know what would have been blocked — the
decision log shows exactly that, including the allows.

Two safety properties are worth knowing:

- If the webhook cannot be reached, or cannot read your policy, **deploys
  continue**. A posture tool that stops your deployments when it has an outage
  gets uninstalled, correctly.
- A workload it cannot evaluate is allowed, not denied. Armor never blocks a
  deploy because of its own blind spot.

`kube-system` is exempt by default, and you can exempt other namespaces.
