import { lazy } from 'react';

// project-imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';

//render-Customer
const  Customer = Loadable(lazy(() => import('pages/foragent/customer')))

//render-AgentPage.js
const ChatCallManagement = Loadable(lazy(() => import('pages/foragent/chatmanagement')));

const AgentPageRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/Customer',
            element: < Customer/>
        },
        {
            path: 'ChatCallManagement ',
            element: <ChatCallManagement  />
        },
    ]
};
export default AgentPageRoutes;
