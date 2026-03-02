---
sidebar_position: 2
title: "Activity Dashboard"
---

# Activity Dashboard

The Monitor dashboard provides a real-time command center for user activity across your organization. At a glance, see who is active, what they are working on, and whether any policies have been triggered.

## Dashboard Overview

The dashboard displays four key metrics at the top:

- **Active Users** -- Users currently active (keyboard/mouse input detected within the last 5 minutes)
- **Idle Users** -- Users logged in but with no recent input activity
- **Offline Users** -- Users whose agent has not sent a heartbeat within the last 5 minutes
- **Policy Violations** -- Number of activity policy triggers in the selected time range

## Live Activity Feed

A real-time stream of activity events across all monitored users:

- Filter by event type (app focus, web visit, file access, USB event, idle, login/logout, clipboard, print)
- Filter by user, department, or risk level
- Click any event to see full details including application context, duration, and policy matches

## Productivity Summary

Aggregate productivity metrics for the selected time range:

- **Productivity score** -- Weighted average across all users based on time in productive vs. unproductive apps
- **Top productive apps** -- Most-used productive applications with total time
- **Top unproductive apps** -- Most-used unproductive applications with total time
- **Productive hours distribution** -- Histogram showing when productive work peaks across the day

## Insider Threat Overview

A summary of the highest-risk users and recent threat indicators:

- **Top risk users** -- Users with the highest composite insider threat scores
- **Recent policy violations** -- Latest triggered policies with severity and affected users
- **Data exfiltration indicators** -- Users showing abnormal file transfer volumes or USB activity
- **After-hours activity** -- Users active outside configured working hours

## Active Users Map

Geolocation-based view showing where monitored users are currently active:

- IP-based location mapping for each active session
- VPN vs. direct connection indicators
- WiFi network type (corporate, public, home)
- Impossible travel alerts highlighted on the map
