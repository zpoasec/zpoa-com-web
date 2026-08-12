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
        <h1>
          Every security capability.
          <br />
          One unified platform.
        </h1>
        <p className="tagline">
          Seven purpose-built modules that work together seamlessly, giving your
          team complete visibility and control across your entire security
          landscape.
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
            <div className="feat-image-container">
              <img src={module.image} alt={module.subtitle} loading="lazy" />
            </div>
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
  const stats = [
    {number: '690+', label: 'Connectors'},
    {number: '99.9%', label: 'Uptime SLA'},
    {number: '<1s', label: 'Alert Latency'},
    {number: '85%', label: 'MTTR Reduction'},
    {number: '7', label: 'Security Pillars'},
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
          <Link className="hero-btn-secondary" to="mailto:info@zpoa.com">
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
        <ProductsIndex />
        <StatsBar />
        <FeatCTA />
      </main>
    </Layout>
  );
}
