// assets
import { DocumentCode2, I24Support } from 'iconsax-react';


// icons
const icons = {
  samplePage: DocumentCode2,
  documentation: I24Support
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const support = {
  id: 'other',
  title: 'Others',
  type: 'group',
  children: [
    {
      id: 'Organization',
      title: 'Organization',
      type: 'item',
      url: '/Organization'
    },
    {
      id: 'agentpage',
      title: 'Agent',
      type: 'item',
      url: '/Agent',
      icon: icons.documentation
    },
    {
      id: 'homepage',
      title: 'Homepage',
      type: 'item',
      url: '/homepage',
      icon: icons.documentation
    },
    {
      id: 'FAQPage',
      title: 'FAQPage',
      type: 'item',
      url: '/FAQPage',
      icon: icons.documentation
    },
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: '/sample-page',
      icon: icons.samplePage
    },
    {
      id: 'customer',
      title: 'Customer',
      type: 'item',
      url: '/customer',
      icon: icons.samplePage
    },
    {
      id: 'CustomerProfile',
      title: 'CustomerProfile',
      type: 'item',
      url: '/CustomerProfile',
      icon: icons.samplePage
    },
    {
      id: 'AgentProfile',
      title: 'AgentProfile',
      type: 'item',
      url: '/AgentProfile',
      icon: icons.documentation
    },
    {
      id: 'Organization2',
      title: 'Organization2',
      type: 'item',
      url: '/Organization2',
      icon: icons.documentation
    },

    {
      id: ' OrganizationSettings',
      title: 'OrganizationSettings',
      type: 'item',
      url: '/OrganizationSettings',
      icon: icons.documentation
    },

    {
      id: 'knowledgebase',
      title: 'Knowledgebase',
      type: 'item',
      url: '/knowledgebase',
      icon: icons.samplePage
    },
    {
      id: 'AddArticle',
      title: 'AddArticle',
      type: 'item',
      url: '/AddArticle',
      icon: icons.samplePage
    },
    {
      id: 'ChatCallManagement',
      title: 'ChatCallManagement',
      type: 'item',
      url: '/chatmanagement',
      icon: icons.samplePage
    },

    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: 'https://phoenixcoded.gitbook.io/able-pro/v/react/',
      icon: icons.documentation,
      external: true,
      target: true
    }
  ]
};

export default support;
