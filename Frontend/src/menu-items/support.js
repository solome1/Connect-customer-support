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
      id: ' organizationlist',
      title: 'OrganizationList',
      type: 'item',
      url: '/OrganizationList',
      icon: icons.documentation
    },
    
  ]
};

export default support;
