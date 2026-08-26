---
sidebar_position: 6
title: "Command Controls"
---

# Command Controls

Command rules watch what people type in privileged terminal sessions. Depending
on the rule, a match is recorded, or the command is stopped before it runs.

## Creating a rule

**PAM → Command Rules → New Rule**

| Field | Notes |
|---|---|
| Name | Appears in the violation log and on the operator's screen if blocked |
| Protocol | Which session type it applies to |
| Pattern | A regular expression matched against the command line |
| Action | Alert, block, or approve |
| Severity | Drives whether a match raises a SOC alert |

### Actions

- **Alert** — the command runs and the match is recorded. Start here.
- **Block** — the command does not run. The line is cleared and the operator is
  told which rule stopped it.
- **Approve** — treated as block. There is no way to collect an approval mid-
  session, and treating it as "allow" would make the strictest-looking setting
  the weakest in practice.

### Useful patterns

```
rm\s+-rf\s+/           destructive deletion at the filesystem root
:\(\)\{.*\};:          fork bomb
history\s+-c           clearing shell history
/etc/shadow            reading the password file
chmod\s+777            world-writable permissions
iptables\s+-F          flushing firewall rules
curl.*\|\s*(ba)?sh     piping a download straight into a shell
```

Test patterns before setting them to block. `rm -rf /` and `rm -rf ./build` are
one character apart, and a rule that stops a build is a rule someone will ask
you to remove.

## Rolling rules out

Start every rule in **alert** mode and leave it there for a fortnight. Review
what it caught under **Violations**. Only switch to block once you can see the
rule catches what you meant and nothing else.

Going straight to block is the common mistake. The first false positive lands on
someone doing legitimate work at an inconvenient hour, and the usual outcome is
that command controls get switched off entirely.

## What gets caught, and what does not

Rules match commands as typed, reconstructed from keystrokes as they are sent.
That has limits worth knowing:

- A command recalled with the **up-arrow** or completed with **Tab** may not
  match, because the shell changed the line without ZPOA seeing the characters.
- A command inside a **script** is not matched — only what is typed at the
  prompt. Running `./deploy.sh` matches `./deploy.sh`, not what the script does.
- **Aliases and shell functions** are matched as typed, not as expanded.

Command rules are a speed bump for casual misuse and a strong detection signal.
They are not a barrier against someone deliberately working around them. The
[session recording](./session-recording.md) captures what actually happened and
is the authoritative record.

That is a deliberate trade. Buffering input until Enter would make matching
exact and make the terminal unusable — no echo, no completion, no history.

## Reviewing violations

**PAM → Command Rules → Violations** lists every match: which rule, which
command, which session, who, and whether it was allowed or blocked.

Each entry links to the session recording, so you can see the context rather
than judging a command in isolation.

High and critical severity matches also raise a SOC alert.

## Related

- [Session Access](./session-access.md)
- [Session Recording](./session-recording.md)
