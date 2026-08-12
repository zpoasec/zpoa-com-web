import {useEffect, useRef, useState, type ReactNode} from 'react';
import {RailIcon, RAIL_ORDER, RAIL_BOTTOM} from './icons';

/**
 * Rotating view of the Zara surfaces in the Zpoa Workspace.
 *
 * Mirrors the VPN showcase: the workspace chrome stays put while the panel
 * inside it changes. Each tab maps to a real API surface —
 *   Conversation   /ai/conversations
 *   Agent runs     /ai/agent-runs  + /ai/agent-runs/:id/steps
 *   MCP tools      /ai/mcp/tools   + /ai/mcp/executions
 *   Autonomy       /ai/autonomy
 * and the columns follow the models in zpoa-pkg/models/ai_native.go and mcp.go.
 *
 * All names and identifiers are fictional.
 */

const DOMAIN = 'northwind.co';
const ROTATE_MS = 5600;

const ic = {
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const TABS = [
  {
    id: 'chat', label: 'Conversation',
    icon: <svg {...ic}><path d="M4 5.5h16a1.6 1.6 0 0 1 1.6 1.6v7a1.6 1.6 0 0 1-1.6 1.6h-8.6L7 19v-3.3H4A1.6 1.6 0 0 1 2.4 14V7.1A1.6 1.6 0 0 1 4 5.5z" /></svg>,
  },
  {
    id: 'runs', label: 'Agent runs',
    icon: <svg {...ic}><path d="M5 4.5v15M5 7h9.5M5 12h13M5 17h7" /><circle cx="5" cy="4.5" r="1.4" /></svg>,
  },
  {
    id: 'tools', label: 'MCP tools',
    icon: <svg {...ic}><path d="M14.5 3.2 11 6.7l1.4 1.4-3.5 3.5L7.5 10.2 4 13.7l6.3 6.3 3.5-3.5-1.4-1.4 3.5-3.5 1.4 1.4 3.5-3.5z" /></svg>,
  },
  {
    id: 'autonomy', label: 'Autonomy',
    icon: <svg {...ic}><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></svg>,
  },
];

export default function ZaraShowcase(): ReactNode {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useRef(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => { inView.current = e.isIntersecting; }, {threshold: 0.25});
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    if (typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => {
      if (inView.current) setActive((i) => (i + 1) % TABS.length);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="zw"
      ref={wrap}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}>

      <div className="zw-bar">
        <i /><i /><i />
        <span className="zw-bar__t">Zara — Zpoa Workspace</span>
      </div>

      <div className="zw-frame zw-frame--showcase">
        <nav className="zs-rail zw-act" aria-hidden="true">
          <div className="zs-rail__top">
            {RAIL_ORDER.map((n, i) => (
              <span className={`zs-rail__ic${i === 0 ? ' is-active' : ''}`} key={n}>
                <RailIcon name={n} />
              </span>
            ))}
          </div>
          <div className="zs-rail__bot">
            {RAIL_BOTTOM.map((n) => <span className="zs-rail__ic" key={n}><RailIcon name={n} /></span>)}
          </div>
        </nav>

        <div className="zw-main">
          <div className="ws-tabs" role="tablist" aria-label="Zara panels">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`ws-tab${i === active ? ' is-on' : ''}`}
                onClick={() => setActive(i)}>
                {t.icon}<span>{t.label}</span>
              </button>
            ))}
            <span className="ws-tabs__prog zw-prog" key={active} data-paused={paused || undefined} />
          </div>

          <div className="ws-stage zw-stage">
            <Panel on={active === 0}><Conversation /></Panel>
            <Panel on={active === 1}><Runs /></Panel>
            <Panel on={active === 2}><Tools /></Panel>
            <Panel on={active === 3}><Autonomy /></Panel>
          </div>
        </div>
      </div>
    </div>
  );
}

function Panel({on, children}: {on: boolean; children: ReactNode}): ReactNode {
  return <div className={`ws-panel${on ? ' is-on' : ''}`} aria-hidden={!on}>{children}</div>;
}

function Head({t, s}: {t: string; s: string}): ReactNode {
  return <div className="ws-head"><div><h4>{t}</h4><p>{s}</p></div></div>;
}

/* ── 1. Conversation ────────────────────────────────────────────────────── */
const APPROVALS = [
  ['03136d52-63e7-44f6', 'Mover: a.silva', 'lifecycle', 'medium', 'pending'],
  ['4b751385-feef-41e4', 'Joiner: k.tanaka', 'lifecycle', 'medium', 'pending'],
  ['94ed55c7-95ed-4aa4', 'Joiner: p.novak', 'lifecycle', 'low', 'pending'],
];

function Conversation(): ReactNode {
  return (
    <>
      <div className="zw-turn">which SOC 2 controls are failing, and who owns them?</div>
      <div className="zw-ans">
        <i className="zw-bullet" aria-hidden="true" />
        <div>
          <div className="zs-tools zw-trace">
            <div className="zs-tool"><i className="ok" />comply.list_failing_controls<b>3 results</b></div>
            <div className="zs-tool"><i className="ok" />fortress.resolve_owner<b>3 identities</b></div>
            <div className="zs-tool"><i className="ok" />armor.get_finding<b>1 result</b></div>
          </div>
          <table className="zw-t zw-t--head">
            <thead><tr><th>Control</th><th>Gap</th><th>Owner</th><th>Also</th></tr></thead>
            <tbody>
              <tr><td className="strong">CC6.1</td><td>MFA not enforced for 4 admins</td><td className="mono">a.silva</td><td className="dim">—</td></tr>
              <tr><td className="strong">CC6.6</td><td>S3 bucket publicly readable</td><td className="mono">k.tanaka</td><td className="warn">Armor finding</td></tr>
              <tr><td className="strong">CC7.2</td><td>CloudTrail off in eu-west-1</td><td className="mono">p.novak</td><td className="dim">—</td></tr>
            </tbody>
          </table>
          <p className="zw-sum">CC6.6 is on an active attack path. Approve a fix?</p>
          <div className="zw-chips">
            <span>Show today&apos;s critical findings</span>
            <span>What needs immediate attention?</span>
            <span>Generate executive summary</span>
          </div>
        </div>
      </div>

      <div className="zw-turn">list pending approvals for the identity team</div>
      <div className="zw-ans">
        <i className="zw-bullet" aria-hidden="true" />
        <div>
          <table className="zw-t zw-t--head">
            <thead><tr><th>Approval ID</th><th>Title</th><th>Category</th><th>Risk</th><th>Status</th></tr></thead>
            <tbody>
              {APPROVALS.map((a) => (
                <tr key={a[0]}>
                  <td className="mono">{a[0]}</td><td>{a[1]}</td>
                  <td className="dim">{a[2]}</td>
                  <td className={a[3] === 'medium' ? 'warn' : 'dim'}>{a[3]}</td>
                  <td className="dim">{a[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ── 2. Agent runs ──────────────────────────────────────────────────────── */
const STEPS = [
  ['1', 'plan', 'Decompose the question', '—', 'done', '120ms'],
  ['2', 'tool', 'List failing controls', 'comply.list_failing_controls', 'done', '340ms'],
  ['3', 'tool', 'Resolve control owners', 'fortress.resolve_owner', 'done', '210ms'],
  ['4', 'tool', 'Check cloud findings', 'armor.get_finding', 'done', '180ms'],
  ['5', 'gate', 'Await approval — restrict bucket', 'armor.restrict_bucket', 'waiting', '—'],
];

function Runs(): ReactNode {
  return (
    <>
      <Head t="Agent runs" s="Every Zara run, its reasoning steps, the tools it used, and what it changed." />
      <div className="ws-stats">
        <div><b>184</b><s>Runs (30d)</s></div>
        <div><b className="ok">171</b><s>Completed</s></div>
        <div><b className="warn">2</b><s>Awaiting approval</s></div>
        <div><b>41</b><s>Actions taken</s></div>
        <div><b>0.94</b><s>Avg confidence</s></div>
      </div>
      <div className="ws-sub">Run · soc2-owner-lookup · completed</div>
      <table className="zw-t zw-t--head">
        <thead><tr><th>#</th><th>Type</th><th>Step</th><th>Tool used</th><th>Status</th><th>Duration</th></tr></thead>
        <tbody>
          {STEPS.map((s) => (
            <tr key={s[0]}>
              <td className="dim">{s[0]}</td>
              <td><span className="ws-tag">{s[1]}</span></td>
              <td className="strong">{s[2]}</td>
              <td className="mono">{s[3]}</td>
              <td><span className={`ws-pill ${s[4] === 'done' ? 'on' : 'off'}`}>{s[4]}</span></td>
              <td className="mono dim">{s[5]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* ── 3. MCP tools ───────────────────────────────────────────────────────── */
const TOOLS = [
  ['fortress.resolve_owner', 'Fortress', 'read', 'enabled', '1,204'],
  ['comply.list_failing_controls', 'Comply', 'read', 'enabled', '862'],
  ['armor.get_finding', 'Armor', 'read', 'enabled', '640'],
  ['vpn.list_devices', 'Zypher VPN', 'read', 'enabled', '318'],
  ['armor.restrict_bucket', 'Armor', 'write', 'approval', '12'],
  ['fortress.revoke_access', 'Fortress', 'write', 'approval', '7'],
];

function Tools(): ReactNode {
  return (
    <>
      <Head t="MCP tools" s="Which tools this agent may call, what they are allowed to do, and every execution." />
      <div className="ws-stats">
        <div><b>28</b><s>Tools entitled</s></div>
        <div><b>9</b><s>MCP servers</s></div>
        <div><b className="ok">22</b><s>Read-only</s></div>
        <div><b className="warn">6</b><s>Write · gated</s></div>
        <div><b>3,041</b><s>Executions (30d)</s></div>
      </div>
      <table className="zw-t zw-t--head">
        <thead><tr><th>Tool</th><th>Server</th><th>Access</th><th>Policy</th><th>Calls (30d)</th></tr></thead>
        <tbody>
          {TOOLS.map((t) => (
            <tr key={t[0]}>
              <td className="mono strong">{t[0]}</td>
              <td className="dim">{t[1]}</td>
              <td><span className={`ws-tag ${t[2] === 'write' ? '' : 'gw'}`}>{t[2]}</span></td>
              <td>
                <span className={`ws-pill ${t[3] === 'enabled' ? 'on' : 'off'}`}>
                  {t[3] === 'enabled' ? 'auto' : 'human approval'}
                </span>
              </td>
              <td className="mono dim">{t[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* ── 4. Autonomy ────────────────────────────────────────────────────────── */
const LEVELS = [
  ['Fortress', 2, 'Suggest and act on reads; writes need approval'],
  ['Comply', 2, 'Collect evidence automatically; policy edits gated'],
  ['Armor', 1, 'Read and recommend only'],
  ['Detect', 2, 'Triage and enrich; containment gated'],
  ['Monitor', 1, 'Read and recommend only'],
  ['Zypher VPN', 1, 'Read and recommend only'],
];

function Autonomy(): ReactNode {
  return (
    <>
      <Head t="Autonomy" s="How much Zara may do on its own, set per module. Level 3 still never bypasses a write gate." />
      <table className="zw-t zw-t--head">
        <thead><tr><th>Module</th><th>Level</th><th /><th>Behaviour</th></tr></thead>
        <tbody>
          {LEVELS.map(([m, lvl, desc]) => (
            <tr key={m as string}>
              <td className="strong">{m}</td>
              <td className="mono">{lvl}/3</td>
              <td className="zw-lvl">
                {[1, 2, 3].map((n) => (
                  <i key={n} className={n <= (lvl as number) ? 'on' : undefined} />
                ))}
              </td>
              <td className="dim">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="zs-approve zw-gate">
        <div className="zs-approve__h">
          <span className="zs-approve__ic" aria-hidden="true">!</span>
          The write gate is not an autonomy level
        </div>
        <p>
          Whatever the level, a tool marked <code>write</code> is refused without an
          approver — <code>denied: write action not approved by a human</code>.
        </p>
      </div>
    </>
  );
}
