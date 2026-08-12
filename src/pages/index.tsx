import {useEffect, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {ModuleIcon, ProblemIcon, CheckIcon, Arrow} from '../components/icons';

// ── Content ────────────────────────────────────────────────────────────────

const problems = [
  {
    icon: 'stack' as const,
    title: 'Ten tools, ten blind spots',
    body: 'Your SIEM cannot see identity. Your IGA cannot see the cloud. The attack lives in the seams between them, and every seam is a context switch for the analyst on call.',
  },
  {
    icon: 'identity' as const,
    title: 'Machines outnumber people',
    body: 'Service accounts, CI tokens, and AI agents now hold more standing access than your employees do — and almost none of it is reviewed, rotated, or attributed to an owner.',
  },
  {
    icon: 'ai' as const,
    title: 'AI adoption outran approval',
    body: 'Source code goes into copilots and customer records into chat assistants. Traditional DLP was built for files and endpoints, not for prompts.',
  },
];

const modules = [
  {
    id: 'detect',
    name: 'Detect',
    kicker: 'SIEM',
    body: 'Sigma-compatible rules across simple, threshold, and multi-stage correlation logic, with MITRE ATT&CK mapping on every alert.',
    href: '/features#detect',
  },
  {
    id: 'comply',
    name: 'Comply',
    kicker: 'GRC',
    body: 'Scheduled evidence collection from AWS, Okta, and GitHub, live drift detection, and cross-framework inheritance across SOC 2, ISO 27001, PCI-DSS, and HIPAA.',
    href: '/features#comply',
  },
  {
    id: 'discover',
    name: 'Discover',
    kicker: 'Attack Surface',
    body: 'Continuous asset and subdomain discovery with vulnerability risk scored on CVSS, EPSS exploit probability, CISA KEV membership, and asset criticality together.',
    href: '/features#discover',
  },
  {
    id: 'armor',
    name: 'Armor',
    kicker: 'Cloud Posture',
    body: 'CIS Benchmark evaluation across AWS, Azure, and GCP — plus attack-path analysis that chains single misconfigurations into the routes an attacker would actually take.',
    href: '/features#armor',
  },
  {
    id: 'fortress',
    name: 'Fortress',
    kicker: 'Identity Governance',
    body: 'Full IGA: joiner-mover-leaver automation, access reviews, SoD simulation, just-in-time elevation, and non-human identity governance across 690+ connectors.',
    href: '/features#fortress',
  },
  {
    id: 'monitor',
    name: 'Monitor',
    kicker: 'Insider Risk',
    body: 'Endpoint telemetry with peer-group baselines, data-exfiltration detection, and session recording — metadata-first by default, with privacy controls built in.',
    href: '/features#monitor',
  },
  {
    id: 'neural',
    name: 'Neural Mesh',
    kicker: 'AI Correlation',
    body: 'Correlates events across every module into single investigations with blast radius and time-to-detect. Response actions are proposed for approval, never fired silently.',
    href: '/features#neural-mesh',
  },
  {
    id: 'aisec',
    name: 'AI Security',
    kicker: 'Shadow AI & DLP',
    body: 'Inventory every AI tool in use, govern it as sanctioned or blocked, inspect what data leaves for it, and detect prompt injection against your own agents.',
    href: '/features#ai-security',
  },
];

const metrics = [
  {n: '690+', l: 'Connectors'},
  {n: '8', l: 'Security modules'},
  {n: '23', l: 'Integration categories'},
  {n: '5', l: 'Cross-pillar attack patterns'},
];

const integrationTools = [
  'AWS', 'Microsoft Entra', 'Okta', 'CrowdStrike', 'GitHub', 'Google Cloud',
  'Azure', 'Splunk', 'Jira', 'Slack', 'Workday', 'ServiceNow', 'SentinelOne', 'PagerDuty',
];

// ── Sections ───────────────────────────────────────────────────────────────

function Hero(): ReactNode {
  return (
    <section className="zs-hero">
      <div className="zs-hero__glow" aria-hidden="true" />
      <div className="zs-hero__inner">
        <div>
          <div className="zs-eyebrow">
            <span className="zs-dot" aria-hidden="true" />
            Unified Security Platform
          </div>
          <h1>
            Eight security modules.
            <br />
            <span className="zs-grad">One correlated picture.</span>
          </h1>
          <p className="zs-hero__sub">
            Detection, compliance, attack surface, cloud posture, identity governance,
            insider risk, and AI security — in one platform that correlates across all of
            them, so the attack that spans four tools stops looking like four unrelated alerts.
          </p>
          <div className="zs-cta-row">
            <Link className="zs-btn zs-btn--primary" to="/docs/getting-started/quick-start">
              Get started free <Arrow />
            </Link>
            <Link className="zs-btn zs-btn--ghost" to="/features">
              Explore the platform
            </Link>
          </div>
          <div className="zs-microproof">
            <span><CheckIcon /> Deploy in minutes</span>
            <span><CheckIcon /> Self-host or cloud</span>
            <span><CheckIcon /> No credit card</span>
          </div>
        </div>

        <CommandCenterMock />
      </div>
    </section>
  );
}

/**
 * Structural representation of the live Command Center, built to the same layout
 * as the shipping dashboard. Swap for a cropped 2x screenshot of a seeded demo
 * tenant once one exists.
 */
function CommandCenterMock(): ReactNode {
  return (
    <div className="zs-shot zs-reveal" aria-label="Z Shield Command Center dashboard">
      <div className="zs-scan" aria-hidden="true" />

      <div className="zs-shot__bar">
        <i /><i /><i />
        <span className="zs-shot__title">Command Center — Zpoa Workspace</span>
      </div>

      <div className="zs-shot__body">
        <div className="zs-tiles">
          <div className="zs-tile"><b>Unified Score</b><em>62</em><s>security posture</s></div>
          <div className="zs-tile"><b>Active Alerts</b><em className="crit">34</em><s>3 critical</s></div>
          <div className="zs-tile"><b>Assets</b><em>2,417</em><s>18 exposed</s></div>
          <div className="zs-tile"><b>Compliance</b><em className="ok">78%</em><s>4 frameworks</s></div>
        </div>

        <div className="zs-split">
          <div className="zs-gauge">
            <svg width="92" height="92" viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <linearGradient id="zsGaugeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
              </defs>
              <circle className="zs-gauge__track" cx="60" cy="60" r="52" fill="none" strokeWidth="9" />
              <circle className="zs-gauge__val" cx="60" cy="60" r="52" fill="none" strokeWidth="9" />
            </svg>
            <div className="zs-gauge__num">62</div>
            <div className="zs-gauge__cap">Unified Risk</div>
          </div>

          <div className="zs-rows">
            <Meter label="Detect" pct={71} color="#22D3EE" value="71" />
            <Meter label="Comply" pct={78} color="#5CD79B" value="78" />
            <Meter label="Discover" pct={66} color="#A78BFA" value="66" />
            <Meter label="Fortress" pct={84} color="#F5C451" value="84" />
            <Meter label="Armor" pct={59} color="#FF8B8E" value="59" />
          </div>
        </div>

        <div className="zs-zara">
          <div className="zs-zara__head">
            <span className="zs-dot" aria-hidden="true" />
            Zara — Security Analyst
          </div>
          <div className="zs-zara__q">
            What SOC&nbsp;2 controls are failing?
            <span className="zs-caret" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Meter({label, pct, color, value}: {label: string; pct: number; color: string; value: string}): ReactNode {
  return (
    <div className="zs-row">
      <span>{label}</span>
      <div className="zs-meter">
        <i style={{width: `${pct}%`, background: color}} />
      </div>
      <u>{value}</u>
    </div>
  );
}

function Problems(): ReactNode {
  return (
    <section className="zs-sec zs-sec--sunken">
      <div className="zs-wrap">
        <div className="zs-center">
          <div className="zs-label">The problem</div>
          <h2 className="zs-h2">Attacks cross tools. Security teams cannot.</h2>
          <p className="zs-lede">
            The average security stack is ten products that never talk to each other.
            Attackers do not respect those boundaries.
          </p>
        </div>
        <div className="zs-probs">
          {problems.map((p) => (
            <div className="zs-prob zs-reveal" key={p.title}>
              <div className="zs-prob__ico"><ProblemIcon name={p.icon} /></div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Modules(): ReactNode {
  return (
    <section className="zs-sec" id="modules">
      <div className="zs-wrap">
        <div className="zs-center">
          <div className="zs-label">The platform</div>
          <h2 className="zs-h2">Eight modules. One platform.</h2>
          <p className="zs-lede">
            Each module stands on its own. Together they feed a shared correlation layer
            that sees what no single tool can.
          </p>
        </div>
        <div className="zs-mods">
          {modules.map((m) => (
            <div className="zs-mod zs-reveal" key={m.id}>
              <div className={`zs-mod__ico zs-i-${m.id}`}>
                <ModuleIcon name={m.id} />
              </div>
              <h3>{m.name}</h3>
              <p className="zs-mod__kicker">{m.kicker}</p>
              <p>{m.body}</p>
              <Link className="zs-mod__link" to={m.href}>
                Learn more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricsBand(): ReactNode {
  return (
    <section className="zs-band">
      <div className="zs-wrap">
        <div className="zs-band__grid">
          {metrics.map((m) => (
            <div key={m.l}>
              <div className="zs-band__n">{m.n}</div>
              <div className="zs-band__l">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Integrations(): ReactNode {
  return (
    <section className="zs-sec zs-sec--sunken">
      <div className="zs-wrap zs-center">
        <div className="zs-label">Integrations</div>
        <h2 className="zs-h2">690+ connectors, ready on day one</h2>
        <p className="zs-lede">
          Cloud providers, identity providers, EDR, SaaS, HR and ERP systems, network
          devices, and AI platforms — across 23 categories.
        </p>
        <div className="zs-int-tools">
          {integrationTools.map((t) => (
            <span className="zs-chip" key={t}>{t}</span>
          ))}
          <span className="zs-chip"><b>+676 more</b></span>
        </div>
        <Link className="zs-mod__link" to="/docs/integrations/overview">
          Browse the full catalogue <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}

function Closing(): ReactNode {
  return (
    <section className="zs-close">
      <div className="zs-wrap">
        <h2>See it against your own environment</h2>
        <p>Connect one system and the platform starts correlating. Free tier, no card required.</p>
        <div className="zs-cta-row">
          <Link className="zs-btn zs-btn--primary" to="/docs/getting-started/quick-start">
            Get started free <Arrow />
          </Link>
          <Link className="zs-btn zs-btn--ghost" to="mailto:info@zpoa.com">
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Scroll reveal ──────────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.zs-reveal');
    if (!nodes.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((n) => n.classList.add('zs-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          // Stagger siblings so a grid cascades instead of popping at once.
          const siblings = Array.from(el.parentElement?.children ?? []);
          el.style.animationDelay = `${Math.min(siblings.indexOf(el), 7) * 80}ms`;
          el.classList.add('zs-in');
          io.unobserve(el);
        });
      },
      {threshold: 0.12, rootMargin: '0px 0px -6% 0px'},
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

export default function Home(): ReactNode {
  useReveal();

  return (
    <Layout
      title="Unified Cybersecurity Platform"
      description="Z Shield — SIEM, compliance, attack surface, cloud posture, identity governance, insider risk, and AI security in one correlated platform.">
      <Hero />
      <main>
        <Problems />
        <Modules />
        <MetricsBand />
        <Integrations />
        <Closing />
      </main>
    </Layout>
  );
}
