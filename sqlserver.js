const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 9292;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
require("dotenv").config();
const sql = require("mssql");

const config = {
  user: "azureuser",
  password: "7piercerS!",
  server: "mysqlserver198.database.windows.net",
  database: "reviewit",
};

const pool = new sql.ConnectionPool(config);

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database");
  }
});

// declare a new express app
const app = express();
app.use(express.json({ limit: "100mb", extended: true }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(cors({}));
// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*", "Authorization");
  next();
});

const authenticate = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) {
    return res.send({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.send({ message: "Unauthorized: Invalid token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.send({ message: "Unauthorized: Invalid token" });
  }
};

app.get("/items/user", authenticate, (req, res) => {
  res.send({ user: req.user });
});

app.post("/items/reviews", function (req, res) {
  const { userID, movieID, userRev, fname, lname } = req.body;
  sql.connect(config, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "An error occurred while connecting to the database",
      });
    }

    const request = new sql.Request();
    request.input("userID", sql.VarChar, userID);
    request.input("movieID", sql.VarChar, movieID);

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
            "INSERT INTO reviews (fname, lName, userID, movieID, userRev) VALUES (@fname, @lname, @userID, @movieID, @userRev)";

          request.input("fname", sql.VarChar, fname);
          request.input("lname", sql.VarChar, lname);
          request.input("userRev", sql.VarChar, userRev);

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

app.post("/items/stars", function (req, res) {
  const { userID, movieID, userRev } = req.body;

  const pool = new sql.ConnectionPool(config);
  pool.connect().then(() => {
    const request = new sql.Request(pool);

    // Check if the user has already reviewed the movie
    request.input("userID", sql.VarChar, userID);
    request.input("movieID", sql.VarChar, movieID);
    request.query(
      "SELECT * FROM starRatings WHERE userID = @userID AND movieID = @movieID",
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send({ message: "An error occurred" });
        } else if (result.recordset.length > 0) {
          // Update the existing review
          request.input("userRev", sql.VarChar, userRev);
          request.query(
            "UPDATE starRatings SET userRev = @userRev WHERE userID = @userID AND movieID = @movieID",
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).send({ message: "An error occurred" });
              } else {
                res.send({ message: "The Review was Successfully Updated" });
              }
              pool.close();
            }
          );
        } else {
          // Create a new review
          request.input("userRev", sql.VarChar, userRev);
          request.query(
            "INSERT INTO starRatings (userID, movieID, userRev) VALUES (@userID, @movieID, @userRev)",
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).send({ message: "An error occurred" });
              } else {
                res.send({ message: "The Review was Successfully Uploaded" });
              }
              pool.close();
            }
          );
        }
      }
    );
  });
});

app.get("/items/admin/allUsers", authenticate, async (req, res) => {
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

app.post("/items/login", async (req, res, next) => {
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

app.post("/items/register", (req, res) => {
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

app.delete("/items/deleteUser", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(port, function () {
  console.log(`App started ${port}`);
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
