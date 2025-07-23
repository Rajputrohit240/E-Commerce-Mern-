const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ msg: "Access Denied. Login First!!!" });
    }

    if (token.startsWith("Bearer  ")) {
      console.log(token);
      token = token.slice(7, token.length).trim();
    }

    const verifiedToken = jwt.verify(token, "My-Shopping-Cart");
    req.user = verifiedToken;
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Bad Authorization! Token Expired!!!" });
  }
};

module.exports = authMiddleware;
