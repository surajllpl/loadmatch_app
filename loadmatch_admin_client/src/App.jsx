import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/Layout";
import HomeAuthPage from "./pages/Home/HomeAuthPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminDashBoard from "./pages/DashBoard/Admin/AdminDashBoard";
import ManagerDashBoard from "./pages/DashBoard/Manager/ManagerDashBoard";
import OpsDashBoard from "./pages/DashBoard/Operation/OpsDashBoard";
import LeadDashBoard from "./pages/DashBoard/Lead/LeadDashBoard";
import HomeDashboard from "./pages/DashBoard/HomeDashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<HomeAuthPage />} />
      <Route path="/" element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute>
              <AdminDashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/manager"
          element={
            <ProtectedRoute>
              <ManagerDashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/ops"
          element={
            <ProtectedRoute>
              <OpsDashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/leads"
          element={
            <ProtectedRoute>
              <LeadDashBoard />
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
