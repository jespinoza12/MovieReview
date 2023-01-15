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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePg />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <SignupPg />,
  },
  {
    path: "/login",
    element: <LoginPg />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
