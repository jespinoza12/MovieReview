import '../public/SignupPg.css';
import logo from '../logo.png';

function SignupPg() {
  return (
    <>
      <div id="container">
      <img id="signupLogo" src={logo} alt="logo"/>
        <div id="signupBox" className='box'>
          <h1 id="logSigText">Sign Up</h1>
          <div id='form'>
            <form>
              <label>Fist Name:</label>
              <input type="text" name="First Name"/><br/> 
              <label>Last Name:</label>
              <input type="text" name="Last Name"/><br/>   
              <label>Email:</label>
              <input type="text" name="Email"/><br/>  
              <label>Password:</label>
              <input type="text" name="Password"/><br/>
              <label>Re-enter Password:</label>
              <input type="text" name="Password"/><br/>
              <br/>
              <input id="submitBtn" type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <span id="signInLink">
          Already an user? Log In
        </span>
      </div>
    </>
  );
}

export default SignupPg;