---
sidebar_position: 8
title: "Session Recording"
---

# Session Recording

Z Shield Monitor supports three tiers of visual evidence collection, from lightweight policy-triggered screenshots to full continuous screen recording. Each tier is configurable per tenant and respects privacy settings.

## Tier 1: Screenshots on Alert

Automatically capture a screenshot when an activity policy triggers:

- Captured at the exact moment of the policy violation (USB insert, blacklisted app, data exfil pattern)
- JPEG format, ~100KB per capture
- Stored with 30-day retention (configurable)
- Viewable inline in the activity timeline and investigation detail views
- Minimal storage impact and no performance overhead

## Tier 2: Selective Recording

Continuous screen recording activated for specific users under investigation:

- Requires an approved investigation with business justification
- H.264 video, chunked into 5-minute segments for efficient storage and playback
- Audio capture optional (microphone, system audio, or both)
- Automatically stops when the investigation expires or is closed
- Full playback with activity event timeline overlay

## Tier 3: Always-On Recording

Continuous recording for all monitored users:

- Configurable quality: 720p (default) or 1080p
- Configurable frame rate: 1-5 fps (default: 2 fps)
- Working hours mode: record only during configured work hours to reduce storage
- Estimated storage: ~50 MB per user per day at 2 fps 720p
- Employee notification tray icon is mandatory for compliance

## Screenshot Gallery

Browse captured screenshots with filtering and search:

- Filter by user, date range, trigger type (policy, periodic, investigation, manual)
- Thumbnail grid view with zoom-on-click
- Screenshots are blurred by default -- admin can reveal with audit logging
- Periodic screenshots (configurable interval: 1, 5, 10, 15, 30 minutes) available as an additional capture mode

## Recording Playback

Play back session recordings directly in the browser:

- Timeline scrubber with activity event overlay (app switches, policy triggers, idle periods)
- Playback speed control (0.5x, 1x, 2x, 4x)
- Jump to specific timestamps or activity events
- Download for offline review (admin permission required)
- Presigned streaming URLs ensure secure, time-limited access
