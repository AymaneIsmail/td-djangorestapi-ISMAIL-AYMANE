import { Navigate, createBrowserRouter } from "react-router-dom";

import Home from "./pages";
import { commonRoutes } from "./routes/common";
import { DashboardLayout } from "./components/dashboard-layout";
import Dashbord from "./pages/dashboard";
// import { authRoutes } from "./routes/auth";
// import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function createRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Dashbord />,
        },
      ],
    },
    ...commonRoutes,
    { path: "*", element: <Navigate to="/500" replace /> },
  ]);
}