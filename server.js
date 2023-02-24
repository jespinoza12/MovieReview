const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 9002
const path = require('path')
require("dotenv").config();
const sql = require("mssql");
const routes = require("./routes/router");

// declare a new express app
const app = express();
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json({limit: '100mb', extended: true}))
app.use(express.urlencoded({limit: '100mb', extended: true}))
app.use(cors())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*", "Authorization");
  next();
});

app.use('/', routes);

app.listen(port, function () {
  console.log(`App started ${port}`);
});