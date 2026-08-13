import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {price, unitPrice, RATES_REVIEWED} from '@site/src/lib/region';
import {useRegion} from '@site/src/lib/useRegion';
import RegionPicker from '@site/src/components/RegionPicker';

const tiers = [
  {
    name: 'Free',
    usd: 0,
    period: '/month',
    description: 'For small teams getting started with security',
    features: [
      '1 GB/day log ingestion',
      '25 managed identities',
      '7-day data retention',
      '690+ connectors',
      'All 8 modules (SIEM + IGA + AI)',
      'ITDR, JIT, NHI, SSO/SAML',
      'Community support',
    ],
    btn: 'Get Started',
    btnClass: 'secondary',
    featured: false,
  },
  {
    name: 'Pro',
    usd: 499,
    overage: {gb: 5, identity: 2},
    period: '/month',
    description: 'For growing security teams',
    features: [
      '10 GB/day log ingestion',
      '500 managed identities',
      '90-day data retention',
      '690+ connectors',
      'All 8 modules (SIEM + IGA + AI)',
      'ITDR, JIT, NHI, Identity Fabric',
      'Compliance frameworks (SOC 2, ISO)',
      'Email & chat support',
    ],
    btn: 'Start Free Trial',
    btnClass: 'primary',
    featured: true,
  },
  {
    name: 'Business',
    usd: 1999,
    overage: {gb: 3, identity: 1},
    period: '/month',
    description: 'For security-first organizations',
    features: [
      '50 GB/day log ingestion',
      '5,000 managed identities',
      '1-year data retention',
      '690+ connectors',
      'All security features included',
      'AI Access Copilot & Identity Fabric',
      'Priority support (24/7)',
    ],
    btn: 'Start Free Trial',
    btnClass: 'primary',
    featured: false,
  },
  {
    name: 'Enterprise',
    usd: null,
    period: '',
    description: 'For large organizations with advanced needs',
    features: [
      'Unlimited log ingestion',
      'Unlimited identities',
      'Custom data retention',
      '690+ connectors',
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
    usd: null,
    period: '',
    description: 'For managed security service providers',
    features: [
      'Multi-tenant management',
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
  {label: 'Connectors', values: ['690+', '690+', '690+', '690+', '690+']},
  {label: 'Compliance Frameworks', values: ['1', '4', 'All', 'All', 'All']},
  {label: 'MITRE ATT&CK Mapping', values: ['✓', '✓', '✓', '✓', '✓']},
  {label: 'ITDR & JIT Access', values: ['✓', '✓', '✓', '✓', '✓']},
  {label: 'NHI Governance', values: ['✓', '✓', '✓', '✓', '✓']},
  {label: 'Identity Fabric', values: ['✓', '✓', '✓', '✓', '✓']},
  {label: 'AI Access Copilot', values: ['✓', '✓', '✓', '✓', '✓']},
  {label: 'SSO / SAML', values: ['✓', '✓', '✓', '✓', '✓']},
  {label: 'API Access', values: ['100 req/min', '1,000 req/min', '5,000 req/min', '10,000 req/min', '10,000 req/min']},
  {label: 'Multi-Tenant', values: ['—', '—', '—', '—', '✓']},
  {label: 'Support', values: ['Community', 'Email & Chat', '24/7 Priority', 'Dedicated CSM', 'Dedicated CSM']},
];

export default function Pricing(): ReactNode {
  const {region} = useRegion();

  // Renders "$499" until the region resolves on the client, then swaps. Tiers
  // without a list price (Enterprise, MSSP) stay "Custom" in every region.
  const shown = (usd: number | null) => (usd === null ? 'Custom' : price(usd, region));

  return (
    <Layout title="Pricing" description="Z Shield pricing — SIEM + IGA in one platform">
      <div className="pricing-section">
        <div className="container">
          <h1>Simple, Usage-Based Pricing</h1>
          <p className="subtitle">
            Pay for what you use. SIEM priced by data volume, IGA priced by identities managed.
            <br />
            No per-seat fees. No hidden costs. Cancel anytime.
          </p>

          <RegionPicker inline />

          {region.code !== 'US' && (
            <p className="price-fx">
              Showing indicative prices in {region.currency} for {region.label}. Accounts are
              billed in USD; your bank applies its own rate at the time of payment.
              Conversion reviewed {RATES_REVIEWED}.
            </p>
          )}

          <div className="pricing-grid">
            {tiers.map((tier) => (
              <div
                className={`pricing-card${tier.featured ? ' featured' : ''}`}
                key={tier.name}>
                <h3>{tier.name}</h3>
                <div className="price">
                  {shown(tier.usd)}
                  {tier.period && <span>{tier.period}</span>}
                </div>
                {tier.overage && (
                  <p className="price-overage">
                    Overage {unitPrice(tier.overage.gb, region)}/GB
                    {' + '}{unitPrice(tier.overage.identity, region)}/identity
                  </p>
                )}
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
                    tier.name === 'Free'
                      ? '/signup?plan=free'
                      : tier.name === 'Pro'
                        ? '/signup?plan=pro'
                        : tier.name === 'Business'
                          ? '/signup?plan=business'
                          : tier.name === 'Enterprise'
                            ? '/schedule'
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
                        <strong>{shown(tier.usd)}</strong>{tier.period}
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
            <h3>Why Z Shield?</h3>
            <p style={{maxWidth: '700px', margin: '1rem auto'}}>
              Most organizations pay separately for SIEM ($150+/GB/day) and IGA ($15+/identity/month).
              Z Shield bundles both into a single platform starting at $499/month — saving 60-80% vs. buying point solutions.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
