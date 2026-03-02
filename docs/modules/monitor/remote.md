---
sidebar_position: 12
title: "Remote Management"
---

# Remote Monitoring and Management

Z Shield Monitor includes full RMM capabilities built on the endpoint agent, giving IT and security teams remote access to any managed endpoint directly from the browser.

## Remote Desktop

View and control any managed endpoint's screen in real-time:

- **Low-latency streaming** -- WebRTC-based screen sharing for responsive remote control
- **Full input control** -- Mouse and keyboard relay from browser to endpoint
- **Multi-monitor support** -- Select which monitor to view on multi-display setups
- **Adaptive quality** -- Resolution and frame rate adjust automatically based on network bandwidth
- **Clipboard sync** -- Bidirectional clipboard sharing with DLP filtering
- **Consent prompt** -- Configurable per tenant: always show consent prompt, show on request, or silent (for investigations)
- **Session recording** -- Optionally record remote sessions as video evidence

## Remote Shell

Interactive terminal access to any managed endpoint:

- **PowerShell** (Windows), **Bash** (Linux/macOS)
- **Terminal emulation** -- Full terminal experience in the browser with xterm.js
- **Command logging** -- Every command and output is logged to the audit trail
- **Command blocklist** -- Prevent dangerous commands (configurable per tenant)
- **Session timeout** -- Automatic disconnection after configurable idle period (default: 30 minutes)

## File Transfer

Browse and transfer files to and from managed endpoints:

- **Remote file browser** -- Navigate the endpoint's filesystem in a tree view
- **Upload** -- Drag and drop files from your browser to the endpoint
- **Download** -- Download files from the endpoint with DLP scanning
- **Progress tracking** -- Transfer progress with resume support for large files
- **Size limits** -- Maximum file size configurable per tenant

## System Diagnostics

Real-time visibility into endpoint health and performance:

- **System info** -- CPU, memory, disk usage, OS version, uptime
- **Running processes** -- List all processes with CPU/memory usage, ability to terminate
- **System services** -- View, start, stop, and restart Windows services or Linux systemd units
- **Network diagnostics** -- Ping, traceroute, and DNS lookup from the endpoint's perspective
- **Event logs** -- Browse Windows Event Log or syslog entries remotely
- **Live performance graphs** -- Real-time CPU, memory, and disk I/O charts
