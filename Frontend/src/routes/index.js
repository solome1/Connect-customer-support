import { useRoutes } from 'react-router-dom';

// project-imports

import MainRoutes from './MainRoutes';
import AdminPageRoutes from './AdminpageRoutes';

// ==============================|| ROUTES RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, AdminPageRoutes]);
}
