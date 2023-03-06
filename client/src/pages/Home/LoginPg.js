import "./LoginPg.css";
import logo from "../Assets/logo.png";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useHistory } from "react-router-dom"


const LoginPg = () => {
  let history = useHistory()
  const [message, setMessage] = useState("");
  const [hidden, setHidden] = useState(true);

  const home = () => {
    history.push(process.env.PUBLIC_URL + "/");
  };

  const register = () => {
    history.push(process.env.PUBLIC_URL + "/register")
    ;
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
      .post("https://review-it.herokuapp.com/items/login", user)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.user.role);
          localStorage.setItem("ID", res.data.user.ID);
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
