import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./AdvSrchPg.css";
import background from "../Assets/background2.png";
import HomePg from "../Home/HomePg";

const AdvSrchPg = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const simpleSearch = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=ba5d3eaad19db7b4083fc09da38c13d7&language=en-US"
    )
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleGenreChange(event) {
    setSelectedGenre(event.target.value);
    console.log(selectedGenre);
  }

  function handleFnameChange(event) {
    setFname(event.target.value);
  }

  function handleLnameChange(event) {
    setLname(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    //Gets actors ID and sets searchTerm
    fetch(
      `https://api.tmdb.org/3/search/person?api_key=ba5d3eaad19db7b4083fc09da38c13d7&query=${fname}%20${lname}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("searchTerm", `${fname} ${lname}`);
        localStorage.setItem("actorId", data.results[0].id);
        
        searchForCredits();
      })
      .catch((error) => {
        console.error(error);
      });

      //Gets all movies the actor has been in and sets them to local storage
  }

  function searchForCredits(){
    fetch(`https://api.themoviedb.org/3/person/${localStorage.getItem('actorId')}?api_key=ba5d3eaad19db7b4083fc09da38c13d7&append_to_response=combined_credits`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("actorSearchRes", JSON.stringify(data.combined_credits.cast));
        localStorage.removeItem("genreSearchRes");
        window.location.href = "/advancedResults";
      })
      .catch((error) => {
        console.error(error);
      }); 
  }

  function handleGenreSubmit(event) {
    event.preventDefault();
    // handle search logic here using selectedGenre and fname/lname
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=ba5d3eaad19db7b4083fc09da38c13d7&with_genres=${JSON.parse(selectedGenre).id}`
    )
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("genreSearchRes", JSON.stringify(data.results));
        localStorage.setItem("searchTerm", `${JSON.parse(selectedGenre).name}`);
        localStorage.removeItem("actorSearchRes");
        window.location.href = "/advancedResults";
      
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
      <div id="searchBox">
      <form onSubmit={handleSubmit}>
          <div id="search">Advanced Search</div>
          <div className="searchSubtitle">Search by Actor</div>
          <input className="actorInput"
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={handleFnameChange}
          />
          <input className="actorInput"
            type="text"
            placeholder="Last Name"
            value={lname}
            onChange={handleLnameChange}
          />
          <input id="submitBtn" type="submit" value="Search" /> <br />
      </form>
      <form onSubmit={handleGenreSubmit}>
        <div className="searchSubtitle">Searh by Genre</div>
          <select onChange={handleGenreChange} value={selectedGenre}>
              <option value="">Select genre</option>
              {genres?.map((genre) => (
                <option key={genre.id} value={JSON.stringify(genre)}>
                  {genre.name}
                </option>
              ))}
          </select>
          <input id="submitBtn" type="submit" value="Search" />
      </form>
      <span id="SimpSrchLink" onClick={simpleSearch}>
        Simple Search 
      </span>
      </div>
      <br/>
      </div>
    </>
  );
};

export default AdvSrchPg;
