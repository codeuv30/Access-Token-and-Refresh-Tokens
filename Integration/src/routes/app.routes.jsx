import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Public from "./protected/Public";
import Protected from "./protected/Protected";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { setIsUserFetched, setUser } from "../state/AuthReducer";

const AppRoutes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/auth/me");

        dispatch(setUser(res.data.user));
      } catch (error) {
        console.log("error in me api", error)

        dispatch(setUser(null));
      } finally {
        dispatch(setIsUserFetched(true));
      }
    })();

  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Public />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />,
            },
            {
              path: "/register",
              element: <Register />,
            },
          ],
        },
      ],
    },
    {
      path: "/home",
      element: <Protected />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "",
              element: <Home />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default AppRoutes;
