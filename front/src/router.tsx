import { Navigate, createBrowserRouter } from "react-router-dom";

import Home from "./pages";
import { commonRoutes } from "./routes/common";
import Dashbord from "./pages/dashboard";
import Login from "./pages/auth/login";
import Publications from "./pages/publications";
import Researchers from "./pages/researchers";
import { DashboardLayout } from "./components/dashboard-layout";
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
    {
      path: "/publications",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Publications />,
        },
      ],
    },
    {
      path: "/researchers",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Researchers />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    ...commonRoutes,
    { path: "*", element: <Navigate to="/500" replace /> },
  ]);
}