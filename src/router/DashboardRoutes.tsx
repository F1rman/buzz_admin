import DashboardLayout from "common/layout/dashboard";
import ErrorLayout from "layouts/error/ErrorLayout";
import { CreateOffersPage } from "pages/offers/create/CreateOfferPage";
import { OffersPage } from "pages/offers/OffersPage";
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
            path: 'data',
            element: <div>Data</div>
        },

        {
            path: 'statistics',
            element: <div>Statistics</div>
        }
    ]
}

export { DashboardRoutes };
