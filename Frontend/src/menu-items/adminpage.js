// type
import { Home3, Text, Colorfilter, Barcode, HomeTrendUp  } from 'iconsax-react';

// icons
const icons = {
    navigation: Home3,
    typography: Text,
    color: Colorfilter,
    shadow: Barcode,
    dashboard: HomeTrendUp
};

// ==============================|| MENU ITEMS - ADMINPAGE ||============================== //

const adminpage = {
    id: 'adminpage',
    title: 'Adminpage',
    icon: icons.navigation,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/Dashboard',
            icon: icons.dashboard,
            breadcrumbs: false
          },
          {
            id: 'agentpage',
            title: 'Agent',
            type: 'item',
            url: '/Agent',
            icon: icons. dashboard
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
            url: '/KnowledgeBaseComponent',
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
    ]};
    export default adminpage;
