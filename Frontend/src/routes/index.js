import { useRoutes } from 'react-router-dom';

// project-imports
import ComponentsRoutes from './ComponentsRoutes';
import AdminpageRoutes from './AdminpageRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTES RENDER ||============================== //

// Combine both route configurations into a single function
export default function ThemeRoutes() {
  // Combine MainRoutes, ComponentsRoutes, and AdminpageRoutes into a single array
  const routes = [MainRoutes, ComponentsRoutes, AdminpageRoutes];
  
  // Use useRoutes hook with the combined routes array
  return useRoutes(routes);
}