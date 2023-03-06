import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./HomePg.css";
import background from "../Assets/background2.png";
import { useHistory } from "react-router-dom"

const HomePg = () => {
  let history = useHistory()
  const [input, setInput] = useState("");

  const handleSearchTermChange = (event) => {
    setInput(event.target.value);
  };

  const advancedSearch = () => {
    history.push(process.env.PUBLIC_URL + "/advancedSearch")
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("searchTerm", input);
    history.push(process.env.PUBLIC_URL + "/searchResults")
  };
  

  return (
    <>
      <Navbar />
      <div
        id="container"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "90vh",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
      <div className="searchBox">
        <form onSubmit={handleSubmit}>
          <div id="search">Search</div>
          <input
            type="search"
            placeholder="Search Movie by Title"
            value={input}
            onChange={handleSearchTermChange}
          />
          <input id="submitBtn" type="submit" value="Search" /> <br />
          <span id="AdvSrchLink" onClick={advancedSearch}>
            Advanced Search 
          </span>
        </form>
      </div>
      </div>
    </>
  );
};

export default HomePg;
