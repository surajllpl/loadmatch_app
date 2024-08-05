// App.js
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import SearchLoadPage from "./pages/Load/SearchLoadPage/SearchLoadPage";
import SearchSpacePage from "./pages/Space/SearchSpacePage/SearchSpacePage";
import Load from "./pages/Load/Load";
import Space from "./pages/Space/Space";
import SpaceBookingPage from "./pages/Space/SpaceBookingPage/SpaceBookingPage";
import LoadBookingPage from "./pages/Load/LoadBookingPage/LoadBookingPage";
import Enquiries from "./pages/Enquiries/Enquiries";
import MapLoader from "./components/MapLoader/MapLoad";
import InitialRedirect from "./components/InitialRedirect/InitialRedirect";
import SignInComp from "./components/SignIn/SignInComp";
import HomeWelcome from "./components/SignIn/HomeWelcome";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<SignIn />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            {/* <Home /> */}
            <HomeWelcome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home/searchLoad"
        element={
          <ProtectedRoute>
            <SearchLoadPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home/searchLoad/add-space"
        element={
          <ProtectedRoute>
            <Space />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home/searchLoad/add-space/load/bookingv1/:loadId"
        element={
          <ProtectedRoute>
            <LoadBookingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home/searchSpace"
        element={
          <ProtectedRoute>
            <SearchSpacePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home/searchSpace/add-load"
        element={
          <ProtectedRoute>
            <Load />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home/searchSpace/add-load/space/bookingv1/:spaceId"
        element={
          <ProtectedRoute>
            <SpaceBookingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-load"
        element={
          <ProtectedRoute>
            <Load />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-load/searchSpace"
        element={
          <ProtectedRoute>
            <SearchSpacePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/load/bookingv1/:loadId"
        element={
          <ProtectedRoute>
            <LoadBookingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-space"
        element={
          <ProtectedRoute>
            <Space />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-space/searchLoad"
        element={
          <ProtectedRoute>
            <SearchLoadPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/space/bookingv1/:spaceId"
        element={
          <ProtectedRoute>
            <SpaceBookingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/enquiries"
        element={
          <ProtectedRoute>
            <Enquiries />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

const App = () => {
  return (
    <MapLoader>
      <RouterProvider router={router} />
    </MapLoader>
  );
};

export default App;
