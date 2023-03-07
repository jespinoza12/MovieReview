import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./AdvSrchPg.css";
import background from "../Assets/background2.png";
import { useHistory } from "react-router-dom";
import axios from "axios";
const AdvSrchPg = () => {
  const [genres, setGenres] = useState([]);
  let history = useHistory();

  const [selectedGenre, setSelectedGenre] = useState([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const simpleSearch = () => {
    history.push(process.env.PUBLIC_URL + "/");
  };

  useEffect(() => {
    axios.get("https://review-it.herokuapp.com/items/genres")
      .then((response) =>  {
        setGenres(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleGenreChange(event) {
    setSelectedGenre(JSON.parse(event.target.value));
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
    axios.get(`https://review-it.herokuapp.com/items/actor/${fname}/${lname}`)
    .then((response) => {
        console.log(response);
        localStorage.setItem("searchTerm", `${fname} ${lname}`);
        localStorage.setItem("actorId", response.data[0].id);
        searchForCredits();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function searchForCredits() {
    axios.get(`https://review-it.herokuapp.com/items/actor/${localStorage.getItem("actorId")}`)
    .then((response) => {
        console.log(response);
        localStorage.setItem("actorSearchRes", JSON.stringify(response.data.combined_credits.crew));
        localStorage.removeItem("genreSearchRes");
        history.push(process.env.PUBLIC_URL + "/advancedResults")
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleGenreSubmit(event) {
    event.preventDefault();
    axios.get(`https://review-it.herokuapp.com/items/genre/${selectedGenre.id}/1`)
      .then((response) => {
        localStorage.setItem("genreSearchRes", JSON.stringify(response.data));
        localStorage.setItem("searchTerm", JSON.stringify(selectedGenre.name));
        localStorage.removeItem("actorSearchRes");
        history.push(process.env.PUBLIC_URL + "/advancedResults")
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
            <input
              className="actorInput"
              type="text"
              placeholder="First Name"
              value={fname}
              onChange={handleFnameChange}
            />
            <input
              className="actorInput"
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
              <option value="">{JSON.stringify(selectedGenre.name)}</option>
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
        <br />
      </div>
    </>
  );
};

export default AdvSrchPg;
