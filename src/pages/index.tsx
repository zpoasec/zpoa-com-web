import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const features = [
  {
    title: 'Detect',
    subtitle: 'SIEM & Threat Detection',
    iconClass: 'icon-detect',
    icon: '\u{1F6E1}\uFE0F',
    description:
      'Next-generation SIEM with real-time log ingestion, correlation engine, SIGMA-compatible detection rules, and full MITRE ATT&CK coverage.',
  },
  {
    title: 'Comply',
    subtitle: 'Compliance Automation',
    iconClass: 'icon-comply',
    icon: '\u2705',
    description:
      'Automated compliance for SOC 2, ISO 27001, PCI-DSS, HIPAA, NIST, and GDPR. Continuous monitoring, evidence collection, and audit-ready reports.',
  },
  {
    title: 'Discover',
    subtitle: 'Asset & Vulnerability Management',
    iconClass: 'icon-discover',
    icon: '\u{1F50D}',
    description:
      'Complete asset inventory and vulnerability management. CVSS and EPSS scoring, attack surface mapping, and automated remediation tracking.',
  },
  {
    title: 'Armor',
    subtitle: 'Cloud Security Posture',
    iconClass: 'icon-armor',
    icon: '\u2601\uFE0F',
    description:
      'CSPM across AWS, Azure, and GCP. Detect misconfigurations, analyze attack paths, and enforce security policies with automated remediation.',
  },
  {
    title: 'Fortress',
    subtitle: 'Identity Security',
    iconClass: 'icon-fortress',
    icon: '\u{1F511}',
    description:
      'Identity security and access governance. Monitor privileged access, detect anomalous behavior, and enforce least-privilege across your identity stack.',
  },
  {
    title: 'Neural Mesh',
    subtitle: 'AI-Powered Security',
    iconClass: 'icon-neural',
    icon: '\u{1F9E0}',
    description:
      'AI-powered investigations and threat intelligence. Automated incident analysis, threat hunting, and correlation from 12+ intelligence feeds.',
  },
];

const integrationCategories = [
  {label: 'Cloud Providers', count: 3},
  {label: 'EDR / XDR', count: 14},
  {label: 'SIEM Sources', count: 26},
  {label: 'Identity', count: 14},
  {label: 'Network Security', count: 24},
  {label: 'Email Security', count: 4},
  {label: 'Threat Intel', count: 12},
  {label: 'Databases', count: 5},
  {label: 'DevOps', count: 8},
  {label: 'Ticketing', count: 2},
];

const trustedBy = [
  'Fortune 500',
  'Healthcare',
  'Financial Services',
  'Government',
  'Technology',
];

function HeroSection(): ReactNode {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-label">Unified Cybersecurity Platform</div>
        <h1>
          Security operations,
          <br />
          <span className="accent">simplified.</span>
        </h1>
        <p className="tagline">
          Replace your fragmented security stack with one platform. Detection,
          compliance, asset discovery, cloud security, identity protection, and
          AI-powered investigations — all in one place.
        </p>
        <div className="hero-buttons">
          <Link className="hero-btn-primary" to="/docs/getting-started/quick-start">
            Get Started Free
          </Link>
          <Link className="hero-btn-secondary" to="/docs/intro">
            Explore Platform
          </Link>
        </div>
        <div className="stats-row">
          <div className="stat-item">
            <div className="number">90+</div>
            <div className="label">Integrations</div>
          </div>
          <div className="stat-item">
            <div className="number">6</div>
            <div className="label">Modules</div>
          </div>
          <div className="stat-item">
            <div className="number">14</div>
            <div className="label">Categories</div>
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

function TrustedSection(): ReactNode {
  return (
    <section className="trusted-section">
      <div className="container">
        <p>Trusted by security teams across industries</p>
        <div className="trusted-logos">
          {trustedBy.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection(): ReactNode {
  return (
    <section className="features-section" id="features">
      <div className="container" style={{textAlign: 'center'}}>
        <div className="section-label">Platform</div>
        <h2>Six modules. One platform.</h2>
        <p className="section-subtitle">
          Purpose-built security modules that work together seamlessly, giving
          your team complete visibility and control.
        </p>
        <div className="features-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <div className={`card-icon ${feature.iconClass}`}>
                {feature.icon}
              </div>
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
        <div className="section-label">Integrations</div>
        <h2>
          <span className="accent">90+</span> connectors, ready to go
        </h2>
        <p className="section-subtitle">
          Connect your existing security tools in minutes. From CrowdStrike and
          Palo Alto to Okta and AWS — we integrate with the tools you rely on.
        </p>
        <div className="integrations-grid">
          {integrationCategories.map((cat) => (
            <div className="integration-badge" key={cat.label}>
              {cat.label} ({cat.count})
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
        <h2>Ready to unify your security?</h2>
        <p>
          Deploy in minutes. Free tier available. No credit card required.
        </p>
        <div className="hero-buttons">
          <Link className="hero-btn-primary" to="/docs/getting-started/quick-start">
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

export default function Home(): ReactNode {
  return (
    <Layout
      title="Unified Cybersecurity Platform"
      description="ZPOA Shield — One platform for SIEM, compliance, asset discovery, cloud security, identity protection, and AI-powered threat investigations.">
      <HeroSection />
      <TrustedSection />
      <main>
        <FeaturesSection />
        <IntegrationsSection />
        <CTASection />
      </main>
    </Layout>
  );
}
