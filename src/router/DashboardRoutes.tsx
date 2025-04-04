import DashboardLayout from "common/layout/dashboard";
import ErrorLayout from "layouts/error/ErrorLayout";
import { BroadcastPage } from "pages/broadcast/BroadcastPage";
import { MessagePage } from "pages/messages/MessagePage";
import { CreateOffersPage } from "pages/offers/create/CreateOfferPage";
import { OffersPage } from "pages/offers/OffersPage";
import { CreateOrdersPage } from "pages/orders/create/CreateOrdersPage";
import { OrdersPage } from "pages/orders/OrderPage";

const DashboardRoutes = {
    path: '/dashboard',
    element: <DashboardLayout />,
    errorElement: <ErrorLayout />,
    children: [
        {
            path: 'offers',
            element: <OffersPage />
        },
        {
            path: 'offers/create',
            element: <CreateOffersPage />
        },
        {
            path: 'orders',
            element: <OrdersPage />
        },
        {
            path: 'orders/create',
            element: <CreateOrdersPage />
        },
        {
            path: 'messages',
            element: <MessagePage />
        },
        {
            path: 'broadcast',
            element: <BroadcastPage />
        }
    ]
}

export { DashboardRoutes };
