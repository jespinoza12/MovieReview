import '../public/Navbar.css';
import logo from '../logo.png';

function Navbar() {
  const refreshPage = ()=>{
		window.location.href='/';
	}

  return (
    <div className='box' id='navBar'>
      <span className="navItem">
        <img onClick={() => {refreshPage()}} id="navLogo" src={logo} alt="logo"/>
      </span>
      <span className="navItem navItemInfo">
        <a>Welcome --Insert Username Here--</a>
      </span>
    </div>
  );
}

export default Navbar;