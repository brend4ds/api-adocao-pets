const express = require("express");
const app = express();

const usersRoutes = require("./src/routes/users");
const petsRoutes = require("./src/routes/pets");
const adoptionsRoutes = require("./src/routes/adoptions");
const authRoutes = require("./src/routes/auth");

// Permite que a aplicação receba dados em formato JSON
app.use(express.json());

// Rotas públicas e protegidas
app.use("/users", usersRoutes);
app.use("/pets", petsRoutes);
app.use("/adoptions", adoptionsRoutes);
app.use("/login", authRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});