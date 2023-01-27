import { lazy } from "react";

export const AppRoutes = [
  {
    path: "/",
    title: "Home page",
    description: "Home page",
    component: lazy(() => import("../pages/home"))
  }
];
