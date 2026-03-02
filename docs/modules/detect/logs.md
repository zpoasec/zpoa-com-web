---
sidebar_position: 4
title: Log Search
---

The Log Search interface provides direct access to the normalized event data stored in Z Shield's analytics database. Analysts can use it for ad-hoc investigations, threat hunting, and forensic analysis.

## Full-Text Search

The search bar at the top of the Logs view supports full-text search across all normalized event fields. Type any keyword, IP address, hostname, or user identifier to find matching events. Full-text search uses an inverted index for sub-second results even across billions of records.

Example queries:

```
192.168.1.50
failed login
s3:GetObject
administrator@example.com
```

## Structured Queries

For precise filtering, use structured query syntax with field-level operators. Structured queries use the format `field:operator:value` and can be combined with boolean logic.

```
source_ip:eq:10.0.0.1 AND event_type:eq:authentication AND outcome:eq:failure
```

Supported operators include:

| Operator | Description | Example |
|----------|-------------|---------|
| `eq` | Equals | `severity:eq:high` |
| `neq` | Not equals | `outcome:neq:success` |
| `contains` | Contains substring | `message:contains:denied` |
| `gt` / `lt` | Greater/less than | `bytes_out:gt:1000000` |
| `in` | Matches any in list | `region:in:us-east-1,us-west-2` |
| `exists` | Field is present | `threat_intel.ioc:exists:true` |

## Time Range Filters

Every search is scoped to a time range. Use the time picker to select from predefined ranges (Last 15 minutes, Last 1 hour, Last 24 hours, Last 7 days) or define a custom start and end time. The time range applies to both full-text and structured queries.

Narrowing the time range improves query performance and helps focus your investigation on the relevant window.

## Log Detail View

Click any log entry to expand the detail panel. The detail view presents:

- **Parsed Fields** -- All normalized OCSF fields displayed in a structured key-value format with copy-to-clipboard support.
- **Raw Event** -- The original, unmodified log entry as received from the source.
- **Context Actions** -- Quick links to pivot into related searches, such as "Show all events from this IP" or "Show all events for this user."
- **Alert Correlation** -- If this event contributed to one or more alerts, links to those alerts are displayed.

## Export

Search results can be exported for offline analysis or reporting. Supported export formats include:

- **CSV** -- Flat tabular format suitable for spreadsheets and data analysis tools.
- **JSON** -- Structured format preserving nested field hierarchies.
- **NDJSON** -- Newline-delimited JSON for streaming ingestion into other systems.

Exports can be scoped to the current search results or to selected individual events. Large exports are processed asynchronously, and you will receive a notification when the file is ready for download.
