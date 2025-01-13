import DashboardLayout from "common/layout/dashboard";
import ErrorLayout from "layouts/error/ErrorLayout";
import { OffersPage } from "pages/offers/OffersPage";

const DashboardRoutes = {
    path: '/dashboard',
    element: <DashboardLayout />,
    errorElement: <ErrorLayout />,
    children: [
        {
            path: 'offers',
            element: <OffersPage />
        }
    ]
}

export { DashboardRoutes };
