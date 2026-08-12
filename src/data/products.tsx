import type {ReactNode} from 'react';

export const LOGO = '/img/products/zypher-logo.svg';

const S = {
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
};

export const ICONS: Record<string, ReactNode> = {
  vpn: (<svg {...S}><path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3z" /><path d="M12 10 9.5 13 M12 10 14.5 13 M9.7 13h4.6" /><circle cx="12" cy="10" r="0.9" fill="currentColor" stroke="none" /><circle cx="9.5" cy="13" r="0.9" fill="currentColor" stroke="none" /><circle cx="14.5" cy="13" r="0.9" fill="currentColor" stroke="none" /></svg>),
  detect: (<svg {...S}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.3" /><line x1="12" y1="12" x2="18.5" y2="7.5" /><circle cx="17" cy="8" r="0.7" fill="currentColor" stroke="none" /></svg>),
  neural: (<svg {...S}><circle cx="6" cy="8" r="2" /><circle cx="18" cy="8" r="2" /><circle cx="12" cy="17" r="2" /><path d="M7.7 9.4 10.7 15.3 M16.3 9.4 13.3 15.3 M8 8h8" /></svg>),
  fortress: (<svg {...S}><path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3z" /><circle cx="12" cy="11" r="1.5" /><path d="M12 12.5V15" /></svg>),
  monitor: (<svg {...S}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="2.7" /></svg>),
  comply: (<svg {...S}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4h6v2.4H9z" /><path d="M8.6 13l2.2 2.2 4-4" /></svg>),
  discover: (<svg {...S}><circle cx="11" cy="11" r="6" /><line x1="15.5" y1="15.5" x2="20" y2="20" /></svg>),
  armor: (<svg {...S}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>),
  aisec: (<svg {...S}><path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3z" /><path d="M12 8.4l1.1 2.5 2.5 1.1-2.5 1.1L12 15.6l-1.1-2.5L8.4 12l2.5-1.1z" /></svg>),
  zara: (<svg {...S}><path d="M5 4.6h14a2 2 0 0 1 2 2v6.6a2 2 0 0 1-2 2h-7.6L7 19v-3.8H5a2 2 0 0 1-2-2V6.6a2 2 0 0 1 2-2z" /><path d="M11.4 7.1l.9 2.5 2.5.9-2.5.9-.9 2.5-.9-2.5-2.5-.9 2.5-.9z" fill="currentColor" stroke="none" /></svg>),
};

export type Product = {
  name: string;
  tagline: string;
  desc: string;
  features: string[];
  to: string;
  accent: string;
  icon: string;
  category: string;
  isNew?: boolean;
  /** Render the Zara workspace mockup in the detail card instead of plain copy. */
  visual?: 'zara';
};

export const CATEGORY_ORDER = [
  'Featured Apps',
  'AI & Automation',
  'Threat Detection & Response',
  'Identity & Insider Risk',
  'Compliance, Assets & Endpoints',
];

export const PRODUCTS: Product[] = [
  {
    name: 'ZPOA Zypher VPN', category: 'Featured Apps', accent: 'accent-vpn', icon: 'vpn', to: '/cyber-vpn', isNew: true,
    tagline: 'Self-hosted zero-trust mesh VPN',
    desc: 'A self-hosted, identity-native zero-trust mesh VPN. Direct peer-to-peer WireGuard tunnels, with the control plane, the database, and the identity that governs access all inside your own walls.',
    features: ['Self-hosted control plane, database & relays', 'Direct peer-to-peer WireGuard mesh', 'Air-gap capable, physical tenant isolation', 'Identity-native access via the golden record'],
  },
  {
    name: 'Zara AI', category: 'AI & Automation', accent: 'accent-zara', icon: 'zara', to: '/features#zara',
    tagline: 'Agent that works across every module',
    desc: 'Not a tenth module — an agent layered over the other nine. Zara plans a sequence of tool calls, executes them against your live tenant across whichever modules hold the answer, and cannot change anything until a human approves the action.',
    features: ['Plans and executes multi-step tool calls, not single lookups', 'Every write is fail-closed — no approver, no action', 'Runs on your model: Ollama, Bedrock, OpenAI or Anthropic', 'MCP servers registered, approved and audited per agent'],
    isNew: true,
    visual: 'zara',
  },
  {
    name: 'Detect', category: 'Threat Detection & Response', accent: 'accent-detect', icon: 'detect', to: '/docs/modules/detect/overview',
    tagline: 'Next-generation SIEM & threat detection',
    desc: 'Next-generation SIEM that ingests, normalizes, and correlates logs from 690+ sources with AI-powered detection, full MITRE ATT&CK mapping, and sub-second alerting.',
    features: ['690+ out-of-the-box data source connectors', 'SIGMA-compatible detection rules', 'Full MITRE ATT&CK coverage & mapping', 'Sub-second real-time alerting'],
  },
  {
    name: 'Neural Mesh', category: 'Threat Detection & Response', accent: 'accent-neural', icon: 'neural', to: '/docs/modules/neural-mesh/overview',
    tagline: 'AI intelligence engine',
    desc: 'The AI intelligence layer that correlates signals across every module, identifies multi-stage attack chains, and surfaces threats that siloed tools miss.',
    features: ['Cross-module signal correlation', 'Automated investigation & root-cause analysis', 'Threat intelligence from 12+ feeds', 'Natural-language security queries'],
  },
  {
    name: 'Fortress', category: 'Identity & Insider Risk', accent: 'accent-fortress', icon: 'fortress', to: '/docs/modules/fortress/overview',
    tagline: 'Identity governance & administration',
    desc: 'Full-spectrum identity governance with 690+ connectors, non-human identity governance, identity threat detection, and just-in-time access provisioning.',
    features: ['IGA with Identity Fabric architecture', 'Non-human identity (NHI) governance & ITDR', 'Just-in-time access with AI Copilot', 'Automated lifecycle & access reviews'],
  },
  {
    name: 'Monitor', category: 'Identity & Insider Risk', accent: 'accent-monitor', icon: 'monitor', to: '/docs/modules/monitor/overview',
    tagline: 'User activity monitoring',
    desc: 'Insider threat detection, data loss prevention, workforce analytics, and session recording in a single privacy-first agent.',
    features: ['Real-time activity monitoring & insider scoring', 'Data exfiltration detection across USB, cloud & email', 'AI-powered screenshot & audio analysis', 'Remote desktop, shell & file transfer'],
  },
  {
    name: 'Comply', category: 'Compliance, Assets & Endpoints', accent: 'accent-comply', icon: 'comply', to: '/docs/modules/comply/overview',
    tagline: 'GRC & compliance automation',
    desc: 'AI-powered GRC that automates evidence collection and continuous posture assessment across SOC 2, ISO 27001, PCI-DSS, HIPAA, NIST, and GDPR.',
    features: ['AI Compliance Copilot for evidence mapping', 'Continuous posture monitoring & scoring', 'Multi-framework with cross-inheritance', 'One-click audit-ready reports'],
  },
  {
    name: 'Discover', category: 'Compliance, Assets & Endpoints', accent: 'accent-discover', icon: 'discover', to: '/docs/modules/discover/overview',
    tagline: 'Asset inventory & attack surface',
    desc: 'Continuous discovery and classification of every asset across cloud and on-premises environments, with prioritized vulnerability scoring and attack surface mapping.',
    features: ['Continuous cloud & on-prem discovery', 'Automated asset classification & criticality', 'CVSS & EPSS vulnerability scoring', 'Attack surface mapping & remediation'],
  },
  {
    name: 'Armor', category: 'Compliance, Assets & Endpoints', accent: 'accent-armor', icon: 'armor', to: '/docs/modules/armor/overview',
    tagline: 'Endpoint protection & hardening',
    desc: 'Endpoint hardening, vulnerability management, and patch orchestration across your entire fleet, with misconfiguration detection and drift tracking.',
    features: ['Security baseline enforcement', 'Vulnerability management with exploitability scoring', 'Automated patch orchestration & rollback', 'Configuration & drift detection'],
  },
  {
    name: 'AI Security', category: 'Threat Detection & Response', accent: 'accent-aisec', icon: 'aisec', to: '/docs/modules/ai-sec/overview',
    tagline: 'Shadow AI discovery & AI-DLP',
    desc: 'Inventory every AI tool in use across the organization, govern it as sanctioned or blocked, and inspect what sensitive data leaves for it — with policy enforcement built for prompts rather than files.',
    features: ['Shadow AI discovery across generative, code, image & voice tools', 'Sanctioned / unauthorized / blocked governance', 'AI-DLP inspection for PII, credentials & source code', 'Prompt-injection detection and agent kill switch'],
    isNew: true,
  },
];
