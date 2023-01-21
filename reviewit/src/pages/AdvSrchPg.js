import Navbar from "./Navbar";
import "../public/AdvSrchPg.css";
import background from "../background2.png"

function AdvSrchPg() {
  
  function simpleSearch (){
    window.location.href='/';
  }

  return(
    <>
      <Navbar />
      <div id="container" style={{ 
        backgroundImage: `url(${background})`,
        backgorundRepeat: 'no-repeat',
        width: '100%',
        height: '92vh',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRrepeat: 'no-repeat'
        }}>
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

export default AdvSrchPg;