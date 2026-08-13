import {type ReactNode} from 'react';
import {useAutoRotate} from '@site/src/lib/useAutoRotate';
import {RailIcon, RAIL_ORDER, RAIL_BOTTOM} from './icons';
import TypingPrompt from './TypingPrompt';

/**
 * Zara inside the Zpoa Workspace.
 *
 * Modelled on the shipping panel: an activity bar, a chat list, the
 * conversation as an editor tab, and the composer.
 *
 * The chat list cycles, and the conversation follows it — previously the rail
 * highlighted "How do I add an identity?" while the transcript showed VPN
 * devices, which is a detail a prospect notices. Each chat now owns its own
 * exchange.
 *
 * All names, hostnames and identifiers are fictional.
 */

const DOMAIN = 'northwind.co';
const ROTATE_MS = 6500;

const DEVICES = [
  ['firewall-edge', '100.64.13.1', 'linux', 'online', '1 min ago'],
  ['laptop-003', '100.64.1.110', 'windows', 'offline', '3 days ago'],
  ['storage-nfs', '100.64.14.10', 'linux', 'online', '3 min ago'],
  ['vm-test-lab', '100.64.15.10', 'linux', 'online', '8 min ago'],
];

const APPROVALS = [
  ['03136d52-63e7-44f6', 'Mover: S. Bennett', 'lifecycle', 'medium', 'pending'],
  ['4b751385-feef-41e4', 'Joiner: S. Bennett', 'lifecycle', 'medium', 'pending'],
  ['94ed55c7-95ed-4aa4', 'Joiner: S. Bennett', 'lifecycle', 'medium', 'pending'],
];

const CHIPS = ["Show today's critical findings", 'What needs immediate attention?', 'Generate executive summary'];

function Chips(): ReactNode {
  return <div className="zw-chips">{CHIPS.map((c) => <span key={c}>{c}</span>)}</div>;
}

function Answer({children}: {children: ReactNode}): ReactNode {
  return (
    <div className="zw-ans">
      <i className="zw-bullet" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}

/* ── One conversation per chat ───────────────────────────────────────────── */

const CHATS: Array<{t: string; m: string; body: ReactNode}> = [
  {
    t: 'zara-fortress-test',
    m: '2h · 2 msg',
    body: (
      <>
        <div className="zw-turn">list pending approvals for s.bennett</div>
        <Answer>
          <p className="zw-sum"><b>S. Bennett has 3 pending approvals:</b></p>
          <table className="zw-t zw-t--head">
            <thead>
              <tr><th>Approval ID</th><th>Title</th><th>Category</th><th>Risk</th><th>Status</th></tr>
            </thead>
            <tbody>
              {APPROVALS.map((a) => (
                <tr key={a[0]}>
                  <td className="mono">{a[0]}</td><td>{a[1]}</td>
                  <td className="dim">{a[2]}</td><td className="warn">{a[3]}</td>
                  <td className="dim">{a[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="zw-sum">
            All are medium risk, not escalated. Approve, reject, or view full details?
          </p>
          <Chips />
        </Answer>
      </>
    ),
  },
  {
    t: 'How do I add an identity?',
    m: '19h · 24 msg',
    body: (
      <>
        <div className="zw-turn">how do I add an identity?</div>
        <Answer>
          <p className="zw-sum">
            Three routes, depending on where the person comes from:
          </p>
          <table className="zw-t zw-t--head">
            <thead><tr><th>Route</th><th>Use when</th><th>Creates</th></tr></thead>
            <tbody>
              <tr>
                <td className="strong">HR sync</td>
                <td className="dim">The joiner exists in Workday or an HR system</td>
                <td>Golden record + JML event</td>
              </tr>
              <tr>
                <td className="strong">Directory import</td>
                <td className="dim">They already have an Entra or Okta account</td>
                <td>Linked account on the record</td>
              </tr>
              <tr>
                <td className="strong">Manual add</td>
                <td className="dim">Contractor or vendor, no upstream source</td>
                <td>Record pending approval</td>
              </tr>
            </tbody>
          </table>
          <p className="zw-sum">
            Whichever you pick, entitlements attach to the <b>golden record</b>, so a later
            leaver event revokes every linked account at once. Want me to start one?
          </p>
          <Chips />
        </Answer>
      </>
    ),
  },
  {
    t: 'List me VPN devices',
    m: '19h · 4 msg',
    body: (
      <>
        <div className="zw-turn">list vpn devices</div>
        <Answer>
          <table className="zw-t">
            <tbody>
              {DEVICES.map((d) => (
                <tr key={d[0]}>
                  <td className="mono strong">{d[0]}</td>
                  <td className="mono">{d[1]}</td>
                  <td className="dim">{d[2]}</td>
                  <td className={d[3] === 'online' ? 'ok' : 'dim'}>{d[3]}</td>
                  <td className="dim">{d[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="zw-sum">
            <b>Summary:</b> 17 online, 8 offline. Mostly Linux and Windows, with a few macOS
            and mobile devices.
          </p>
          <Chips />
        </Answer>
      </>
    ),
  },
];

export default function ZaraWorkspace(): ReactNode {
  const {index: active, setIndex: setActive, ref: wrap, holdProps} =
    useAutoRotate(CHATS.length, ROTATE_MS);

  return (
    <div
      className="zw"
      ref={wrap}
      aria-label="Zara in the Zpoa Workspace"
      {...holdProps}>

      <div className="zw-bar">
        <i /><i /><i />
        <span className="zw-bar__t">Zara — Zpoa Workspace</span>
      </div>

      <div className="zw-frame">
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

        <aside className="zw-rail">
          <div className="zw-rail__h">Zara: Chats</div>
          <div className="zw-new">+ New chat</div>
          <div className="zw-search">Search chats…</div>
          <div className="zw-day">Today</div>
          {CHATS.map((c, i) => (
            <button
              type="button"
              className={`zw-chat${i === active ? ' is-on' : ''}`}
              key={c.t}
              aria-current={i === active}
              onClick={() => setActive(i)}>
              <b>{c.t}</b>
              <s>{c.m}</s>
            </button>
          ))}
        </aside>

        <div className="zw-main">
          <div className="zw-tabs">
            <span className="is-on">✦ Zara</span>
            <span>⚡ All</span>
            <span className="zw-tabs__new">+ New</span>
          </div>

          <div className="zw-conv">
            {CHATS.map((c, i) => (
              <div className={`zw-thread${i === active ? ' is-on' : ''}`} key={c.t} aria-hidden={i !== active}>
                {c.body}
              </div>
            ))}
          </div>

          <div className="zw-compose">
            <div className="zw-input">
              <span className="zw-clip" aria-hidden="true">📎</span>
              <span className="zw-typed"><TypingPrompt /></span>
              <span className="zw-pro">PRO</span>
              <span className="zw-send" aria-hidden="true">➤</span>
            </div>
            <p className="zw-hint">
              Zara can query identities, access, threats, VPN &amp; more — or analyse an attached
              file or image.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
