---
sidebar_position: 8
title: "Compliance, History & Scale"
---

# Compliance, history and scale

## Connecting a whole organisation

Estates are not one account. They are an AWS Organization with an OU tree, an
Azure management-group hierarchy, or a Google Cloud organisation with nested
folders — and onboarding them one account at a time is how a trial ends up
covering four accounts and producing a report nobody can act on.

Register the hierarchy once and Armor enumerates it:

- **AWS Organizations** — every account, with its organisational-unit path
- **Azure** — every subscription, with its management-group path
- **Google Cloud** — every project, with its folder path

New accounts created later are picked up on the next pass, so coverage does not
decay the moment somebody spins up a sandbox.

You can exclude by account ID or by path prefix — `/Root/Sandbox` excludes
everything under it without listing each account.

The credential you register is a reference to your vault, never a value you
paste into a form. An organisation credential can read every account in the
estate; it does not belong in a request log.

## Compliance reports

Armor's framework coverage answers "how are we doing". An audit needs a
document: this control, this verdict, this evidence, these accepted risks and
who approved them, over this period, for this scope.

Generate one for any framework — CIS, NIST 800-53, PCI-DSS, SOC 2, HIPAA,
ISO 27001, or one of your own — in Markdown, CSV or JSON.

The report has three verdict columns rather than two, and that is the point:

| Verdict | Meaning |
|---|---|
| **Passed** | Evaluated, and every resource in scope passed |
| **Failed** | Evaluated, and at least one resource failed — with the failing resources listed |
| **Accepted** | Failed, but covered by an approved exception, shown with its approver and expiry |
| **Not covered** | Nothing evaluates this control |

**Not-covered controls are excluded from the score and listed in full.** A 100%
score across three of two hundred controls is not compliance, and a report that
cannot say so is not an audit artefact. Every report states its coverage
alongside its score.

Generated reports are stored as they were rendered. The document your auditor
was given and the document you can reproduce next quarter are the same bytes,
not a fresh render against today's data.

### Your own framework

If you have an internal control set, define it: give each control an ID, a
title, and the Armor checks that satisfy it. It then reports exactly like a
built-in framework. A control mapped to no checks is refused at creation, rather
than sitting permanently not-covered.

## History

Findings persist and age, which makes these answerable — and Armor now answers
them:

- **Posture score over time.** Weighted by severity and normalised by estate
  size, so a growing environment does not look like a degrading one. A team that
  ships more should not score worse for shipping.
- **Mean and median time to remediate.** Both, because remediation times are
  skewed: one finding open for a year destroys the mean while the median keeps
  telling you what a typical fix takes. On a day nothing was resolved, the
  figure is blank rather than zero — "no data" and "instant" are different.
- **Framework trend.** Where each framework's score is going.
- **Open vs resolved**, per day.

A movement of less than a point is reported as flat. An indicator that flips
direction daily is one people learn to ignore.

## Remediation deadlines

Every finding gets a deadline based on its severity, counted from when it was
**first seen** — not from the last scan. Computing from "now" would reset the
clock every fifteen minutes and nothing would ever breach.

The defaults are 7 days for critical, 30 for high, 90 for medium and 180 for
low. Ask for *"what's past due"* to get the breaches, ordered by how overdue
they are, with the owner.

## Fixes as pull requests

When Armor knows which Terraform block created a resource — it records that
during infrastructure-as-code scanning — an approved fix can be delivered as a
pull request rather than as a snippet to copy.

Armor changes the one attribute and nothing else. It does not reformat the file,
restructure the block, or touch anything else in the repository: a fix PR that
reflows somebody's Terraform gets closed unread.

It always opens a new branch, never commits to your default branch, and never
force-pushes. A human merges it.

The PR body states what was wrong, what changed, and what it might break, and
ends with the step that matters: run `terraform plan` and confirm the diff is
only that attribute. If your code and your cloud have drifted, the plan will
show more than you expect — and that is worth finding out before the merge, not
after.

The finding stays open until the cloud actually changes. Merging a pull request
is not evidence that the deployment happened.

## Pipeline checks

The same repository scan reads your CI definitions, because the credentials with
permission to change your cloud live there:

- Third-party actions pinned to a tag rather than a commit, which the action's
  owner can move at any time
- `pull_request_target` combined with a checkout of the pull request's own code
  — this runs a contributor's code with your repository's secrets, and any fork
  can use it to take them
- Untrusted input (a pull-request title, a comment) interpolated into a shell
  command
- Credentials committed in plaintext
- Self-hosted runners, which execute workflow code on infrastructure you own

Each finding says what to change, not only what is wrong.
