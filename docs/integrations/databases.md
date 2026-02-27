---
sidebar_position: 12
title: Database Integrations
---

# Database Integrations

ZPOA Shield monitors database activity to detect unauthorized access, suspicious queries, privilege misuse, and data exfiltration. By ingesting audit logs and query metadata from your database systems, the platform provides visibility into one of the most critical layers of your infrastructure.

## Supported Databases

### MySQL

Ingest MySQL audit logs to monitor authentication events, schema changes, and query activity.

- **Connection Method:** MySQL Enterprise Audit Plugin (log file or syslog), or ZPOA Shield database agent
- **Data Types:** Connection events (connect, disconnect, failed login), query events (DDL, DML), administrative commands
- **Requirements:** MySQL Enterprise Edition (for native audit plugin) or MariaDB Audit Plugin for MariaDB/community MySQL

```sql
-- Enable MySQL Enterprise Audit Plugin
INSTALL PLUGIN audit_log SONAME 'audit_log.so';
SET GLOBAL audit_log_policy = 'ALL';
SET GLOBAL audit_log_format = 'JSON';
```

**Key Detection Signals:**
- Failed authentication attempts (brute force against database accounts)
- Privilege escalation (`GRANT` statements, role modifications)
- Bulk data export queries (`SELECT ... INTO OUTFILE`, large result sets)
- Schema modifications outside maintenance windows

### PostgreSQL

Collect PostgreSQL audit events using the pgAudit extension or native logging.

- **Connection Method:** pgAudit extension (log file or syslog), or ZPOA Shield database agent
- **Data Types:** Session audit logs, object audit logs (table/column-level), DDL and DML events
- **Requirements:** pgAudit extension installed and configured

```sql
-- Install and configure pgAudit
CREATE EXTENSION pgaudit;

-- postgresql.conf
pgaudit.log = 'all'
pgaudit.log_catalog = off
pgaudit.log_parameter = on
pgaudit.log_statement_once = on
```

**Key Detection Signals:**
- Unauthorized access to sensitive tables (PII, financial data)
- Unusual query patterns (off-hours access, anomalous query volume)
- Configuration changes (`ALTER SYSTEM`, extension installations)
- Role and permission modifications

### MongoDB

Ingest MongoDB audit events to track authentication, authorization, and CRUD operations on collections.

- **Connection Method:** MongoDB audit log (JSON file or syslog), or MongoDB Atlas API
- **Data Types:** Authentication events, authorization failures, CRUD operations, administrative commands
- **Requirements:** MongoDB Enterprise or MongoDB Atlas (M10+ clusters for audit logs)

```yaml
# mongod.conf - Enable auditing
auditLog:
  destination: file
  format: JSON
  path: /var/log/mongodb/audit.json
  filter: '{ atype: { $in: ["authenticate", "authCheck", "createCollection", "dropCollection"] } }'
```

**Key Detection Signals:**
- Authentication failures from unexpected source IPs
- Collection drops or database deletions
- Excessive read operations on sensitive collections
- Changes to user roles or authentication mechanisms

### Microsoft SQL Server

Collect SQL Server audit events, including login activity, permission changes, and data access patterns.

- **Connection Method:** SQL Server Audit (file target or Windows Event Log), or ZPOA Shield database agent
- **Data Types:** Server audit events, database audit events, login events, schema changes
- **Requirements:** SQL Server Standard or Enterprise (SQL Server Audit feature)

```sql
-- Create a server audit
CREATE SERVER AUDIT ZpoaShieldAudit
TO FILE (FILEPATH = 'C:\SQLAudit\', MAXSIZE = 100 MB);

CREATE SERVER AUDIT SPECIFICATION ZpoaShieldSpec
FOR SERVER AUDIT ZpoaShieldAudit
ADD (FAILED_LOGIN_GROUP),
ADD (LOGIN_CHANGE_PASSWORD_GROUP),
ADD (SERVER_ROLE_MEMBER_CHANGE_GROUP),
ADD (DATABASE_PERMISSION_CHANGE_GROUP);

ALTER SERVER AUDIT ZpoaShieldAudit WITH (STATE = ON);
```

**Key Detection Signals:**
- SQL injection patterns in query logs
- `xp_cmdshell` or other dangerous stored procedure execution
- Bulk copy operations (`BCP`, `BULK INSERT`) for data exfiltration
- `sa` account usage or privilege escalation

### Oracle Database

Ingest Oracle Unified Audit trail data to monitor privileged operations, data access, and policy violations.

- **Connection Method:** Oracle Unified Audit trail (via ZPOA Shield database agent or syslog)
- **Data Types:** Unified audit records, fine-grained audit events, login/logout events
- **Requirements:** Oracle Database 12c or later with Unified Auditing enabled

```sql
-- Create a unified audit policy
CREATE AUDIT POLICY zpoa_security_policy
  ACTIONS
    LOGON, LOGOFF,
    CREATE USER, ALTER USER, DROP USER,
    GRANT, REVOKE,
    SELECT ON hr.employees,
    DELETE ON hr.employees;

AUDIT POLICY zpoa_security_policy;
```

**Key Detection Signals:**
- Direct access to production data by non-application accounts
- Privilege grants outside of change management windows
- Data pump export operations (`expdp`) for bulk data extraction
- Modification of audit trail settings (audit tampering)

## Database Activity Monitoring

ZPOA Shield correlates database audit data with other telemetry sources to provide comprehensive database security:

- **User-to-identity mapping** -- Map database accounts to identity provider users to detect shared account usage or credential compromise.
- **Asset correlation** -- Link database events to the server asset inventory for impact assessment.
- **Query anomaly detection** -- ML-based baselining of normal query patterns detects unusual access volumes, off-hours activity, and new query types.
- **Compliance reporting** -- Generate audit reports for PCI DSS Requirement 10, HIPAA audit controls, and SOX database access reviews.

## Best Practices

- **Enable audit logging at the database level** rather than relying solely on application-layer logging, which can be bypassed.
- **Filter audit events** to focus on security-relevant activity (authentication, authorization, DDL, sensitive table access) to manage log volume.
- **Use dedicated service accounts** for ZPOA Shield database agents with read-only access to audit tables.
- **Rotate database audit logs** and archive them to ZPOA Shield for long-term retention and compliance.
