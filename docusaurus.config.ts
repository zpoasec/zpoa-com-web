import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ZPOA Shield',
  tagline: 'Unified Cybersecurity Platform — DETECT | COMPLY | DISCOVER | ARMOR | FORTRESS',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://www.zpoa.com',
  baseUrl: '/',

  organizationName: 'zpoasec',
  projectName: 'zpoa-com-web',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: undefined,
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/logo.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'ZPOA',
        src: 'img/logo.png',
        style: {height: '40px'},
      },
      items: [
        {to: '/docs/intro', label: 'Features', position: 'left'},
        {to: '/pricing', label: 'Pricing', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/zpoasec',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://app.zpoashield.com',
          label: 'Login',
          position: 'right',
          className: 'navbar-login-btn',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Product',
          items: [
            {label: 'Features', to: '/docs/intro'},
            {label: 'Pricing', to: '/pricing'},
            {label: 'Integrations', to: '/docs/integrations/overview'},
            {label: 'Changelog', to: '/blog'},
          ],
        },
        {
          title: 'Documentation',
          items: [
            {label: 'Getting Started', to: '/docs/getting-started/quick-start'},
            {label: 'User Guide', to: '/docs/intro'},
            {label: 'API Reference', to: '/docs/api-reference/overview'},
            {label: 'Administration', to: '/docs/administration/users-roles'},
          ],
        },
        {
          title: 'Company',
          items: [
            {label: 'Website', href: 'https://www.zpoa.com'},
            {label: 'GitHub', href: 'https://github.com/zpoasec'},
            {label: 'Contact', href: 'mailto:info@zpoa.com'},
          ],
        },
      ],
      logo: {
        alt: 'ZPOA Logo',
        src: 'img/logo.png',
        href: 'https://www.zpoa.com',
        width: 160,
      },
      copyright: `Copyright © ${new Date().getFullYear()} Zpoa Inc. All rights reserved.<br/>8 The Green, Ste R, Dover, DE 19901`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml', 'go', 'python'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
