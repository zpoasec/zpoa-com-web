---
sidebar_position: 3
title: India Regulatory Pack
---

The India Regulatory Pack covers the frameworks Indian organisations are actually
audited against: the DPDP Act, the CERT-In directions, the RBI Master Direction
on IT Governance, SEBI's CSCRF, and the IRDAI cyber security guidelines.

Most compliance tooling ships US and EU frameworks and leaves you to map Indian
obligations into a spreadsheet by hand. The pack removes that step, and — more
usefully — shows you how much of it your existing SOC 2 or ISO 27001 work has
already covered.

## Frameworks in the pack

### DPDP Act

The Digital Personal Data Protection Act. Identity records, HR data and access
logs are all personal data under the Act, so the obligations land directly on
the systems that hold them.

14 controls covering lawful basis and notice, consent and its withdrawal, data
principal rights (access, correction, erasure, grievance redressal, nomination),
breach notification, erasure on purpose completion, Significant Data Fiduciary
duties, restrictions on transfer outside India, and processor obligations under
contract.

### CERT-In Directions

7 controls. Two of them change how a platform must be operated rather than
merely configured:

- **Six-hour incident reporting.** A notifiable cyber incident must reach
  CERT-In within six hours of being noticed. This needs a detection-to-report
  path with an owner and a timer, not just a policy document.
- **180-day log retention within India.** Retention alone is not enough; the
  location has to be demonstrable.

The pack also covers time synchronisation to NPL or NIC, the registered point of
contact, KYC record retention for service providers, and the requirement that
detection covers your identity estate — unauthorised access, identity theft and
account compromise are all notifiable types.

### RBI IT Governance

The Master Direction on Information Technology Governance, Risk, Controls and
Assurance Practices, applying to banks, NBFCs and other regulated entities.

15 controls. The access-control chapter maps closely onto work you are probably
already doing: need-to-know and least privilege, periodic review and
recertification, privileged access management, segregation of duties, and prompt
deprovisioning on exit driven from your authoritative HR source.

### SEBI CSCRF

12 controls across the Cyber Security and Cyber Resilience Framework's Govern,
Identify, Protect, Detect, Respond and Recover functions, for regulated market
entities.

### IRDAI Cyber Security

10 controls for insurers and intermediaries, centred on protecting policyholder
data: role-based access, periodic user access review, privileged account
controls, logging and retention, cyber crisis management, and outsourcing risk.

## Adding the pack

1. Open **Comply → Frameworks**.
2. Select the frameworks that apply to you. Most organisations need one or two,
   not all five — a bank needs RBI and CERT-In, an insurer needs IRDAI and
   CERT-In, and almost everyone handling personal data needs DPDP.
3. Assign an owner to each control family.

Control codes follow each regulator's own numbering, so an auditor recognises
the reference without you having to translate it.

## What you already have covered

This is the part worth doing first.

Adding five frameworks sounds like five times the work. In practice most of it
overlaps with what you already evidence. If you hold ISO 27001 certification,
your access review campaign already satisfies the equivalent RBI, SEBI and IRDAI
controls — it is the same campaign, described four ways.

Open **Comply → Coverage** after adding a framework. Each control shows as one
of:

| Status | Meaning |
|---|---|
| **Direct** | You have evidenced this control against this framework |
| **Inherited** | Evidence you hold for another framework fully satisfies this one. No further work |
| **Partially covered** | Evidence you hold overlaps, but this control asks for more. A head start, not a discharge |
| **Remaining** | No evidence yet |

Partial coverage is deliberately kept separate from inherited. Counting a
partial overlap as full coverage is how a readiness dashboard reads green and an
audit still fails.

### Where partial means partial

Two examples worth knowing, because both look like equivalences and are not:

- **ISO 27001 log retention against CERT-In.** ISO requires you to retain logs.
  CERT-In additionally fixes the period at 180 days *and* requires the logs to
  stay within India. Your ISO evidence is a starting point, not a discharge.
- **GDPR breach notification against DPDP.** Both require notifying a regulator
  and affected individuals, but the authority, the timeline and the required
  content all differ. GDPR evidence does not discharge the DPDP obligation.

## Evidence and export

Evidence attached to a control is reused everywhere that control is mapped, so
you upload an access review once rather than five times.

**Comply → Export** produces a per-framework evidence pack showing direct and
inherited coverage separately, with the mapping rationale for anything
inherited, so a reviewer can see why a control was considered satisfied.

## Keeping the pack current

Indian regulations change more often than the international frameworks do. When
a framework definition is updated, controls whose evidence is no longer
sufficient are flagged in **Comply → Coverage** rather than silently
re-evaluated, so you can see what changed and decide what to redo.

## Related

- [Supported Frameworks](./frameworks.md) — the full framework list
- [Cross-Framework Inheritance](./cross-framework-mapping.md) — how status
  propagates between mapped controls
- [Evidence](./evidence.md) — collecting and attaching evidence
