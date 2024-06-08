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

//render - ChatCallManagement
const ChatCallManagement = Loadable(lazy(() => import('pages/foragent/chatmanagement')))

//render - AddEditArticle
const AddArticle = Loadable(lazy(() => import('pages/AddArticle.js')));

// render -OrganizationComponent
const CustomerSupportDashboard = Loadable(lazy(() => import('pages/Organization2')));

//render-OrganizationSettings
const OrganizationSettings = Loadable(lazy(() => import('pages/OrganizationSettings')));

//render-OrganizationComponent1
const Organization= Loadable(lazy(() => import('pages/Organization')));
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
          path: 'Organization',
          element: <Organization/>
        },
        {
          path: 'AddArticle',
          element: <AddArticle />
        },
        {
          path: 'chatmanagement',
          element: <ChatCallManagement />
        },
        {
          path: 'Organization2',
          element: <CustomerSupportDashboard/>
        },
        {
          path: 'OrganizationSettings',
          element: <OrganizationSettings/>
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
