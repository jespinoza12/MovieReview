import "./Navbar.css";
import logo from "../Assets/logo.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"

const Navbar = () => {
  let history = useHistory()

  const refreshPage = () => {
    history.push(process.env.PUBLIC_URL + "/")
  };

  const login = () => {
    history.push(process.env.PUBLIC_URL + "/login")
  };

  const logout = () => {
    localStorage.clear();
    history.push(process.env.PUBLIC_URL + "/")
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:9292/items/user" || "https://review-it.herokuapp.com/items/user", {
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
            <button onClick={logout}>Logout</button>
          </span>
        ) : (
          <span onClick={login}>Login</span>
        )}
      </span>
    </div>
  );
};

export default Navbar;
