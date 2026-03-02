---
sidebar_position: 13
title: "Software Deployment"
---

# Software Deployment and Patch Management

Push software packages, deploy updates, and manage patch compliance across your entire endpoint fleet from the Z Shield console.

## Software Packages

Maintain a package repository for your organization:

- **Upload packages** -- MSI, DEB, RPM, DMG, PKG, and EXE installers
- **Package metadata** -- Name, version, platform, description, and file hash for integrity verification
- **Multi-platform** -- Manage packages for Windows, Linux, and macOS from a single interface
- **Version management** -- Track multiple versions of the same package

## Deployment Tasks

Deploy software to endpoints with scheduling and targeting:

- **Actions** -- Install, uninstall, or update packages on target endpoints
- **Targeting** -- Deploy to individual agents, agent groups, or all agents matching a filter
- **Scheduling** -- Deploy immediately, at a scheduled time, or during a maintenance window
- **Status tracking** -- Real-time status per agent: queued, downloading, installing, success, failed
- **Rollback** -- Automatic rollback for failed installations when supported by the package format
- **Retry** -- Retry deployment on failed agents without re-deploying to successful ones

## Patch Management

Keep endpoints up to date with OS and application patches:

- **Patch scanning** -- Scan endpoints for missing operating system and application patches
- **Compliance scoring** -- Per-agent and organization-wide patch compliance percentage
- **Patch deployment** -- Deploy patches with approval workflow and maintenance window scheduling
- **Auto-reboot scheduling** -- Configure automatic reboot after patch installation during maintenance windows
- **Compliance dashboard** -- Visual overview of patch status across the fleet with drill-down to individual agents
