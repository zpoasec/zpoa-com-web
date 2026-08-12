import {useState, type ReactNode} from 'react';
import {RailIcon, RAIL_ORDER, RAIL_BOTTOM} from './icons';

/**
 * Screenshot swap.
 *
 * The built mockup renders by default because no capture exists yet. Once a real
 * 2x screenshot is saved to the path below, flip USE_SHOT to true — server-side
 * rendering then emits the image directly, and a client-side onError still falls
 * back to the mockup if the file is ever missing.
 *
 * Leaving USE_SHOT true with no file on disk would ship an <img> in the SSR HTML
 * that only resolves after JS runs, so it is opt-in rather than automatic.
 */
const SHOT = '/img/product/zara-workspace.png';
const USE_SHOT = false;

/**
 * Zara inside the Zpoa Workspace.
 *
 * Modelled on the shipping panel: a chat list rail, the conversation as an
 * editor tab with ZARA / All scopes, user turns rendered as section bars,
 * answers with suggested follow-ups, and the composer with its PRO toggle.
 *
 * All names, hostnames, and identifiers are fictional.
 */

const CHATS = [
  {t: 'zara-fortress-test', m: '2h · 2 msg'},
  {t: 'How do I add an identity?', m: '19h · 24 msg', on: true},
  {t: 'List me VPN devices', m: '19h · 4 msg'},
];

const DEVICES = [
  ['firewall-edge', '100.64.13.1', 'linux', 'online', '1 min ago'],
  ['laptop-003', '100.64.1.110', 'windows', 'offline', '3 days ago'],
  ['storage-nfs', '100.64.14.10', 'linux', 'online', '3 min ago'],
  ['vm-test-lab', '100.64.15.10', 'linux', 'online', '8 min ago'],
];

const APPROVALS = [
  ['03136d52-63e7-44f6', 'Mover: A. Silva', 'lifecycle', 'medium', 'pending'],
  ['4b751385-feef-41e4', 'Joiner: A. Silva', 'lifecycle', 'medium', 'pending'],
  ['94ed55c7-95ed-4aa4', 'Joiner: A. Silva', 'lifecycle', 'medium', 'pending'],
];

const CHIPS = ["Show today's critical findings", 'What needs immediate attention?', 'Generate executive summary'];

function Chips(): ReactNode {
  return (
    <div className="zw-chips">
      {CHIPS.map((c) => <span key={c}>{c}</span>)}
    </div>
  );
}

export default function ZaraWorkspace(): ReactNode {
  const [useShot, setUseShot] = useState(USE_SHOT);

  if (useShot) {
    return (
      <img
        className="zw-img"
        src={SHOT}
        alt="Zara running inside the Zpoa Workspace"
        loading="lazy"
        onError={() => setUseShot(false)}
      />
    );
  }

  return (
    <div className="zw" aria-label="Zara in the Zpoa Workspace">
      <div className="zw-bar">
        <i /><i /><i />
        <span className="zw-bar__t">Zara — Zpoa Workspace</span>
      </div>

      <div className="zw-frame">
        {/* activity bar — same containers as the shipping workspace, Zara active */}
        <nav className="zs-rail zw-act" aria-hidden="true">
          <div className="zs-rail__top">
            {RAIL_ORDER.map((n, i) => (
              <span className={`zs-rail__ic${i === 0 ? ' is-active' : ''}`} key={n}>
                <RailIcon name={n} />
              </span>
            ))}
          </div>
          <div className="zs-rail__bot">
            {RAIL_BOTTOM.map((n) => (
              <span className="zs-rail__ic" key={n}><RailIcon name={n} /></span>
            ))}
          </div>
        </nav>

        {/* chat list rail */}
        <aside className="zw-rail">
          <div className="zw-rail__h">Zara: Chats</div>
          <div className="zw-new">+ New chat</div>
          <div className="zw-search">Search chats…</div>
          <div className="zw-day">Today</div>
          {CHATS.map((c) => (
            <div className={`zw-chat${c.on ? ' is-on' : ''}`} key={c.t}>
              <b>{c.t}</b>
              <s>{c.m}</s>
            </div>
          ))}
        </aside>

        {/* conversation */}
        <div className="zw-main">
          <div className="zw-tabs">
            <span className="is-on">✦ Zara</span>
            <span>⚡ All</span>
            <span className="zw-tabs__new">+ New</span>
          </div>

          <div className="zw-conv">
            <div className="zw-turn">list vpn devices</div>
            <div className="zw-ans">
              <i className="zw-bullet" aria-hidden="true" />
              <div>
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
              </div>
            </div>

            <div className="zw-turn">list pending approvals for a.silva</div>
            <div className="zw-ans">
              <i className="zw-bullet" aria-hidden="true" />
              <div>
                <p className="zw-sum"><b>A. Silva has 3 pending approvals:</b></p>
                <table className="zw-t zw-t--head">
                  <thead>
                    <tr><th>Approval ID</th><th>Title</th><th>Category</th><th>Risk</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {APPROVALS.map((a) => (
                      <tr key={a[0]}>
                        <td className="mono">{a[0]}</td>
                        <td>{a[1]}</td>
                        <td className="dim">{a[2]}</td>
                        <td className="warn">{a[3]}</td>
                        <td className="dim">{a[4]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="zw-sum">
                  All are medium risk, not escalated. Would you like to approve, reject, or view
                  full details on any of these?
                </p>
                <Chips />
              </div>
            </div>
          </div>

          <div className="zw-compose">
            <div className="zw-input">
              <span className="zw-clip" aria-hidden="true">📎</span>
              Ask Zara anything…
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
