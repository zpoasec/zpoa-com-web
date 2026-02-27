import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const features = [
  {
    title: 'DETECT',
    pill: 'pill-detect',
    icon: '\u{1F6E1}',
    description:
      'Next-gen SIEM with real-time log ingestion, correlation engine, custom detection rules (SIGMA-compatible), and full MITRE ATT&CK mapping across your environment.',
  },
  {
    title: 'COMPLY',
    pill: 'pill-comply',
    icon: '\u{2705}',
    description:
      'Automated compliance management for SOC 2, ISO 27001, PCI-DSS, HIPAA, NIST, and GDPR. Evidence collection, gap analysis, and continuous monitoring.',
  },
  {
    title: 'DISCOVER',
    pill: 'pill-discover',
    icon: '\u{1F50D}',
    description:
      'Comprehensive asset discovery and vulnerability management. Map your attack surface, prioritize risks with CVSS/EPSS scoring, and track remediation.',
  },
  {
    title: 'ARMOR',
    pill: 'pill-armor',
    icon: '\u{1F6E1}',
    description:
      'Cloud Security Posture Management (CSPM) across AWS, Azure, and GCP. Detect misconfigurations, analyze attack paths, and enforce security policies.',
  },
  {
    title: 'FORTRESS',
    pill: 'pill-fortress',
    icon: '\u{1F512}',
    description:
      'Identity security and access governance. Monitor privileged access, detect anomalous behavior, enforce least-privilege policies across your identity stack.',
  },
  {
    title: 'NEURAL MESH',
    pill: 'pill-neural',
    icon: '\u{1F9E0}',
    description:
      'AI-powered security investigations and threat intelligence. Automated incident analysis, threat hunting, and intelligence correlation from 12+ feeds.',
  },
];

const integrationCategories = [
  {icon: '\u2601', label: 'Cloud Providers', count: 3},
  {icon: '\u{1F6E1}', label: 'EDR/XDR', count: 14},
  {icon: '\u{1F4CA}', label: 'SIEM Sources', count: 26},
  {icon: '\u{1F511}', label: 'Identity', count: 14},
  {icon: '\u{1F310}', label: 'Network Security', count: 24},
  {icon: '\u{1F4E7}', label: 'Email Security', count: 4},
  {icon: '\u{1F50D}', label: 'Threat Intel', count: 12},
  {icon: '\u{1F4BE}', label: 'Databases', count: 5},
];

function HeroSection(): ReactNode {
  return (
    <section className="hero-section">
      <div className="container">
        <h1>
          Unified <span className="accent">Cybersecurity</span>
          <br />
          Platform
        </h1>
        <p className="tagline">
          One platform for detection, compliance, asset discovery, cloud
          security, identity protection, and AI-powered investigations. Protect
          your entire organization from a single pane of glass.
        </p>
        <div className="hero-buttons">
          <Link className="hero-btn-primary" to="/docs/getting-started/quick-start">
            Get Started Free
          </Link>
          <Link className="hero-btn-secondary" to="/docs/intro">
            Read the Docs
          </Link>
        </div>
        <div className="stats-row">
          <div className="stat-item">
            <div className="number">90+</div>
            <div className="label">Integrations</div>
          </div>
          <div className="stat-item">
            <div className="number">14</div>
            <div className="label">Categories</div>
          </div>
          <div className="stat-item">
            <div className="number">6</div>
            <div className="label">Security Modules</div>
          </div>
          <div className="stat-item">
            <div className="number">24/7</div>
            <div className="label">Monitoring</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection(): ReactNode {
  return (
    <section className="features-section" id="features">
      <div className="container">
        <h2>
          Everything You Need to <span className="accent">Secure</span> Your
          Organization
        </h2>
        <div className="features-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <div className="icon">{feature.icon}</div>
              <span className={`pill ${feature.pill}`}>{feature.title}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntegrationsSection(): ReactNode {
  return (
    <section className="integrations-section">
      <div className="container">
        <h2>
          <span className="accent">90+</span> Security Integrations
        </h2>
        <p style={{opacity: 0.7, maxWidth: 600, margin: '0 auto'}}>
          Connect your entire security stack. From cloud providers and EDR to
          SIEM sources, identity providers, and threat intelligence feeds.
        </p>
        <div className="integrations-grid">
          {integrationCategories.map((cat) => (
            <div className="integration-badge" key={cat.label}>
              <span>{cat.icon}</span>
              <span>
                {cat.label} ({cat.count})
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection(): ReactNode {
  return (
    <section className="cta-section">
      <div className="container">
        <h2>Start Securing Your Organization Today</h2>
        <p>
          Deploy in minutes. Free tier available. No credit card required.
        </p>
        <Link className="hero-btn-primary" to="/docs/getting-started/quick-start">
          Get Started Free
        </Link>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Unified Cybersecurity Platform"
      description="ZPOA Shield — One platform for SIEM, compliance, asset discovery, cloud security, identity protection, and AI-powered threat investigations.">
      <HeroSection />
      <main>
        <FeaturesSection />
        <IntegrationsSection />
        <CTASection />
      </main>
    </Layout>
  );
}
