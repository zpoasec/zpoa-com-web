import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'For small teams getting started with security',
    features: [
      '1 GB/day log ingestion',
      '25 managed identities',
      '7-day data retention',
      '10 connectors',
      'Basic alerting & dashboards',
      'Community support',
    ],
    btn: 'Get Started',
    btnClass: 'secondary',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$499',
    period: '/month',
    description: 'For growing security teams',
    features: [
      '10 GB/day log ingestion',
      '500 managed identities',
      '90-day data retention',
      '100 connectors',
      'All 6 modules (SIEM + IGA)',
      'Compliance frameworks (SOC 2, ISO)',
      'Overage: $5/GB + $2/identity',
      'Email & chat support',
    ],
    btn: 'Start Free Trial',
    btnClass: 'primary',
    featured: true,
  },
  {
    name: 'Business',
    price: '$1,999',
    period: '/month',
    description: 'For security-first organizations',
    features: [
      '50 GB/day log ingestion',
      '5,000 managed identities',
      '1-year data retention',
      'All 690+ connectors',
      'ITDR, JIT access, NHI governance',
      'SSO / SAML',
      'Overage: $3/GB + $1/identity',
      'Priority support (24/7)',
    ],
    btn: 'Start Free Trial',
    btnClass: 'primary',
    featured: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations with advanced needs',
    features: [
      'Unlimited log ingestion',
      'Unlimited identities',
      'Custom data retention',
      'All 690+ connectors',
      'Identity Fabric & Compliance-as-Code',
      'AI Access Copilot',
      'Dedicated CSM & SLA guarantee',
      'Volume discounts',
    ],
    btn: 'Contact Sales',
    btnClass: 'secondary',
    featured: false,
  },
  {
    name: 'MSSP',
    price: 'Custom',
    period: '',
    description: 'For managed security service providers',
    features: [
      'Multi-tenant management',
      'White-label branding',
      'Unlimited ingestion & identities',
      'Bulk licensing',
      'Partner portal',
      'Custom integrations',
      'Dedicated account manager',
    ],
    btn: 'Partner With Us',
    btnClass: 'secondary',
    featured: false,
  },
];

const comparisonRows = [
  {label: 'Pricing Model', values: ['Free', 'Per GB + Per Identity', 'Per GB + Per Identity', 'Custom', 'Custom']},
  {label: 'SIEM Log Ingestion', values: ['1 GB/day', '10 GB/day', '50 GB/day', 'Unlimited', 'Unlimited']},
  {label: 'Managed Identities (IGA)', values: ['25', '500', '5,000', 'Unlimited', 'Unlimited']},
  {label: 'Data Retention', values: ['7 days', '90 days', '1 year', 'Custom', 'Custom']},
  {label: 'Connectors', values: ['10', '100', '690+', '690+', '690+']},
  {label: 'Compliance Frameworks', values: ['1', '4', 'All', 'All', 'All']},
  {label: 'MITRE ATT&CK Mapping', values: ['—', '✓', '✓', '✓', '✓']},
  {label: 'ITDR & JIT Access', values: ['—', '—', '✓', '✓', '✓']},
  {label: 'NHI Governance', values: ['—', '—', '✓', '✓', '✓']},
  {label: 'Identity Fabric', values: ['—', '—', '—', '✓', '✓']},
  {label: 'AI Access Copilot', values: ['—', '—', '—', '✓', '✓']},
  {label: 'SSO / SAML', values: ['—', '—', '✓', '✓', '✓']},
  {label: 'API Access', values: ['100 req/min', '1,000 req/min', '5,000 req/min', '10,000 req/min', '10,000 req/min']},
  {label: 'Multi-Tenant', values: ['—', '—', '—', '—', '✓']},
  {label: 'White-Label', values: ['—', '—', '—', '—', '✓']},
  {label: 'Support', values: ['Community', 'Email & Chat', '24/7 Priority', 'Dedicated CSM', 'Dedicated CSM']},
];

export default function Pricing(): ReactNode {
  return (
    <Layout title="Pricing" description="ZPOA Shield pricing — SIEM + IGA in one platform">
      <div className="pricing-section">
        <div className="container">
          <h1>Simple, Usage-Based Pricing</h1>
          <p className="subtitle">
            Pay for what you use. SIEM priced by data volume, IGA priced by identities managed.
            <br />
            No per-seat fees. No hidden costs. Cancel anytime.
          </p>

          <div className="pricing-grid">
            {tiers.map((tier) => (
              <div
                className={`pricing-card${tier.featured ? ' featured' : ''}`}
                key={tier.name}>
                <h3>{tier.name}</h3>
                <div className="price">
                  {tier.price}
                  {tier.period && <span>{tier.period}</span>}
                </div>
                <p style={{fontSize: '0.9rem', opacity: 0.7}}>
                  {tier.description}
                </p>
                <ul className="features-list">
                  {tier.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link
                  className={`pricing-btn ${tier.btnClass}`}
                  to={
                    tier.name === 'Free' || tier.name === 'Pro' || tier.name === 'Business'
                      ? '/docs/getting-started/quick-start'
                      : 'mailto:info@zpoa.com'
                  }>
                  {tier.btn}
                </Link>
              </div>
            ))}
          </div>

          <div className="comparison-section" style={{marginTop: '4rem'}}>
            <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Full Feature Comparison</h2>
            <div style={{overflowX: 'auto'}}>
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    {tiers.map((tier) => (
                      <th key={tier.name}>{tier.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Price</strong></td>
                    {tiers.map((tier) => (
                      <td key={tier.name}>
                        <strong>{tier.price}</strong>{tier.period}
                      </td>
                    ))}
                  </tr>
                  {comparisonRows.map((row) => (
                    <tr key={row.label}>
                      <td>{row.label}</td>
                      {row.values.map((val, i) => (
                        <td key={`${row.label}-${tiers[i].name}`}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="savings-section" style={{marginTop: '3rem', textAlign: 'center', opacity: 0.8}}>
            <h3>Why ZPOA Shield?</h3>
            <p style={{maxWidth: '700px', margin: '1rem auto'}}>
              Most organizations pay separately for SIEM ($150+/GB/day) and IGA ($15+/identity/year).
              ZPOA Shield bundles both into a single platform starting at $499/month — saving 60-80% vs. buying point solutions.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
