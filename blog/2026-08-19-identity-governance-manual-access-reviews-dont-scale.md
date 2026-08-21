---
slug: identity-governance-manual-access-reviews-dont-scale
title: "Identity Governance 101: Why Manual Access Reviews Don't Scale"
authors: [zpoa-team]
tags: [security]
description: "Access accumulates quietly over years until nobody can say who can reach what, or why. Why manual access reviews break down at scale, and what changes when the lifecycle is automated."
keywords: [identity governance, access reviews, access certification, access creep, provisioning, deprovisioning, separation of duties, least privilege, IGA, third-party access]
---

![Identity Governance 101: Why Manual Access Reviews Don't Scale](/img/blog/identity-governance-manual-access-reviews-dont-scale/hero.jpg)

Every organization eventually asks some version of the same question: who actually has access to what, and does that access still make sense? In practice, most organizations struggle with it badly, because access accumulates quietly over years. A role change here, a project handoff there, a contractor who was granted access eighteen months ago and never fully offboarded, until nobody can say with confidence exactly who can reach exactly what, or why. [Identity Governance](https://www.zpoa.com/features#fortress) exists to answer that question systematically, instead of leaving it to institutional memory and good intentions.

<!-- truncate -->

## What Identity Governance Actually Covers

At its core, identity governance is the discipline of managing who has access to which systems, applications, and data throughout the entire lifecycle of that access, from the moment it's granted, through every change along the way, to the moment it should be revoked. That covers a wider scope than authentication alone. Authentication answers "is this really the person they claim to be." Identity governance answers a harder question: "even assuming this really is that person, should they still have this specific level of access, right now, given everything that's changed since it was granted."

This typically breaks down into a few connected functions. Provisioning handles granting access when someone joins, changes roles, or takes on a new project, ideally following a defined, repeatable process rather than an ad hoc request to whoever happens to manage a given system. Access certification, often called access review, periodically asks managers or system owners to confirm that existing access still makes sense, not a rubber stamp, but a genuine check against what a person's current role actually requires. And policy enforcement sits underneath all of it, defining rules like separation of duties, making sure, for example, that the same person can't both submit and approve their own expense reports, or both request and approve their own access grants.

## Why This Breaks Down at Scale

A small organization can manage this manually and mostly get away with it: a handful of systems, a handful of people, an admin who genuinely remembers who has access to what. That approach collapses almost immediately as an organization grows. More employees means more access requests. More systems and SaaS applications means more places access can be granted, each with its own permission model that doesn't necessarily map cleanly onto any of the others. More organizational change, whether reorganizations, mergers, or new business units, means access that made sense a year ago quietly stops making sense, without anyone actively deciding to change it.

The result is what's often called access creep: permissions accumulate over time because it's always easier to grant new access than to take the time to review and remove old access nobody's using anymore. An employee who has changed roles three times over five years frequently ends up with the accumulated permissions of all three roles, not just the one they currently hold, because nobody circled back to clean up the earlier grants when each transition happened. That's not usually the result of carelessness. It's the predictable outcome of doing lifecycle management as a manual, ad hoc process instead of a defined, repeatable one.

## Why This Isn't Just a Compliance Checkbox

It's tempting to file identity governance under "things we do to pass an audit," and certification requirements are certainly one driver of it. Many compliance frameworks explicitly require periodic access reviews and documented evidence that they happened. But treating it purely as a compliance exercise misses the actual security value underneath the paperwork.

Excess access is one of the most consistent contributing factors in how a breach actually spreads once an attacker gets an initial foothold. A compromised account with narrowly scoped, current access limits what an attacker can reach even after a successful compromise. A compromised account carrying five years of accumulated, never-cleaned-up permissions turns one bad login into a much larger problem, because the blast radius of that single compromise is defined by everything that account happens to still have access to, most of which the person using it probably doesn't even remember they have.

Access risk also isn't confined to internal employees. Vendors, contractors, and other third parties frequently need access to internal systems to do their jobs, and that access deserves the same lifecycle discipline as an employee's: provisioned deliberately, reviewed periodically, and removed the moment the engagement ends. The broader question of evaluating and managing the risk a third party introduces once they're granted any level of access is covered in more detail in [How Does Vendor Risk Management Work?](https://www.zpoa.com/blog/how-does-vendor-risk-management-work), which looks at that relationship from the vendor-assessment side rather than the access-lifecycle side covered here.

## What Automation Changes

A spreadsheet gets sent to a manager, the manager is busy, and the review gets approved wholesale without anyone actually checking each line, which technically satisfies an audit requirement while doing almost nothing to catch the access that shouldn't be there anymore. Automated identity governance changes the mechanics without changing the underlying goal: access reviews get generated automatically on a defined schedule, tied directly to current role and system data rather than a static list someone has to remember to update, and unused or clearly excessive access gets flagged for attention instead of relying on a reviewer to notice it buried in a long list.

The lifecycle events themselves benefit the same way. A role change in an HR system can automatically trigger a review of that person's existing access instead of waiting for the next scheduled certification cycle to catch it. A departure can automatically trigger deprovisioning across every connected system at once, instead of depending on someone remembering to manually revoke access in each individual application the person happened to use.

## Conclusion

Identity governance isn't really about restricting people from doing their jobs. It's about making sure access matches actual need, consistently, as that need keeps changing over time. Left to manual processes, that alignment drifts a little more with every role change, every new hire, and every departure that isn't fully cleaned up, until the gap between "who has access" and "who should have access" becomes wide enough to matter. Treating it as a continuous, largely automated discipline rather than an annual scramble before an audit is what keeps that gap from quietly growing into the next security incident.

## Schedule an Appointment with ZPOA

Whether you're evaluating managed SIEM services or trying to right-size an in-house SOC, the platform you build on matters as much as who's staffing it. At [ZPOA](https://www.zpoa.com), we help organizations unify detection, compliance, and identity governance onto a single platform, reducing the operational load either model has to carry.

[Schedule an appointment](https://www.zpoa.com/schedule) with ZPOA to talk through which model fits your team.
