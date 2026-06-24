const connection = require("../config/db");

// Busca todos os pets (inclusive adotados) - apenas admin
exports.buscarTodos = (callback) => {
  connection.query("SELECT * FROM pets", callback);
};

// Busca apenas pets disponíveis - rota pública
exports.buscarDisponiveis = (callback) => {
  connection.query(
    "SELECT * FROM pets WHERE status = 'available'",
    callback
  );
};

// Busca um pet pelo ID
exports.buscarPorId = (id, callback) => {
  connection.query("SELECT * FROM pets WHERE id = ?", [id], callback);
};

// Insere um novo pet
exports.inserir = ({ name, age, species, size, description }, callback) => {
  const sql =
    "INSERT INTO pets (name, age, species, size, status, description) VALUES (?, ?, ?, ?, 'available', ?)";
  connection.query(sql, [name, age, species, size, description], callback);
};

// Atualiza um pet pelo ID
exports.atualizar = (id, { name, age, species, size, description }, callback) => {
  const sql =
    "UPDATE pets SET name = ?, age = ?, species = ?, size = ?, description = ? WHERE id = ?";
  connection.query(sql, [name, age, species, size, description, id], callback);
};

// Atualiza o status do pet para 'adopted'
exports.atualizarStatus = (id, status, callback) => {
  connection.query(
    "UPDATE pets SET status = ? WHERE id = ?",
    [status, id],
    callback
  );
};

// Deleta um pet pelo ID
exports.deletar = (id, callback) => {
  connection.query("DELETE FROM pets WHERE id = ?", [id], callback);
};