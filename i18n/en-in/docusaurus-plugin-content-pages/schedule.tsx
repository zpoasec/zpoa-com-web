import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

const CALENDLY_URL = 'https://calendly.com/zpoa-support/30min';
const WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js';

/**
 * Booking page.
 *
 * The embed used to be injected from a useEffect, which put three round trips
 * behind React: nothing about Calendly started until the page had downloaded,
 * parsed and hydrated the site bundle. Only then did the browser open a cold
 * connection to assets.calendly.com, and only once that script ran did it open
 * a second one to calendly.com for the iframe itself.
 *
 * Both of those are now started while the HTML is still being parsed:
 *
 *   preconnect  opens DNS + TCP + TLS to both origins up front, in parallel
 *               with the site bundle, so the sockets are already warm.
 *   the script  sits in <head>, so the preload scanner fetches it immediately
 *               instead of waiting for hydration.
 *
 * Loading the script that early is safe here for two reasons: the container
 * below is present in the pre-rendered HTML (this is a static site, so it is
 * not waiting on React to exist), and widget.js guards its own init on
 * document.readyState, deferring to DOMContentLoaded when it runs first.
 */
export default function Schedule(): ReactNode {
  return (
    <Layout title="Schedule a Demo" description="Schedule a free consultation with the Z Shield team">
      <Head>
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="preconnect" href="https://calendly.com" />
        {/* Fallback for browsers that ignore preconnect. */}
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <script src={WIDGET_JS} async />
      </Head>

      <div className="container" style={{maxWidth: 900, padding: '2.5rem 1rem 4rem'}}>
        <div style={{textAlign: 'center', marginBottom: '1.25rem'}}>
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
          <p className="schedule-subtitle" style={{marginBottom: 0}}>
            Schedule a free consultation to see how Z Shield unifies your security operations.
            Our team will walk you through setup, features, and answer any questions.
          </p>
        </div>

        {/*
          The placeholder is a sibling rather than a child, so it cannot
          interfere with what Calendly does inside its own container, and it
          ships in the pre-rendered HTML so it is visible immediately. CSS
          hides it the moment the iframe lands.
        */}
        <div className="cal-wrap">
          <div className="cal-loading" aria-hidden="true">
            <span className="cal-spinner" />
            <p>Loading available times</p>
          </div>
          <div
            className="calendly-inline-widget"
            data-url={CALENDLY_URL}
            style={{minWidth: 320, height: 1150}}
          />
        </div>

        {/*
          Always visible, not a timeout fallback: privacy browsers and tracker
          blockers routinely block the embed outright, and a visitor who came
          here to book a call should never hit a dead end.
        */}
        <p className="cal-direct">
          Not loading?{' '}
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            Book a time directly on Calendly
          </a>
          .
        </p>
      </div>
    </Layout>
  );
}
