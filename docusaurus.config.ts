import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Z Shield',
  tagline: 'Unified Cybersecurity Platform: ZYPHER VPN | FORTRESS | SERVICE HUB | DISCOVER | MONITOR | ARMOR | DETECT | COMPLY | NEURAL MESH',
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

  customFields: {
    apiUrl: process.env.REACT_APP_API_URL || '',
  },

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

  clientModules: [
    './src/clientModules/blogReveal.ts',
    './src/clientModules/scrollProgress.ts',
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
          // home.css loads after custom.css so the marketing styles win on
          // any shared selector.
          customCss: ['./src/css/custom.css', './src/css/home.css'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Purpose-built 1200x630 card. Previously this was img/logo.png, which was
    // fine at its original 1062x474 but broke once the logo was resized to its
    // actual render size (320px), and twitter:card is summary_large_image, so a
    // 320px logo rendered as a speck inside a 1200x630 slot.
    // Regenerate with: node scripts/make-og-image.mjs <full-res-logo.png>
    image: 'img/og-card.png',
    colorMode: {
      // Follow the visitor's OS setting on first visit; the navbar toggle still
      // overrides and persists. Previously this was pinned to light and ignored
      // prefers-color-scheme entirely, so a full dark palette shipped as dead CSS.
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'ZPOA',
        src: 'img/logo.png',
        style: {height: '40px'},
      },
      items: [
        {to: '/features', label: 'Features', position: 'left'},
        {type: 'custom-productsSplit', position: 'left'},
        {to: '/pricing', label: 'Pricing', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {type: 'custom-regionPicker', position: 'right'},
        {
          to: '/schedule',
          label: "Sign up, it's Free",
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
            {label: 'Features', to: '/features'},
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
