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
      'Up to 5 users',
      '1 GB/day log ingestion',
      '7-day data retention',
      '5 connectors',
      'Basic alerting',
      'Community support',
    ],
    btn: 'Get Started',
    btnClass: 'secondary',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/user/month',
    description: 'For growing security teams',
    features: [
      'Unlimited users',
      '10 GB/day log ingestion',
      '90-day data retention',
      '50 connectors',
      'All 6 modules',
      'SIGMA detection rules',
      'Compliance frameworks',
      'Email & chat support',
    ],
    btn: 'Start Free Trial',
    btnClass: 'primary',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations with advanced needs',
    features: [
      'Unlimited everything',
      'Custom data retention',
      '90+ connectors',
      'SSO / SAML',
      'Custom detection rules',
      'API access',
      'Dedicated support',
      'SLA guarantee',
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
      'Partner portal',
      'Bulk licensing',
      'Custom integrations',
      'Dedicated account manager',
      'Co-marketing support',
    ],
    btn: 'Partner With Us',
    btnClass: 'secondary',
    featured: false,
  },
];

export default function Pricing(): ReactNode {
  return (
    <Layout title="Pricing" description="ZPOA Shield pricing plans for teams of all sizes">
      <div className="pricing-section">
        <div className="container">
          <h1>Simple, Transparent Pricing</h1>
          <p className="subtitle">
            Start free. Scale as your security needs grow. No hidden fees.
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
                    tier.name === 'Free' || tier.name === 'Pro'
                      ? '/docs/getting-started/quick-start'
                      : 'mailto:info@zpoa.com'
                  }>
                  {tier.btn}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
