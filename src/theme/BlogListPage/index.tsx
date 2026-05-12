import React from 'react';
import BlogListPage from '@theme-original/BlogListPage';
import type BlogListPageType from '@theme/BlogListPage';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof BlogListPageType>;

export default function BlogListPageWrapper(props: Props): JSX.Element {
  return (
    <>
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
      <BlogListPage {...props} />
    </>
  );
}
