import React, { useState, useEffect } from "react";
import "./AdvSrchResPg.css";
import Navbar from "../Navbar/Navbar";
import { useHistory } from "react-router-dom";
const AdvancedResults = () => {
  let history = useHistory()
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("genreSearchRes") == null) {
      setLoading(true)
      setMovies(JSON.parse(localStorage.getItem("actorSearchRes")))
      console.log("Movies: " + JSON.stringify(movies))
      setLoading(false)
    }else if (localStorage.getItem("actorSearchRes") == null) {
      setLoading(true)
      setMovies(JSON.parse(localStorage.getItem("genreSearchRes")))
      console.log("Genre Movies: " + JSON.stringify(movies))
      setLoading(false)
    }
    setSearchTerm(localStorage.getItem("searchTerm"));
  }, [], [movies]);

  
  const movieReview = () => {
    if (localStorage.getItem("token") == null) {
      history.push(process.env.PUBLIC_URL + "/login")
    }else {
      history.push(process.env.PUBLIC_URL + "/movieResult")
    }
  };

  const handleSubmit = (movie) => {
    localStorage.setItem("clickedMovie", JSON.stringify(movie));
    localStorage.setItem("clickedMovieID", JSON.stringify(movie.id))
    movieReview();
  };

  return (
    <>
      <Navbar />
      <div className="inner-col box" id="footer">
        <div className="box">
          <h1 className="box reviewsBox">Tearm Searched: {searchTerm}</h1>
          <div className="box">
            <div className="table">
              {movies && !loading ? (
                movies.map((movie) => (
                  <div className="resultCard" key={movie.id}>
                    <div className="imgBlock">
                      <img 
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      />
                    </div>
                    <div id="movieTitle">{movie.title}</div>
                    <div id="movieBtn">
                      <input
                        id="submitBtn"
                        type="submit"
                        value="Review"
                        onClick={() => handleSubmit(movie)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <h1>Loadings....</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedResults;
