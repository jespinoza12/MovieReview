import Navbar from "../Navbar/Navbar";
import "./Admin.css";
import { useState, useEffect } from "react";
const Admin = () => {

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviews();
  }, []);
  
  useEffect(() => {
    setLoading(false);
  }, [reviews]);



   const getReviews = () => {
    setLoading(true);
    fetch("https://review-it.herokuapp.com/items/getReviews")
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setReviews(data); // update the state variable with the response data
      })
      .catch((error) => {
        console.error("Error fetching reviews: ", error);
      });
  };
  return (
    <>
      <Navbar />
      <div className="inner-col box" id="footer">
        <div className="box">
          <h1 className="box reviewsBox">Users</h1>
          <div className="box">
            <div className="table">
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
              <input id="submitBtn" type="submit" value="Delete" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
