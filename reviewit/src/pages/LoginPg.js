import '../public/LoginPg.css';
import logo from '../logo.png';

function LoginPg() {

  function register (){
    window.location.href='/register';
  }

  

  return (
    <>
      <div id="container">
      <img id="loginLogo" src={logo} alt="logo"/>
        <div id="loginBox" className='box'>
          <h1 id="logSigText">Login</h1>
          <div id='form'>
            <form>
              <label>Email:</label>
              <input type="text" name="Email"/><br/>  
              <label>Password:</label>
              <input type="text" name="Password"/><br/>
              <br/>
              <input id="submitBtn" type="submit" value="Submit" />
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