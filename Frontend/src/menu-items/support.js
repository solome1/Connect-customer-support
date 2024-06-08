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
  title: 'For System Admin',
  type: 'group',
  children: [
    {
      id: 'organizationprofile',
      title: 'OrganizationProfile',
      type: 'item',
      url: '/OrganizationProfile',
      icon: icons.samplePage
    },
    {
      id: 'setting',
      title: 'Setting',
      type: 'item',
      url: '/Setting',
      icon: icons.documentation
    },
    {
      id: ' organizationlist',
      title: 'OrganizationList',
      type: 'item',
      url: '/OrganizationList',
      icon: icons.documentation
    },
    
  ]
};

export default support;
