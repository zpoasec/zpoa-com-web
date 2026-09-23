import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Redirect} from '@docusaurus/router';

// "Contact Sales" -> the "Get Started with Z Shield" page, which embeds the
// Calendly scheduler for booking a meeting. Relative: an absolute self-link
// leaves localhost in dev and forces a full page reload in production
// instead of client-side routing.
const GET_STARTED_URL = '/schedule';

// The live app itself: Ciya Micro Credit, branded here as FinTech Solutions.
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
  // expense → receipt
  expense: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12v18l-3-1.6-3 1.6-3-1.6-3 1.6V3z" />
      <path d="M9 8.5h6 M9 12.5h6" />
    </svg>
  ),
  // report → bar chart
  report: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V10 M10 20V4 M16 20v-8 M3 20h18" />
    </svg>
  ),
  // card → unsecured retail credit
  card: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18 M7 14.5h4" />
    </svg>
  ),
  // home → secured & high-value loans
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11l8-6 8 6" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </svg>
  ),
  // briefcase → business & micro-enterprise lending
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7.5" width="18" height="11.5" rx="2" />
      <path d="M8 7.5V6a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 16 6v1.5" />
      <path d="M3 12.5h18" />
    </svg>
  ),
  // books → accounting ledger
  books: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6.2C10.2 5 7.8 4.6 5.3 4.9A1 1 0 0 0 4.5 5.9v11.2a1 1 0 0 0 1.1 1c2.3-.3 4.6.1 6.4 1.2 1.8-1.1 4.1-1.5 6.4-1.2a1 1 0 0 0 1.1-1V5.9a1 1 0 0 0-.8-1C16.2 4.6 13.8 5 12 6.2z" />
      <path d="M12 6.2V19" />
    </svg>
  ),
  // invoice → tax invoice document
  invoice: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M15 3v3h3" />
      <path d="M9 12h6 M9 15.5h4" />
    </svg>
  ),
  // billing → recurring cycle
  billing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 12a7.5 7.5 0 0 1 12.3-5.8" />
      <path d="M19.5 12a7.5 7.5 0 0 1-12.3 5.8" />
      <path d="M17 3.5V6.4h-2.9 M7 20.5v-2.9h2.9" />
    </svg>
  ),
  // asset → cube / fixed asset
  asset: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 4.5v9L12 21 4 16.5v-9L12 3z" />
      <path d="M4 7.5l8 4.5 8-4.5 M12 12v9" />
    </svg>
  ),
  // tax → percent
  tax: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 17.5L17.5 6.5" />
      <circle cx="7.75" cy="7.75" r="2.25" />
      <circle cx="16.25" cy="16.25" r="2.25" />
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
    icon: 'gps',
    k: 'Verification',
    title: 'Evidence + GPS',
    body: 'Photo verification before every collection, image, time, latitude/longitude, and address attached, turning a photo into a proof-of-visit record.',
    details: [
      'Every field collection captures a photo, exact timestamp, and GPS coordinates automatically, no manual entry required.',
      'The address is reverse-geocoded from the coordinates, so the record reads as a real location, not just a pair of numbers.',
      'Evidence attaches directly to the collection entry, so a disputed payment has proof-of-visit alongside the ledger entry.',
    ],
  },
  {
    icon: 'team',
    k: 'Field team',
    title: 'Staff Collection',
    body: 'What each field officer has collected and handed in, tracked against target.',
    details: [
      "Each field officer's collected amount is tracked in real time against their assigned target for the day and week.",
      'Collections roll up by team, centre, and individual officer, so shortfalls are visible before day close.',
      'Handover of collected cash links back to the officer who collected it, keeping accountability intact end to end.',
    ],
  },
  {
    icon: 'portfolio',
    k: 'Performance',
    title: 'Staff Analytics',
    body: 'Collection rates and productivity per officer, so managers can coach the team.',
    details: [
      'Collection rate, on-time rate, and visits completed are computed per officer, not just totalled for the branch.',
      "Managers get a ranked view of the team, useful for coaching conversations rather than just a scoreboard.",
      "Trends over time show whether an officer's performance is improving, steady, or slipping.",
    ],
  },
  {
    icon: 'customer',
    k: 'People',
    title: 'Field-Officer Management',
    body: 'Employees with roles, branches, and assigned teams; active/inactive status, with history retained for audit after they leave.',
    details: [
      'Every officer record carries a role, assigned branch, and the teams or centres they are responsible for.',
      'Active/inactive status controls what an officer can do today, without deleting their history.',
      'Past collections and audit trail stay attached to the officer record even after they leave, for compliance review.',
    ],
  },
  {
    icon: 'capital',
    k: 'Money',
    title: 'Capital Management',
    body: 'One read-only financial view: capital sources, available pool, and loan deployment.',
    details: [
      'A single read-only view rolls up where capital comes from, owner and investor, and where it currently sits.',
      "Available pool reflects funds actually on hand, so lending decisions aren't made against money that isn't there yet.",
      'Loan deployment shows how much of the pool is currently out on active loans versus sitting idle.',
    ],
  },
  {
    icon: 'owner',
    k: 'Equity',
    title: 'Owners',
    body: 'Owner capital and ownership value, tracked independently of investor funds.',
    details: [
      'Owner capital contributions and current ownership value are tracked as their own ledger, separate from operations.',
      'Owner equity never mixes with investor principal, so a snapshot of what the owners actually hold stays accurate.',
      'Historical contributions and withdrawals are retained, giving a full picture of owner capital over time.',
    ],
  },
  {
    icon: 'investor',
    k: 'Liability',
    title: 'Investors',
    body: 'Investor principal and ROI, reported separately so it never inflates owner equity.',
    details: [
      "Investor principal and the return owed to them are tracked separately from owner equity, by design.",
      "Because investor liability is kept distinct, it never inadvertently inflates the owner's equity position.",
      "Each investor's position can be reported independently, useful when there's more than one funding source.",
    ],
  },
  {
    icon: 'ledger',
    k: 'Accounting',
    title: 'General Ledger',
    body: 'Every module posts here as double-entry vouchers, live cash, trial balance, and chart of accounts.',
    details: [
      'Every module, collections, disbursements, expenses, writes here automatically as a double-entry voucher.',
      'Cash-in-hand, trial balance, and the chart of accounts update the moment the underlying event happens.',
      "Because posting is automatic, the books can't drift out of sync with what actually happened in the field.",
    ],
  },
  {
    icon: 'expense',
    k: 'Costs',
    title: 'Expenses',
    body: 'Expense log and dashboard with employee monthly summaries, feeding straight into profitability.',
    details: [
      'Expenses are logged against categories and, where relevant, individual employees.',
      'A monthly summary view rolls expenses up by employee and category for quick review.',
      'Expense entries feed directly into the general ledger and profitability reporting, no separate reconciliation step.',
    ],
  },
  {
    icon: 'dayclose',
    k: 'Reconcile',
    title: 'Day Closing & Cash Handover',
    body: 'Count physical cash, reconcile the difference, and control handover → verification → close, matching the software to the cash box.',
    details: [
      'Physical cash is counted and reconciled against what the system expects for the day.',
      'Any difference is flagged before close, rather than surfacing days later during a wider reconciliation.',
      'Handover moves through a clear sequence, handover, verification, close, so responsibility for cash is never ambiguous.',
    ],
  },
  {
    icon: 'report',
    k: 'Oversight',
    title: 'Reports & Analytics',
    body: 'Management reporting computed from the same source as every module, so the numbers never disagree.',
    details: [
      'Every report is computed from the same underlying data as the day-to-day modules, not a separate export.',
      "Because there's one source of truth, management numbers and operational numbers can't disagree with each other.",
      'Reports can be pulled at the portfolio, branch, or officer level depending on what is being reviewed.',
    ],
  },
];

const whyChoose = [
  {
    icon: 'key',
    title: 'Whole operation, one login',
    body: 'Lending, field collection, staff, and full accounting, no spreadsheets stitched together after the fact.',
  },
  {
    icon: 'live',
    title: 'Live and automatic',
    body: 'Dashboards and the ledger update themselves the moment money moves. No manual re-keying, no month-end scramble.',
  },
  {
    icon: 'ledger',
    title: 'Operations and accounting stay in sync',
    body: 'A single collection updates repayment, loan balance, ledger, and capital together, one connected source of truth.',
  },
  {
    icon: 'team',
    title: 'Group (Kulu) lending, built in',
    body: 'Teams, centres, leaders, and weekly schedules are first-class, not bolted on to a generic loan app.',
  },
  {
    icon: 'split',
    title: 'Owner and investor money never mixed',
    body: 'Investor liability is kept strictly separate from owner equity, the clean books auditors and investors expect.',
  },
  {
    icon: 'gps',
    title: 'Field-ready by design',
    body: 'GPS + photo evidence, printable collection sheets, day closing, and cash handover match how the work actually happens on the ground.',
  },
  {
    icon: 'dayclose',
    title: 'Physical-cash control',
    body: 'Handover → verification → day-close reconciliation catches shortfalls the same day, not next month.',
  },
  {
    icon: 'risk',
    title: 'Risk you can see',
    body: 'Portfolio-at-Risk %, overdue amounts, and collection efficiency are surfaced up front, before they become losses.',
  },
  {
    icon: 'customer',
    title: 'Accountability and audit trail',
    body: 'Per-officer performance and GPS-stamped evidence records, with history retained even after a staff member leaves.',
  },
  {
    icon: 'report',
    title: 'Payroll and billing ready',
    body: 'Staff summaries and exports feed payroll and reconciliation without extra work.',
  },
];

const loanCategories = [
  {
    icon: 'card',
    title: 'Unsecured Retail Credit',
    tag: 'Consumer',
    items: [
      'Instant personal loans',
      'Buy Now, Pay Later (BNPL)',
      'Consumer durable financing',
    ],
  },
  {
    icon: 'home',
    title: 'Secured & High-Value Loans',
    tag: 'Asset-backed',
    items: [
      'Home loans and balance transfers',
      'Loan Against Property (LAP)',
      'Automotive and two-wheeler financing',
      'Gold loans',
    ],
  },
  {
    icon: 'briefcase',
    title: 'Business & Micro-Enterprise Lending',
    tag: 'Enterprise',
    items: [
      'Working capital and SME loans',
      'Invoice and supply-chain financing',
      'Microfinance (MFI) and Joint Liability Groups',
    ],
  },
];

function CapitalLoanCategories(): ReactNode {
  return (
    <section className="cvpn-section cvpn-section-gray">
      <div className="container">
        <div className="cvpn-eyebrow" style={{textAlign: 'center'}}>Across every loan category</div>
        <h2 className="cvpn-h2-center">One platform, every kind of lending</h2>
        <p className="cvpn-sub cvpn-sub-center">
          Built on a modern loan-management and origination engine, API
          integrations, automated underwriting, and alternative-data scoring
          let a single platform serve credit across every segment.
        </p>
        <div className="cvpn-cap-chips">
          <span className="cvpn-cap-chip">API integrations</span>
          <span className="cvpn-cap-chip">Automated underwriting</span>
          <span className="cvpn-cap-chip">Alternative-data scoring</span>
        </div>
        <div className="cvpn-loancat-grid">
          {loanCategories.map((c) => (
            <div className="cvpn-loancat" key={c.title}>
              <div className="cvpn-loancat-head">
                <span className="cvpn-feature-ic" aria-hidden="true">{ICONS[c.icon]}</span>
                <span className="cvpn-loancat-tag">{c.tag}</span>
              </div>
              <h3>{c.title}</h3>
              <ul className="cvpn-loancat-list">
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const financeSuite = [
  {
    icon: 'books',
    name: 'ZPOA Books',
    tag: 'Accounting',
    body: 'The general ledger at the centre of everything: expenses, receivables, and income streams all post here, with a controlled period close that locks each month once it is reconciled.',
  },
  {
    icon: 'invoice',
    name: 'ZPOA Invoice',
    tag: 'Sales invoicing',
    body: 'Raise sales invoices and compliant tax invoices, with the right tax treatment applied automatically and every invoice flowing straight through to the books.',
  },
  {
    icon: 'billing',
    name: 'ZPOA Billing',
    tag: 'Recurring revenue',
    body: 'Recurring billing schedules paired with revenue recognition, so subscription and instalment income is earned over its term rather than booked all at once.',
  },
  {
    icon: 'asset',
    name: 'ZPOA Assets',
    tag: 'Fixed assets',
    body: 'A fixed-asset register that runs depreciation on schedule and tracks insurance cover against each asset, keeping the balance sheet accurate and audit-ready.',
  },
  {
    icon: 'tax',
    name: 'ZPOA Tax',
    tag: 'Statutory',
    body: 'Statutory filing with the tax positions behind each return retained, so every figure filed traces back to the transactions that produced it.',
  },
  {
    icon: 'expense',
    name: 'ZPOA Expense',
    tag: 'Claims & travel',
    body: 'Employee expense claims, advances, travel requests, and final settlement, reconciled against the ledger and ready for payroll without re-keying.',
  },
];

function CapitalFinanceSuite(): ReactNode {
  return (
    <section className="cvpn-section">
      <div className="container">
        <div className="cvpn-eyebrow" style={{textAlign: 'center'}}>The ZPOA finance suite</div>
        <h2 className="cvpn-h2-center">A full finance back office, module by module</h2>
        <p className="cvpn-sub cvpn-sub-center">
          Beyond lending, ZPOA runs the accounting that sits behind it. Books,
          invoicing, billing, assets, tax, and expenses, each a focused module
          that posts back to the same ledger, so the numbers reconcile
          themselves.
        </p>
        <div className="cvpn-suite-grid">
          {financeSuite.map((m) => (
            <div className="cvpn-suite-card" key={m.name}>
              <div className="cvpn-loancat-head">
                <span className="cvpn-feature-ic" aria-hidden="true">{ICONS[m.icon]}</span>
                <span className="cvpn-loancat-tag">{m.tag}</span>
              </div>
              <h3>{m.name}</h3>
              <p>{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapitalHeroArt(): ReactNode {
  return (
    <svg
      className="cvpn-hero-finart"
      viewBox="0 0 900 600"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMaxYMid slice">
      {/* dot grid */}
      <g fill="#FFFFFF" opacity="0.16">
        {Array.from({length: 8}).map((_, row) =>
          Array.from({length: 10}).map((_, col) => (
            <circle key={`${row}-${col}`} cx={520 + col * 34} cy={70 + row * 34} r="2" />
          ))
        )}
      </g>
      {/* large outlined rupee coin */}
      <circle cx="760" cy="430" r="170" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="2" />
      <circle cx="760" cy="430" r="128" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="1.5" />
      <text
        x="760" y="460" textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif" fontSize="150" fontWeight="700"
        fill="#FFFFFF" opacity="0.1">
        &#8377;
      </text>
      {/* ascending growth trace */}
      <path
        d="M420 470 L520 400 L600 440 L700 320 L800 360 L870 250"
        stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      />
      <g fill="#FFFFFF" opacity="0.4">
        <circle cx="420" cy="470" r="4" />
        <circle cx="520" cy="400" r="4" />
        <circle cx="600" cy="440" r="4" />
        <circle cx="700" cy="320" r="4" />
        <circle cx="800" cy="360" r="4" />
        <circle cx="870" cy="250" r="5" />
      </g>
      {/* faint ledger lines */}
      <g stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="2">
        <line x1="380" y1="90" x2="540" y2="90" />
        <line x1="380" y1="120" x2="500" y2="120" />
        <line x1="380" y1="150" x2="520" y2="150" />
      </g>
    </svg>
  );
}

function CapitalHero(): ReactNode {
  return (
    <section className="cvpn-hero cvpn-hero--capital">
      <CapitalHeroArt />
      <div className="container cvpn-hero-grid">
        <div className="cvpn-hero-copy">
          <img
            className="cvpn-hero-logo"
            src="/img/products/capital-logo.png"
            alt="FinTech Solutions"
            width={72}
            height={72}
          />
          <div className="cvpn-eyebrow">FinTech Solutions</div>
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
              Sign in to FinTech Solutions
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

        <div className="cvpn-status-wrap">
          <div className="cvpn-status" aria-label="FinTech Solutions status panel">
            <div className="cvpn-status-head">
              <span className="cvpn-status-dot" />
              <strong>FinTech Solutions</strong>
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
          <CapitalCoinBadge />
          <CapitalGraphBadge />
        </div>
      </div>
    </section>
  );
}

function CapitalCoinBadge(): ReactNode {
  return (
    <svg className="cvpn-hero-coin" viewBox="0 0 140 140" aria-hidden="true">
      <defs>
        <linearGradient id="coinBack" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="coinFront" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FEF3C7" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <circle cx="58" cy="86" r="40" fill="url(#coinBack)" opacity="0.85" />
      <circle cx="72" cy="66" r="46" fill="url(#coinFront)" stroke="#FFFFFF" strokeWidth="4" />
      <circle cx="72" cy="66" r="33" fill="none" stroke="#FFFFFF" strokeWidth="1.6" opacity="0.6" />
      <text
        x="72" y="80" textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif" fontSize="38" fontWeight="800"
        fill="#7C4A03">
        &#8377;
      </text>
    </svg>
  );
}

function CapitalGraphBadge(): ReactNode {
  return (
    <svg className="cvpn-hero-graph" viewBox="0 0 176 108" aria-hidden="true">
      <rect x="1" y="1" width="174" height="106" rx="16" fill="#FFFFFF" stroke="rgba(15,23,42,0.08)" />
      <text x="16" y="26" fontFamily="inherit" fontSize="11" fontWeight="700" fill="#94A3B8">
        PORTFOLIO GROWTH
      </text>
      <g stroke="#D1FAE5" strokeWidth="1">
        <line x1="16" y1="40" x2="160" y2="40" />
        <line x1="16" y1="60" x2="160" y2="60" />
        <line x1="16" y1="80" x2="160" y2="80" />
      </g>
      <g fill="#6EE7B7">
        <rect x="20" y="66" width="14" height="24" rx="2" />
        <rect x="46" y="56" width="14" height="34" rx="2" />
        <rect x="72" y="48" width="14" height="42" rx="2" />
      </g>
      <g fill="#0D9488">
        <rect x="98" y="38" width="14" height="52" rx="2" />
        <rect x="124" y="28" width="14" height="62" rx="2" />
      </g>
      <path
        d="M27 62 L53 50 L79 42 L105 32 L131 22"
        stroke="#0D9488" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      <path d="M124 22 L131 22 L131 29" stroke="#0D9488" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CapitalBarChart(): ReactNode {
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const disbursed = [58, 66, 70, 80, 88, 96];
  const collected = [50, 60, 64, 74, 82, 92];
  const maxV = 100;
  const groupW = 84;
  const chartH = 170;
  return (
    <svg className="cvpn-dash-bars" viewBox="0 0 560 210" aria-hidden="true">
      <g stroke="#EEF2F1" strokeWidth="1">
        <line x1="0" y1="10" x2="560" y2="10" />
        <line x1="0" y1="63" x2="560" y2="63" />
        <line x1="0" y1="116" x2="560" y2="116" />
        <line x1="0" y1="169" x2="560" y2="169" />
      </g>
      {months.map((m, i) => {
        const x = i * groupW + 22;
        const hD = (disbursed[i] / maxV) * chartH;
        const hC = (collected[i] / maxV) * chartH;
        return (
          <g key={m}>
            <rect x={x} y={169 - hD} width="18" height={hD} rx="3" fill="#99F6E4" />
            <rect x={x + 22} y={169 - hC} width="18" height={hC} rx="3" fill="#0D9488" />
            <text x={x + 20} y="192" textAnchor="middle" fontSize="12" fill="#94A3B8">{m}</text>
          </g>
        );
      })}
    </svg>
  );
}

function CapitalDonutChart(): ReactNode {
  const r = 54;
  const c = 2 * Math.PI * r;
  const ownerShare = 0.65;
  return (
    <svg className="cvpn-dash-donut" viewBox="0 0 160 160" aria-hidden="true">
      <circle cx="80" cy="80" r={r} fill="none" stroke="#E2E8F0" strokeWidth="22" />
      <circle
        cx="80" cy="80" r={r} fill="none" stroke="#0D9488" strokeWidth="22"
        strokeDasharray={`${c * ownerShare} ${c}`}
        strokeLinecap="round"
        transform="rotate(-90 80 80)"
      />
      <text x="80" y="76" textAnchor="middle" fontSize="26" fontWeight="800" fill="#0F172A">65%</text>
      <text x="80" y="96" textAnchor="middle" fontSize="11" fill="#94A3B8">Owner capital</text>
    </svg>
  );
}

function CapitalDashboardShowcase(): ReactNode {
  return (
    <section className="cvpn-section cvpn-section-gray">
      <div className="container">
        <div className="cvpn-eyebrow" style={{textAlign: 'center'}}>See it in action</div>
        <h2 className="cvpn-h2-center">One dashboard, the whole operation</h2>
        <p className="cvpn-sub cvpn-sub-center">
          An illustrative view of what a lender sees every morning, portfolio
          health, collections, and capital, all in one place.
        </p>
        <div className="cvpn-dash">
          <div className="cvpn-dash-bar">
            <span className="cvpn-dash-dot cvpn-dash-dot--r" />
            <span className="cvpn-dash-dot cvpn-dash-dot--y" />
            <span className="cvpn-dash-dot cvpn-dash-dot--g" />
            <span className="cvpn-dash-title">FinTech Solutions &mdash; Portfolio Overview</span>
          </div>
          <div className="cvpn-dash-body">
            <div className="cvpn-dash-stats">
              <div className="cvpn-dash-stat">
                <span className="cvpn-dash-stat-label">Total Portfolio</span>
                <span className="cvpn-dash-stat-value">&#8377;2.4 Cr</span>
                <span className="cvpn-dash-stat-delta cvpn-dash-stat-delta--up">&#9650; 8.2%</span>
              </div>
              <div className="cvpn-dash-stat">
                <span className="cvpn-dash-stat-label">Collection Rate</span>
                <span className="cvpn-dash-stat-value">96.4%</span>
                <span className="cvpn-dash-stat-delta cvpn-dash-stat-delta--up">&#9650; 1.1%</span>
              </div>
              <div className="cvpn-dash-stat">
                <span className="cvpn-dash-stat-label">Active Loans</span>
                <span className="cvpn-dash-stat-value">1,240</span>
                <span className="cvpn-dash-stat-delta cvpn-dash-stat-delta--up">&#9650; 64</span>
              </div>
              <div className="cvpn-dash-stat">
                <span className="cvpn-dash-stat-label">Portfolio at Risk</span>
                <span className="cvpn-dash-stat-value">1.8%</span>
                <span className="cvpn-dash-stat-delta cvpn-dash-stat-delta--down">&#9660; 0.3%</span>
              </div>
            </div>
            <div className="cvpn-dash-charts">
              <div className="cvpn-dash-chart-card">
                <div className="cvpn-dash-chart-head">
                  <span>Disbursed vs Collected</span>
                  <div className="cvpn-dash-legend">
                    <span><i className="cvpn-dash-dot-legend cvpn-dash-dot-legend--a" />Disbursed</span>
                    <span><i className="cvpn-dash-dot-legend cvpn-dash-dot-legend--b" />Collected</span>
                  </div>
                </div>
                <CapitalBarChart />
              </div>
              <div className="cvpn-dash-donut-card">
                <div className="cvpn-dash-chart-head"><span>Capital Split</span></div>
                <CapitalDonutChart />
                <div className="cvpn-dash-donut-legend">
                  <span><i className="cvpn-dash-dot-legend cvpn-dash-dot-legend--owner" />Owner &middot; 65%</span>
                  <span><i className="cvpn-dash-dot-legend cvpn-dash-dot-legend--investor" />Investor &middot; 35%</span>
                </div>
              </div>
            </div>
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

function ModuleDetailModal({
  module: m,
  onClose,
}: {
  module: (typeof modules)[number];
  onClose: () => void;
}): ReactNode {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="cvpn-modal-backdrop" onClick={onClose}>
      <div
        className="cvpn-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cvpn-modal-title"
        onClick={(e) => e.stopPropagation()}>
        <button className="cvpn-modal-close" aria-label="Close" onClick={onClose}>
          &times;
        </button>
        <span className="cvpn-feature-ic" aria-hidden="true">{ICONS[m.icon]}</span>
        <div className="cvpn-modal-kicker">{m.k}</div>
        <h3 id="cvpn-modal-title">{m.title}</h3>
        <p className="cvpn-modal-lede">{m.body}</p>
        <ul className="cvpn-modal-details">
          {m.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CapitalModules(): ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
          {modules.map((m, i) => (
            <button
              type="button"
              className="cvpn-feature cvpn-feature--clickable"
              key={m.title}
              onClick={() => setOpenIndex(i)}>
              <span className="cvpn-feature-ic" aria-hidden="true">{ICONS[m.icon]}</span>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
              <span className="cvpn-feature-more">View details &rarr;</span>
            </button>
          ))}
        </div>
      </div>
      {openIndex !== null && (
        <ModuleDetailModal module={modules[openIndex]} onClose={() => setOpenIndex(null)} />
      )}
    </section>
  );
}

function CapitalWhy(): ReactNode {
  return (
    <section className="cvpn-section">
      <div className="container">
        <div className="cvpn-eyebrow" style={{textAlign: 'center'}}>Why lenders choose it</div>
        <h2 className="cvpn-h2-center">The benefits</h2>
        <div className="cvpn-benefits-grid">
          {whyChoose.map((w) => (
            <div className="cvpn-benefit" key={w.title}>
              <span className="cvpn-benefit-check" aria-hidden="true">&#10003;</span>
              <div>
                <h4>{w.title}</h4>
                <p>{w.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cvpn-btable-label">Quick reference</div>
        <div className="cvpn-btable-wrap">
          <table className="cvpn-btable">
            <thead>
              <tr>
                <th scope="col">Benefit</th>
                <th scope="col">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {whyChoose.map((w) => (
                <tr key={w.title}>
                  <th scope="row">{w.title}</th>
                  <td>{w.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
            Sign in to FinTech Solutions
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
      title="FinTech Solutions"
      description="FinTech Solutions: run the entire microfinance lending operation from one console, group onboarding, disbursement, weekly field collection, staff performance, and a live double-entry ledger.">
      <main>
        <CapitalHero />
        <CapitalDashboardShowcase />
        <CapitalFinanceSuite />
        <CapitalLoanCategories />
        <CapitalLifecycle />
        <CapitalModules />
        <CapitalWhy />
        <CapitalCTA />
      </main>
    </Layout>
  );
}

// FinTech Solutions (Ciya Micro Credit) is India-only: NBFC-MFI lending isn't
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
