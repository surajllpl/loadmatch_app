import React from "react";
import { Outlet } from "react-router-dom";
import HomeDashboard from "../pages/DashBoard/HomeDashboard";

function Layout() {
  return (
    <>
      <HomeDashboard />
      <Outlet />
    </>
  );
}

export default Layout;
