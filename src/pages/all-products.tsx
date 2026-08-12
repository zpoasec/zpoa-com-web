import {type ReactNode, useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {PRODUCTS, ICONS, CATEGORY_ORDER, type Product} from '@site/src/data/products';
import ProductLogo from '@site/src/components/ProductLogo';
import ZaraWorkspace from '@site/src/components/ZaraWorkspace';

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const featured = PRODUCTS[0]; // ZPOA Zypher VPN

function ProductDetail({p}: {p: Product}): ReactNode {
  return (
    <div className={`allp-card${p.visual ? ' allp-card--wide' : ''}`}>
      <div className="allp-card-head">
        {p.icon === 'vpn' ? (
          <ProductLogo className="allp-logo" size={54} />
        ) : (
          <span className={`allp-ic ${p.accent}`} aria-hidden="true">{ICONS[p.icon]}</span>
        )}
        <div>
          <div className="allp-name-row">
            <h3>{p.name}</h3>
            {p.isNew && <span className="prod-badge-new">New</span>}
          </div>
          <p className="allp-tagline">{p.tagline}</p>
        </div>
      </div>
      <p className="allp-desc">{p.desc}</p>
      <ul className="allp-features">
        {p.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      {p.visual === 'zara' && (
        <div className="allp-visual">
          <ZaraWorkspace />
        </div>
      )}
      <Link className="allp-link" to={p.to}>
        Explore {p.name} <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  );
}

export default function AllProducts(): ReactNode {
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const matches = (p: Product) =>
    !query ||
    p.name.toLowerCase().includes(query) ||
    p.tagline.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query);
  const filtered = PRODUCTS.filter(matches);

  return (
    <Layout
      title="All Products"
      description="The complete Z Shield product portfolio with details — ZPOA Zypher VPN, Detect, Neural Mesh, Fortress, Monitor, Comply, Discover, and Armor.">
      <main className="allp">
        {/* ── Hero band ── */}
        <section className="allp-hero2">
          <div className="container">
            <h1>All the software you need to run your business</h1>
            <div className="allp-hero-rule" />
          </div>
        </section>
        <div className="container allp-search-wrap">
          <div className="allp-search">
            <svg className="allp-search-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="I'm looking for..."
              aria-label="Search products"
            />
          </div>
        </div>

        {/* ── Two-pane body ── */}
        <section className="allp-body2">
          <div className="container allp-grid2">
            <aside className="allp-side">
              <div className="allp-side-featured">Featured Apps</div>
              <div className="allp-side-group">
                <div className="allp-side-label">Apps</div>
                <Link className="allp-side-item" to={featured.to}>
                  <ProductLogo className="allp-side-logo" size={26} />
                  <span>{featured.name}</span>
                  <span className="allp-side-new">New</span>
                </Link>
              </div>
              <div className="allp-side-group">
                <div className="allp-side-label">Categories</div>
                {CATEGORY_ORDER.map((cat) => (
                  <a className="allp-side-cat" href={`#${slug(cat)}`} key={cat}>{cat}</a>
                ))}
              </div>
            </aside>

            <div className="allp-main">
              {filtered.length === 0 ? (
                <p className="allp-empty">No products match &ldquo;{q}&rdquo;.</p>
              ) : (
                CATEGORY_ORDER.map((cat) => {
                  const items = filtered.filter((p) => p.category === cat);
                  if (!items.length) return null;
                  const isFeatured = cat === 'Featured Apps';
                  return (
                    <div className="allp-cat" id={slug(cat)} key={cat}>
                      {isFeatured ? (
                        <h2 className="allp-cat-label">{cat}</h2>
                      ) : (
                        <h2 className="allp-cat-name">{cat}</h2>
                      )}
                      <div className={`allp-grid${isFeatured ? ' allp-featured-grid' : ''}`}>
                        {items.map((p) => (
                          <ProductDetail p={p} key={p.name} />
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <h2>One platform. Every capability.</h2>
            <p>Start with one product and add the rest whenever you are ready.</p>
            <div className="hero-buttons">
              <Link className="hero-btn-primary" to="/docs/getting-started/quick-start">Get Started Free</Link>
              <Link className="hero-btn-secondary" to="/schedule">Contact Sales</Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
