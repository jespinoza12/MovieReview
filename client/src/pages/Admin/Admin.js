import Navbar from "../Navbar/Navbar";
import "./Admin.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getReviews();
    getUsers();
  }, []);

  useEffect(() => {
    setLoading1(false);
    console.log(reviews);
  }, [reviews]);

  useEffect(() => {
    setLoading(false);
    console.log(users);
  }, [users]);

  const getReviews = () => {
    setLoading1(true);
    fetch("https://review-it.herokuapp.com/items/getReviews")
      .then((response) => response.json())
      .then((data) => {
        setReviews(data); // update the state variable with the response data
      })
      .catch((error) => {
        console.error("Error fetching reviews: ", error);
      });
  };

  const getUsers = () => {
    setLoading(true);
    console.log(localStorage.getItem("token"));
    console.log("page: " + page);
    fetch(`https://review-it.herokuapp.com/items/admin/allUsers?page=${page}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false); // set loading to false after the data is fetched
      })
      .catch((error) => {
        console.error("Error fetching users: ", error);
      });
  };
  const deleteUser = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .delete(`https://review-it.herokuapp.com/items/admin/deleteUser/${id}`, config)
      .then((response) => {
        console.log(response.data);
        getUsers();
      })
      .catch((error) => {
        console.error("Error deleting user: ", error);
      });
  };

  const deleteReview = (id) => {
    axios
      .delete(`https://review-it.herokuapp.com/items/deleteReview/${id}`)
      .then((response) => {
        console.log(response.data);
        getReviews();
      })
      .catch((error) => {
        console.error("Error deleting review: ", error);
      });
  };
  const handlePrevPage = () => {
    if (page > 0) {
      const newPage = page - 1;
      setPage(newPage);
      getUsers();
      setLoading(true);
    }
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    getUsers();
    setLoading(true);
  };

  return (
    <>
      <Navbar />
      <div className="inner-col box" id="footer">
        <div className="box">
          <h1 className="box reviewsBox">Reviews</h1>
          <div className="box">
            <ul className="review-list">
              {!loading1 ? (
                reviews.map((review) => (
                  <li className="review-item" key={review.id}>
                    <div className="review-id">
                      Reviewer ID: {review.userID}
                    </div>
                    <div className="review-id">Name: {review.fname}</div>
                    <div className="user-review">Comment: {review.userRev}</div>
                    <input
                      className="delete-button"
                      type="submit"
                      value="Delete"
                      onClick={() => deleteReview(review.id)}
                    />
                  </li>
                ))
              ) : (
                <div>Loading...</div>
              )}
            </ul>
            <h1 className="box reviewsBox">Users</h1>
            {!loading ? (
              <div className="pagination">
                <button onClick={handlePrevPage}>Previous</button>
                <button onClick={handleNextPage}>Next</button>
                <div>Page: {page}</div>
              </div>
            ) : (
              <div></div>
            )}
            <ul className="review-list">
              {!loading ? (
                users.map((user) => (
                  <li className="review-item" key={user.ID}>
                    <div className="review-id">ID: {user.ID}</div>
                    <div className="review-id">
                      Name: {user.fname + " " + user.lname}
                    </div>
                    <input
                      className="delete-button"
                      type="submit"
                      value="Delete"
                      onClick={() => deleteUser(user.ID)}
                    />
                  </li>
                ))
              ) : (
                <div>Loading...</div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
