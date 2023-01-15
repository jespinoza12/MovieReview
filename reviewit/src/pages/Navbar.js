import '../public/Navbar.css';
import logo from '../logo.png';

function Navbar() {
  const refreshPage = ()=>{
		window.location.href='/';
	}

  const login = ()=>{
    window.location.href='/login';
  }

  const loggedIn = false;
  return (
    <div className='box' id='navBar'>
      <span className="navItem">
        <img onClick={() => {refreshPage()}} id="navLogo" src={logo} alt="logo"/>
      </span>
      <span className="navItem navItemInfo">
        {
          loggedIn ? <a>Welcome --Insert Username Here--</a> : <a onClick={login}>Login</a>
        }
      </span>
    </div>
  );
}

export default Navbar;