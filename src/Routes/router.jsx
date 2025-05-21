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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: () => fetch("http://localhost:3000/gardeners"),
      },
      {
        path: "/gardentip",
        element: <GardenTip></GardenTip>,
      },
      {
        path: "/explore",
        element: <ExploreGarden></ExploreGarden>,
      },
      {
        path: "/mytips",
        element: <MyTips></MyTips>,
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
        path: '/auth/signUp',
        element: <SignUp></SignUp>
      }
    ],
  },
]);

export default router;
