import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginRoutes from "./LoginRoutes";
import MainLayout from "common/layout/main";
import ErrorLayout from "layouts/error/ErrorLayout";
import { DashboardRoutes } from "./DashboardRoutes";

const routes = [{
    errorElement: <ErrorLayout />,
    path: '/',
    element: <MainLayout />,
    children: [
        {
            index: true,
            element: <Navigate to="/dashboard/offers" replace />
        }
    ]
},
    LoginRoutes,
    DashboardRoutes
];
const router = createBrowserRouter(routes);

export default router;