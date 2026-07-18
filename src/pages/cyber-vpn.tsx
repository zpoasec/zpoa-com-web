import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

// "Contact Sales" / "Talk to us" -> the "Get Started with Z Shield" page,
// which embeds the Calendly scheduler for booking a meeting.
const GET_STARTED_URL = '/schedule';

const ICONS: Record<string, ReactNode> = {
  // self-hosted → server rack you own
  'self-hosted': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <circle cx="7" cy="7.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="7" cy="16.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  // identity → user
  identity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20a6.5 6 0 0 1 13 0" />
    </svg>
  ),
  // mesh → connected nodes
  mesh: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="6" r="2.2" />
      <circle cx="19" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path d="M6.8 7.6 10.4 16 M17.2 7.6 13.6 16 M7.2 6H16.8" />
    </svg>
  ),
  // air-gap → globe with a slash (isolated / offline)
  airgap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
      <line x1="4.2" y1="4.2" x2="19.8" y2="19.8" />
    </svg>
  ),
  // hot failover → lightning bolt
  'failover-hot': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  ),
  // client-side failover → swap / exchange arrows
  'failover-client': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h13" />
      <path d="M14 5l3 3-3 3" />
      <path d="M20 16H7" />
      <path d="M10 13l-3 3 3 3" />
    </svg>
  ),
};

const features = [
  {
    icon: 'self-hosted',
    title: 'Fully self-hosted',
    body: 'The control plane, database, and relays all run inside your own VPC or datacenter. Nothing, not even device names or ACLs, leaves your boundary.',
  },
  {
    icon: 'identity',
    title: 'Identity-native access',
    body: 'Access is bound to the golden record from your identity platform, not an IP. One person, one identity across every account, revoke them once and every door closes.',
  },
  {
    icon: 'mesh',
    title: 'Direct peer-to-peer mesh',
    body: 'WireGuard tunnels go straight to the resource, end-to-end encrypted and NAT-hole-punched. No backhaul to a concentrator, so it is fast by design.',
  },
  {
    icon: 'airgap',
    title: 'Air-gap capable',
    body: 'Runs with zero internet. Deploy on classified, defense, and offline plant networks a SaaS coordinator can never reach.',
  },
  {
    icon: 'failover-hot',
    title: '~30s hot failover',
    body: 'A Postgres primary/standby with fenced auto-promote recovers in about half a minute, instead of a multi-hour restore-and-replay from backups.',
  },
  {
    icon: 'failover-client',
    title: 'Client-side failover',
    body: 'The client is pre-baked with primary and backup control-plane URLs, so failover needs no HA load balancer, and tunnels keep flowing from the cached map.',
  },
];

const flow = [
  {
    n: 1,
    title: 'Deploy the brain on your own infra',
    body: 'Stand up the ZPOA Zypher VPN control plane and Postgres primary/standby on your own VPC or rack, and point DNS at your box. No vendor cloud is involved.',
  },
  {
    n: 2,
    title: 'Hand out a pre-baked client',
    body: 'The secure client ships already configured with your primary and backup control-plane URLs, so control-plane failover is client-side, no load balancer.',
  },
  {
    n: 3,
    title: 'Authenticate to your own control plane',
    body: 'The user signs in with SSO to your customer-owned control plane and receives a network map: their IP, the peers they may reach, and the ACL policy.',
  },
  {
    n: 4,
    title: 'The gateway advertises the corp network',
    body: 'A subnet router inside the corp network advertises its private CIDRs (e.g. 10.20.0.0/16), the same data-plane role as any mesh subnet router.',
  },
  {
    n: 5,
    title: 'A direct tunnel forms',
    body: 'A direct peer-to-peer WireGuard tunnel forms from laptop to subnet router, with an encrypted relay only as NAT fallback. Only the control plane ever touches the database.',
  },
  {
    n: 6,
    title: 'Reach the private resources',
    body: 'Packets flow straight to the private app servers. If the database dies the standby auto-promotes in ~30s; if a control-plane URL is down the client fails over, and established tunnels never drop.',
  },
];

const capabilities: Array<[string, string]> = [
  ['Who runs the control plane', 'You, on your own infrastructure'],
  ['Where the database lives', 'Your boundary, one database per customer'],
  ['Tenant isolation', 'Physical (separate machines / databases)'],
  ['Durability & HA', 'Streaming standby · ~30s fenced auto-promote'],
  ['Client-side failover', 'Multi-URL baked into the client'],
  ['Air-gap / offline', 'Yes, nothing leaves your boundary'],
  ['Identity model', 'Golden-record identity, lifecycle & approvals'],
  ['Data plane (traffic)', 'Direct P2P WireGuard + encrypted relay'],
];

function VpnHero(): ReactNode {
  return (
    <section className="cvpn-hero">
      <div className="container cvpn-hero-grid">
        <div className="cvpn-hero-copy">
          <div className="cvpn-eyebrow">ZPOA Zypher VPN</div>
          <h1>Secure access without handing over your network.</h1>
          <p className="cvpn-lede">
            Give your team direct, zero-config access to any resource through an
            identity-aware WireGuard mesh, with the control plane, the database,
            and your identity all self-hosted inside your own walls.
          </p>
          <div className="hero-buttons">
            <Link className="hero-btn-primary" to="/docs/modules/vpn/overview">
              Read the docs
            </Link>
            <Link className="hero-btn-secondary" to={GET_STARTED_URL}>
              Contact Sales
            </Link>
          </div>
          <div className="cvpn-trust">
            <span className="cvpn-trust-label">Built for regulated teams</span>
            <div className="cvpn-trust-tags">
              <span>Banking &amp; Finance</span>
              <span>Government &amp; PSU</span>
              <span>Defense</span>
              <span>Healthcare</span>
            </div>
          </div>
        </div>

        <div className="cvpn-status" aria-label="ZPOA Zypher VPN status panel">
          <div className="cvpn-status-head">
            <span className="cvpn-status-dot" />
            <strong>ZPOA Zypher VPN status</strong>
            <span className="cvpn-status-sync">self-hosted</span>
          </div>
          <div className="cvpn-status-rows">
            <div><span>Connection</span><b className="ok">● Online</b></div>
            <div><span>Control plane</span><b className="ok">● In your VPC</b></div>
            <div><span>Data residency</span><b className="ok">● On your soil</b></div>
            <div><span>Latency</span><b>23 ms</b></div>
            <div><span>Standby failover</span><b>~30 s</b></div>
            <div><span>Tunnel</span><b>WireGuard · P2P</b></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VpnMesh(): ReactNode {
  return (
    <section className="cvpn-section cvpn-section-center">
      <div className="container">
        <h2>Seamless remote access, without rearchitecting your network.</h2>
        <p className="cvpn-sub">
          Centralized VPNs are slow to roll out and a single point of failure.
          ZPOA Zypher VPN connects people straight to resources over a peer-to-peer
          mesh, no concentrator in the middle.
        </p>
        <div className="cvpn-figure">
          <img
            src="/img/features/cyber-vpn-mesh.svg"
            alt="Direct peer-to-peer mesh: a remote laptop and branch office connect straight to app server, compute, and database, bypassing a legacy VPN gateway"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function VpnSplit(): ReactNode {
  return (
    <section className="cvpn-section cvpn-section-gray">
      <div className="container cvpn-split">
        <div className="cvpn-split-copy">
          <div className="cvpn-eyebrow">Identity-aware, and yours</div>
          <h2>One brain. Inside your walls.</h2>
          <p>
            Built on WireGuard, ZPOA Zypher VPN keeps the control plane (who-can-reach-what)
            strictly separate from the data plane (the encrypted packets), and
            puts <strong>both</strong> inside your boundary. The coordination server
            is only a matchmaker: it authenticates devices, hands out the network
            map, and helps peers punch through NAT. It never sees your traffic.
          </p>
          <ul className="cvpn-checks">
            <li>Control plane + Postgres primary/standby self-hosted</li>
            <li>Traffic is direct P2P and never routes through the database</li>
            <li>You own the keys, the logs, and the full audit trail</li>
          </ul>
        </div>
        <div className="cvpn-figure">
          <img
            src="/img/features/vpn-architecture.svg"
            alt="ZPOA Zypher VPN self-host architecture: control plane with Postgres primary and standby, plus a data plane of client to subnet router to corp servers"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function VpnArchitecture(): ReactNode {
  return (
    <section className="cvpn-section cvpn-section-center">
      <div className="container">
        <div className="cvpn-eyebrow">Under the hood</div>
        <h2 className="cvpn-h2-center">The technical architecture</h2>
        <p className="cvpn-sub">
          ZPOA Zypher VPN is built on a strict separation of concerns. A
          self-hosted control plane manages authentication, IP allocation, policy,
          and key exchange, coordinating with every endpoint over an encrypted
          Noise_IK channel, yet it never carries a single packet of user traffic.
          The data plane is a direct, end-to-end encrypted WireGuard mesh between
          devices, with a co-hosted DERP relay engaging only when NAT prevents a
          direct path.
        </p>
        <div className="cvpn-figure cvpn-figure-wide">
          <img
            src="/img/features/cyber-vpn-system.svg"
            alt="ZPOA Zypher VPN system architecture: unified agents connect to the zpoa-access control plane over Noise_IK, which reads and writes PostgreSQL, ClickHouse, Redis and Kafka; the data plane is a direct WireGuard mesh to a gateway and corp resources, with a DERP relay fallback"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function VpnFeatures(): ReactNode {
  return (
    <section className="cvpn-section">
      <div className="container">
        <h2 className="cvpn-h2-center">Everything a modern VPN should be, and one thing none of them are.</h2>
        <div className="cvpn-feature-grid">
          {features.map((f) => (
            <div className="cvpn-feature" key={f.title}>
              <span className="cvpn-feature-ic" aria-hidden="true">{ICONS[f.icon]}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VpnFlow(): ReactNode {
  return (
    <section className="cvpn-section cvpn-section-gray">
      <div className="container">
        <h2 className="cvpn-h2-center">How a remote employee reaches the corp network</h2>
        <div className="cvpn-flow">
          {flow.map((s) => (
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

function VpnCompare(): ReactNode {
  return (
    <section className="cvpn-section">
      <div className="container">
        <h2 className="cvpn-h2-center">What you own with ZPOA Zypher VPN</h2>
        <p className="cvpn-sub cvpn-sub-center">
          Self-hosted, identity-native, and yours end to end, the control plane,
          the database, and the identity that governs access all inside your walls.
        </p>
        <div className="cvpn-compare-grid">
          <div className="cvpn-table-wrap">
            <table className="cvpn-table">
              <thead>
                <tr><th>Dimension</th><th className="cvpn-th-us">ZPOA Zypher VPN</th></tr>
              </thead>
              <tbody>
                {capabilities.map(([dim, us]) => (
                  <tr key={dim}>
                    <td className="cvpn-dim">{dim}</td>
                    <td className="cvpn-td-us">{us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="cvpn-compare-fig">
            <img
              src="/img/features/cyber-vpn-flow.svg"
              alt="How a device joins the mesh: Noise_IK handshake, IPAM and posture check, NetworkMap build, HTTP/2 long-poll policy push, and a direct WireGuard tunnel with DERP fallback"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function VpnCTA(): ReactNode {
  return (
    <section className="cta-section">
      <div className="container">
        <h2>Own your network. Not a per-seat meter.</h2>
        <p>Self-hosted, identity-native, air-gap capable. Deploy in your own VPC.</p>
        <div className="hero-buttons">
          <Link className="hero-btn-primary" to="/docs/modules/vpn/overview">
            Read the docs
          </Link>
          <Link className="hero-btn-secondary" to={GET_STARTED_URL}>
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function CyberVpn(): ReactNode {
  return (
    <Layout
      title="ZPOA Zypher VPN"
      description="ZPOA Zypher VPN, a self-hosted, identity-native, zero-trust WireGuard mesh. Control plane, database, and identity all inside your own walls.">
      <main>
        <VpnHero />
        <VpnMesh />
        <VpnSplit />
        <VpnArchitecture />
        <VpnFeatures />
        <VpnFlow />
        <VpnCompare />
        <VpnCTA />
      </main>
    </Layout>
  );
}
