import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/quick-start',
        'getting-started/system-requirements',
        'getting-started/first-connector',
      ],
    },
    {
      type: 'category',
      label: 'Modules',
      items: [
        {
          type: 'category',
          label: 'Detect (SIEM)',
          items: [
            'modules/detect/overview',
            'modules/detect/alerts',
            'modules/detect/rules',
            'modules/detect/logs',
            'modules/detect/mitre',
          ],
        },
        {
          type: 'category',
          label: 'Comply',
          items: [
            'modules/comply/overview',
            'modules/comply/frameworks',
            'modules/comply/evidence',
            'modules/comply/risks',
            'modules/comply/ai-copilot',
            'modules/comply/ai-features',
            'modules/comply/cross-framework-mapping',
          ],
        },
        {
          type: 'category',
          label: 'Discover',
          items: [
            'modules/discover/overview',
            'modules/discover/assets',
            'modules/discover/vulnerabilities',
            'modules/discover/scans',
          ],
        },
        {
          type: 'category',
          label: 'Armor (CSPM)',
          items: [
            'modules/armor/overview',
            'modules/armor/posture',
            'modules/armor/resources',
            'modules/armor/attack-paths',
          ],
        },
        {
          type: 'category',
          label: 'Fortress (Identity)',
          items: [
            'modules/fortress/overview',
            'modules/fortress/identities',
            'modules/fortress/policies',
            'modules/fortress/anomalies',
          ],
        },
        {
          type: 'category',
          label: 'Neural Mesh (AI)',
          items: [
            'modules/neural-mesh/overview',
            'modules/neural-mesh/investigations',
            'modules/neural-mesh/threat-intel',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'integrations/overview',
        'integrations/cloud-providers',
        'integrations/identity',
        'integrations/siem-log-sources',
        'integrations/edr',
        'integrations/network-security',
        'integrations/email-security',
        'integrations/threat-intel',
        'integrations/ticketing',
        'integrations/communication',
        'integrations/devops',
        'integrations/databases',
        'integrations/vuln-management',
      ],
    },
    {
      type: 'category',
      label: 'Administration',
      items: [
        'administration/users-roles',
        'administration/api-keys',
        'administration/sso',
        'administration/billing',
        'administration/ai-settings',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: ['api-reference/overview'],
    },
  ],
};

export default sidebars;
