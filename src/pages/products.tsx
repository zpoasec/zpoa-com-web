import {type ReactNode, useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {PRODUCTS, ICONS, CATEGORY_ORDER, type Product} from '@site/src/data/products';
import ProductLogo from '@site/src/components/ProductLogo';

const featured = PRODUCTS[0]; // ZPOA Zypher VPN

function ProductTile({p}: {p: Product}): ReactNode {
  return (
    <Link className="prod-tile" to={p.to}>
      <span className={`prod-ic ${p.accent}`} aria-hidden="true">{ICONS[p.icon]}</span>
      <div className="prod-tile-body">
        <div className="prod-tile-name">{p.name}</div>
        <div className="prod-tile-tagline">{p.tagline}</div>
      </div>
      <span className="prod-tile-arrow" aria-hidden="true">&rarr;</span>
    </Link>
  );
}

function ExploreAll(): ReactNode {
  return (
    <Link className="prodx-explore-all" to="/all-products">
      Explore all products <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}

export default function Products(): ReactNode {
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const matches = (p: Product) =>
    !query || p.name.toLowerCase().includes(query) || p.tagline.toLowerCase().includes(query);

  const filtered = PRODUCTS.filter(matches);
  const showRecent = matches(featured);

  return (
    <Layout
      title="Products"
      description="Explore the Z Shield product portfolio, including ZPOA Zypher VPN, Detect, Fortress, Comply, and more.">
      <main className="prodx">
        <div className="container prodx-grid">
          {/* ── Sidebar ── */}
          <aside className="prodx-side">
            <div className="prodx-side-title">Apps</div>
            <div className="prodx-search">
              <svg className="prodx-search-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products"
                aria-label="Search products"
              />
            </div>

            <div className="prodx-side-group">
              <div className="prodx-side-label">Recent Launches</div>
              <Link className="prodx-side-item" to={featured.to}>
                <ProductLogo className="prodx-side-logo" size={26} />
                <span>{featured.name}</span>
                <span className="prodx-side-new">New</span>
              </Link>
            </div>

          </aside>

          {/* ── Main ── */}
          <div className="prodx-main">
            <div className="prod-eyebrow">Products</div>
            <p className="prodx-lede">
              Purpose-built products that each solve one problem well, and work
              together as one unified platform.
            </p>

            {showRecent && (
              <section className="prodx-block">
                <h2 className="prodx-h2">Recent Launches</h2>
                <Link className="prodx-featured" to={featured.to}>
                  <ProductLogo className="prodx-featured-logo" size={84} alt="ZPOA Zypher VPN logo" />
                  <div className="prodx-featured-body">
                    <span className="prod-badge-new">New</span>
                    <h3>{featured.name}</h3>
                    <p className="prodx-featured-tagline">{featured.tagline}</p>
                    <p className="prodx-featured-desc">{featured.desc}</p>
                    <span className="prod-link">Explore {featured.name} <span aria-hidden="true">&rarr;</span></span>
                  </div>
                </Link>
              </section>
            )}

            <section className="prodx-block">
              <div className="prodx-block-head">
                <h2 className="prodx-h2">All products</h2>
                <ExploreAll />
              </div>
              {filtered.length === 0 ? (
                <p className="prodx-empty">No products match &ldquo;{q}&rdquo;.</p>
              ) : (
                CATEGORY_ORDER.map((cat) => {
                  const items = filtered.filter((p) => p.category === cat);
                  if (!items.length) return null;
                  return (
                    <div className="prodx-cat" key={cat}>
                      <h4 className="prodx-cat-name">{cat}</h4>
                      <div className="prod-grid prodx-cat-grid">
                        {items.map((p) => (
                          <ProductTile p={p} key={p.name} />
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}
