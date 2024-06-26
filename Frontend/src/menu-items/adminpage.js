// type
import { Home3, HomeTrendUp, Text, Colorfilter, Barcode } from 'iconsax-react';

// icons
const icons = {
  navigation: Home3,
  dashboard: HomeTrendUp,
  typography: Text,
  color: Colorfilter,
  shadow: Barcode,
};

// ==============================|| MENU ITEMS - ADMINPAGE ||============================== //

const adminpage = {
  id: 'group-dashboard',
  title: 'Adminpage',
  icon: icons.navigation,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.dashboard,
      breadcrumbs: false
    },
    {
      id: 'agentpage',
      title: 'Agent',
      type: 'item',
      url: '/Agent',
      icon: icons.dashboard
    },
    {
      id: 'customer',
      title: 'Customer',
      type: 'item',
      url: '/customer',
      icon: icons.typography,
      breadcrumbs: false
    },
    {
      id: 'articleditor',
      title: 'ArticleEditor',
      type: 'item',
      url: '/ArticleEditor',
      icon: icons.color
    },
    {
      id: 'articlelist',
      title: 'ArticleList',
      type: 'item',
      url: '/ArticleList',
      icon: icons.shadow
    },
    {
      id: 'knowledgebasecomponent',
      title: 'KnowledgeBaseComponent',
      type: 'item',
      url: '/KnowledgeBase',
      icon: icons.shadow
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/Settings',
      icon: icons.shadow
    },
    {
      id: 'addarticle',
      title: 'AddArticle',
      type: 'item',
      url: '/AddArticle',
      icon: icons.color
    },

  ]
};

export default adminpage;
