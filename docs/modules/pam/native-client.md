---
sidebar_position: 15
title: "Working from your own terminal"
---

# Working from your own terminal

The browser terminal is fine for reviewing a session. It is not where you want
to spend an afternoon fixing a database.

The `zpoa` command connects you to the same brokered, recorded, governed session
from your own terminal, with your own shell history, your own tooling and your
own key bindings.

## Setting it up

Configure it once, either through the environment:

```bash
export ZPOA_API_URL=https://api-dev.zpoa.com
export ZPOA_TOKEN=...
export ZPOA_TENANT=acme
```

or in `~/.config/zpoa/cli.json`:

```json
{
  "api_url": "https://api-dev.zpoa.com",
  "token": "...",
  "tenant": "acme"
}
```

Check it:

```bash
zpoa whoami
```

## Connecting to a host

```bash
zpoa ls                 # what you can reach
zpoa ssh web-01         # open a shell
zpoa ssh web-01 --as svc_deploy
```

The session is brokered and recorded exactly as it would be in the browser. That
is not a caveat — it is the point. The recording, the command rules and the
audit trail live on the server side of the connection, so a native client cannot
be a way around them.

If a host has several vaulted credentials and you have not said which, it lists
them rather than picking one. Connecting as `root` when you meant a service
account is not a mistake you notice until it is in the recording.

## Databases and Kubernetes

```bash
zpoa db orders-prod     # opens psql / mysql / sqlcmd / sqlplus
zpoa k8s prod-cluster   # opens kubectl
```

These hand you your own client rather than reimplementing it. A worse `psql` is
not something anybody wants, and a privileged-access product that ships one
becomes the thing people route around.

You need the client installed. If it is missing, `zpoa` says so rather than
failing obscurely.

## Requesting elevation

```bash
zpoa jit request "CN=Prod DBAs,OU=JIT Groups,DC=corp,DC=example,DC=com" \
  --for 60m --why "INC-4821 replication lag" --ticket INC-4821

zpoa jit ls                       # your requests
zpoa jit ls --status pending
zpoa jit activate <request-id>
zpoa jit revoke <session-id>      # hand it back early
```

`--for` accepts what you would type: `30m`, `2h`, `1h30m`, or a bare number of
minutes.

See [Just-in-time elevation](jit-elevation.md) for what the preview output
means — particularly the line telling you whether the elevation will grant
anything on a real system.

## Ctrl-C

Ctrl-C goes to the remote shell, as it would in `ssh`. To end the session, exit
the remote shell.
