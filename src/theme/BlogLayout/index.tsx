import React, {type ReactNode} from 'react';
import {useLocation} from '@docusaurus/router';
import Layout from '@theme/Layout';
import OriginalBlogLayout from '@theme-original/BlogLayout';
import type BlogLayoutType from '@theme/BlogLayout';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof BlogLayoutType>;

/**
 * Blog layout wrapper.
 *
 * Previously only the /blog index got the list treatment, so tag, paginated,
 * and archive listings fell back to raw Infima — full-size headings in link
 * blue, full-width hero images, no card. They are all the same kind of page and
 * now share the same shell; only the index carries the masthead.
 */
function classify(pathname: string) {
  const p = pathname.replace(/\/+$/, '') || '/';
  const isIndex = p === '/blog';
  const isList =
    isIndex ||
    p.startsWith('/blog/tags') ||
    p.startsWith('/blog/page') ||
    p === '/blog/archive';
  return {isIndex, isList};
}

export default function BlogLayoutWrapper(props: Props): ReactNode {
  const {pathname} = useLocation();
  const {isIndex, isList} = classify(pathname);

  if (!isList) {
    return <OriginalBlogLayout {...props} />;
  }

  const {children, sidebar, toc, ...layoutProps} = props as any;

  return (
    <Layout {...layoutProps}>
      {isIndex && (
        <section className="zpoa-blog-hero">
          <div className="zpoa-blog-hero__inner">
            <span className="zpoa-blog-hero__eyebrow">Insights</span>
            <h1 className="zpoa-blog-hero__title">News &amp; Insights</h1>
            <p className="zpoa-blog-hero__subtitle">
              Cybersecurity perspectives, product updates, and threat intelligence
              from the ZPOA team.
            </p>
          </div>
        </section>
      )}
      <main className={`zpoa-blog-list${isIndex ? '' : ' is-filtered'}`}>
        {children}
      </main>
    </Layout>
  );
}
