import { lazy } from 'react';

// project-imports
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import GettingStartedPage from 'pages/auth/getstart';

// // render - dashboard
// const DashboardDefault = Loadable(lazy(() => import('pages/foradmin/dashboard')));

// pages routing
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/register')));

// render -OrganizationComponent
const Setting = Loadable(lazy(() => import('pages/Organization2')));

//render-OrganizationSettings
const OrganizationList = Loadable(lazy(() => import('pages/OrganizationList')));

//render-OrganizationComponent1
const OrganizationProfile= Loadable(lazy(() => import('pages/OrganizationProfile')));
// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        // {
        //   path: '/',
        //   element: <DashboardDefault />
        // },
        {
          path: 'getting-started', // Added route for GettingStartedPage
          element: <GettingStartedPage />
        },
        {
          path: 'OrganizationProfile',
          element: <OrganizationProfile/>
        },
        {
          path: 'Setting',
          element: <Setting/>
        },
        {
          path: 'OrganizationList',
          element: <OrganizationList/>
        },
      ]
    },
    {
      path: '/auth',
      element: <CommonLayout />,
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
        {
          path: 'register',
          element: <AuthRegister />
        }
      ]
    }
  ]
};

export default MainRoutes;
