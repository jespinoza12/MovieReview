import Navbar from "../Navbar/Navbar";
import "./ReviewPg.css";
import { useState, useEffect } from "react";
import StarRating from "./StarsRating";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

const ReviewPg = () => {
  const [clickedMovie, setClickedMovie] = useState([]);

  useEffect(() => {
    setClickedMovie(JSON.parse(localStorage.getItem("clickedMovie")));
    console.log(clickedMovie)
  }, []);

  const [message, setMessage] = useState("");
  const [hidden, setHidden] = useState(true);

  const reviewPage = () => {
    window.location.href = "/movieResult";
  };

  const [user, setUser] = useState({
    username: "",
    review: "",
  });

  const handleChange = (e) => {
    const { username, value } = e.target;
    setUser({
      ...user ,
      [username]: value,
    });
    console.log(user);
  };

  const submitReview = () => {
    axios
      .post("http://localhost:9292/items/reviews", user)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.user.role);
          setMessage("Review successful");
          setHidden(false);
          // redirect to the Review page (refresh)
          reviewPage();
        } else {
          setMessage(res.data.message);
          setHidden(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          setMessage("Error: " + error.response.data.message);
          setHidden(false);
        } else if (error.request) {
          setMessage("Error: " + error.request);
          setHidden(false);
        } else {
          setMessage("Error: " + error.message);
          setHidden(false);
        }
      });
  };

  function onSubmit(e) {
    e.preventDefault();
    submitReview();
  }

  return (
    <>
      <Navbar />
      <div>
        <div className="container">
          <Alert key="info" variant="info" hidden={hidden}>
            {message}
          </Alert>
          <div className="box innerContainer">
            <div className="inner-col box" id="article">
              <div className="box out-image">
                <div className="box abov-image">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${clickedMovie.poster_path}`}
                    alt={clickedMovie.title}
                  />
                </div>
                <div className="box">
                  <h1>{clickedMovie.title}</h1>
                  <h3>StarRating: 5/5</h3>
                  <h4 id="movieStars">{clickedMovie.release_date}</h4>
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
                    <div id="reviewPageReviewId">id</div>
                    <div id="reviewPageUserReview">reviewHere</div>
                    <div id="reviewPageReviewStars">Stars</div>
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
                <input id="usernameText" type="text" name="Username" value={user.username} />
                <br />
                <label>Review:</label>
                <br />
                <textarea id="reviewText" type="text" name="Review" value={user.review} />
                <br />
                <StarRating />
                <br />
                <br />
                <input id="submitBtn" type="submit" value="Submit" onClick={submitReview} />
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
