import { AuthLayout } from "common/layout/auth";
import ErrorLayout from "layouts/error/ErrorLayout";
import { AuthLoginPage } from "pages/auth/AuthLoginPage";

const LoginRoutes = {
  path: '/auth',
  element: <AuthLayout />,
  errorElement: <ErrorLayout />,
  children: [
    {
      path: 'login',
      element: <AuthLoginPage />
    }
  ]
}

export default LoginRoutes;
