const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // em casa coloca "root", na escola deixa vazio
  database: "pets_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err);
    return;
  }
  console.log("Conectado ao banco de dados com sucesso!");
});

module.exports = connection;