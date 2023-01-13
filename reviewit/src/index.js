import React from 'react';
import ReactDOM from 'react-dom/client';
import './public/General.css';
import LoginPg from './pages/LoginPg';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginPg />
  </React.StrictMode>
);

reportWebVitals();
