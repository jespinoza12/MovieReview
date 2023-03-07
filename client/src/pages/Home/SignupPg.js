import "./SignupPg.css";
import logo from "../Assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"


const SignupPg = () => {
  let history = useHistory()
  const [errors, setErrors] = useState({});

  function home() {
    
    history.push(process.env.PUBLIC_URL + "/")
  }

  const login = () => {
    history.push(process.env.PUBLIC_URL + "/login")

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

  const validate = () => {
    let errors = {};
  
    if (!user.fname.trim()) {
      errors.fname = "First name is required";
    }
  
    if (!user.lname.trim()) {
      errors.lname = "Last name is required";
    }
  
    if (!user.street.trim()) {
      errors.street = "Street is required";
    }
  
    if (!user.city.trim()) {
      errors.city = "City is required";
    }
  
    if (!user.state.trim()) {
      errors.state = "State is required";
    }
  
    if (!user.zip_code.trim()) {
      errors.zip_code = "Zip code is required";
    } else if (!/^\d{5}$/.test(user.zip_code)) {
      errors.zip_code = "Zip code must be a 5-digit number";
    }
  
    if (!user.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email)
    ) {
      errors.email = "Invalid email address";
    }
  
    if (!user.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(user.phone)) {
      errors.phone = "Phone number must be a 10-digit number";
    }
  
    if (!user.password.trim()) {
      errors.password = "Password is required";
    } else if (user.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
  
    if (user.password !== user.password2) {
      errors.password2 = "Passwords do not match";
    }
  
    return errors;
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: undefined,
    });
  };

  const register = () => {

  const errors = validate();

  if (Object.keys(errors).length > 0) {
    setErrors(errors);
  } else {
    axios
      .post("https://review-it.herokuapp.com/items/register", user)
      .then((res) => {
        setMessage(res.data.message);
      });
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
              {errors.fname ? <div className="error">{errors.fname}</div> : null}
              <br />
              <label>Last Name:</label>
              <input
                value={user.lname}
                onChange={handleChange}
                type="text"
                name="lname"
              />
              {errors.lname && <div className="error">{errors.lname}</div>}
              <br />
              <label>Street:</label>
              <input
                value={user.street}
                onChange={handleChange}
                type="text"
                name="street"
              />
              {errors.street && <div className="error">{errors.street}</div>}
              <br />
              <label>City:</label>
              <input
                value={user.city}
                onChange={handleChange}
                type="text"
                name="city"
              />
              {errors.city && <div className="error">{errors.city}</div>}
              <br />
              <label>State</label>
              <input
                value={user.state}
                onChange={handleChange}
                type="text"
                name="state"
              />
              {errors.state && <div className="error">{errors.state}</div>}
              <br />
              <label>Zipcode:</label>
              <input
                value={user.zip_code}
                onChange={handleChange}
                type="text"
                name="zip_code"
              />
              {errors.zip_code && <div className="error">{errors.zip_code}</div>}
              <br />
              <label>Email:</label>
              <input
                value={user.email}
                onChange={handleChange}
                type="text"
                name="email"
              />
              {errors.email && <div className="error">{errors.email}</div>}
              <br />
              <label>Phone:</label>
              <input
                value={user.phone}
                onChange={handleChange}
                type="text"
                name="phone"
              />
              {errors.phone && <div className="error">{errors.phone}</div>}
              <br />
              <label>Password:</label>
              <input
                value={user.password}
                onChange={handleChange}
                type="text"
                name="password"
              />
              {errors.password && <div className="error">{errors.password}</div>}
              <br />
              <label>Re-enter Password:</label>
              <input
                value={user.password2}
                onChange={handleChange}
                type="text"
                name="password2"
              />
              {errors.password2 && <div className="error">{errors.password2}</div>}
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
