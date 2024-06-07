import { lazy } from 'react';

// project-imports
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import GettingStartedPage from 'pages/auth/getstart';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// pages routing
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/register')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/sample-page')));

//render-AgentPage.js
const  Agent = Loadable(lazy(() => import('pages/Agent')));

//render - CustomerComponent
const CustomerComponent = Loadable(lazy(() => import('pages/customer')));

//rende - KnowledgeBaseManagementComponent
const CMSComponent = Loadable(lazy(() => import('pages/knowledgebase')));

//render - ChatCallManagement
const ChatCallManagement = Loadable(lazy(() => import('pages/chatmanagement')))

//render - AddEditArticle
const AddArticle = Loadable(lazy(() => import('pages/AddArticle.js')));

//render -homepage
const HomePage  = Loadable(lazy(() => import('pages/homepage.js')));

//render-FAQPage
const FAQPage = Loadable(lazy(() => import('pages/FAQPage')));

//render-CustomerProfile
const CustomerProfile = Loadable(lazy(() => import('pages/CustomerProfile')));

//render-AgentProfile
const AgentProfile = Loadable(lazy(() => import('pages/AgentProfile')));

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
        {
          path: '/',
          element: <DashboardDefault />
        },
        {
          path: 'getting-started', // Added route for GettingStartedPage
          element: <GettingStartedPage />
        },
        {
          path: 'Organization',
          element: <Organization/>
        },
        {
          path: 'Agent',
          element: < Agent/>
        },
        {
          path: 'homepage',
          element: <HomePage />
        },
        {
          path: 'FAQPage',
          element: <FAQPage/>
        },
        {
          path: 'dashboard',
          element: <DashboardDefault />
        },
        {
          path: 'sample-page',
          element: <SamplePage />
        },
        {
          path: 'customer',
          element: <CustomerComponent />
        },
        {
          path: 'AgentProfile',
          element: <AgentProfile/>
        },
        {
          path: 'CustomerProfile',
          element: <CustomerProfile/>
        },
        {
          path: 'knowledgebase',
          element: <CMSComponent />
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
