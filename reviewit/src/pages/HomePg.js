import Navbar from "./Navbar";
import "../public/HomePg.css";
import background from "../background2.png"

function HomePg() {
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
      <div>
        <p id="search">Search</p>
        <input type="search" placeholder="Search here"/>
        <input id="submitBtn" type="submit" value="Submit" /> <br/>
        <span id="AdvSrchLink">
          Advanced Search 
        </span>
      </div>
    </div>
    </>
  );
}

export default HomePg;