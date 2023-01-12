import './App.css';

function App() {
  const refreshPage = ()=>{
		window.location.href='/';
	}

  return (
    <div className="App">
      <nav>
        This is the navabar
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