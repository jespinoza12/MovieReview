const express = require("express");
const router = express.Router();
const sql = require("mssql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./config");
const pool = new sql.ConnectionPool(config);
const auth = require("./auth");
pool.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database");
  }
});

router.get("/items/user", auth, (req, res) => {
  res.send({ user: req.user });
});

router.get("/items/admin/allUsers", auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "Admin") {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    const pool = await sql.connect(config);
    const result = await pool.request().query("SELECT * FROM users");

    return res.status(200).json({
      users: allUsers,
      users: result.recordset,
      message: `Welcome Admin ${user.lname}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching the users",
    });
  } finally {
    sql.close();
  }
});

router.post("/items/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await pool
      .request()
      .input("email", sql.NVarChar(255), email)
      .query("SELECT * FROM users WHERE email = @email");

    const user = result.recordset[0];

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.send({ message: "Login Successful", user: user, token: token });
      } else {
        res.send({ message: "Email or Password Incorrect" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred while logging in" });
  }
});

router.post("/items/register", (req, res) => {
  const {
    fname,
    lname,
    street,
    city,
    state,
    zip_code,
    email,
    phone,
    password,
  } = req.body;

  // Create a connection to the database
  sql.connect(config, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Database error" });
      return;
    }
    // Check if the user already exists in the database
    const checkUserQuery = `SELECT * FROM users WHERE email = '${email}'`;
    new sql.Request().query(checkUserQuery, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Database error" });
        return;
      }
      if (result.recordset.length > 0) {
        // User already exists
        res.send({ message: "User already exists" });
      } else {
        // User doesn't exist, so create a new user
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            const addUserQuery = `INSERT INTO users (fname, lname, street, city, state, zip_code, email, phone, password, role) VALUES ('${fname}', '${lname}', '${street}', '${city}', '${state}', '${zip_code}', '${email}', '${phone}', '${hash}', 'user')`;
            new sql.Request().query(addUserQuery, (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).send({ message: "Database error" });
                return;
              }
              res.send({ message: "Successfully Registered, Please Login" });
            });
          });
        });
      }
    });
  });
});

router.delete("/items/deleteUser", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

router.post("/items/reviews", function (req, res) {
  const { userId, movieID, userRev, fname, lname, stars } = req.body;
  sql.connect(config, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "An error occurred while connecting to the database",
      });
    }

    const request = new sql.Request();
    request.input("userID", sql.Int, parseInt(userId));
    request.input("movieID", sql.Int, movieID);
    console.log("userID: " + userId);
    request.query(
      "SELECT * FROM reviews WHERE userID = @userID AND movieID = @movieID",
      function (err, result) {
        if (err) {
          console.error(err);
          return res.status(500).json({
            message: "An error occurred while querying the database",
          });
        }

        const review = result.recordset[0];

        if (review) {
          res.send({ message: "Review already exists" });
        } else {
          const query =
            "INSERT INTO reviews (fname, lname, userID, movieID, userRev, stars) VALUES (@fname, @lname, @userID, @movieID, @userRev, @stars)";

          request.input("fname", sql.VarChar, fname);
          request.input("lname", sql.VarChar, lname);
          request.input("userRev", sql.VarChar, userRev);
          request.input("stars", sql.VarChar, stars);

          request.query(query, function (err, result) {
            if (err) {
              console.error(err);
              return res.status(500).json({
                message: "An error occurred while querying the database",
              });
            }

            res.send({ message: "The Review was Succesfully Uploaded" });
          });
        }
      }
    );
  });
});

router.get("/items/getReviews", function (req, res) {
  //I want this to get all the reviews from the database
  sql.connect(config, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "An error occurred while connecting to the database",
      });
    }

    const request = new sql.Request();
    request.query("SELECT * FROM reviews", function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "An error occurred while querying the database",
        });
      }

      res.send({ reviews: result.recordset });
    });
  });
});

module.exports = router;
