import React from "react";
import { RouteObject } from "react-router-dom";
import Home from "../../pages/home/Home";
import Movie from "../../pages/details/MovieDetails";
import SearchPage from "../../pages/search/SearchPage";
import UserSettings from "../../pages/settings/Settings";
import LoginPage from "../../pages/settings/LoginPage";
import SignUpPage from "../../pages/settings/SignnUpPage";

const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    id: "Home",
  },
  {
    path: "/settings",
    element: <UserSettings />,
    id: "Settings",
  },
  {
    path: "/movies/:movieId",
    element: <Movie />,
    id: "MovieDetail",
  },
  { path: "/search", element: <SearchPage />, id: "Search" },
  { path: "/login", element: <LoginPage />, id: "Login" },
  { path: "/register", element: <SignUpPage />, id: "register" },
];

export default routesConfig;
