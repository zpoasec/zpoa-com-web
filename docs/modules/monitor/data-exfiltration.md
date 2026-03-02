---
sidebar_position: 11
title: "Data Exfiltration"
---

# Data Exfiltration Detection

Monitor tracks how files and data move through the organization to detect and prevent unauthorized data loss. By correlating activity across USB devices, cloud storage, email, print, and network channels, Monitor identifies data exfiltration patterns that single-channel tools miss.

## File Activity Tracking

Every file operation on monitored endpoints is captured:

- **Create, modify, delete, rename, copy** -- Full lifecycle tracking for files in monitored directories
- **Source and destination** -- Where files were copied from and to (local, USB, cloud sync, network share, email attachment)
- **File metadata** -- Size, extension, hash (for deduplication and classification matching)
- **Monitored paths** -- Default: user home, Documents, Downloads, Desktop. Configurable per policy

## Exfiltration Channels

Monitor detects data leaving through multiple channels:

- **USB/removable media** -- File copies to USB drives, external hard drives, SD cards
- **Cloud storage** -- Uploads to Dropbox, Google Drive, OneDrive, iCloud, WeTransfer, and other cloud sync folders
- **Email** -- Large attachments, attachments to external recipients, unusual attachment frequency
- **Print** -- Document printing with page count and printer identification
- **Network** -- Unusual upload volume, data transfers to unknown external IP addresses

## Data Exfiltration Metrics

Aggregate view of data movement patterns:

- **Volume by channel** -- How much data moved through each exfiltration channel over time
- **Volume by user** -- Which users are transferring the most data, with comparison to their historical baseline
- **Anomaly detection** -- Users whose data transfer volume exceeds 2 standard deviations from their peer group baseline
- **Trend analysis** -- Increasing data transfer patterns that may indicate pre-departure behavior

## Data Classification Integration

Cross-reference file activity with data sensitivity labels:

- **Classified data movement** -- Alert when files with sensitivity labels (confidential, restricted, PII, PHI) are copied to external destinations
- **Label-based policies** -- Create policies that trigger based on data classification level rather than file volume
- **Priority alerting** -- Classified data exfiltration alerts are scored higher than generic file transfer alerts
