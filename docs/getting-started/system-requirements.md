---
sidebar_position: 2
title: System Requirements
---

Z Shield is a fully cloud-hosted SaaS platform. There is no software to install on your local machine. However, your browser and network environment must meet the following requirements for the best experience.

## Supported Browsers

Z Shield is tested and supported on the following browsers:

| Browser | Minimum Version |
|---------|----------------|
| Google Chrome | 90+ |
| Mozilla Firefox | 88+ |
| Microsoft Edge | 90+ |
| Apple Safari | 14+ |

JavaScript must be enabled in your browser. Z Shield makes extensive use of modern web APIs including WebSocket, Web Workers, and the Clipboard API. Older browsers or browsers with restricted feature sets may experience degraded functionality.

### Browser Recommendations

- **Use the latest stable release** of your preferred browser for optimal performance and security.
- **Disable aggressive ad blockers** on the Z Shield domain, as they may interfere with API calls and real-time data streams.
- **Allow pop-ups** from app.zpoashield.com if you use features such as report exports or OAuth-based connector authentication flows.

## Network Requirements

### HTTPS (Port 443)

All communication between your browser and the Z Shield platform occurs over HTTPS on port 443. Ensure your firewall and proxy configurations allow outbound HTTPS traffic to the following domains:

- `app.zpoashield.com` -- Primary application
- `api.zpoashield.com` -- API endpoints
- `auth.zpoashield.com` -- Authentication services
- `static.zpoashield.com` -- Static assets and documentation

### WebSocket Connectivity

Z Shield uses WebSocket connections for real-time features including live alert feeds, log streaming, and dashboard auto-refresh. WebSocket connections are established over the same HTTPS port (443) using the `wss://` protocol. Ensure that your network proxy or firewall does not terminate or downgrade WebSocket connections.

### Bandwidth

- **Minimum**: 5 Mbps downstream for standard dashboard usage.
- **Recommended**: 25 Mbps or higher for real-time log streaming and large dataset exports.

## Screen Resolution

A minimum screen resolution of 1280 x 720 pixels is required. A resolution of 1920 x 1080 or higher is recommended for multi-panel views such as the investigation workspace and compliance dashboards.

## Agent Requirements

If you are deploying the optional Z Shield lightweight agent for endpoint telemetry (used by the Armor module), refer to the Armor module documentation for operating system and resource requirements.
