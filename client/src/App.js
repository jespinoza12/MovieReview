import React from "react";
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
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
function App() {
function isAdmin() {
    if (localStorage.getItem("role") === "Admin") {
      return true;
    }else {
      return false;
    }
  }
  
  function isLoggedIn() {
    if (localStorage.getItem("token") !== null) {
      return true;
    } else {
      return false;
    }
  }
  
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path={process.env.PUBLIC_URL + "/"} fallback={<ErrorPage />}>
            <HomePg />
        </Route>
        <Route exact path={process.env.PUBLIC_URL + "/searchResults"} fallback={<ErrorPage />}>
            <SrchResPg />
        </Route>
        <Route exact path={process.env.PUBLIC_URL + "/register"} fallback={<ErrorPage />}>
            <SignupPg />
        </Route>
        <Route exact path={process.env.PUBLIC_URL + "/login"} fallback={<ErrorPage />}>
            <LoginPg />
        </Route>
        <Route exact path={process.env.PUBLIC_URL + "/advancedSearch"} fallback={<ErrorPage />}>
            <AdvSrchPg />
        </Route>
        <Route exact path={process.env.PUBLIC_URL + "/advancedResults"} fallback={<ErrorPage />}>
            <AdvSrchResPg />
        </Route>
        <Route exact path={process.env.PUBLIC_URL + "/movieResult"} fallback={<ErrorPage />}>
            {isLoggedIn ? <ReviewPg /> : <LoginPg/>}
        </Route>
        <Route exact path={process.env.PUBLIC_URL + "/admin"} fallback={<ErrorPage />}>
            {isAdmin ? <Admin /> : <HomePg />}
        </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;