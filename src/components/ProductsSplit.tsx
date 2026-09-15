import {type ReactNode, useState, useRef, useEffect} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';

/**
 * Split "Products" navbar item: the label navigates, the chevron opens a menu.
 *
 * Routing note: every entry now lands where its label says it will. Previously
 * the item labelled "ZPOA Zypher VPN" pointed at /products (the portfolio index)
 * rather than the VPN product page, so the most specific item in the menu was
 * the one that did not go where it claimed.
 */
const PRODUCTS = '/products';          // portfolio overview
const ALL_PRODUCTS = '/all-products';  // full portfolio, with detail
const ZYPHER_VPN = '/cyber-vpn';       // the VPN product page
const CAPITAL = '/capital';            // ZPOA Capital product page, India only

// Zara is deliberately absent: it is a platform capability, not a product, and
// lives on the Features page (/features#zara).
const baseMenu: Array<{label: string; to: string; desc: string}> = [
  {label: 'ZPOA Zypher VPN', to: ZYPHER_VPN, desc: 'Self-hosted zero-trust mesh'},
  {label: 'All Products', to: ALL_PRODUCTS, desc: 'The complete portfolio'},
];

// ZPOA Capital (the Ciya Micro Credit lending platform) is an India-specific
// product — microfinance lending operations aren't relevant outside that
// market, so it's inserted only for the en-in locale rather than shown
// everywhere. Points at its own product page, same as ZPOA Zypher VPN, not
// straight out to the external app.
const capitalItem = {label: 'ZPOA Capital', to: CAPITAL, desc: 'Group-lending & collections platform'};

export default function ProductsSplit(props: {mobile?: boolean}): ReactNode {
  const {i18n} = useDocusaurusContext();
  const menu = i18n.currentLocale === 'en-in'
    ? [baseMenu[0], capitalItem, baseMenu[1]]
    : baseMenu;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  // Mobile sidebar: flat list, no hover affordance to depend on.
  if (props.mobile) {
    return (
      <li className="menu__list-item">
        <Link className="menu__link" to={PRODUCTS}>Products</Link>
        <ul className="menu__list">
          {menu.map((m) => (
            <li className="menu__list-item" key={m.to}>
              <Link className="menu__link" to={m.to}>{m.label}</Link>
            </li>
          ))}
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
      <ul id="zpoa-products-menu" className="dropdown__menu products-split-menu">
        {menu.map((m) => (
          <li key={m.to}>
            <Link className="dropdown__link" to={m.to} onClick={() => setOpen(false)}>
              <span className="products-split-item">{m.label}</span>
              <span className="products-split-desc">{m.desc}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
