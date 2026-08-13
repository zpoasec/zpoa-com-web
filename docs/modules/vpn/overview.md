---
sidebar_position: 1
title: ZPOA Zypher VPN Overview
---

![ZPOA Zypher VPN](/img/features/platform.jpg)

ZPOA Zypher VPN is Z Shield's self-hosted, zero-trust network access product. It is a modern WireGuard mesh where the control plane, database, and identity that governs access all run inside your own boundary. Nothing is rented from a vendor cloud.

## Architecture

ZPOA Zypher VPN separates the **control plane** (who-can-reach-what) from the **data plane** (the actual encrypted packets), and keeps both under your ownership.

![ZPOA Zypher VPN architecture: self-hosted control plane and data plane inside customer infrastructure](/img/features/vpn-architecture.svg)

### Control plane

The control plane is a coordination service: it authenticates devices, hands out the network map (peers, public keys, and ACL policy), and helps two peers punch through NAT. It never sees your traffic. It runs on your infrastructure backed by a PostgreSQL primary with a hot standby that fenced-auto-promotes in roughly 30 seconds.

### Data plane

Real packets travel **peer-to-peer over WireGuard**, end-to-end encrypted and hole-punched through NAT. When a direct path is blocked, peers fall back to an encrypted relay (DERP). Traffic never routes through the database, and established tunnels keep flowing for hours from the client's cached network map even if the control plane goes offline.

### Subnet router

A subnet router placed inside a private network advertises that network's routes (for example `10.20.0.0/16`), so a remote client can reach a private host by building a direct tunnel to the router.

## Identity-native access

Unlike VPNs that bind access to an IP or a single account, ZPOA Zypher VPN ties access to the **golden record** from Z Shield's identity platform. Because one person is resolved to one identity across all of their accounts, access follows the person, and revoking them at offboarding closes every door at once.

- ACL groups derived from identity and entitlements, not static IP ranges.
- Least-privilege access re-evaluated continuously, not just at tunnel setup.
- Joiner/Mover/Leaver lifecycle and access approvals built into the same platform.

## Sovereignty and compliance

- **Self-hosted end to end:** control plane, database, and relays stay in your VPC or datacenter.
- **Air-gap capable:** runs on disconnected and classified networks a SaaS coordinator cannot reach.
- **Physical isolation:** one control plane and database per customer, not a shared multi-tenant database.
- **You own the keys, logs, and audit trail:** nothing to subpoena from a vendor.
- **Data residency:** for Indian deployments, self-hosting on Indian soil makes DPDP and CERT-In localization automatic.

## Resilience

- Postgres primary/standby with ~30-second fenced auto-promote.
- Client-side multi-URL failover: the client already knows the backup control plane, so no HA load balancer is required.
- Tunnels survive a control-plane outage from the cached network map.
