import '../public/SignupPg.css';
import logo from '../logo.png';
import {useRef} from 'react';
function SignupPg() {

  const login = ()=>{
    window.location.href='/login';
  }

  const fname = useRef();
  const lname = useRef();
  const street = useRef();
  const city = useRef();
  const state = useRef();
  const zip_code = useRef();
  const email = useRef();
  const phone = useRef();
  const password = useRef();
  const password2 = useRef();

  function onSubmit (e){
    e.preventDefault();
    console.log({fname: fname.current.value, lname: lname.current.value, 
      street: street.current.value, city: city.current.value, 
      state: state.current.value, zip_code: zip_code.current.value, 
      email: email.current.value, phone: phone.current.value, 
      password: password.current.value, password2: password2.current.value});

  }

  return (
    <>
      <div id="container">
      <img id="signupLogo" src={logo} alt="logo"/>
        <div id="signupBox" className='box'>
          <h1 id="logSigText">Sign Up</h1>
          <div id='form'>
            <form onSubmit={onSubmit}>
              <label>Fist Name:</label>
              <input ref={fname} type="text" name="First Name"/><br/> 
              <label>Last Name:</label>
              <input ref={lname} type="text" name="Last Name"/><br/>   
              <label>Street:</label>
              <input ref={street} type="text" name="Street"/><br/>  
              <label>City:</label>
              <input ref={city} type="text" name="city"/><br/> 
              <label>State</label>
              <input ref={state} type="text" name="State"/><br/> 
              <label>Zipcode:</label>
              <input ref={zip_code} type="text" name="zipcode"/><br/> 
              <label>Email:</label>
              <input ref={email} type="text" name="Email"/><br/>  
              <label>Phone:</label>
              <input ref={phone} type="text" name="Phone #"/><br/> 
              <label>Password:</label>
              <input ref={password} type="text" name="Password"/><br/>
              <label>Re-enter Password:</label>
              <input ref={password2} type="text" name="Password"/><br/>
              <br/>
              <button type='submit'>Submit</button>
            </form>
          </div>
        </div>
        <span id="signInLink" onClick={login}>
          Already an user? Log In
        </span>
      </div>
    </>
  );
}

export default SignupPg;