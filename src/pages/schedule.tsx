import {useEffect, type ReactNode} from 'react';
import Layout from '@theme/Layout';

const CALENDLY_URL = 'https://calendly.com/zpoa-support/30min';

export default function Schedule(): ReactNode {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Layout title="Schedule a Demo" description="Schedule a free consultation with the Z Shield team">
      <div className="signup-section">
        <div className="container" style={{maxWidth: 900, padding: '3rem 1rem'}}>
          <div style={{textAlign: 'center', marginBottom: '2rem'}}>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(37,99,235,0.1)',
                color: '#2563eb',
                borderRadius: 999,
                padding: '0.35rem 1rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}>
              Free Consultation
            </span>
            <h1 style={{marginBottom: '0.75rem'}}>Get Started with Z Shield</h1>
            <p style={{opacity: 0.7, maxWidth: 640, margin: '0 auto'}}>
              Schedule a free consultation to see how Z Shield unifies your security operations.
              Our team will walk you through setup, features, and answer any questions.
            </p>
          </div>

          <div
            className="calendly-inline-widget"
            data-url={CALENDLY_URL}
            style={{minWidth: 320, height: 700}}
          />

          <noscript>
            <p style={{textAlign: 'center', marginTop: '1.5rem'}}>
              Please enable JavaScript, or{' '}
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                book a time directly on Calendly
              </a>
              .
            </p>
          </noscript>
        </div>
      </div>
    </Layout>
  );
}
