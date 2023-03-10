import "./Navbar.css";
import logo from "../Assets/logo.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  let history = useHistory();

  const refreshPage = () => {
    history.push(process.env.PUBLIC_URL + "/");
  };

  const redirectAdmin = () => {
    history.push(process.env.PUBLIC_URL + "/Admin");
  };

  const login = () => {
    history.push(process.env.PUBLIC_URL + "/login");
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const [user, setUser] = useState(null);
  const [admin, setIsAdmin] = useState(false);
  useEffect(() => {
    axios
      .get("https://review-it.herokuapp.com/items/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });

    if (
      localStorage.getItem("role") === "Admin" ||
      localStorage.getItem("role") === "admin"
    ) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
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
            {"Welcome: " + user.user.fname + " " + user.user.lname + " "}
            <button onClick={logout}>Logout</button>
            {admin ? (
              <span>
                <button onClick={redirectAdmin}>Admin Page</button>
              </span>
            ) : (
              <div></div>
            )}
          </span>
        ) : (
          <span onClick={login}>Login</span>
        )}
      </span>
    </div>
  );
};

export default Navbar;
