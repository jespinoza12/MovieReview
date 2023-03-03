import React, { useState, useEffect } from "react";
import "./AdvSrchResPg.css";
import Navbar from "../Navbar/Navbar";
import { useHistory } from "react-router-dom";

const AdvancedResults = () => {
  let history = useHistory()
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setMovies(JSON.parse(localStorage.getItem("movies") || "[]"));
    setSearchTerm(localStorage.getItem("searchTerm"));
  }, []);

  const handleSubmit = (movie) => {
    localStorage.setItem("clickedMovie", JSON.stringify(movie));
    history.push(process.env.PUBLIC_URL + "/movieResult")
  };

  return (
    <>
      <Navbar />
      <div className="inner-col box" id="footer">
        <div className="box">
          <h1 className="box reviewsBox">Tearm Searched: {searchTerm}</h1>
          <div className="box">
            <div className="table">
              {movies ? (
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
                    <br/>
                    
                  </div>
                ))
              ) : (
                <h1>bruh</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedResults;
