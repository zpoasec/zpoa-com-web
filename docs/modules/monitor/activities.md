---
sidebar_position: 3
title: "Activities & Timeline"
---

# Activities & Timeline

Search, filter, and replay user activity events across the organization. The Activities page provides a searchable index of all monitored events, while the Timeline view reconstructs a specific user's workday in chronological order.

## Activity Search

Search across all activity events with rich filtering:

- **Time range** -- Select a custom date range or use presets (today, last 7 days, last 30 days)
- **User** -- Filter by specific user or browse all users
- **Event type** -- Application focus, web visit, file access, USB event, idle, login/logout, clipboard, print, email, chat
- **App category** -- Productive, unproductive, or neutral
- **Risk level** -- Filter by event risk score (low, medium, high, critical)
- **Policy match** -- Show only events that triggered a specific policy
- **Keyword** -- Free-text search across app names, window titles, URLs, and file paths (subject to privacy level)

Results display in a paginated table with columns for timestamp, user, event type, application, duration, risk score, and policy matches. Click any row to expand full event details.

## User Timeline

Select a user to see their complete activity reconstruction for a given day:

- **Chronological event stream** -- Every app switch, web visit, file operation, and system event in order
- **Duration bars** -- Visual representation of time spent in each application
- **Productivity overlay** -- Color-coded productivity scoring for each time block
- **Idle gaps** -- Idle periods highlighted with duration
- **Screenshot thumbnails** -- If screenshots were captured (alert or periodic), they appear inline in the timeline
- **Policy markers** -- Policy violations highlighted with severity badges

The timeline is the primary investigation tool -- it answers the question "what was this person doing at this specific time?"

## Exporting

Export activity data for compliance or HR review:

- **CSV export** -- Filtered activity events for spreadsheet analysis
- **PDF report** -- Formatted user activity report for a selected date range
- **API access** -- Programmatic access to activity data via the Z Shield API
