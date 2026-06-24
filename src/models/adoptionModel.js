const connection = require("../config/db");

// Lista todas as adoções com dados do usuário e do pet
exports.buscarTodos = (callback) => {
  const sql = `
    SELECT adoptions.id, adoptions.adoption_date,
           users.name AS usuario, users.email,
           pets.name AS pet, pets.species
    FROM adoptions
    JOIN users ON adoptions.user_id = users.id
    JOIN pets ON adoptions.pet_id = pets.id
  `;
  connection.query(sql, callback);
};

// Verifica se um usuário já adotou um pet específico
exports.verificarAdocaoDuplicada = (user_id, pet_id, callback) => {
  connection.query(
    "SELECT * FROM adoptions WHERE user_id = ? AND pet_id = ?",
    [user_id, pet_id],
    callback
  );
};

// Registra uma nova adoção
exports.inserir = ({ user_id, pet_id, adoption_date }, callback) => {
  const sql =
    "INSERT INTO adoptions (user_id, pet_id, adoption_date) VALUES (?, ?, ?)";
  connection.query(sql, [user_id, pet_id, adoption_date], callback);
};