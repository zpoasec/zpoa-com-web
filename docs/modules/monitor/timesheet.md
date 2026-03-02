---
sidebar_position: 14
title: "Timesheet"
---

# Timesheet and Time Tracking

Monitor automatically generates time entries from activity data, giving teams accurate timesheets without manual time tracking. Time entries can be assigned to projects, submitted for approval, and exported for payroll or client billing.

## Auto-Populated Time Entries

Time entries are generated automatically from the endpoint agent's activity data:

- **Application-based tracking** -- Time spent in each application is automatically recorded
- **Project detection** -- Optionally auto-assign time entries to projects based on application context (e.g., Jira project, Git repository, Slack channel)
- **Active time only** -- Idle periods are excluded from time entries
- **Manual adjustments** -- Users can edit, split, or add manual time entries alongside auto-detected ones

## Project Management

Organize time entries by project for accurate tracking and billing:

- **Create projects** -- Name, client, billable/non-billable, budget hours
- **Assign time** -- Tag time entries to projects manually or via auto-detection rules
- **Budget tracking** -- Monitor hours spent vs. budget per project
- **Client billing** -- Track billable vs. non-billable hours for client-facing work

## Weekly Timesheets

Weekly view of time entries with submission and approval:

- **Weekly grid** -- View time entries organized by day and project for the current week
- **Submit for approval** -- Submit completed timesheets to managers for review
- **Manager review** -- Managers see submitted timesheets with total hours, billable hours, and productive hours
- **Approve or reject** -- Managers approve or reject with comments

## Overtime and Wellness

Proactive monitoring of employee work patterns:

- **Overwork detection** -- Alert when users exceed configurable thresholds (10+ hours/day, 50+ hours/week)
- **Weekend work tracking** -- Monitor weekend activity patterns
- **Break analysis** -- Detect users not taking breaks (4+ hours continuous active time)
- **Burnout indicators** -- Track increasing patterns of late-night work, declining productivity, and reduced break time
- **Manager notifications** -- Automated alerts to managers when team members show burnout signals

## Reporting and Export

- **Time reports** -- By project, user, or date range with breakdowns
- **CSV export** -- Raw time data for payroll integration
- **PDF reports** -- Formatted reports for client invoicing
