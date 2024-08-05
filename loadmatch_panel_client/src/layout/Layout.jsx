import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";

function Layout() {
  const location = useLocation();

  const isHomePageLogin = location.pathname === "/";

  return (
    <div className="bg-green-500">
      {!isHomePageLogin && <Header />}
      <Outlet />
    </div>
  );
}

export default Layout;
