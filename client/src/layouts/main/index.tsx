import { Suspense } from "react";

import { Header } from "components/sections";
import { Loader } from "components/ui";
import { Outlet } from "react-router-dom";

export const MainLayout = () => (
  <>
    <Header />
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  </>
);
