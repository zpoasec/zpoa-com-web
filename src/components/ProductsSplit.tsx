import {type ReactNode, useState, useRef, useEffect, useLayoutEffect} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import {ICONS, CATEGORY_ORDER, productsForLocale, type Product} from '@site/src/data/products';
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
  ai: (<svg {...SS}><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" /><path d="M19 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" /></svg>),
  threat: (<svg {...SS}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><path d="M12 2.5v2.3 M12 19.2v2.3 M2.5 12h2.3 M19.2 12h2.3" /></svg>),
  identity: (<svg {...SS}><path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3z" /><circle cx="12" cy="10.3" r="2.2" /><path d="M8.6 16.8c.7-2 1.9-3 3.4-3s2.7 1 3.4 3" /></svg>),
  compliance: (<svg {...SS}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4h6v2.4H9z" /><path d="M8.6 13l2.2 2.2 4-4" /></svg>),
  recent: (<svg {...SS} fill="currentColor" stroke="none"><path d="M12 2.5l2.6 6.6 7 .4-5.5 4.4 1.9 6.8-5.9-4-5.9 4 1.9-6.8-5.5-4.4 7-.4z" /></svg>),
};

// Friendly per-category presentation for the mega-menu: a nicer label than
// the raw CATEGORY_ORDER string where useful, plus the icon/accent/blurb
// shown in the panel head. Categories with zero products for the current
// locale (Financial Services, Healthcare outside en-in) are dropped rather
// than shown empty.
const CATEGORY_META: Record<string, {label: string; icon: string; accent: string; blurb: string}> = {
  'Featured Apps': {label: 'Security Platform', icon: 'security', accent: 'accent-vpn', blurb: 'The core unified security platform.'},
  'Financial Services': {label: 'Financial Services', icon: 'finance', accent: 'accent-capital', blurb: 'Lending operations for microfinance institutions.'},
  'Healthcare': {label: 'Healthcare', icon: 'healthcare', accent: 'accent-health', blurb: 'Facility management for hospitals & clinics.'},
  'AI & Automation': {label: 'AI & Automation', icon: 'ai', accent: 'accent-zara', blurb: 'An agent layer that plans and acts across every module.'},
  'Threat Detection & Response': {label: 'Threat Detection & Response', icon: 'threat', accent: 'accent-detect', blurb: 'Detect, correlate, and respond before threats spread.'},
  'Identity & Insider Risk': {label: 'Identity & Insider Risk', icon: 'identity', accent: 'accent-fortress', blurb: 'Govern access and catch insider risk early.'},
  'Compliance, Assets & Endpoints': {label: 'Compliance, Assets & Endpoints', icon: 'compliance', accent: 'accent-comply', blurb: 'Stay audit-ready across every asset and endpoint.'},
};

// Kept out of this navbar menu (still reachable via /all-products): these
// sit under the single "Security Platform" flagship rather than as their
// own top-level entries here.
const HIDDEN_CATEGORIES = new Set([
  'Threat Detection & Response',
  'Identity & Insider Risk',
  'Compliance, Assets & Endpoints',
]);

/**
 * Split "Products" navbar item: the label navigates, the chevron opens a menu.
 *
 * Routing note: every entry now lands where its label says it will. Previously
 * the item labelled "Zypher VPN" pointed at /products (the portfolio index)
 * rather than the VPN product page, so the most specific item in the menu was
 * the one that did not go where it claimed.
 *
 * Full catalog, not just flagships: earlier this only listed one product per
 * sector (VPN, FinTech Solutions, Ciyex HIMS), so Detect, Fortress, Comply
 * and the rest of the catalog were unreachable from the navbar entirely.
 * The sector list and each sector's product grid are now both derived from
 * the same PRODUCTS data the All Products page uses, Zoho-catalog style: a
 * "Recent Launches" pinned entry, every category represented, and a search
 * box that searches the whole catalog rather than just the active sector.
 */
const PRODUCTS_PAGE = '/products';     // portfolio overview
const ALL_PRODUCTS = '/all-products';  // full portfolio, with detail

type Item = {label: string; to: string; desc: string; icon: string; accent: string; isNew?: boolean};
type Sector = {label: string; icon: string; accent: string; blurb: string; items: Item[]};

// Zara is deliberately absent from every sector: it is a platform capability,
// not a product, and lives on the Features page (/features#zara).

export default function ProductsSplit(props: {mobile?: boolean}): ReactNode {
  const {i18n} = useDocusaurusContext();
  const localeProducts = productsForLocale(i18n.currentLocale);

  const toItem = (p: Product): Item =>
    ({label: p.name, to: p.to, desc: p.tagline, icon: p.icon, accent: p.accent, isNew: p.isNew});

  const categorySectors: Sector[] = CATEGORY_ORDER
    .filter((cat) => !HIDDEN_CATEGORIES.has(cat))
    .map((cat) => {
      const items = localeProducts.filter((p) => p.category === cat).map(toItem);
      if (!items.length) return null;
      const meta = CATEGORY_META[cat];
      return {label: meta.label, icon: meta.icon, accent: meta.accent, blurb: meta.blurb, items};
    }).filter((s): s is Sector => s !== null);

  const recentItems = localeProducts.filter((p) => p.isNew).map(toItem);
  const sectors: Sector[] = recentItems.length
    ? [{label: 'Recent Launches', icon: 'recent', accent: 'accent-vpn', blurb: 'Just shipped, worth a look.', items: recentItems}, ...categorySectors]
    : categorySectors;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [highlight, setHighlight] = useState({top: 0, height: 0});
  const activeSector = sectors[active] ?? sectors[0];

  const q = query.trim().toLowerCase();
  const searchResults = q
    ? localeProducts.filter((p) => p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q)).map(toItem)
    : null;
  const panelSector: Sector = searchResults
    ? {
        label: `Results for "${query.trim()}"`,
        icon: 'recent',
        accent: 'accent-vpn',
        blurb: `${searchResults.length} match${searchResults.length === 1 ? '' : 'es'}`,
        items: searchResults,
      }
    : activeSector;

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

  // Reset to the first sector and clear any search each time the menu opens,
  // so it never opens showing whatever was last hovered or typed.
  useEffect(() => {
    if (open) {
      setActive(0);
      setQuery('');
    }
  }, [open]);

  // Mobile sidebar: flat list per sector, no hover affordance to depend on.
  if (props.mobile) {
    return (
      <li className="menu__list-item">
        <Link className="menu__link" to={PRODUCTS_PAGE}>Products</Link>
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
      <Link className="navbar__link products-split-label" to={PRODUCTS_PAGE}>
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
        <div className="products-mega-nav-col">
          <div className="products-mega-search">
            <svg className="products-mega-search-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="I'm looking for..."
              aria-label="Search products"
            />
          </div>
          <ul className="products-mega-nav" ref={navRef}>
            {!searchResults && (
              <li
                className="products-mega-nav-highlight"
                style={{transform: `translateY(${highlight.top}px)`, height: highlight.height}}
                aria-hidden="true"
              />
            )}
            {sectors.map((sector, i) => (
              <li key={sector.label} ref={(el) => { itemRefs.current[i] = el; }}>
                <button
                  type="button"
                  className={clsx('products-mega-nav-item', !searchResults && i === active && 'is-active')}
                  onMouseEnter={() => { setActive(i); setQuery(''); }}
                  onFocus={() => { setActive(i); setQuery(''); }}>
                  <span className={`products-mega-nav-ic ${sector.accent}`} aria-hidden="true">{SECTOR_ICONS[sector.icon]}</span>
                  {sector.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="products-mega-panel">
          <div className="products-mega-panel-inner" key={panelSector.label}>
            <div className="products-mega-panel-head">
              <span className={`products-mega-panel-ic ${panelSector.accent}`} aria-hidden="true">{SECTOR_ICONS[panelSector.icon]}</span>
              <div>
                <h4>{panelSector.label}</h4>
                <p>{panelSector.blurb}</p>
              </div>
            </div>
            {panelSector.items.length === 0 ? (
              <p className="products-mega-empty">No products match &ldquo;{query.trim()}&rdquo;.</p>
            ) : (
              <div className={clsx('products-mega-grid', panelSector.items.length === 1 && 'products-mega-grid--single')}>
                {panelSector.items.map((m) => (
                  <Link className="products-mega-card" to={m.to} onClick={() => setOpen(false)} key={m.to}>
                    {isLogoIcon(m.icon) ? (
                      <ProductLogo product={m.icon} className="products-mega-card-logo" size={34} />
                    ) : (
                      <span className={`products-mega-card-ic ${m.accent}`} aria-hidden="true">{ICONS[m.icon]}</span>
                    )}
                    <span className="products-mega-card-body">
                      <span className="products-mega-card-title">
                        {m.label}
                        {m.isNew && <span className="products-mega-card-new">New</span>}
                      </span>
                      <span className="products-mega-card-desc">{m.desc}</span>
                    </span>
                    <span className="products-mega-card-arrow" aria-hidden="true">&rarr;</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link className="products-mega-all" to={ALL_PRODUCTS} onClick={() => setOpen(false)}>
            See all products <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
