---
sidebar_position: 5
title: "Session Recording"
---

# Session Recording

Every privileged session opened through ZPOA is recorded. Terminal sessions
capture everything on screen plus the individual commands; graphical sessions
capture the screen.

Recording is not optional and cannot be turned off per session. A privileged
session that could be opted out of recording would be the one that matters.

## Finding a recording

**Sessions → Recordings**, filtered by user, asset, protocol or date.

Each entry shows who connected, to what, when, for how long, and the session's
risk score.

## Replaying

Open a recording to replay it.

Terminal recordings replay as text, so you can:

- scrub to any point
- speed up or slow down
- **select and copy** text out of the replay
- **search** the whole session for a string

That last pair is why terminal sessions are stored as text rather than video.
Searching a hundred hours of recordings for `/etc/shadow` takes seconds.

Graphical recordings replay as video with a scrub bar.

## Command history

For SSH sessions, **Commands** lists each command with its timestamp — a summary
of what happened without watching the whole session.

Two honest caveats about the command list:

- It is reconstructed from what was typed. A command recalled with the up-arrow
  or completed with Tab may not appear exactly as it ran.
- Command output is not captured separately. It is in the recording.

**The recording is the authoritative record.** The command list is an index into
it.

## Risk scores

Sessions are scored when they close, from:

- **Commands run** — destructive, credential-related and evasive commands weigh heaviest
- **Data transferred** — large volumes suggest extraction
- **Time of day** — access outside normal hours
- **Duration** — very long sessions

A high score means look, not that something is wrong. A four-hour overnight
database maintenance window scores high and is entirely legitimate.

Sessions scoring 70 or above raise an alert so nobody has to be watching a
dashboard.

## Retention

Recordings are kept for one year by default, which suits SOC 2 and PCI-DSS
expectations. Your administrator can change this; it cannot be set below 30 days.

When a recording expires, both the stored file and its record are removed.

## Privacy

Session recording captures administrative work on systems, not general employee
activity. It applies to privileged sessions opened through ZPOA and nothing else.

For workforce monitoring, which is a different capability with different
consent requirements, see [Monitor](../monitor/overview.md) and
[Privacy](../monitor/privacy.md).

Be aware that a recording captures whatever appears on screen, including a
secret displayed by a command. Treat recordings as sensitive and restrict who
can replay them.

## Related

- [Session Access](./session-access.md)
- [Command Controls](./command-controls.md)
