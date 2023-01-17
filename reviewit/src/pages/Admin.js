import Navbar from "./Navbar";
import "../public/Admin.css";

function Admin() {
  
  function simpleSearch (){
    window.location.href='/';
  }

  return(
    <>
      <Navbar />
      <div id="container">
        {/* <div id='searchBox'> */}
          <div id="search">Advanced Search</div>
          {/* <label id="search">Search </label> */}
          <input type="search" placeholder="Search Movie by Actor"/>
          <input id="submitBtn" type="submit" value="Search" /> <br/>
          <input type="search" placeholder="Search Movie by Genre"/>
          <input id="submitBtn" type="submit" value="Search" /> <br/>
          <span id="SrchLink" onClick={simpleSearch}>
            Simple Search 
          </span>
        {/* </div> */}
      </div>
    </>
  );
}

export default Admin;