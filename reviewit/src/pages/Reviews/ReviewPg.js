import Navbar from "../Navbar/Navbar";
import "./ReviewPg.css";
import { useState, useEffect } from "react";
import StarRating from "./StarsRating";

const ReviewPg = () => {
  const [clickedMovie, setClickedMovie] = useState([]);

  useEffect(() => {
    setClickedMovie(JSON.parse(localStorage.getItem("clickedMovie")));
    console.log(clickedMovie)
  }, []);

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <Navbar />
      <div>
        <div className="container">
          <div className="box innerContainer">
            <div className="inner-col box" id="article">
              <div className="box out-image">
                <div className="box abov-image">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${clickedMovie.poster_path}`}
                    alt={clickedMovie.title}
                  />
                </div>
                <div className="box">
                  <h1>{clickedMovie.title}</h1>
                  <h1>StarRating: 5/5</h1>
                  <h1 className="box year">{clickedMovie.release_date}</h1>
                </div>
              </div>
              <div className="box">
                <div className="box desc">
                  <p className="box overview">{clickedMovie.overview}</p>
                </div>
              </div>
            </div>
            <div className="inner-col box" id="footer">
              <div className="box">
                <h1 className="box reviewsBox">Reviews</h1>
                <div className="box">
                  <div className="table">
                    <div>id</div>
                    <div>reviewHere</div>
                    <div>Stars</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="inner-col2 box"> */}
          <div className="inner-col2 box innerContainer" id="aside">
            <div className="box">
              {/* <div className='box'> */}
              <h1 className="box reviewBox">Leave a comment</h1>
              {/* </div> */}

              <div className="box form" onSubmit={onSubmit}>
                <label>Username:</label>
                <br />
                <input
                  id="usernameText"
                  type="text"
                  name="Username"
                />
                <br />
                <label>Review:</label>
                <br />
                <textarea id="reviewText" type="text" name="Review" />
                <br />
                <StarRating />
                <br />
                <br />
                <input id="submitBtn" type="submit" value="Submit" />
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default ReviewPg;
