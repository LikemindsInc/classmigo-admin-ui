import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthenticationLayout } from "../../Layouts/AuthenticationLayout";
import { Loader } from "../../Ui_elements";

const LazyLogin = lazy(
  () => import("../../Pages/SharedPages/Authentication/Login")
);
const LazySignUp = lazy(
  () => import("../../Pages/SharedPages/Authentication/Signup")
);
const LazyForgotPassword = lazy(
  () => import("../../Pages/SharedPages/Authentication/ForgotPassword")
);
const LazyOtpVerification = lazy(
  () => import("../../Pages/SharedPages/Authentication/OtpVerification")
);
const LazyCreateNewPassword = lazy(
  () => import("../../Pages/SharedPages/Authentication/CreateNewPassword")
);

export const SharedRoutes = () => {
  interface RouteConfig {
    path: string;
    element: any;
  }

  const sharedRoutes: RouteConfig[] = [
    {
      path: "/",
      element: <LazyLogin />,
    },
    {
      path: "/signup",
      element: <LazySignUp />,
    },
    {
      path: "/forgot_password",
      element: <LazyForgotPassword />,
    },
    {
      path: "/otp_verification",
      element: <LazyOtpVerification />,
    },
    {
      path: "/create_new_password",
      element: <LazyCreateNewPassword />,
    },
  ];

  return (
    <Routes>
      {sharedRoutes.map((route: RouteConfig, index: number) => (
        <Route
          key={index}
          path={route.path}
          element={
            <AuthenticationLayout>
              <Suspense fallback={<Loader />}>{route.element}</Suspense>
            </AuthenticationLayout>
          }
        />
      ))}
    </Routes>
  );
};
