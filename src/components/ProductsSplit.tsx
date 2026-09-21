import {type ReactNode, useState, useRef, useEffect, useLayoutEffect} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import {ICONS} from '@site/src/data/products';
import ProductLogo from '@site/src/components/ProductLogo';

// Products with a real brand logo image get that instead of the generic
// line-icon chip, same as the All Products page.
const LOGO_PRODUCTS = new Set(['vpn', 'capital', 'health']);
function isLogoIcon(icon: string): icon is 'vpn' | 'capital' | 'health' {
  return LOGO_PRODUCTS.has(icon);
}

// Sector-level icons, distinct from (and more legible at this small size
// than) the individual products' own line icons: a shield with a check for
// "this whole line of business is about security", a rising bar chart for
// "financial growth", a heart with a cross for "care", rather than reusing
// a product's specific icon (a VPN padlock, a bank building) as the stand-in
// for its entire sector.
const SS = {viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
const SECTOR_ICONS: Record<string, ReactNode> = {
  security: (<svg {...SS}><path d="M12 3.5l7 2.6v5.4c0 4.6-3 8.3-7 9.5-4-1.2-7-4.9-7-9.5V6.1z" /><path d="M8.7 12.2l2.2 2.2 4.4-4.6" /></svg>),
  finance: (<svg {...SS}><path d="M4 19V13.5 M9.3 19V9.5 M14.7 19V6 M20 19V3" /><path d="M15 4.3l5-1.3-0.3 5" /></svg>),
  healthcare: (<svg {...SS}><path d="M12 20.2s-7.5-4.5-9.3-9.4C1.7 7.4 3.6 4 7 4c2 0 3.6 1.1 4.5 2.7C12.4 5.1 14 4 16 4c3.4 0 5.3 3.4 4.3 6.8-1.8 4.9-8.3 9.4-8.3 9.4z" /><path d="M9.7 10.5h4.6 M12 8.2v4.6" /></svg>),
};

/**
 * Split "Products" navbar item: the label navigates, the chevron opens a menu.
 *
 * Routing note: every entry now lands where its label says it will. Previously
 * the item labelled "ZPOA Zypher VPN" pointed at /products (the portfolio index)
 * rather than the VPN product page, so the most specific item in the menu was
 * the one that did not go where it claimed.
 *
 * Sectors: ZPOA now spans more than one line of business (security, lending,
 * hospital software). The menu is a two-pane mega-menu — a sector list on the
 * left, that sector's products on the right — rather than one flat list, the
 * same pattern large multi-line-of-business sites use for an "Industries" or
 * "Products" mega-menu. A sliding highlight tracks the hovered sector and the
 * right panel cross-fades in, rather than switching instantly.
 */
const PRODUCTS = '/products';          // portfolio overview
const ALL_PRODUCTS = '/all-products';  // full portfolio, with detail
const ZYPHER_VPN = '/cyber-vpn';       // the VPN product page
const CAPITAL = '/capital';            // FinTech Solutions product page, India only
const HEALTH = '/health';              // Ciyex HIMS product page, India only

type Item = {label: string; to: string; desc: string; icon: string; accent: string};
type Sector = {label: string; icon: string; accent: string; blurb: string; items: Item[]};

const securitySector: Sector = {
  label: 'Security Platform',
  icon: 'security', accent: 'accent-vpn',
  blurb: 'The core unified security platform.',
  items: [
    {label: 'ZPOA Zypher VPN', to: ZYPHER_VPN, desc: 'Self-hosted zero-trust mesh VPN.', icon: 'vpn', accent: 'accent-vpn'},
  ],
};

// FinTech Solutions (the Ciya Micro Credit lending platform) and Ciyex HIMS (a
// hospital information system) are India-specific: their regulatory surface
// (NBFC-MFI lending rules, ABDM/GST) isn't relevant outside that market, so
// they're only inserted for the en-in locale. Each points at its own product
// page, same as ZPOA Zypher VPN, not straight out to an external app.
const financeSector: Sector = {
  label: 'Financial Services',
  icon: 'finance', accent: 'accent-capital',
  blurb: 'Lending operations for microfinance institutions.',
  items: [
    {label: 'FinTech Solutions', to: CAPITAL, desc: 'Group-lending & collections platform.', icon: 'capital', accent: 'accent-capital'},
  ],
};
const healthcareSector: Sector = {
  label: 'Healthcare',
  icon: 'healthcare', accent: 'accent-health',
  blurb: 'Facility management for hospitals & clinics.',
  items: [
    {label: 'Ciyex HIMS', to: HEALTH, desc: 'Hospital Information Management System.', icon: 'health', accent: 'accent-health'},
  ],
};

// Zara is deliberately absent from every sector: it is a platform capability,
// not a product, and lives on the Features page (/features#zara).

export default function ProductsSplit(props: {mobile?: boolean}): ReactNode {
  const {i18n} = useDocusaurusContext();
  const sectors = i18n.currentLocale === 'en-in'
    ? [securitySector, financeSector, healthcareSector]
    : [securitySector];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [highlight, setHighlight] = useState({top: 0, height: 0});
  const activeSector = sectors[active] ?? sectors[0];

  // Measures the active <li> so the highlight pill can slide to it with a
  // real transition, instead of the active state just jumping between items.
  useLayoutEffect(() => {
    const el = itemRefs.current[active];
    const nav = navRef.current;
    if (el && nav) {
      setHighlight({top: el.offsetTop, height: el.offsetHeight});
    }
  }, [active, open, sectors.length]);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Reset to the first sector each time the menu opens, so it never opens
  // showing whatever was last hovered in a previous session.
  useEffect(() => {
    if (open) setActive(0);
  }, [open]);

  // Mobile sidebar: flat list per sector, no hover affordance to depend on.
  if (props.mobile) {
    return (
      <li className="menu__list-item">
        <Link className="menu__link" to={PRODUCTS}>Products</Link>
        <ul className="menu__list">
          {sectors.map((sector) => (
            <li className="menu__list-item" key={sector.label}>
              <span className="menu__link products-split-sector-mobile">{sector.label}</span>
              <ul className="menu__list">
                {sector.items.map((m) => (
                  <li className="menu__list-item" key={m.to}>
                    <Link className="menu__link" to={m.to}>{m.label}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li className="menu__list-item">
            <Link className="menu__link" to={ALL_PRODUCTS}>All Products</Link>
          </li>
        </ul>
      </li>
    );
  }

  return (
    <div
      ref={ref}
      className={clsx(
        'navbar__item',
        'dropdown',
        'dropdown--hoverable',
        'products-split',
        open && 'dropdown--show',
      )}
      onMouseLeave={() => setOpen(false)}>
      <Link className="navbar__link products-split-label" to={PRODUCTS}>
        Products
      </Link>
      <button
        type="button"
        className={clsx('products-split-caret', open && 'is-open')}
        aria-label={open ? 'Close products menu' : 'Open products menu'}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="zpoa-products-menu"
        onClick={() => setOpen((o) => !o)}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div id="zpoa-products-menu" className="dropdown__menu products-mega">
        <ul className="products-mega-nav" ref={navRef}>
          <li
            className="products-mega-nav-highlight"
            style={{transform: `translateY(${highlight.top}px)`, height: highlight.height}}
            aria-hidden="true"
          />
          {sectors.map((sector, i) => (
            <li key={sector.label} ref={(el) => { itemRefs.current[i] = el; }}>
              <button
                type="button"
                className={clsx('products-mega-nav-item', i === active && 'is-active')}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}>
                <span className={`products-mega-nav-ic ${sector.accent}`} aria-hidden="true">{SECTOR_ICONS[sector.icon]}</span>
                {sector.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="products-mega-panel">
          <div className="products-mega-panel-inner" key={activeSector.label}>
            <div className="products-mega-panel-head">
              <span className={`products-mega-panel-ic ${activeSector.accent}`} aria-hidden="true">{SECTOR_ICONS[activeSector.icon]}</span>
              <div>
                <h4>{activeSector.label}</h4>
                <p>{activeSector.blurb}</p>
              </div>
            </div>
            <div className={clsx('products-mega-grid', activeSector.items.length === 1 && 'products-mega-grid--single')}>
              {activeSector.items.map((m) => (
                <Link className="products-mega-card" to={m.to} onClick={() => setOpen(false)} key={m.to}>
                  {isLogoIcon(m.icon) ? (
                    <ProductLogo product={m.icon} className="products-mega-card-logo" size={34} />
                  ) : (
                    <span className={`products-mega-card-ic ${m.accent}`} aria-hidden="true">{ICONS[m.icon]}</span>
                  )}
                  <span className="products-mega-card-body">
                    <span className="products-mega-card-title">{m.label}</span>
                    <span className="products-mega-card-desc">{m.desc}</span>
                  </span>
                  <span className="products-mega-card-arrow" aria-hidden="true">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>
          <Link className="products-mega-all" to={ALL_PRODUCTS} onClick={() => setOpen(false)}>
            See all products <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
