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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: () => fetch("https://green-circle-server-indol.vercel.app/gardeners"),
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
        loader: () => fetch("https://green-circle-server-indol.vercel.app/gardenTips"),
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
          fetch(`https://green-circle-server-indol.vercel.app/gardenTips/${params.id}`),
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
          fetch(`https://green-circle-server-indol.vercel.app/gardenTips/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
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
]);

export default router;
