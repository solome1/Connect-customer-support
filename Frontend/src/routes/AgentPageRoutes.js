import { lazy } from 'react';

// project-imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';

//render-Customer
const  Customer = Loadable(lazy(() => import('pages/foragent/customer')))

//render-AgentPage.js
const ChatCallManagement = Loadable(lazy(() => import('pages/foragent/chatmanagement')));

//render-Conversation
const Conversation = Loadable(lazy(() => import('pages/Conversation/ConversationInterface')))
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
        {
            path: 'Conversation',
            element: <Conversation/>
        }
    ]
};
export default AgentPageRoutes;
