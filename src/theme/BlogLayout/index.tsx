import React, {type ReactNode} from 'react';
import {useLocation} from '@docusaurus/router';
import Layout from '@theme/Layout';
import OriginalBlogLayout from '@theme-original/BlogLayout';
import type BlogLayoutType from '@theme/BlogLayout';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof BlogLayoutType>;

export default function BlogLayoutWrapper(props: Props): ReactNode {
  const {pathname} = useLocation();
  const isBlogList = pathname === '/blog' || pathname === '/blog/';

  if (!isBlogList) {
    return <OriginalBlogLayout {...props} />;
  }

  const {children, sidebar, toc, ...layoutProps} = props as any;

  return (
    <Layout {...layoutProps}>
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
      <main className="zpoa-blog-list">{children}</main>
    </Layout>
  );
}
