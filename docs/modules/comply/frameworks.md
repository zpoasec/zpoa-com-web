---
sidebar_position: 2
title: Supported Frameworks
---

ZPOA Shield supports a broad set of regulatory and industry compliance frameworks out of the box. Each framework is fully mapped to technical controls that are evaluated against your connected data sources.

## Available Frameworks

### SOC 2 Type II

The SOC 2 framework covers the Trust Services Criteria: Security, Availability, Processing Integrity, Confidentiality, and Privacy. ZPOA Shield maps controls across all five categories and supports the continuous monitoring required for Type II attestation.

### ISO 27001

ISO 27001 defines requirements for an Information Security Management System (ISMS). ZPOA Shield maps controls to Annex A categories including access control, cryptography, operations security, communications security, and supplier relationships.

### PCI-DSS v4.0

The Payment Card Industry Data Security Standard version 4.0 introduces updated requirements for protecting cardholder data. ZPOA Shield covers all 12 requirement families, including network security controls, access management, vulnerability management, and monitoring.

### HIPAA

The Health Insurance Portability and Accountability Act requires safeguards for protected health information (PHI). ZPOA Shield maps controls to the HIPAA Security Rule's administrative, physical, and technical safeguard categories.

### NIST Cybersecurity Framework (CSF)

The NIST CSF organizes security activities into five functions: Identify, Protect, Detect, Respond, and Recover. ZPOA Shield provides control mappings across all functions and their subcategories.

### NIST 800-53

NIST Special Publication 800-53 defines a comprehensive catalog of security and privacy controls for federal information systems. ZPOA Shield supports the control families most commonly required, including Access Control (AC), Audit and Accountability (AU), Configuration Management (CM), Incident Response (IR), and System and Communications Protection (SC).

### GDPR

The General Data Protection Regulation requires organizations handling EU personal data to implement appropriate technical and organizational measures. ZPOA Shield maps controls to GDPR articles covering data protection, breach notification, access controls, and data processing records.

### CIS Benchmarks

The Center for Internet Security Benchmarks provide prescriptive configuration guidelines for operating systems, cloud platforms, and applications. ZPOA Shield evaluates connected systems against CIS Benchmark recommendations for AWS, Azure, GCP, Kubernetes, and common operating systems.

## Control Mapping

Each framework's controls are mapped to one or more technical checks that ZPOA Shield performs against your environment. A single technical check may satisfy controls across multiple frameworks. For example, an MFA enforcement check may simultaneously address SOC 2 CC6.1, ISO 27001 A.9.4.2, and PCI-DSS 8.3.

The control mapping view displays:

- The framework control identifier and description.
- The associated ZPOA Shield technical checks.
- The current pass/fail status of each check.
- The data sources used to evaluate the check.

## Compliance Scores

Each framework receives an overall compliance score expressed as a percentage. Scores are calculated as the ratio of passing controls to total applicable controls. You can drill down into scores by control category to identify areas requiring attention. Historical score trends are displayed on the compliance dashboard, making it easy to demonstrate improvement over time to auditors and leadership.
