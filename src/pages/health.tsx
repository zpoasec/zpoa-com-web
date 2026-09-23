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

// The live app itself, branded here as Ciyex HIMS. Requires a login, so
// this only ever appears as a "sign in" destination, never embedded or
// scraped for content on this page.
const APP_URL = 'https://ciyex.com/en-in/';

const ICONS: Record<string, ReactNode> = {
  // registration → id card
  registration: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="11" r="2" />
      <path d="M5.5 16c0-1.7 1.3-2.8 3-2.8s3 1.1 3 2.8" />
      <path d="M14 9.5h5 M14 13h5" />
    </svg>
  ),
  // queue → clipboard/clock
  queue: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4h6v2.4H9z" />
      <circle cx="12" cy="13.5" r="3.4" />
      <path d="M12 12v1.5l1.2 1.2" />
    </svg>
  ),
  // diagnose → stethoscope
  diagnose: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4v6a4 4 0 0 0 8 0V4" />
      <path d="M10 14v2a5 5 0 0 0 10 0v-2.5" />
      <circle cx="20" cy="10.5" r="1.6" />
    </svg>
  ),
  // treat → pill
  treat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="9.5" width="17" height="7" rx="3.5" transform="rotate(-35 12 13)" />
      <path d="M11 10.5l3 5" transform="rotate(-35 12 13)" />
    </svg>
  ),
  // bill → receipt
  bill: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.5z" />
      <path d="M8.5 8h7 M8.5 11.5h7 M8.5 15h4" />
    </svg>
  ),
  // discharge → door with arrow
  discharge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 4H6v16h7" />
      <path d="M11 12h9 M17 8.5l3.5 3.5-3.5 3.5" />
    </svg>
  ),
  // pharmacy → capsule bottle
  pharmacy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6v3.2l2 2.3V19a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8.5l2-2.3z" />
      <path d="M7.2 13h9.6" />
    </svg>
  ),
  // lab → flask
  lab: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3h4 M10.5 3v6.5L5.8 18a1.7 1.7 0 0 0 1.5 2.5h9.4a1.7 1.7 0 0 0 1.5-2.5L13.5 9.5V3" />
      <path d="M8.5 15h7" />
    </svg>
  ),
  // bloodbank → droplet
  bloodbank: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3s6.5 7.2 6.5 11.8A6.5 6.5 0 0 1 5.5 14.8C5.5 10.2 12 3 12 3z" />
    </svg>
  ),
  // ward → bed
  ward: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 15h18 M3 18v2 M21 18v2" />
      <circle cx="7.5" cy="8" r="1.8" />
    </svg>
  ),
  // ledger → accounts book
  ledger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M12 4v16 M7 9h2 M15 9h2 M7 13h2 M15 13h2" />
    </svg>
  ),
  // modules → grid toggle
  modules: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.4" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.4" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.4" />
      <path d="M15.5 17h5" />
    </svg>
  ),
  // abdm → shield link
  abdm: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3z" />
      <path d="M9.3 12l1.6 1.6 3.8-3.8" />
    </svg>
  ),
  // gst → rupee document
  gst: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8.5 8h7 M8.5 8v7l4-3.2 3 3.2" />
    </svg>
  ),
  // users → unlimited people
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8.5" cy="8" r="2.6" />
      <circle cx="16.5" cy="9.5" r="2.1" />
      <path d="M3.5 19c0-3 2.2-5.2 5-5.2s5 2.2 5 5.2 M14.5 19c0-2.3 1.5-4.2 3.6-4.9" />
    </svg>
  ),
};

const lifecycle = [
  {
    n: 1,
    k: 'Front desk',
    title: 'Register the patient once',
    body: 'Every visit starts with one UHID: registration, patient category, and ID card. That single record is what OPD, wards, billing, and every module downstream reads from, never re-entered.',
  },
  {
    n: 2,
    k: 'Queue',
    title: 'Appointment, token and OPD visit',
    body: 'Appointment booking, token generation, and the queue display board keep the front desk and the consulting room in sync, so patients see their place in line and doctors see who is next.',
  },
  {
    n: 3,
    k: 'Diagnose',
    title: 'Lab and radiology, ordered and reported',
    body: 'Sample collection, result entry, and lab billing on one side; radiology orders, reporting templates, and PACS integration on the other, both tied back to the same patient file.',
  },
  {
    n: 4,
    k: 'Treat',
    title: 'Admit, operate, dispense',
    body: 'IPD admission and bed allocation, OT scheduling with surgery notes, and pharmacy dispensing with batch and expiry tracking, all logged against the case sheet as they happen.',
  },
  {
    n: 5,
    k: 'Bill',
    title: 'Charges capture themselves',
    body: 'Every service, test, procedure, and drug posts its charge the moment it happens. Billing and cashier just reconcile receipts and refunds, GST and all, instead of re-keying a day’s worth of activity.',
  },
  {
    n: 6,
    k: 'Discharge',
    title: 'Close the case, keep the record',
    body: 'Discharge summary, final bill reconciliation, and deposit adjustment close the visit out, while the record itself stays in the patient’s file for the next one.',
  },
];

const modules = [
  {
    icon: 'pharmacy',
    k: 'Dispensing',
    title: 'Pharmacy',
    body: 'Drug master, batch and expiry tracking, dispensing, pharmacy billing and returns, in one counter workflow.',
  },
  {
    icon: 'lab',
    k: 'Diagnostics',
    title: 'Laboratory / LIS',
    body: 'Lab test master, sample collection, result entry and lab billing, from order to report.',
  },
  {
    icon: 'bloodbank',
    k: 'Transfusion',
    title: 'Blood Bank',
    body: 'Donor registry, blood stock, cross-matching and issue, tracked unit by unit.',
  },
  {
    icon: 'ward',
    k: 'Inpatient',
    title: 'Bed & Ward Management',
    body: 'Wards, room categories, bed master, allocation and a live occupancy board.',
  },
  {
    icon: 'ledger',
    k: 'Books',
    title: 'Accounts & Finance',
    body: 'Day book, cash and bank reconciliation, and ledger postings that stay current with every bill.',
  },
  {
    icon: 'users',
    k: 'People',
    title: 'HR & Payroll',
    body: 'Staff master, duty roster, attendance and payroll for the whole facility.',
  },
];

const whyChoose = [
  {
    icon: 'modules',
    title: '23 modules, switch on only what you run',
    body: 'A clinic with no theatre never sees an OT menu. Every module ships today; a facility only turns on the ones its own workflow needs.',
  },
  {
    icon: 'abdm',
    title: 'ABDM-ready out of the box',
    body: 'Connects straight to the Ayushman Bharat Digital Mission gateway, no separate integration project required.',
  },
  {
    icon: 'gst',
    title: 'Built for Indian billing',
    body: 'GST, Indian numbering formats, and an April-start financial year are the default, not a customisation.',
  },
  {
    icon: 'users',
    title: 'Unlimited users, one licence',
    body: 'Add every admin, doctor, and accountant the facility needs without paying a per-seat fee.',
  },
  {
    icon: 'registration',
    title: 'Built in the order a patient moves',
    body: 'A receptionist and a lab technician do not think in modules, so the software is laid out by where the work happens, front desk, patient care, departments, records, administration.',
  },
  {
    icon: 'ledger',
    title: 'One patient file, one set of numbers',
    body: 'Registration, treatment, and billing all read and write the same record, so the day-end numbers reconcile without a manual patch-up.',
  },
];

function HealthHero(): ReactNode {
  return (
    <section className="cvpn-hero">
      <div className="container cvpn-hero-grid">
        <div className="cvpn-hero-copy">
          <img
            className="cvpn-hero-logo"
            src="/img/products/health-logo.png"
            alt="Ciyex HIMS"
            width={72}
            height={72}
          />
          <div className="cvpn-eyebrow">Ciyex HIMS</div>
          <h1>Run the whole hospital on one system.</h1>
          <p className="cvpn-lede">
            Registration and the front-desk queue, OPD, casualty, wards and
            theatre, lab, radiology, pharmacy and blood bank, through to the
            final bill, the day book and the discharge summary, one system,
            one patient file, one set of numbers at day end.
          </p>
          <div className="hero-buttons">
            <Link className="hero-btn-primary" to={APP_URL}>
              Sign in to Ciyex HIMS
            </Link>
            <Link className="hero-btn-secondary" to={GET_STARTED_URL}>
              Contact Sales
            </Link>
          </div>
          <div className="cvpn-trust">
            <span className="cvpn-trust-label">Built for hospitals & clinics</span>
            <div className="cvpn-trust-tags">
              <span>Multi-Speciality</span>
              <span>OPD & IPD</span>
              <span>Pharmacy & Lab</span>
              <span>ABDM-Ready</span>
            </div>
          </div>
        </div>

        <div className="cvpn-status" aria-label="Ciyex HIMS status panel">
          <div className="cvpn-status-head">
            <span className="cvpn-status-dot" />
            <strong>Ciyex HIMS</strong>
            <span className="cvpn-status-sync">live patient record</span>
          </div>
          <div className="cvpn-status-rows">
            <div><span>Registration</span><b className="ok">● UHID issued</b></div>
            <div><span>Lab & radiology</span><b className="ok">● Reported</b></div>
            <div><span>Pharmacy</span><b className="ok">● Dispensed</b></div>
            <div><span>Billing</span><b>GST, reconciled</b></div>
            <div><span>Compliance</span><b>ABDM-ready</b></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HealthLifecycle(): ReactNode {
  return (
    <section className="cvpn-section">
      <div className="container">
        <div className="cvpn-eyebrow" style={{textAlign: 'center'}}>The patient journey</div>
        <h2 className="cvpn-h2-center">Built in the order a patient moves</h2>
        <p className="cvpn-sub cvpn-sub-center">
          Six stages, all in one system, from the front-desk token to the
          discharge summary. Each stage feeds the next automatically.
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

function HealthModules(): ReactNode {
  return (
    <section className="cvpn-section cvpn-section-gray">
      <div className="container">
        <div className="cvpn-eyebrow" style={{textAlign: 'center'}}>Beyond the visit</div>
        <h2 className="cvpn-h2-center">Everything a hospital runs on</h2>
        <p className="cvpn-sub cvpn-sub-center">
          Around the patient journey sits the rest of the facility, dispensing,
          diagnostics, inpatient care, and the books that keep it accountable.
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

function HealthWhy(): ReactNode {
  return (
    <section className="cvpn-section">
      <div className="container">
        <div className="cvpn-eyebrow" style={{textAlign: 'center'}}>Why hospitals choose it</div>
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

function HealthCTA(): ReactNode {
  return (
    <section className="cta-section">
      <div className="container">
        <h2>Run the hospital without the paper trail.</h2>
        <p>Registration, treatment, pharmacy, and billing, on one connected system.</p>
        <div className="hero-buttons">
          <Link className="hero-btn-primary" to={APP_URL}>
            Sign in to Ciyex HIMS
          </Link>
          <Link className="hero-btn-secondary" to={GET_STARTED_URL}>
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}

function HealthPage(): ReactNode {
  return (
    <Layout
      title="Ciyex HIMS"
      description="Ciyex HIMS: run the whole hospital on one system, registration, OPD and IPD, lab and radiology, pharmacy and blood bank, billing and discharge.">
      <main>
        <HealthHero />
        <HealthLifecycle />
        <HealthModules />
        <HealthWhy />
        <HealthCTA />
      </main>
    </Layout>
  );
}

// Ciyex HIMS is India-only: this hospital information system targets the
// Indian regulatory/billing environment specifically (ABDM, GST). The pages
// plugin only discovers files under src/pages (an i18n-only override with no
// default-locale counterpart is never picked up), so this single file backs
// the route for every locale, and the non-India locales just redirect away
// instead of showing content.
export default function Health(): ReactNode {
  const {i18n} = useDocusaurusContext();
  if (i18n.currentLocale !== 'en-in') {
    return <Redirect to="/all-products" />;
  }
  return <HealthPage />;
}
