const jwt = require("jsonwebtoken");

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


module.exports = authenticate;

  