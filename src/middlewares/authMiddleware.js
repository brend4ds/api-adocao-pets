const jwt = require("jsonwebtoken");

const SECRET = "segredo_jwt_pets";

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send("Token não fornecido");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido");
    }
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  });
};