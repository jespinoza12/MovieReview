import React from 'react';
import ReactDOM from 'react-dom/client';
import './public/General.css';
import LoginPg from './pages/LoginPg';
import HomePg from './pages/HomePg';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <LoginPg /> */}
    <HomePg />
  </React.StrictMode>
);

reportWebVitals();
