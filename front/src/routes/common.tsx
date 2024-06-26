import { Suspense } from "react";
import Page500 from "../pages/500";
import { Outlet, type RouteObject } from "react-router-dom";

// @see https://reactrouter.com/en/main/route/lazy
export const commonRoutes: RouteObject[] = [
  {
    element: (
      <Suspense fallback={<p>Chargement...</p>}>
        <Outlet />
      </Suspense>
    ),
    children: [
      { path: "500", element: <Page500 />},
    ],
  },
];