import Navbar from "./Navbar";
import "../public/HomePg.css";
import background from "../background2.png"
// import { useState, useEffect } from "react";
// import axios from "axios";
function HomePg() {
  
  function advancedSearch (){
    window.location.href='/advancedSearch';
  }

  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //         axios.get('http://localhost:9292/items/user', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
  //             .then(response => {
  //                 console.log(response.data.message);
  //                 setUser(response.data);
  //             })
              
  //     }
  // }, []);

  

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