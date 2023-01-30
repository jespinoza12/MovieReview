import React from "react";
import ReactDOM from "react-dom/client";
import "./public/General.css";
import LoginPg from "./pages/Home/LoginPg";
import SignupPg from "./pages/Home/SignupPg";
import HomePg from "./pages/Home/HomePg";
import AdvSrchPg from "./pages/Search/AdvSrchPg";
import SrchResPg from "./pages/Search/SrchResPg";
import ReviewPg from "./pages/Reviews/ReviewPg";
import ErrorPage from "./pages/Assets/Error-page";
import AdvSrchResPg from "./pages/Search/AdvSrchResPg";
import Admin from "./pages/Admin/Admin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePg />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/searchResults",
    element: <SrchResPg />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <SignupPg />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPg />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/advancedSearch",
    element: <AdvSrchPg />,
  },
  {
    path: "/searchResults",
    element: <AdvSrchPg />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/advancedResults",
    element: <AdvSrchResPg />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/movieResult",
    element: <ReviewPg />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
reportWebVitals();
