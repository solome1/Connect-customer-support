import { lazy } from 'react';

// project-imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';

//render-Dashboard
const  DashboardDefault = Loadable(lazy(() => import('pages/foradmin/dashboard')))

//render-AgentPage.js
const Agent = Loadable(lazy(() => import('pages/foradmin/Agent')));

// render -ArticleEditor
const ArticleEditor = Loadable(lazy(() => import('pages/foradmin/ArticleEditor')));

// render -ArticleList
const ArticleList = Loadable(lazy(() => import('pages/foradmin/ArticleList')));

// render -KnowledgeBaseComponent
const KnowledgeBaseComponent = Loadable(lazy(() => import('pages/foradmin/KnowledgeBaseComponent')));

// render -Settings
const Settings = Loadable(lazy(() => import('pages/foradmin/Settings')));

//render- AddArticle
const AddArticle = Loadable(lazy(() => import('pages/foradmin/AddArticle')));
// ==============================|| COMPONENTS ROUTES ||============================== //

const AdminPageRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/Dashboard',
            element: < DashboardDefault/>
        },
        {
            path: 'Agent',
            element: <Agent />
        },
        {
            path: 'ArticleEditor',
            element: <ArticleEditor />
        },
        {
            path: 'ArticleList',
            element: <ArticleList />
        },
        {
            path: 'KnowledgeBaseComponent',
            element: <KnowledgeBaseComponent />
        },
        {
            path: 'Settings',
            element: <Settings />
        },
        {
            path: 'AddArticle',
            element: <AddArticle />
        }
    ]
};

export default AdminPageRoutes;
