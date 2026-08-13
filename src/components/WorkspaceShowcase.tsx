import {type ReactNode} from 'react';
import {useAutoRotate} from '@site/src/lib/useAutoRotate';

/**
 * Rotating view of the Zpoa Workspace connectivity panels.
 *
 * Replaces the single static Devices table: the workspace is a multi-panel
 * console, and showing one screen made it look like a single-page tool. Cycles
 * through four real panels with a crossfade, pauses on hover/focus, and lets
 * the visitor drive it from the tab strip.
 *
 * All identifiers are fictional; never ship real enrolled devices, hostnames,
 * or employee addresses on a public page.
 */

const DOMAIN = 'northwind.co';

type Tab = {id: string; label: string; icon: ReactNode};

const ic = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const TABS: Tab[] = [
  {
    id: 'devices',
    label: 'Devices',
    icon: <svg {...ic}><rect x="3" y="4.5" width="18" height="12" rx="1.6" /><path d="M9 20h6" /></svg>,
  },
  {
    id: 'topology',
    label: 'Network Topology',
    icon: <svg {...ic}><circle cx="12" cy="5.5" r="2.2" /><circle cx="5.5" cy="18" r="2.2" /><circle cx="18.5" cy="18" r="2.2" /><path d="M12 7.7v4.6M10.4 13.6 7 16.3M13.6 13.6l3.4 2.7" /></svg>,
  },
  {
    id: 'health',
    label: 'Mesh Health',
    icon: <svg {...ic}><path d="M3 12h3.6l2-5.2 3 10.4 2.2-5.2H21" /></svg>,
  },
  {
    id: 'tunnel',
    label: 'Full Tunnel',
    icon: <svg {...ic}><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.4 2.6 2.4 14.4 0 17M12 3.5c-2.4 2.6-2.4 14.4 0 17" /></svg>,
  },
];

const ROTATE_MS = 5200;

export default function WorkspaceShowcase(): ReactNode {
  const {index: active, setIndex: setActive, ref: wrap, holdProps, held} =
    useAutoRotate(TABS.length, ROTATE_MS);

  return (
    <div
      className="ws-shot"
      ref={wrap}
      {...holdProps}>

      <div className="ws-bar">
        <i /><i /><i />
        <span className="ws-bar__t">Connectivity · Zpoa Workspace</span>
      </div>

      <div className="ws-tabs" role="tablist" aria-label="Workspace panels">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`ws-tab${i === active ? ' is-on' : ''}`}
            onClick={() => setActive(i)}>
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
        <span className="ws-tabs__prog" key={active} data-paused={held || undefined} />
      </div>

      <div className="ws-stage">
        <Panel on={active === 0}><Devices /></Panel>
        <Panel on={active === 1}><Topology /></Panel>
        <Panel on={active === 2}><Health /></Panel>
        <Panel on={active === 3}><Tunnel /></Panel>
      </div>
    </div>
  );
}

function Panel({on, children}: {on: boolean; children: ReactNode}): ReactNode {
  return <div className={`ws-panel${on ? ' is-on' : ''}`} aria-hidden={!on}>{children}</div>;
}

function Head({title, sub}: {title: string; sub: string}): ReactNode {
  return (
    <div className="ws-head">
      <div>
        <h4>{title}</h4>
        <p>{sub}</p>
      </div>
    </div>
  );
}

/* ── 1. Devices ─────────────────────────────────────────────────────────── */
// Row counts must reconcile with the stat cards above them: 6 total = 1 gateway
// + 5 devices, of which 4 are reachable and 2 offline.
const GATEWAYS = [
  {n: 'zypher-vpn-gateway', o: 'admin', i: 'AD', ip: '100.64.0.1', c: 'Online', nat: 'Direct', os: 'linux', s: 'just now'},
];

const DEVICES = [
  {n: 'DESKTOP-4K2P9L', o: 'j.walker', i: 'JW', ip: '100.64.0.6', c: 'Direct', nat: 'None', os: 'windows', s: 'just now'},
  {n: 'LAPTOP-7XQ2NB', o: 's.bennett', i: 'SB', ip: '100.64.0.5', c: 'Direct', nat: 'None', os: 'windows', s: 'just now'},
  {n: 'MBP-DESIGN-02', o: 'm.harper', i: 'MH', ip: '100.64.0.2', c: 'Direct', nat: 'None', os: 'macos', s: 'just now'},
  {n: 'WS-FINANCE-11', o: 'c.wright', i: 'CW', ip: '100.64.0.4', c: 'Offline', nat: 'None', os: 'windows', s: '3d ago'},
  {n: 'LAPTOP-9HTR4M', o: 't.morgan', i: 'TM', ip: '100.64.0.3', c: 'Offline', nat: 'None', os: 'windows', s: '1d ago'},
];

type Row = typeof DEVICES[number];

function DeviceRow({d}: {d: Row}): ReactNode {
  const off = d.c === 'Offline';
  return (
    <tr>
      <td className="w"><i className={`ws-dot ${off ? 'off' : 'on'}`} /></td>
      <td className="strong">{d.n}</td>
      <td>
        <span className="ws-av">{d.i}</span>
        <span className="ws-own"><b>{d.o}</b><s>{d.o}@{DOMAIN}</s></span>
      </td>
      <td className="mono">{d.ip}</td>
      <td><span className={`ws-pill ${off ? 'off' : 'on'}`}>{d.c}</span></td>
      <td>{d.nat === 'None' ? <span className="dim">None</span> : <span className="ws-pill on">{d.nat}</span>}</td>
      <td className="dim">{d.os}</td>
      <td className="dim">{d.s}</td>
      <td className="act" aria-hidden="true"><i /><i /><i /></td>
    </tr>
  );
}

function Devices(): ReactNode {
  return (
    <>
      <Head title="Devices" sub="Every enrolled client: live status, owner, connection health, and controls." />
      <div className="ws-stats">
        <div><b>6</b><s>Devices</s></div>
        <div><b className="ok">4</b><s>Online</s></div>
        <div><b className="warn">2</b><s>Offline</s></div>
        <div><b>1</b><s>Gateways</s></div>
        <div><b>0</b><s>Exit nodes</s></div>
      </div>
      <table className="ws-t">
        <thead>
          <tr>
            <th /><th>Machine</th><th>Owner</th><th>Mesh IP</th>
            <th>Connection</th><th>NAT</th><th>OS</th><th>Last seen</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="grp"><td colSpan={9}>Gateways <b>1</b></td></tr>
          {GATEWAYS.map((d) => <DeviceRow key={d.ip} d={d} />)}
          <tr className="grp"><td colSpan={9}>Devices <b>5</b></td></tr>
          {DEVICES.map((d) => <DeviceRow key={d.ip} d={d} />)}
        </tbody>
      </table>
    </>
  );
}

/* ── 2. Network Topology → All Nodes ────────────────────────────────────── */
// Same six nodes as the Devices panel, so the two views agree.
const NODES = [
  {h: 'zypher-vpn-gateway', ip: '100.64.0.1', r: 'Gateway', os: 'linux', st: 'Online', l: 'n/a', i: '0 B', o: '0 B', s: '1m ago'},
  {h: 'DESKTOP-4K2P9L', ip: '100.64.0.6', r: 'Endpoint', os: 'windows', st: 'Online', l: '54ms', i: '1.0 GB', o: '79.9 MB', s: '1m ago'},
  {h: 'LAPTOP-7XQ2NB', ip: '100.64.0.5', r: 'Endpoint', os: 'windows', st: 'Online', l: '59ms', i: '296.4 MB', o: '112.1 MB', s: '1m ago'},
  {h: 'MBP-DESIGN-02', ip: '100.64.0.2', r: 'Endpoint', os: 'macos', st: 'Online', l: '24ms', i: '1.4 GB', o: '165.5 MB', s: '1m ago'},
  {h: 'WS-FINANCE-11', ip: '100.64.0.4', r: 'Endpoint', os: 'windows', st: 'Offline', l: '215ms', i: '2.2 MB', o: '14.7 MB', s: '3d ago'},
  {h: 'LAPTOP-9HTR4M', ip: '100.64.0.3', r: 'Endpoint', os: 'windows', st: 'Offline', l: '256ms', i: '0 B', o: '31.2 KB', s: '2d ago'},
];

function Topology(): ReactNode {
  return (
    <>
      <Head title="Network Topology" sub="Mesh topology with live device status and connection quality." />
      <div className="ws-stats">
        <div><b>6</b><s>Total nodes</s></div>
        <div><b className="ok">4</b><s>Online</s></div>
        <div><b className="warn">2</b><s>Degraded</s></div>
        <div><b>1</b><s>Gateways</s></div>
        <div><b>0</b><s>Relays</s></div>
      </div>
      <table className="ws-t">
        <thead>
          <tr>
            <th>Hostname</th><th>IP</th><th>Role</th><th>OS</th><th>Status</th>
            <th>Latency</th><th>Traffic in</th><th>Traffic out</th><th>Last seen</th>
          </tr>
        </thead>
        <tbody>
          {NODES.map((n) => (
            <tr key={n.ip}>
              <td className="strong mono">{n.h}</td>
              <td className="mono">{n.ip}</td>
              <td><span className={`ws-tag ${n.r === 'Gateway' ? 'gw' : ''}`}>{n.r}</span></td>
              <td className="dim">{n.os}</td>
              <td><span className={`ws-pill ${n.st === 'Offline' ? 'off' : 'on'}`}>{n.st}</span></td>
              <td className="mono amber">{n.l}</td>
              <td className="mono cyan">{n.i}</td>
              <td className="mono green">{n.o}</td>
              <td className="dim">{n.s}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* ── 3. Mesh Health ─────────────────────────────────────────────────────── */
function Health(): ReactNode {
  return (
    <>
      <Head title="Mesh Health" sub="Reachability diagnostics: why clients can and cannot reach the network." />
      <div className="ws-stats">
        <div><b className="ok">1/1</b><s>Gateways online</s></div>
        <div><b>4/6</b><s>Devices online</s></div>
        <div><b>1/1</b><s>Routes active</s></div>
        <div><b>1</b><s>Relays</s></div>
        <div><b className="ok">0</b><s>Route conflicts</s></div>
      </div>

      <div className="ws-finding">
        <span className="ws-check">&#10003;</span>
        No issues found. Every step of the reach-the-network chain checks out.
      </div>

      <div className="ws-sub">Gateways</div>
      <table className="ws-t">
        <thead>
          <tr>
            <th>Gateway</th><th>State</th><th>Last seen</th><th>Peers</th>
            <th>Active routes</th><th>Pending</th><th>Issues</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="strong">zypher-vpn-gateway <span className="mono dim">100.64.0.1</span></td>
            <td><span className="ws-pill on">online</span></td>
            <td className="dim">0s ago</td>
            <td className="mono">4</td>
            <td className="mono">10.0.0.0/16</td>
            <td className="dim">0</td>
            <td className="dim">0</td>
          </tr>
        </tbody>
      </table>

      <div className="ws-sub">Routes</div>
      <table className="ws-t">
        <thead><tr><th>CIDR</th><th>Via gateway</th><th>Approved</th><th>Enabled</th><th>Effective</th></tr></thead>
        <tbody>
          <tr>
            <td className="mono strong">10.0.0.0/16 <span className="dim">(primary)</span></td>
            <td>zypher-vpn-gateway</td>
            <td className="ok">&#10003;</td>
            <td className="ok">&#10003;</td>
            <td><span className="ws-pill on">live</span></td>
          </tr>
        </tbody>
      </table>

      <div className="ws-sub">Relays (NAT traversal)</div>
      <table className="ws-t">
        <thead><tr><th>Name</th><th>Endpoint</th><th>Region</th><th>Enabled</th><th>Default</th></tr></thead>
        <tbody>
          <tr>
            <td className="strong">relay-eu-1</td>
            <td className="mono">relay.{DOMAIN}</td>
            <td className="dim">self-host</td>
            <td className="ok">&#10003;</td>
            <td className="ok">&#10003;</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

/* ── 4. Full Tunnel & Exit Nodes ────────────────────────────────────────── */
function Tunnel(): ReactNode {
  return (
    <>
      <Head title="Full Tunnel &amp; Exit Nodes" sub="Route all of a user's traffic through the VPN, rather than split tunnel." />

      <div className="ws-switch">
        <span className="ws-toggle" aria-hidden="true"><i /></span>
        <div>
          <b>Full tunnel is OFF</b>
          <p>
            When ON, devices matched by an active policy route <code>0.0.0.0/0</code> through an
            exit-node gateway. OFF = every device stays split-tunnel. This is the master gate.
          </p>
        </div>
        <span className="ws-scope">per-tenant</span>
      </div>

      <div className="ws-sub">Exit-node gateways</div>
      <table className="ws-t">
        <thead><tr><th>Gateway</th><th>Mesh IP</th><th>Advertised routes</th><th>Role</th><th>Exit node</th></tr></thead>
        <tbody>
          <tr>
            <td className="strong"><i className="ws-dot on" />zypher-vpn-gateway</td>
            <td className="mono">100.64.0.1</td>
            <td className="mono">10.0.0.0/16</td>
            <td><span className="ws-tag">Corp only</span></td>
            <td><span className="ws-toggle sm" aria-hidden="true"><i /></span></td>
          </tr>
        </tbody>
      </table>

      <div className="ws-empty">
        No full-tunnel policies yet. Add one to choose who gets a full tunnel
        by role, by specific users, or tenant-wide.
      </div>
    </>
  );
}
