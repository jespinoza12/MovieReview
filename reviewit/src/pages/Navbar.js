import '../public/Navbar.css';
import logo from '../logo.png';


function Navbar() {
  const refreshPage = ()=>{
		window.location.href='/';
	}

  const login = ()=>{
    window.location.href='/login';
  }

  const logout = ()=>{
    localStorage.clear();
    window.location.href='/';
  }

  return (
    <div className='box' id='navBar'>
      <span className="navItem">
        <img onClick={() => {refreshPage()}} id="navLogo" src={logo} alt="logo"/>
      </span>
      <span className="navItem navItemInfo">
        {localStorage.getItem('token') ? <span>{"Welcome: " + localStorage.getItem('fname') + " " + localStorage.getItem('lname')}<button onClick={logout}>Logout</button> </span>: <span onClick={login}>Login</span>}
      </span>
      
    </div>
  );
}

export default Navbar;