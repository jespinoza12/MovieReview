import "./Navbar.css";
import logo from "../Assets/logo.png";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const refreshPage = () => {
    window.location.href = "/";
  };

  const login = () => {
    window.location.href = "/login";
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:9292/items/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.message);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="box" id="navBar">
      <span className="navItem">
        <img
          onClick={() => {
            refreshPage();
          }}
          id="navLogo"
          src={logo}
          alt="logo"
        />
      </span>
      <span className="navItem navItemInfo">
        {user ? (
          <span>
            {"Welcome: " + user.user.fname + " " + user.user.lname}
            <button onClick={logout}>Logout</button>{" "}
          </span>
        ) : (
          <span onClick={login}>Login</span>
        )}
      </span>
    </div>
  );
};

export default Navbar;
