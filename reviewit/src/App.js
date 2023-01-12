import './App.css';
import logo from './public/logo.png';

function App() {
  const refreshPage = ()=>{
		window.location.href='/';
	}

  return (
    <div className="App">
      <nav>
        
        <a>
          <img className="imgLogo" src={logo} alt='review-It Logo'/>
        </a>
      </nav>
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
  );
}

export default App;