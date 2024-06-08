// type
import { Home3, Text, Colorfilter, Barcode } from 'iconsax-react';

// icons
const icons = {
  navigation: Home3,
  typography: Text,
  color: Colorfilter,
  shadow: Barcode
};

// ==============================|| MENU ITEMS - FORAGENT ||============================== //

const foragent = {
  id: 'foragent',
  title: 'AgentPage',
  icon: icons.navigation,
  type: 'group',
  children: [
    {
      id: 'customer',
      title: 'Customer',
      type: 'item',
      url: '/Customer',
      icon: icons.typography,
      breadcrumbs: false
    },
    {
      id: 'chatmanagement',
      title: 'ChatManagement',
      type: 'item',
      url: '/chatmanagement',
      icon: icons.color,
      breadcrumbs: false
    },
  ]
};

export default foragent;
