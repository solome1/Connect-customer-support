// type
import { Home3, Text, Colorfilter, Barcode } from 'iconsax-react';

// icons
const icons = {
    navigation: Home3,
    typography: Text,
    color: Colorfilter,
    shadow: Barcode
};

// ==============================|| MENU ITEMS - COMPONENTS ||============================== //

const adminpage = {
    id: 'adminpage',
    title: 'Adminpage',
    icon: icons.navigation,
    type: 'group',
    children: [

        {
            id: 'agentpage',
            title: 'Agent',
            type: 'item',
            url: '/foradmin/Agent',
            icon: icons.typography
        },
        {
            id: 'articleditor',
            title: 'ArticleEditor',
            type: 'item',
            url: '/foradmin/ArticleEditor',
            icon: icons.color
        },
        {
            id: 'articlelist',
            title: 'ArticleList',
            type: 'item',
            url: '/foradmin/ArticleList',
            icon: icons.shadow
        },
        {
            id: 'knowledgebasecomponent',
            title: 'KnowledgeBaseComponent',
            type: 'item',
            url: '/foradmin/KnowledgeBaseComponent',
            icon: icons.shadow
        },
        {
            id: 'settings',
            title: 'Settings',
            type: 'item',
            url: '/foradmin/Settings',
            icon: icons.shadow
        },
    ]};
    export default adminpage;
