const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const tokenValidator = (req, res, next) => {
  // get the token from headers
  const token = req.headers["authorization"];
  
  if (!token) {
    return res.status(401).json({ msg: "No token found", success: false });
  }

  const splitToken = token.split(" ")

  if (!splitToken[1]) {
    return res.status(401).json({ msg: "No token found", success: false });
  }

  jwt.verify(splitToken[1] , process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Invalid Token", success: false });
    }

    req.user = decoded;
    next();
  });
};

module.exports = tokenValidator;