import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const features = [
  {
    title: 'Detect',
    subtitle: 'SIEM & Threat Detection',
    iconClass: 'icon-detect',
    iconLetter: 'D',
    description:
      'Next-generation SIEM with real-time log ingestion, correlation engine, SIGMA-compatible detection rules, and full MITRE ATT&CK coverage.',
    link: '/features#detect',
  },
  {
    title: 'Comply',
    subtitle: 'Compliance Automation',
    iconClass: 'icon-comply',
    iconLetter: 'C',
    description:
      'Automated compliance for SOC 2, ISO 27001, PCI-DSS, HIPAA, NIST, and GDPR. Continuous monitoring, evidence collection, and audit-ready reports.',
    link: '/features#comply',
  },
  {
    title: 'Discover',
    subtitle: 'Asset & Vulnerability Management',
    iconClass: 'icon-discover',
    iconLetter: 'D',
    description:
      'Complete asset inventory and vulnerability management. CVSS and EPSS scoring, attack surface mapping, and automated remediation tracking.',
    link: '/features#discover',
  },
  {
    title: 'Armor',
    subtitle: 'Endpoint Protection',
    iconClass: 'icon-armor',
    iconLetter: 'A',
    description:
      'Endpoint hardening, vulnerability management, and patch orchestration. Detect misconfigurations and enforce security policies with automated remediation.',
    link: '/features#armor',
  },
  {
    title: 'Fortress',
    subtitle: 'Identity Governance',
    iconClass: 'icon-fortress',
    iconLetter: 'F',
    description:
      'Full-spectrum IGA with 690+ connectors, NHI governance, ITDR, JIT access, Identity Fabric, AI Access Copilot, and automated access reviews.',
    link: '/features#fortress',
  },
  {
    title: 'Neural Mesh',
    subtitle: 'AI Intelligence Engine',
    iconClass: 'icon-neural',
    iconLetter: 'N',
    description:
      'AI-powered investigations and threat intelligence. Automated incident analysis, threat hunting, and correlation from 12+ intelligence feeds.',
    link: '/features#neural-mesh',
  },
];

const integrationCategories = [
  {label: 'SaaS Applications', count: 160},
  {label: 'HR / HCM', count: 112},
  {label: 'AI / ML', count: 40},
  {label: 'ERP', count: 36},
  {label: 'Miscellaneous', count: 35},
  {label: 'IGA / Directory', count: 30},
  {label: 'Generic / Custom', count: 28},
  {label: 'SIEM / Log Sources', count: 26},
  {label: 'Marketing', count: 24},
  {label: 'Network Security', count: 24},
  {label: 'Financial', count: 20},
  {label: 'ITSM', count: 20},
  {label: 'LMS', count: 17},
  {label: 'Mainframe', count: 15},
  {label: 'Legal', count: 14},
  {label: 'Identity Providers', count: 14},
  {label: 'EDR', count: 14},
  {label: 'CRM', count: 14},
  {label: 'Healthcare', count: 12},
  {label: 'PAM', count: 12},
  {label: 'Databases', count: 5},
  {label: 'Email Security', count: 4},
  {label: 'Cloud Providers', count: 3},
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
    <section
      className="hero-section"
      style={{
        backgroundImage: 'url(/img/features/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className="hero-overlay">
        <div className="container">
          <div className="hero-label">Unified Cybersecurity Platform</div>
          <h1>
            Security operations,
            <br />
            <span className="accent">simplified.</span>
          </h1>
          <p className="tagline">
            Replace your fragmented security stack with one platform. Detection,
            compliance, identity governance, cloud security, and AI-powered
            investigations — all in one place.
          </p>
          <div className="hero-buttons">
            <Link
              className="hero-btn-primary"
              to="/docs/getting-started/quick-start">
              Get Started Free
            </Link>
            <Link className="hero-btn-secondary" to="/features">
              Explore Platform
            </Link>
          </div>
          <div className="stats-row">
            <div className="stat-item">
              <div className="number">690+</div>
              <div className="label">Connectors</div>
            </div>
            <div className="stat-item">
              <div className="number">6</div>
              <div className="label">Security Pillars</div>
            </div>
            <div className="stat-item">
              <div className="number">23</div>
              <div className="label">Ecosystems</div>
            </div>
            <div className="stat-item">
              <div className="number">24/7</div>
              <div className="label">Monitoring</div>
            </div>
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
            <span className="trusted-badge" key={name}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformSection(): ReactNode {
  return (
    <section className="platform-section">
      <div className="container">
        <div className="platform-row">
          <div className="platform-image">
            <img
              src="/img/features/platform.jpg"
              alt="ZPOA Shield Platform"
              loading="lazy"
            />
          </div>
          <div className="platform-content">
            <div className="section-label">Why ZPOA Shield</div>
            <h2>
              One platform.
              <br />
              Complete visibility.
            </h2>
            <p>
              Security teams waste valuable time context-switching between
              tools. ZPOA Shield eliminates that friction by providing a unified
              dashboard where you can monitor alerts, track compliance, review
              assets, and investigate incidents — all without leaving the
              platform.
            </p>
            <ul className="platform-highlights">
              <li>Replace 10+ point solutions with one platform</li>
              <li>690+ pre-built connectors across 23 categories</li>
              <li>AI-powered correlation across all modules</li>
              <li>Deploy in minutes, not months</li>
            </ul>
            <Link className="feat-learn-more" to="/features">
              Explore all features <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
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
                <span className="icon-letter">{feature.iconLetter}</span>
              </div>
              <h3>{feature.title}</h3>
              <p className="feature-subtitle">{feature.subtitle}</p>
              <p>{feature.description}</p>
              <Link className="feature-link" to={feature.link}>
                Learn more &rarr;
              </Link>
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
          <span className="accent">690+</span> connectors, ready to go
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

function StatsBar(): ReactNode {
  return (
    <section className="home-stats-bar">
      <div className="container">
        <div className="stats-bar-grid">
          <div className="stats-bar-item">
            <div className="stats-bar-number">690+</div>
            <div className="stats-bar-label">Connectors</div>
          </div>
          <div className="stats-bar-item">
            <div className="stats-bar-number">99.9%</div>
            <div className="stats-bar-label">Uptime SLA</div>
          </div>
          <div className="stats-bar-item">
            <div className="stats-bar-number">&lt;1s</div>
            <div className="stats-bar-label">Alert Latency</div>
          </div>
          <div className="stats-bar-item">
            <div className="stats-bar-number">6</div>
            <div className="stats-bar-label">Security Pillars</div>
          </div>
          <div className="stats-bar-item">
            <div className="stats-bar-number">23</div>
            <div className="stats-bar-label">Ecosystems</div>
          </div>
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

export default function Home(): ReactNode {
  return (
    <Layout
      title="Unified Cybersecurity Platform"
      description="ZPOA Shield — One platform for SIEM, compliance, identity governance, cloud security, and AI-powered threat investigations.">
      <HeroSection />
      <TrustedSection />
      <main>
        <PlatformSection />
        <FeaturesSection />
        <IntegrationsSection />
        <StatsBar />
        <CTASection />
      </main>
    </Layout>
  );
}
