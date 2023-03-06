import React, { useState, useEffect } from "react";
import "./AdvSrchResPg.css";
import Navbar from "../Navbar/Navbar";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AdvancedResults = () => {
  let history = useHistory();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMovies();
    setSearchTerm(localStorage.getItem("searchTerm"));
  }, [page]);

  const handleSubmit = (movie) => {
    localStorage.setItem("clickedMovie", JSON.stringify(movie));
    if (localStorage.getItem("token") == null) {
      history.push(process.env.PUBLIC_URL + "/login");
    } else {
      history.push(process.env.PUBLIC_URL + "/movieResult");
      localStorage.setItem("clickedMovieID", JSON.stringify(movie.id));
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setLoading(true);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
    setLoading(true);
  };

  const getMovies = () => {
    axios
      .get(
        `https://review-it.herokuapp.com/items/movie/${localStorage.getItem(
          "searchTerm"
        )}/${page.toString()}`
      )
      .then((response) => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
                    <br/>
                    
                  </div>
                ))
              ) : (
                <h1>Loading.....</h1>
              )}
            </div>
            <div className="pagination">
              <button onClick={handlePrevPage}>Previous</button>
              <button onClick={handleNextPage}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedResults;
