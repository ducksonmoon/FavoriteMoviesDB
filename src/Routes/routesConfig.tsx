import React from "react";
import { RouteObject } from "react-router-dom";
import Home from "../pages/HomePage";
import Movie from "../pages/MovieDetailsPage";
import SearchPage from "../pages/SearchPage";
import UserSettings from "../pages/SettingsPage";
import LoginPage from "../pages/Auth/LoginPage";
import SignUpPage from "../pages/Auth/SignnUpPage";
import ProtectedLayout from "./ProtectedRoute";

const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    id: "Home",
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      { path: "settings", element: <UserSettings />, id: "Settings" },
      { path: "movies/:movieId", element: <Movie />, id: "MovieDetail" },
      { path: "search", element: <SearchPage />, id: "Search" },
    ],
  },
  { path: "/login", element: <LoginPage />, id: "Login" },
  { path: "/register", element: <SignUpPage />, id: "Register" },
];

export default routesConfig;
