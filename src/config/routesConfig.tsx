import React from "react";
import { RouteObject } from "react-router-dom";
import Home from "../pages/home/Home";
import Settings from "../pages/settings/Settings";
import Movie from "../pages/details/MovieDetails";

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
  {
    path: "/movies/:movieId",
    element: <Movie />,
    id: "MovieDetail",
  },
];

export default routesConfig;
