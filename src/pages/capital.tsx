import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Redirect} from '@docusaurus/router';

// "Contact Sales" -> the "Get Started with Z Shield" page, which embeds the
// Calendly scheduler for booking a meeting. Relative: an absolute self-link
// leaves localhost in dev and forces a full page reload in production
// instead of client-side routing.
const GET_STARTED_URL = '/schedule';

// The live app itself: Ciya Micro Credit, branded here as ZPOA Capital.
// Requires a login, so this only ever appears as a "sign in" destination,
// never embedded or scraped for content on this page.
const APP_URL = 'https://cmc.hinisoft.com/loans';

const ICONS: Record<string, ReactNode> = {
  // team → centre/Kulu of people
  team: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8.5" cy="8" r="2.6" />
      <circle cx="16.5" cy="9.5" r="2.1" />
      <path d="M3.5 19c0-3 2.2-5.2 5-5.2s5 2.2 5 5.2 M14.5 19c0-2.3 1.5-4.2 3.6-4.9" />
    </svg>
  ),
  // customer → single person
  customer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20a6.5 6 0 0 1 13 0" />
    </svg>
  ),
  // pipeline → arrow through stages
  pipeline: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="4.5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19.5" cy="12" r="2" />
      <path d="M6.5 12h3.5 M14 12h3.5" />
    </svg>
  ),
  // portfolio → gauge
  portfolio: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18a8 8 0 0 1 16 0" />
      <path d="M12 18l4.5-5" />
      <circle cx="12" cy="18" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  // gps → map pin
  gps: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-7.2 7-12a7 7 0 0 0-14 0c0 4.8 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  ),
  // ledger → double-entry book
  ledger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M12 4v16 M7 9h2 M15 9h2 M7 13h2 M15 13h2" />
    </svg>
  ),
  // capital → coins / funding flow
  capital: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  ),
  // owner → shield / equity
  owner: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3z" />
    </svg>
  ),
  // investor → trending line
  investor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16l5-5 4 4 7-8" />
      <path d="M15 7h5v5" />
    </svg>
  ),
  // day-close → calendar check
  dayclose: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 9.5h17 M8 3v4 M16 3v4" />
      <path d="M8.5 14.5l2.2 2.2 4.3-4.3" />
    </svg>
  ),
  // key → single sign-on
  key: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l9-9 M17 6l3 3 M14 9l2 2" />
    </svg>
  ),
  // live → pulse
  live: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h4l2.5 7 4-14 2.5 7H21" />
    </svg>
  ),
  // split → separated funds
  split: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v6" />
      <path d="M12 9l-6 5v7 M12 9l6 5v7" />
      <circle cx="12" cy="3" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  // risk → eye
  risk: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="2.7" />
    </svg>
  ),
};

const lifecycle = [
  {
    n: 1,
    k: 'Set up',
    title: 'Form the borrower groups',
    body: 'Every loan sits inside a team, or “Kulu”, a joint-liability group with a leader, a collection centre, and a first-instalment date. This group structure is what makes repayment collective and predictable.',
  },
  {
    n: 2,
    k: 'Onboard',
    title: 'Add the borrowers',
    body: 'The customer record is the single source behind every application, loan, and collection, searchable by name, mobile, code, or team, with one-click export. Add a borrower once; it flows everywhere.',
  },
  {
    n: 3,
    k: 'Lend',
    title: 'Review, sanction and disburse',
    body: 'The application pipeline moves each loan through to review, awaiting disbursement, disbursed. Available company cash is shown up front, so you never disburse beyond the funds actually on hand.',
  },
  {
    n: 4,
    k: 'Monitor',
    title: 'Watch the live portfolio',
    body: 'Once disbursed, every loan rolls up into one portfolio view: total outstanding, collected, active vs overdue, and Portfolio-at-Risk %, the single number that tells you how healthy the book is, right now.',
  },
  {
    n: 5,
    k: 'Collect',
    title: 'Collect weekly, in the field',
    body: 'The daily-collection dashboard shows each group’s expected vs collected and a week-by-week schedule. Field officers record collections on the spot, with GPS-verified evidence, and print the day’s collection sheet.',
  },
  {
    n: 6,
    k: 'Reconcile',
    title: 'Every entry hits the books, automatically',
    body: 'Collections, disbursements, and expenses post to the general ledger as double-entry vouchers the moment they happen. Cash-in-hand, trial balance, and chart of accounts stay live.',
  },
];

const modules = [
  {
    icon: 'team',
    k: 'Field team',
    title: 'Staff Collection',
    body: 'What each field officer has collected and handed in, tracked against target.',
  },
  {
    icon: 'portfolio',
    k: 'Performance',
    title: 'Staff Analytics',
    body: 'Collection rates and productivity per officer, so managers can coach the team.',
  },
  {
    icon: 'capital',
    k: 'Money',
    title: 'Capital Management',
    body: 'One read-only financial view: capital sources, available pool, and loan deployment.',
  },
  {
    icon: 'owner',
    k: 'Equity',
    title: 'Owners',
    body: 'Owner capital and ownership value, tracked independently of investor funds.',
  },
  {
    icon: 'investor',
    k: 'Liability',
    title: 'Investors',
    body: 'Investor principal and ROI, reported separately so it never inflates owner equity.',
  },
  {
    icon: 'dayclose',
    k: 'Daily close',
    title: 'Expenses · Day Closing · Cash Handover',
    body: 'The daily reconciliation trio that matches the software to the cash box, record expenses, close the day, and hand over collected cash with a clear audit trail.',
  },
];

const whyChoose = [
  {
    icon: 'key',
    title: 'Whole operation, one login',
    body: 'Lending, field collection, staff, and full accounting, no spreadsheets stitched together after the fact.',
  },
  {
    icon: 'team',
    title: 'Group (Kulu) lending, built in',
    body: 'Teams, centres, leaders, and weekly schedules are first-class, not bolted on to a generic loan app.',
  },
  {
    icon: 'live',
    title: 'Live and automatic',
    body: 'Dashboards and the ledger update themselves the moment money moves. No manual re-keying, no month-end scramble.',
  },
  {
    icon: 'split',
    title: 'Owner and investor money never mixed',
    body: 'Investor liability is kept strictly separate from owner equity, the clean books auditors and investors expect.',
  },
  {
    icon: 'gps',
    title: 'Field-ready by design',
    body: 'Printable collection sheets, day closing, and cash handover match how the work actually happens on the ground.',
  },
  {
    icon: 'risk',
    title: 'Risk you can see',
    body: 'Portfolio-at-Risk %, overdue amounts, and collection efficiency are surfaced up front, before they become losses.',
  },
];

function CapitalHero(): ReactNode {
  return (
    <section className="cvpn-hero">
      <div className="container cvpn-hero-grid">
        <div className="cvpn-hero-copy">
          <div className="cvpn-eyebrow">ZPOA Capital</div>
          <h1>Run the entire lending operation from one console.</h1>
          <p className="cvpn-lede">
            Ciya Micro Credit, now on the ZPOA platform: group onboarding,
            loan disbursement, weekly field collection, staff performance,
            and the full set of books in a single live system, where every
            action updates the numbers automatically, so nothing is entered
            twice.
          </p>
          <div className="hero-buttons">
            <Link className="hero-btn-primary" to={APP_URL}>
              Sign in to ZPOA Capital
            </Link>
            <Link className="hero-btn-secondary" to={GET_STARTED_URL}>
              Contact Sales
            </Link>
          </div>
          <div className="cvpn-trust">
            <span className="cvpn-trust-label">Built for microfinance lenders</span>
            <div className="cvpn-trust-tags">
              <span>NBFC-MFI</span>
              <span>Group Lending</span>
              <span>Field Collections</span>
              <span>Accounting</span>
            </div>
          </div>
        </div>

        <div className="cvpn-status" aria-label="ZPOA Capital status panel">
          <div className="cvpn-status-head">
            <span className="cvpn-status-dot" />
            <strong>ZPOA Capital</strong>
            <span className="cvpn-status-sync">connected ledger</span>
          </div>
          <div className="cvpn-status-rows">
            <div><span>Capital pool</span><b className="ok">● Tracked</b></div>
            <div><span>Collections</span><b className="ok">● GPS-verified</b></div>
            <div><span>Day closing</span><b className="ok">● Reconciled</b></div>
            <div><span>Ledger</span><b>Double-entry, live</b></div>
            <div><span>Tenancy</span><b>Row-level isolation</b></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapitalLifecycle(): ReactNode {
  return (
    <section className="cvpn-section">
      <div className="container">
        <div className="cvpn-eyebrow" style={{textAlign: 'center'}}>The loan lifecycle</div>
        <h2 className="cvpn-h2-center">How a loan flows, end to end</h2>
        <p className="cvpn-sub cvpn-sub-center">
          Six stages, all in one place, from forming a borrower group to the
          entry landing in the general ledger. Each stage feeds the next
          automatically.
        </p>
        <div className="cvpn-flow">
          {lifecycle.map((s) => (
            <div className="cvpn-step" key={s.n}>
              <span className="cvpn-step-n">{s.n}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapitalModules(): ReactNode {
  return (
    <section className="cvpn-section cvpn-section-gray">
      <div className="container">
        <div className="cvpn-eyebrow" style={{textAlign: 'center'}}>Beyond the loan</div>
        <h2 className="cvpn-h2-center">The full operating system</h2>
        <p className="cvpn-sub cvpn-sub-center">
          Around the lifecycle sits everything that keeps a lender
          accountable, staff performance, capital, and a clean separation
          between owner and investor money.
        </p>
        <div className="cvpn-feature-grid">
          {modules.map((m) => (
            <div className="cvpn-feature" key={m.title}>
              <span className="cvpn-feature-ic" aria-hidden="true">{ICONS[m.icon]}</span>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapitalWhy(): ReactNode {
  return (
    <section className="cvpn-section">
      <div className="container">
        <div className="cvpn-eyebrow" style={{textAlign: 'center'}}>Why lenders choose it</div>
        <h2 className="cvpn-h2-center">One system instead of five</h2>
        <div className="cvpn-feature-grid">
          {whyChoose.map((w) => (
            <div className="cvpn-feature" key={w.title}>
              <span className="cvpn-feature-ic" aria-hidden="true">{ICONS[w.icon]}</span>
              <h3>{w.title}</h3>
              <p>{w.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapitalCTA(): ReactNode {
  return (
    <section className="cta-section">
      <div className="container">
        <h2>Run lending operations without the spreadsheet reconciliation.</h2>
        <p>Capital, loans, collections, and accounting, on one connected system.</p>
        <div className="hero-buttons">
          <Link className="hero-btn-primary" to={APP_URL}>
            Sign in to ZPOA Capital
          </Link>
          <Link className="hero-btn-secondary" to={GET_STARTED_URL}>
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}

function CapitalPage(): ReactNode {
  return (
    <Layout
      title="ZPOA Capital"
      description="ZPOA Capital: run the entire microfinance lending operation from one console, group onboarding, disbursement, weekly field collection, staff performance, and a live double-entry ledger.">
      <main>
        <CapitalHero />
        <CapitalLifecycle />
        <CapitalModules />
        <CapitalWhy />
        <CapitalCTA />
      </main>
    </Layout>
  );
}

// ZPOA Capital (Ciya Micro Credit) is India-only: NBFC-MFI lending isn't
// relevant outside that market. The pages plugin only discovers files under
// src/pages (an i18n-only override with no default-locale counterpart is
// never picked up), so this single file backs the route for every locale,
// and the non-India locales just redirect away instead of showing content.
export default function Capital(): ReactNode {
  const {i18n} = useDocusaurusContext();
  if (i18n.currentLocale !== 'en-in') {
    return <Redirect to="/all-products" />;
  }
  return <CapitalPage />;
}
