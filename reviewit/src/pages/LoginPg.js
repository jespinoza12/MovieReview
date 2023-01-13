import '../public/LoginPg.css';
import logo from '../logo.png';
import Navbar from './Navbar.js';

function LoginPg() {
  return (
    <>
      {/* <Navbar /> */}
      <div>
      
      
      <img id="loginLogo" src={logo} alt="logo"/>

  
        <div>
          please login 
        </div>
        <div>
          <div>
            name
          </div>
          <div>
            last name
          </div>
          <div>
            email
          </div>
          <div>
            password
          </div>
          <div>
            re-enter password
          </div>
          <div>
            login
          </div>
          <span>
            signup?
          </span>
        </div>
      </div>
    </>
  );
}

export default LoginPg;