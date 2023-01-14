import '../public/LoginPg.css';
import logo from '../logo.png';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignupPg from './SignupPg';
import HomePg from './HomePg';
// import { NavLink } from "react-router-dom";



function LoginPg() {
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
              <div >
              Homepage
                <a href={HomePg}/>
              </div>
              {/* </input> */}
            </form>
          </div>
        
        </div>
        <span id="signInLink">
          Not a user? Sign Up 
        </span>
        <div>
        {/* <Router >
          <NavLink id='lookUpBtn' to={`/SignupPg`}>
            Login
		      </NavLink>
					<Routes>
				    <Route path='/' exact element={<LoginPg/>} />
            <Route path={'/SignupPg'} element={<SignupPg/>} />
		    	</Routes>
				</Router> */}
        </div>
        

        
      </div>
    </>
  );
}

export default LoginPg;