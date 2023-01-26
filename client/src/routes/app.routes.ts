import { lazy } from "react";

export const AppRoutes = [
  {
    path: "/",
    title: "Home page",
    description: "Home page",
    component: lazy(() => import("../pages/home")),
  },
  {
    path: "/test",
    title: "Test page",
    description: "Test page",
    component: lazy(() => import("../pages/test")),
  },
];
