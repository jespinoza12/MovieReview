import Navbar from "../Navbar/Navbar";
import "./ReviewPg.css";
import { useState, useEffect } from "react";
// import StarRating from "./StarsRating";
import "./StarsRating.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ReviewPg = () => {
  const [clickedMovie, setClickedMovie] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stars, setStars] = useState(0);
  useEffect(() => {
    setClickedMovie(JSON.parse(localStorage.getItem("clickedMovie")));
    getReviews();
    calculateAverageStars();
    console.log(clickedMovie);
    console.log(reviews);
  }, []);

  useEffect(() => {
    console.log(reviews);
    setLoading(false);
  }, [reviews]);


  useEffect(() => {
    console.log(clickedMovie);
    getReviews();
  }, [clickedMovie]);


  function onSubmit(e) {
    e.preventDefault();
    console.log(review);
    addReview();
    getReviews();
  }

  function addReview() {
    axios
      .post("https://review-it.herokuapp.com/items/reviews", review)
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [review, setReview] = useState({
    fname: "",
    lname: "",
    userRev: "",
    stars: "",
    movieID: "",
    userId: localStorage.getItem("ID"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const movieID = "movieID";
    setReview({
      ...review,
      [name]: value,
      [movieID]: clickedMovie.id,
    });

    console.log(review);
  };

  function calculateAverageStars() {
    let totalStars = 0;
    for (let i = 0; i < reviews.length; i++) {
      console.log(reviews[i].stars)
      totalStars += reviews[i].stars;
    }
    const averageStars = totalStars / reviews.length;
    setStars(averageStars);
  }

  // const getReviews = () => {
  //   setLoading(true);
  //   fetch("https://review-it.herokuapp.com/items/getReviews")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setLoading(true);
  //       setReviews(data); // update the state variable with the response data
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching reviews: ", error);
  //     });
  // };

  
  const getReviews = () => {
    fetch(`https://review-it.herokuapp.com/items/getReviewsByID/${localStorage.getItem('clickedMovieID')}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setReviews(data); 
      })
      .catch((error) => {
        console.error("Error fetching reviews: ", error);
      });
  };

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
                    src={`https://image.tmdb.org/t/p/w300${clickedMovie.poster_path}`}
                    alt={clickedMovie.title}
                  />
                </div>
                <div className="box">
                  <h1>{clickedMovie.title}</h1>
                  <h3>StarRating: {stars.toString()}/5</h3>
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
                  {!loading ? (
                    <div className="table">
                      {reviews.map((review, Id) => (
                        <div className="table" key={Id}>
                          <div id="reviewPageReviewId">Name: {review.fname}</div>
                          <div id="reviewPageUserReview">Comment: {review.userRev}</div>
                          <div id="reviewPageReviewStars">Rating: {review.stars}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>Loading...</div>
                  )}
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

              <div className="box form">
                <label>First name:</label>
                <br />
                <input
                  name="fname"
                  value={review.fname}
                  onChange={handleChange}
                  id="fnameText"
                  type="text"
                />
                <br />
                <label>Last name:</label>
                <br />
                <input
                  id="lnameText"
                  type="text"
                  name="lname"
                  value={review.lname}
                  onChange={handleChange}
                />
                <br />
                <label>Review:</label>
                <br />
                <textarea
                  id="reviewText"
                  type="text"
                  name="userRev"
                  value={review.userRev}
                  onChange={handleChange}
                />
                <br />
                <div class="rate">
                  <input
                    type="radio"
                    id="star5"
                    name="stars"
                    value="5"
                    onChange={handleChange}
                  />
                  <label for="star5" />
                  <input
                    type="radio"
                    id="star4"
                    name="stars"
                    value="4"
                    onChange={handleChange}
                  />
                  <label for="star4" />
                  <input
                    type="radio"
                    id="star3"
                    name="stars"
                    value="3"
                    onChange={handleChange}
                  />
                  <label for="star3" />
                  <input
                    type="radio"
                    id="star2"
                    name="stars"
                    value="2"
                    onChange={handleChange}
                  />
                  <label for="star2" />
                  <input
                    type="radio"
                    id="star1"
                    name="stars"
                    value="1"
                    onChange={handleChange}
                  />
                  <label for="star1" />
                </div>

                <br />
                <br />
                <input
                  id="submitBtn"
                  type="submit"
                  value="Submit"
                  onClick={onSubmit}
                />
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
