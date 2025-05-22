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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: () => fetch("http://localhost:3000/gardeners"),
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: "/explore",
        element: <ExploreGarden></ExploreGarden>,
      },
      {
        path: '/browserTips',
        element: <BrowseTips></BrowseTips>
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
