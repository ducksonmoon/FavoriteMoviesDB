// src/routesConfig.tsx
import React from "react";
import { RouteObject } from "react-router-dom";
import Home from "../pages/home/Home";
import Settings from "../pages/settings/Settings";

const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    id: "Home",
  },
  {
    path: "/settings",
    element: <Settings />,
    id: "Settings",
  },
];

export default routesConfig;
