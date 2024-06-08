import { lazy } from 'react';

// project-imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';

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

// ==============================|| COMPONENTS ROUTES ||============================== //

const AdminpageRoutes = {
    path: '/foradmin',
    element: <MainLayout />,
    children: [
        {
            path: 'agent',
            element: <Agent />
        },
        {
            path: 'articleEditor',
            element: <ArticleEditor />
        },
        {
            path: 'articleList',
            element: <ArticleList />
        },
        {
            path: 'knowledgeBaseComponent',
            element: <KnowledgeBaseComponent />
        },
        {
            path: 'settings',
            element: <Settings />
        }
    ]
};

export default AdminpageRoutes;
