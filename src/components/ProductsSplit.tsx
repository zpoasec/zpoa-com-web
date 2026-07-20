import {type ReactNode, useState, useRef, useEffect} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

// Clicking the "Products" label opens Explore All Products; the chevron toggles
// a menu with "All Products".
const EXPLORE_ALL = '/all-products';
const ALL_PRODUCTS = '/products';

export default function ProductsSplit(props: {mobile?: boolean}): ReactNode {
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

  // Mobile sidebar: a "Products" link with an "All Products" sub-link.
  if (props.mobile) {
    return (
      <li className="menu__list-item">
        <Link className="menu__link" to={EXPLORE_ALL}>Products</Link>
        <ul className="menu__list">
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
      className={clsx('navbar__item', 'dropdown', 'dropdown--hoverable', 'products-split', open && 'dropdown--show')}
      onMouseLeave={() => setOpen(false)}>
      <Link className="navbar__link products-split-label" to={EXPLORE_ALL}>
        Products
      </Link>
      <button
        type="button"
        className={clsx('products-split-caret', open && 'is-open')}
        aria-label="Toggle products menu"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="zwc-global-menu-container"
        onClick={() => setOpen((o) => !o)}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <ul id="zwc-global-menu-container" className="dropdown__menu">
        <li>
          <Link className="dropdown__link" to={ALL_PRODUCTS} onClick={() => setOpen(false)}>
            All Products
          </Link>
        </li>
      </ul>
    </div>
  );
}
