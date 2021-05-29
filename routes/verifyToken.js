const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.send("Token not present");

  try {
    const verified = jwt.verify(token, "khfwldkf445afadsj");
    req.user = verified;
    next();
  } catch (error) {
    res.send("Invalid Token");
  }
};
