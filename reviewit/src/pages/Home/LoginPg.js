import "./LoginPg.css";
import logo from "../Assets/logo.png";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

const LoginPg = () => {
  const [message, setMessage] = useState("");
  const [hidden, setHidden] = useState(true);

  const home = () => {
    window.location.href = "/";
  };

  const register = () => {
    window.location.href = "/register";
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    console.log(user);
  };

  const login = () => {
    axios
      .post("http://localhost:9292/items/login", user)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          setMessage("Login successful");
          setHidden(false);
          // redirect to the home page
          home();
        } else {
          setMessage(res.data.message);
          setHidden(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          setMessage("Error: " + error.response.data.message);
          setHidden(false);
        } else if (error.request) {
          setMessage("Error: " + error.request);
          setHidden(false);
        } else {
          setMessage("Error: " + error.message);
          setHidden(false);
        }
      });
  };

  function onSubmit(e) {
    e.preventDefault();
    login();
  }

  return (
    <>
      <div id="container">
        <img id="loginLogo" src={logo} alt="logo" onClick={home} />
        <div id="loginBox" className="box">
          <Alert key="info" variant="info" hidden={hidden}>
            {message}
          </Alert>
          <h1 id="logSigText">Login</h1>
          <div id="form">
            <form onSubmit={onSubmit}>
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <br />
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              <br />
              <input
                id="submitBtn"
                type="submit"
                value="Login"
                onClick={login}
              />
            </form>
          </div>
        </div>
        <span id="signInLink" onClick={register}>
          Not a user? Sign Up
        </span>
      </div>
    </>
  );
};

export default LoginPg;
