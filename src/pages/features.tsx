import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const modules = [
  {
    id: 'detect',
    subtitle: 'SIEM & Threat Detection',
    headline: 'See every threat. In real time.',
    description:
      'Next-generation SIEM that ingests, normalizes, and correlates logs from 690+ sources. AI-powered detection rules, full MITRE ATT&CK mapping, and sub-second alerting.',
    highlights: [
      'Real-time log ingestion and correlation engine',
      'SIGMA-compatible detection rules with custom rule builder',
      'Full MITRE ATT&CK framework coverage and mapping',
      '690+ out-of-the-box data source connectors',
    ],
    accentClass: 'accent-detect',
    image: '/img/features/detect.jpg',
    link: '/docs/modules/detect/overview',
  },
  {
    id: 'comply',
    subtitle: 'GRC & Compliance Automation',
    headline: 'Compliance on autopilot.',
    description:
      'AI-powered compliance with a built-in Copilot that automates evidence collection, continuous posture assessment, and audit preparation across SOC 2, ISO 27001, PCI-DSS, HIPAA, NIST, and GDPR.',
    highlights: [
      'AI Compliance Copilot for automated evidence mapping',
      'Continuous compliance posture monitoring and scoring',
      'Multi-framework support with cross-framework inheritance',
      'Audit-ready report generation with one click',
    ],
    accentClass: 'accent-comply',
    image: '/img/features/comply.jpg',
    link: '/docs/modules/comply/overview',
  },
  {
    id: 'service-hub',
    subtitle: 'Service Catalog & Requests',
    headline: 'Access arrives governed, not by ticket.',
    description:
      'A self-service catalogue of every application and cloud service people can request, with approval routing, entitlement mapping, and fulfilment tracked end to end. Because it runs on the same identity record Fortress governs, every grant is already attributed, reviewable, and revocable.',
    highlights: [
      'Unified catalogue spanning SaaS applications and cloud services',
      'Request-to-fulfilment workflow with policy-driven approval routing',
      'Entitlements mapped to the governed identity, not a free-text grant',
      'Every fulfilment lands in the access review and audit trail automatically',
    ],
    accentClass: 'accent-svchub',
    image: '/img/features/platform.jpg',
    link: '/docs/modules/fortress/storefront',
  },
  {
    id: 'discover',
    subtitle: 'Asset Inventory & Attack Surface',
    headline: 'Know what you have. Protect what matters.',
    description:
      'Continuous discovery and classification of every asset across cloud and on-premises environments. CVSS and EPSS vulnerability scoring, attack surface mapping, and automated remediation tracking.',
    highlights: [
      'Continuous discovery across cloud and on-prem environments',
      'Automated asset classification and criticality scoring',
      'CVSS and EPSS vulnerability scoring with prioritization',
      'Attack surface mapping and remediation tracking',
    ],
    accentClass: 'accent-discover',
    image: '/img/features/discover.jpg',
    link: '/docs/modules/discover/overview',
  },
  {
    id: 'armor',
    subtitle: 'Endpoint Protection & Hardening',
    headline: 'Harden every endpoint. Patch every gap.',
    description:
      'Endpoint hardening, vulnerability management, and patch orchestration across your entire fleet. Detect misconfigurations, prioritize vulnerabilities by exploitability, and automate remediation.',
    highlights: [
      'Endpoint hardening with security baseline enforcement',
      'Vulnerability management with exploitability scoring',
      'Automated patch orchestration and rollback',
      'Configuration compliance and drift detection',
    ],
    accentClass: 'accent-armor',
    image: '/img/features/armor.jpg',
    link: '/docs/modules/armor/overview',
  },
  {
    id: 'fortress',
    subtitle: 'Identity Governance & Administration',
    headline: 'Every identity. Every access. Governed.',
    description:
      'Full-spectrum IGA with 690+ connectors, non-human identity governance, identity threat detection, just-in-time access provisioning, Identity Fabric architecture, AI Access Copilot, lifecycle management, and automated access reviews.',
    highlights: [
      'IGA with 690+ connectors and Identity Fabric architecture',
      'Non-human identity (NHI) governance and ITDR',
      'Just-in-time access with AI Access Copilot',
      'Automated lifecycle management and access reviews',
    ],
    accentClass: 'accent-fortress',
    image: '/img/features/fortress.jpg',
    link: '/docs/modules/fortress/overview',
  },
  {
    id: 'monitor',
    subtitle: 'User Activity Monitoring',
    headline: 'Every action. Every user. Full visibility.',
    description:
      'Insider threat detection, data loss prevention, workforce analytics, and session recording in a single agent. Metadata-first privacy with 3-tier recording, AI-powered video and audio analysis, remote management, and deep integration with identity governance.',
    highlights: [
      'Real-time activity monitoring with insider threat scoring',
      'Data exfiltration detection across USB, cloud, email, and print',
      'AI-powered screenshot and audio analysis with keyword detection',
      'Remote desktop, shell, file transfer, and patch management',
    ],
    accentClass: 'accent-monitor',
    image: '/img/features/monitor.jpg',
    link: '/docs/modules/monitor/overview',
  },
  {
    id: 'neural-mesh',
    subtitle: 'AI Intelligence Engine',
    headline: 'AI that connects the dots.',
    description:
      'The intelligence layer that correlates signals across every other module, identifies multi-stage attack chains, automates investigations, and surfaces threats that siloed tools miss. Response actions are proposed for approval, never executed behind your back.',
    highlights: [
      'Cross-module signal correlation and attack chain detection',
      'Automated investigation and root cause analysis',
      'Threat intelligence from 12+ intelligence feeds',
      'Natural language security queries and AI-assisted hunting',
    ],
    accentClass: 'accent-neural',
    image: '/img/features/neural.jpg',
    link: '/docs/modules/neural-mesh/overview',
  },
  {
    id: 'ai-security',
    subtitle: 'Shadow AI & AI-DLP',
    headline: 'Govern the AI your teams already use.',
    description:
      'Employees adopt AI assistants, coding copilots, and AI search faster than IT can approve them. AI Security inventories every tool in use, scores its risk, and inspects what data leaves for it — with policy enforcement built for prompts, not files.',
    highlights: [
      'Shadow AI discovery across generative, code, image, voice, and search tools',
      'Sanctioned / unauthorized / blocked governance with an organization risk score',
      'AI-DLP content inspection for PII, credentials, source code, and financial data',
      'Prompt-injection detection, LLM usage governance, and an agent kill switch',
    ],
    accentClass: 'accent-aisec',
    image: '/img/features/neural.jpg',
    link: '/docs/modules/ai-sec/overview',
  },
];

const products = [
  {
    id: 'vpn',
    subtitle: 'ZPOA Zypher VPN',
    headline: 'Zero-trust access. Fully self-hosted.',
    description:
      'A modern WireGuard mesh VPN where the control plane, database, and identity all stay inside your own network. Direct peer-to-peer tunnels, identity-native access governed by the golden record, air-gap capable, with ~30s hot-standby failover.',
    highlights: [
      'Self-hosted control plane, database, and relays — nothing leaves your VPC',
      'Identity-native access governed by the golden record, not an IP',
      'Direct peer-to-peer WireGuard mesh with encrypted relay fallback',
      'Air-gap capable, physical per-customer isolation, ~30s failover',
    ],
    accentClass: 'accent-vpn',
    link: '/cyber-vpn',
  },
];

function FeatHero(): ReactNode {
  return (
    <section className="feat-hero">
      <div className="container">
        <div className="hero-label">Platform Overview</div>
        {/* Not "every security capability" — access, service management and
            governance sit alongside the security modules. */}
        <h1>
          Access, identity, governance
          <br />
          and security. One platform.
        </h1>
        <p className="tagline">
          Nine purpose-built modules that each stand on their own, and together
          feed a shared correlation layer — so an attack that crosses four of
          them stops looking like four unrelated alerts.
        </p>
        <div className="hero-buttons">
          <Link
            className="hero-btn-primary"
            to="/docs/getting-started/quick-start">
            Get Started Free
          </Link>
          <Link className="hero-btn-secondary" to="/pricing">
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Per-module specification panels.
 *
 * These replaced the stock photographs that previously sat beside each module.
 * A generic image of a server room says nothing; every value below is a real
 * fact drawn from the module's implementation, which is what a technical buyer
 * is actually scanning for.
 */
const SPECS: Record<string, Array<[string, string]>> = {
  detect: [
    ['Rule format', 'Sigma-compatible'],
    ['Rule types', 'Simple · Threshold · Correlation'],
    ['Framework', 'MITRE ATT&CK, mapped per alert'],
    ['Event store', 'ClickHouse'],
  ],
  comply: [
    ['Frameworks', 'SOC 2 · ISO 27001 · PCI-DSS · HIPAA'],
    ['Evidence collectors', 'AWS IAM, S3, CloudTrail · GitHub · Okta'],
    ['Drift detection', 'Snapshot diff per cycle'],
    ['Cross-framework', 'Inheritance propagation'],
  ],
  'service-hub': [
    ['Catalogue scope', 'SaaS applications + cloud services'],
    ['Workflow', 'Request → approve → fulfil'],
    ['Identity model', 'Governed record, not free-text'],
    ['Audit', 'Every grant enters the review trail'],
  ],
  discover: [
    ['Scanners', 'Subdomain · Port · HTTP · Certificate · Vuln'],
    ['Risk scoring', 'CVSS + EPSS + KEV + asset criticality'],
    ['Exploit catalogue', 'CISA Known Exploited Vulnerabilities'],
    ['Output', 'Feeds Comply evidence and Neural Mesh'],
  ],
  armor: [
    ['Clouds', 'AWS · Azure · GCP'],
    ['Rule source', 'CIS Benchmarks'],
    ['Attack paths', 'Public storage · Network→data · Credential theft'],
    ['Finding states', 'Compliant · Warning · Non-compliant'],
  ],
  fortress: [
    ['Connectors', '690+ across 23 categories'],
    ['Non-human identity', 'Discovery, rotation, certification, CLM'],
    ['Behavioural detection', 'Impossible travel via Haversine distance'],
    ['Governance', 'SoD simulation · JIT · access reviews'],
  ],
  monitor: [
    ['Kernel telemetry', 'eBPF (Linux) · ETW (Windows)'],
    ['Platforms', 'Windows · macOS · Linux'],
    ['Session recording', '3-tier, HLS playback'],
    ['Privacy default', 'Metadata-first, title masking'],
  ],
  'neural-mesh': [
    ['Agents', 'Hunt · Comply · Cloud · Identity · Surface · Respond'],
    ['Correlation patterns', '5 cross-pillar attack chains'],
    ['Scoring', 'Blast radius + time-to-detect'],
    ['Response', 'Proposed for approval, never auto-fired'],
  ],
  'ai-security': [
    ['Tool discovery', 'Generative · Code · Image · Voice · Video · Search'],
    ['Governance states', 'Sanctioned · Unauthorized · Blocked'],
    ['DLP matching', 'Regex + keyword over prompt content'],
    ['Agent control', 'Prompt-injection detection · kill switch'],
  ],
  vpn: [
    ['Data plane', 'WireGuard, direct peer-to-peer'],
    ['Control plane', 'Self-hosted, inside your VPC'],
    ['Failover', '~30s fenced auto-promote'],
    ['Deployment', 'Air-gap capable'],
  ],
  zara: [
    ['Data access', 'Governed MCP tools against the live tenant'],
    ['Write safety', 'Fail-closed — denied without human approval'],
    ['Models', 'Ollama · Bedrock · OpenAI · Anthropic'],
    ['Agent governance', 'MCP servers registered, approved, audited'],
  ],
};

function SpecPanel({id, subtitle}: {id: string; subtitle: string}): ReactNode {
  const rows = SPECS[id];
  if (!rows) return null;
  return (
    <div className="feat-spec" aria-label={`${subtitle} at a glance`}>
      <div className="feat-spec__head">At a glance</div>
      <dl className="feat-spec__rows">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ModuleSection({
  module,
  index,
}: {
  module: (typeof modules)[0];
  index: number;
}): ReactNode {
  const isReversed = index % 2 !== 0;
  const bgClass = index % 2 === 0 ? 'feat-section-white' : 'feat-section-gray';

  return (
    <section className={`feat-module-section ${bgClass}`} id={module.id}>
      <div className="container">
        <div
          className={`feat-row ${isReversed ? 'feat-row-reversed' : ''}`}>
          <div className="feat-content">
            <span className={`feat-pill ${module.accentClass}`}>
              {module.subtitle}
            </span>
            <h2>{module.headline}</h2>
            <p>{module.description}</p>
            <ul className="feat-highlights">
              {module.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <Link className="feat-learn-more" to={module.link}>
              Learn more <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="feat-image">
            <SpecPanel id={module.id} subtitle={module.subtitle} />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Zara is deliberately not in the `modules` array. It runs on the same tenant
 * API under /ai/*, behind the `ai_chat` feature flag, and reaches across every
 * module rather than sitting beside them — so it gets its own band between the
 * modules and the standalone products.
 */
function ZaraCapability(): ReactNode {
  return (
    <section className="feat-module-section feat-section-gray" id="zara">
      <div className="container">
        <div className="feat-row">
          <div className="feat-content">
            <span className="feat-pill accent-zara">Zara · Agent</span>
            <h2>One agent. Every module.</h2>
            <p>
              Most security AI summarises a dashboard you are already looking at. Zara does
              the work instead: ask it a question and it plans a sequence of tool calls,
              executes them against your live tenant across whichever modules hold the
              answer, and comes back with the result rather than a paraphrase.
            </p>
            <p>
              &ldquo;Which SOC&nbsp;2 controls are failing and who owns them?&rdquo; is three
              systems away — Comply for the control states, Fortress to resolve each owner,
              Armor to check whether any of them is also an open cloud finding. Zara makes
              that one question.
            </p>
            <ul className="feat-highlights">
              <li>Plans and executes multi-step tool calls, not single lookups</li>
              <li>Reaches across Fortress, Comply, Armor, Detect, Monitor and the VPN in one answer</li>
              <li>Every write is fail-closed — without an approver the action is denied outright</li>
              <li>Runs on your model: Ollama for fully local, or Bedrock, OpenAI, Anthropic</li>
              <li>Same agent in the workspace and the employee portal, from one backend</li>
            </ul>
            <Link className="feat-learn-more" to="/docs/administration/ai-settings">
              Learn more <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="feat-image">
            <SpecPanel id="zara" subtitle="Zara Agent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductsIndex(): ReactNode {
  return (
    <section className="feat-module-section feat-section-gray" id="products">
      <div className="container">
        <div className="feat-products-head">
          <span className="hero-label">Products</span>
          <h2>Standalone products</h2>
          <p className="tagline">
            Purpose-built products you can deploy on their own — starting with
            our self-hosted, zero-trust ZPOA Zypher VPN.
          </p>
        </div>
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" id={product.id} key={product.id}>
              <span className={`feat-pill ${product.accentClass}`}>
                {product.subtitle}
              </span>
              <h3>{product.headline}</h3>
              <p>{product.description}</p>
              <ul className="feat-highlights">
                {product.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <SpecPanel id={product.id} subtitle={product.subtitle} />
              <Link className="feat-learn-more" to={product.link}>
                Learn more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBar(): ReactNode {
  // Only claims that can be checked against the product. The previous set
  // ("99.9% Uptime SLA", "<1s Alert Latency", "85% MTTR Reduction") had no
  // status page, SLA document, or methodology behind it.
  const stats = [
    {number: '690+', label: 'Connectors'},
    {number: '23', label: 'Integration categories'},
    {number: '9', label: 'Unified modules'},
    {number: '5', label: 'Cross-pillar attack patterns'},
    {number: '3', label: 'Clouds covered by CSPM'},
  ];

  return (
    <section className="feat-stats-bar">
      <div className="container">
        <div className="feat-stats-grid">
          {stats.map((s) => (
            <div className="feat-stat" key={s.label}>
              <div className="number">{s.number}</div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatCTA(): ReactNode {
  return (
    <section className="cta-section">
      <div className="container">
        <h2>See Z Shield in action</h2>
        <p>Deploy in minutes. Free tier available. No credit card required.</p>
        <div className="hero-buttons">
          <Link
            className="hero-btn-primary"
            to="/docs/getting-started/quick-start">
            Start Free
          </Link>
          <Link className="hero-btn-secondary" to="/schedule">
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Features(): ReactNode {
  return (
    <Layout
      title="Features"
      description="Z Shield features — SIEM, compliance, identity governance, endpoint protection, and AI in one platform">
      <FeatHero />
      <main>
        {modules.map((mod, i) => (
          <ModuleSection key={mod.id} module={mod} index={i} />
        ))}
        <ZaraCapability />
        <ProductsIndex />
        <StatsBar />
        <FeatCTA />
      </main>
    </Layout>
  );
}
