const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization)
    return req.status(403).json({ msg: "Not authorized . No token" });

  if (
    req.headers.authorization &&
    req.headers.authorization.startWith("Bearer ")
  ) {
    const token = req.headers.authorization.split(" ")[1]; // ["Bearer", "e-token"]
    jwt.verify(token, process.env.JWT__SECRECT, (err, data) => {
      if (err) return res.status(403).json({ msg: "Wrong or expire token." });
      else {
        req.user = data; // data = {id : user_id}
        next();
      }
    });
  }
};

module.exports = verifyToken;
