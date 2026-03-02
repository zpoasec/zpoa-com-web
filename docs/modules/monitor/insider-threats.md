---
sidebar_position: 6
title: "Insider Threat Scoring"
---

# Insider Threat Scoring

Every monitored user receives a continuously updated composite insider threat score that quantifies their risk level based on behavioral signals, data movement patterns, access anomalies, and policy violations.

## Composite Score

The insider threat score (0-100) is a weighted combination of five risk dimensions:

- **Data Exfiltration Risk** -- Based on file transfer volumes, USB usage, cloud uploads, email attachment sizes, and print activity relative to the user's historical baseline
- **Behavioral Anomaly** -- Deviation from the user's established patterns: new applications, unusual work hours, sudden productivity changes, or access to unfamiliar systems
- **Access Anomaly** -- Unusual access patterns detected by Fortress: accessing resources outside normal scope, privilege escalation attempts, or accessing sensitive data without business justification
- **Policy Violations** -- Count and severity of activity policy violations within the scoring window
- **Trend Direction** -- Whether the user's risk is increasing, stable, or decreasing over time

## Risk Levels

| Score | Level | Meaning |
|-------|-------|---------|
| 0-25 | Low | Normal activity within expected baselines |
| 26-50 | Moderate | Some deviation from normal patterns, worth monitoring |
| 51-75 | High | Significant anomalies requiring investigation |
| 76-100 | Critical | Strong indicators of insider threat, immediate action recommended |

## Peer-Group Analysis

Users are automatically grouped by role, department, access pattern, or custom criteria:

- **Auto-discovery** -- Z Shield clusters users based on similar activity patterns, application usage, and access entitlements
- **Baseline per group** -- Each peer group has its own baseline for normal behavior, so a developer downloading source code is not flagged as anomalous while an HR person doing the same would be
- **Deviation detection** -- Flag users whose activity deviates significantly from their peer group norm
- **Group comparison** -- Compare any user's activity profile against their peer group average

## Slow-Moving Threat Detection

Not all insider threats are sudden. Monitor tracks gradual behavioral shifts over weeks and months:

- **Progressive data accumulation** -- Slowly increasing file download volumes that stay under daily thresholds but add up
- **Access scope expansion** -- Gradually accessing broader sets of data over time
- **Communication pattern shifts** -- Increasing external communication volume or new external contacts
- **Work pattern changes** -- Shift to after-hours work, weekend activity, or unusual schedule patterns

## Integration with Fortress

Insider threat scores feed directly into Z Shield's identity governance:

- **Trust score impact** -- High insider threat scores degrade the user's trust score in Continuous Access Evaluation (CAE)
- **Automated response** -- Critical risk scores can trigger automated actions: step-up MFA, session termination, access suspension
- **ITDR threats** -- Threshold breaches automatically create identity threats in Fortress ITDR for investigation and response
