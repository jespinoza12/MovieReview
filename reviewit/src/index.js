import React from 'react';
import ReactDOM from 'react-dom/client';
import './public/General.css';
import LoginPg from './pages/LoginPg';
import SignupPg from './pages/SignupPg';
import HomePg from './pages/HomePg';
import AdvSrchPg from './pages/AdvSrchPg';
import ReviewPg from './pages/ReviewPg';
import ErrorPage from './pages/Error-page';
import { createBrowserRouter,   RouterProvider,} from "react-router-dom";

import reportWebVitals from './reportWebVitals';

const HPg = createBrowserRouter([
  {
    path: "/",
    element: <HomePg />,
    errorElement: <ErrorPage />,
  },
]);

const login = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPg />,
    errorElement: <ErrorPage />,

  },
]);

const register = createBrowserRouter([
  {
    path: "/register",
    element: <SignupPg />,
    errorElement: <ErrorPage />,

  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <RouterProvider router={HPg} />
        <RouterProvider router={login} />
        <RouterProvider router={register} />
  </React.StrictMode>
);

reportWebVitals();
