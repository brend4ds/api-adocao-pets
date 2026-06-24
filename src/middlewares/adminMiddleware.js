module.exports = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).send("Acesso restrito a administradores");
  }
  next();
};