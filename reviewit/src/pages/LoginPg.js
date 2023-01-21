import '../public/LoginPg.css';
import logo from '../logo1.png';
import {useRef} from 'react';
function LoginPg() {

  function home (){
    window.location.href='/';
  }

  function register (){
    window.location.href='/register';
  }

  const emailref = useRef();
  const passwordref = useRef();

  function onSubmit (e){
    e.preventDefault();
    console.log({email: emailref.current.value, password: passwordref.current.value});
  }

  return (
    <>
      <div id="container">
      <img id="loginLogo" src={logo} alt="logo" onClick={home}/>
        <div id="loginBox" className='box'>
          <h1 id="logSigText">Login</h1>
          <div id='form'>
            <form onSubmit={onSubmit}>
              <label>Email:</label>
              <input ref={emailref} type="text" name="Email"/><br/>  
              <label>Password:</label>
              <input ref={passwordref} type="text" name="Password"/><br/>
              <input id="submitBtn" type="submit" value="Login" />
            </form>
          </div>
        </div>
        <span id="signInLink" onClick={register}>
          Not a user? Sign Up 
        </span>
      </div>
    </>
  );
}

export default LoginPg;