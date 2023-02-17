import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./HomePg.css";
import background from "../Assets/background2.png";
import axios from "axios";
const HomePg = () => {
  const [input, setInput] = useState("");
  const handleSearchTermChange = (event) => {
    setInput(event.target.value);
  };

  const advancedSearch = () => {
    history.push(process.env.PUBLIC_URL + "/advancedSearch")
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=ba5d3eaad19db7b4083fc09da38c13d7&query=${input}`
      )
      .then((response) => {
        localStorage.setItem("searchTerm", input);
        localStorage.setItem("movies", JSON.stringify(response.data.results));
        history.push(process.env.PUBLIC_URL + "/searchResults")

      })
      .catch((error) => {
        console.log(error);
      });
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
