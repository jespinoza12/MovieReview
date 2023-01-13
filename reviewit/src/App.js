import './App.css';
import logo from './public/logo.png';

function App() {
  const refreshPage = ()=>{
		window.location.href='/';
	}

  return (
    <div className="App">
      <div id="container">
        <div id='navBar1' className='box'>
          <span className="navItem">
            <img onClick={() => {refreshPage()}} id="navLogo" src={logo} alt="logo"/>
          </span>
          <span className="navItem">
            <a>Welcome --Insert Username Here--</a>
          </span>
        </div>
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
    </div>
  );
}

export default App;