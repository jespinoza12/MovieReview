import Navbar from "./Navbar";
import "../public/HomePg.css";
import background from "../background2.png"
import { useRef } from "react";

function HomePg() {
  
  function advancedSearch (){
    window.location.href='/advancedSearch';
  }

  const searchBox = useRef();

  function searchSubmit(e){
    e.preventDefault();
    console.log({query: searchBox.current.value});
  }

  return (
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
        <div id="search">Search</div>
        {/* <label id="search">Search </label> */}
        <form onSubmit={searchSubmit}>
          <input type="search" ref={searchBox} placeholder="Search Movie by Title"/>
          <input id="submitBtn" type="submit" value="Search" /> <br/>
          <span id="AdvSrchLink" onClick={advancedSearch}>
            Advanced Search 
          </span>
        </form>
      {/* </div> */}
    </div>
    </>
  );
}

export default HomePg;