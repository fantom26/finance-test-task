import { Suspense } from "react";

import { Header } from "components/sections";
import { Outlet } from "react-router-dom";
import { Loader } from "components/ui";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};
