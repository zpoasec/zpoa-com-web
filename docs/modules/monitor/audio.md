---
sidebar_position: 9
title: "Audio Intelligence"
---

# Audio Intelligence

Monitor's audio intelligence captures, transcribes, and analyzes voice communications to detect sensitive information sharing, social engineering, and compliance violations in real-time.

## Audio Capture

The endpoint agent captures audio from configurable sources:

- **Microphone** -- Capture ambient audio and conversations
- **System audio** -- Capture meeting app audio (Zoom, Teams, Slack, Google Meet)
- **Both** -- Combined capture for complete conversation context
- **Meeting-app-only mode** -- Auto-start recording when meeting apps are active, stop when they close

Audio is encoded as Opus codec (32kbps mono) in 30-second segments and uploaded in near-real-time.

## AI Transcription

Captured audio is automatically transcribed with AI:

- **Speech-to-text** -- Accurate transcription with punctuation and formatting
- **Speaker diarization** -- Identifies different speakers and labels each segment (Speaker 1, Speaker 2, etc.)
- **Language detection** -- Automatically detects the spoken language
- **Confidence scoring** -- Each transcript segment includes a confidence score for accuracy assessment

## Keyword Detection

Define custom keyword dictionaries for real-time DLP monitoring:

- **Dictionary management** -- Create and manage keyword/phrase lists organized by category (financial, legal, confidential, credentials)
- **Severity levels** -- Assign severity (low, medium, high, critical) to each dictionary
- **Contextual matching** -- AI-powered matching understands context, distinguishing "my password is hunter2" from "please reset your password"
- **Real-time alerts** -- Get notified immediately when sensitive keywords are detected in conversations

## Transcript Viewer

Browse and search across all transcribed audio:

- Full transcript view with timestamps and speaker labels
- Keyword highlights with surrounding context
- Audio playback synchronized with transcript (click a line to jump to that point)
- Search across all transcripts by keyword, speaker, date range, or user
- Export transcripts as text or PDF for compliance records
