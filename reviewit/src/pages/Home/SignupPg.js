import "./SignupPg.css";
import logo from "../Assets/logo.png";
import { useState } from "react";
import axios from "axios";
const SignupPg = () => {
  function home() {
    window.location.href = "/";
  }

  const login = () => {
    window.location.href = "/login";
  };

  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const {
      fname,
      lname,
      street,
      city,
      state,
      zip_code,
      email,
      phone,
      password,
      password2,
    } = user;
    if (
      fname &&
      lname &&
      street &&
      city &&
      state &&
      zip_code &&
      phone &&
      email &&
      password &&
      password === password2
    ) {
      axios.post("http://localhost:9292/items/register", user).then((res) => {
        setMessage(res.data.message);
      });
    } else {
      setMessage("Oops");
    }
  };

  function onSubmit(e) {
    e.preventDefault();
    register();
  }

  return (
    <>
      <div id="container">
        <img id="signupLogo" src={logo} alt="logo" onClick={home} />
        <div id="signupBox" className="box">
          <h1 id="logSigText">Sign Up</h1>
          <div id="form">
            <label>{message}</label>
            <form onSubmit={onSubmit}>
              <label>Fist Name:</label>
              <input
                value={user.fname}
                onChange={handleChange}
                type="text"
                name="fname"
              />
              <br />
              <label>Last Name:</label>
              <input
                value={user.lname}
                onChange={handleChange}
                type="text"
                name="lname"
              />
              <br />
              <label>Street:</label>
              <input
                value={user.street}
                onChange={handleChange}
                type="text"
                name="street"
              />
              <br />
              <label>City:</label>
              <input
                value={user.city}
                onChange={handleChange}
                type="text"
                name="city"
              />
              <br />
              <label>State</label>
              <input
                value={user.state}
                onChange={handleChange}
                type="text"
                name="state"
              />
              <br />
              <label>Zipcode:</label>
              <input
                value={user.zip_code}
                onChange={handleChange}
                type="text"
                name="zip_code"
              />
              <br />
              <label>Email:</label>
              <input
                value={user.email}
                onChange={handleChange}
                type="text"
                name="email"
              />
              <br />
              <label>Phone:</label>
              <input
                value={user.phone}
                onChange={handleChange}
                type="text"
                name="phone"
              />
              <br />
              <label>Password:</label>
              <input
                value={user.password}
                onChange={handleChange}
                type="text"
                name="password"
              />
              <br />
              <label>Re-enter Password:</label>
              <input
                value={user.password2}
                onChange={handleChange}
                type="text"
                name="password2"
              />
              <br />
              <br />
              <input id="submitBtn" type="submit" value="Sign Up" />
            </form>
          </div>
        </div>
        <span id="signInLink" onClick={login}>
          Already an user? Log In
        </span>
      </div>
    </>
  );
};

export default SignupPg;
