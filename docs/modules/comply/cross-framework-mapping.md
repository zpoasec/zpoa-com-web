---
sidebar_position: 7
title: Cross-Framework Inheritance
---

Cross-Framework Inheritance automatically propagates compliance status across related controls in different frameworks. When you satisfy a control in one framework, mapped controls in other frameworks are updated automatically -- eliminating redundant assessment work.

## How It Works

Many compliance frameworks share overlapping requirements. For example, MFA enforcement may simultaneously satisfy SOC 2 CC6.1, ISO 27001 A.9.4.2, and PCI-DSS Requirement 8.3. Rather than assessing the same underlying control three times, Z Shield's inheritance system propagates the status from a source control to all mapped target controls.

The propagation engine runs automatically on a scheduled basis and follows deterministic rules -- no AI is involved. Every propagation is fully auditable.

## Mapping Types

Two mapping types determine how status propagates:

### Equivalent Mappings

The source and target controls are functionally identical. When the source control passes, the target control is automatically marked as passing. When the source fails, the target is marked as failing.

**Example:** SOC 2 CC6.1 (Logical Access) ↔ ISO 27001 A.9.4.2 (Access Control) -- both require the same MFA enforcement evidence.

### Partial Mappings

The source control partially overlaps with the target. Passing status only propagates when the target control has no existing assessment (pending). If the target already has a status, partial mappings do not override it.

**Example:** A broad NIST 800-53 AC-2 (Account Management) control partially maps to a narrower ISO 27001 control focused specifically on privileged access.

## Enabling Inheritance

1. Navigate to **Comply > Frameworks** and expand any control.
2. In the **Mappings** section, locate the cross-framework mappings.
3. Toggle the **Auto-inherit** switch for each mapping where you want automatic propagation.

You can enable or disable inheritance per mapping, giving you fine-grained control over which relationships trigger automatic status updates.

## Inheritance Chain Visualization

When a control has inheritance enabled, the mappings section displays a visual chain showing the propagation path:

```
SOC 2 CC6.1 → ISO 27001 A.9.4.2 → PCI-DSS Req 8.3
   passing         passing              passing
```

Colored arrows indicate the direction and status of propagation. This visualization makes it easy to understand how a single control assessment cascades across your compliance landscape.

## Audit Trail

Every status propagation is logged with:

- **Timestamp** of when the propagation occurred.
- **Source control** and its status at the time of propagation.
- **Target control** and the status it was updated to.
- **Mapping type** (equivalent or partial).

Access the inheritance log from the control detail view under **Inheritance > Log**. This audit trail ensures full transparency for auditors reviewing how compliance statuses were determined.

## Best Practices

- **Start with equivalent mappings.** These are the safest to enable because the controls are functionally identical.
- **Review partial mappings carefully.** Ensure the source control truly covers the target's requirements before enabling automatic propagation.
- **Audit the inheritance log periodically.** Verify that propagated statuses align with your actual compliance posture.
- **Use inheritance to reduce duplicate evidence work.** When the same evidence supports controls across multiple frameworks, inheritance ensures consistent assessment without manual re-evaluation.
