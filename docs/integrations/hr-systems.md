---
sidebar_position: 14
title: HR System Integrations
---

# HR System Integrations

Your HR system is the authoritative source for who works for you. Connecting it
is what turns Fortress from an access inventory into joiner-mover-leaver
automation: a new starter gets their access without a ticket, a transfer has
their old access removed, and a leaver is deprovisioned everywhere the moment
their record changes.

HR connectors are **read-only**. Fortress reads from your HR system and never
writes back to it.

## What a connected HR source gives you

- **Joiner automation.** Access appears when the HR record does, based on role,
  department and location.
- **Mover handling.** A transfer removes access tied to the old role rather than
  leaving it to accumulate.
- **Leaver automation.** Access is revoked across every connected system from a
  single HR change.
- **Org structure.** Departments and locations, used for access modelling and
  for routing approvals to the right manager.

## Indian HR systems

Fortress supports the HR platforms Indian organisations actually run, not just
the global suites.

| System | What Fortress reads |
|---|---|
| **Darwinbox** | Employees, joining and exit dates, designation, department, reporting manager |
| **Keka** | Employees, lifecycle events, org structure |
| **greytHR** | Employees, lifecycle events, org structure |
| **Zoho People** | Employees, lifecycle events, org structure |
| **PeopleStrong** | Employees, lifecycle events, org structure |
| **HROne** | Employees, lifecycle events, org structure |
| **Ramco HCM** | Employees, lifecycle events, org structure |
| **Qandle** | Employees, lifecycle events, org structure |
| **Zimyo** | Employees, lifecycle events, org structure |
| **sumHR** | Employees, lifecycle events, org structure |
| **RazorpayX Payroll** | Employee accounts only — see the note below |

### RazorpayX Payroll

RazorpayX is supported for reading employee accounts, but **cannot be used as
your authoritative lifecycle source**. Its API does not expose a bulk employee
list, so Fortress cannot reliably tell that someone has left — only that they
are still present.

Use RazorpayX alongside another HR source, not instead of one.

### Regional and self-hosted tenants

Several Indian HR platforms host tenants on different regional endpoints, or
on-premises. Where that applies, the connector lets you set the API host and the
employee endpoint during setup, so you can point it at your tenant without
waiting for a code change.

Ramco HCM requires the host to be entered, since its tenants are hosted per
customer.

## Global HR systems

| System | Notes |
|---|---|
| **Workday** | Lifecycle source. Requires Workday partner-programme API access |
| **SAP SuccessFactors** | Lifecycle source and entitlements |
| **Oracle HCM Cloud** | Lifecycle source |
| **BambooHR, HiBob, Personio, Namely, Factorial, Sage HR, Sage People** | Lifecycle source |
| **ADP Workforce Now, UKG Pro, UKG Ready, Ceridian Dayforce, Paycom, Paylocity, Paychex, Paycor, iSolved, Zenefits, Gusto** | Lifecycle source |
| **Deel, Remote, Rippling** | Lifecycle source for distributed and contractor-heavy teams |
| **OrangeHRM, IceHrm, Odoo, Dolibarr, Frappe HR** | Open-source and self-hosted |
| **Google Sheets, Excel Online** | For organisations with no HR platform — see below |

## No HR system at all

Plenty of mid-market organisations run HR on a spreadsheet. Fortress supports
that directly rather than treating it as a blocker:

- **Google Sheets or Excel Online.** Point Fortress at a sheet with one row per
  employee. Same joiner-mover-leaver behaviour as a full HRMS.
- **CSV import.** Upload a file with column mapping, validation and a dry-run
  preview before anything is applied.

## Connecting an HR system

1. Go to **Fortress → Connectors → Add Connector** and choose your HR system.
2. Enter the connection details. The form shows exactly what each field needs
   and where to find it in your HR platform.
3. Click **Test Connection**. Fortress reads a single page of employees to
   confirm the credentials and the endpoint.
4. Choose whether this source is **authoritative**. Only one source per
   organisation drives the lifecycle; others contribute attributes.
5. Set the sync schedule. Nightly suits most organisations.

## After connecting

Check **Fortress → Identities → HR Sources** after the first sync. Fortress
verifies that each sync looks complete before acting on it, and holds
departures if a feed returns implausibly fewer people than expected — see
[HR Source Health](../modules/fortress/hr-source-health.md).

The first sync never infers departures. It establishes your baseline, so nobody
is deprovisioned on day one because they were not in a list they were never in.

## Related

- [HR Source Health](../modules/fortress/hr-source-health.md)
- [Onboarding](../modules/fortress/onboarding.md)
- [Identities](../modules/fortress/identities.md)
