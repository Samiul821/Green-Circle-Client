import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../components/Home";
import GardenTip from "../Pages/GardenTip";
import ExploreGarden from "../Pages/ExploreGarden";
import MyTips from "../Pages/MyTips";
import AuthLaout from "../Layout/AuthLaout";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import PrivateRoute from "../Provider/PrivateRoute";
import BrowseTips from "../Pages/BrowseTips";
import Loading from "../Pages/Loading";
import TipDetails from "../Pages/TipDetails";
import ErrorPage from "../Pages/ErrorPage";
import UpdateTips from "../Pages/UpdateTips";
import TermsConditions from "../Pages/TermsConditions";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import DashboardLayout from "../Layout/DashboardLayout";
import Overview from "../components/Overview";
import AllItems from "../Pages/Dashboard.jsx/AllItems";
import MyItems from "../Pages/Dashboard.jsx/MyItems";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: () =>
          fetch("https://green-circle-server-indol.vercel.app/gardeners"),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/explore",
        element: <ExploreGarden></ExploreGarden>,
        loader: () =>
          fetch("https://green-circle-server-indol.vercel.app/allGardeners"),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/browserTips",
        element: <BrowseTips></BrowseTips>,
        loader: () =>
          fetch("https://green-circle-server-indol.vercel.app/gardenTips"),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/tipDetails/:id",
        element: (
          <PrivateRoute>
            <TipDetails></TipDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://green-circle-server-indol.vercel.app/gardenTips/${params.id}`
          ),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/gardentip",
        element: (
          <PrivateRoute>
            <GardenTip></GardenTip>
          </PrivateRoute>
        ),
      },
      {
        path: "/mytips",
        element: (
          <PrivateRoute>
            <MyTips></MyTips>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateTip/:id",
        element: (
          <PrivateRoute>
            <UpdateTips></UpdateTips>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://green-circle-server-indol.vercel.app/gardenTips/${params.id}`
          ),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/terms",
        element: <TermsConditions></TermsConditions>,
      },
      {
        path: "/policy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLaout></AuthLaout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: Overview,
      },
      {
        path: "all-tips",
        Component: AllItems,
      },
      {
        path: "my-items",
        Component: MyItems,
      },
    ],
  },
]);

export default router;
