import Navbar from "./Navbar";
import "../public/HomePg.css";
import background from "../background2.png"

function HomePg() {
  
  function advancedSearch (){
    window.location.href='/advancedSearch';
  }

  return (
    <>
    <Navbar />
    <div id="container" style={{ 
      backgroundImage: `url(${background})`,
      backgorundRepeat: 'no-repeat',
      width: '100%',
      height: '90vh',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRrepeat: 'no-repeat'
      }}>
      <div className='searchBox'>
        <div id="search">Search</div>
        {/* <label id="search">Search </label> */}
        <input type="search" placeholder="Search Movie by Title"/>
        <input id="submitBtn" type="submit" value="Search" /> <br/>
        <span id="AdvSrchLink" onClick={advancedSearch}>
          Advanced Search 
        </span>
      </div>
    </div>
    </>
  );
}

export default HomePg;