import React from 'react';
import ReactDOM from 'react-dom/client';
import './public/General.css';
import LoginPg from './pages/LoginPg';
import SignupPg from './pages/SignupPg';
import HomePg from './pages/HomePg';
import AdvSrchPg from './pages/AdvSrchPg';
import ReviewPg from './pages/ReviewPg';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <LoginPg /> */}
    {/* <SignupPg /> */}
    {/* <HomePg /> */}
    {/* <AdvSrchPg /> */}
    <ReviewPg />
  </React.StrictMode>
);

reportWebVitals();
