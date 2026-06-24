const connection = require("../config/db");

// Busca todos os usuários (sem retornar a senha)
exports.buscarTodos = (callback) => {
  connection.query(
    "SELECT id, name, email, phone, role FROM users",
    callback
  );
};

// Busca um usuário pelo ID (sem retornar a senha)
exports.buscarPorId = (id, callback) => {
  connection.query(
    "SELECT id, name, email, phone, role FROM users WHERE id = ?",
    [id],
    callback
  );
};

// Busca um usuário pelo email (com senha, para autenticação)
exports.buscarPorEmail = (email, callback) => {
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    callback
  );
};

// Insere um novo usuário
exports.inserir = ({ name, email, password, phone, role }, callback) => {
  const sql =
    "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)";
  connection.query(sql, [name, email, password, phone, role], callback);
};

// Atualiza um usuário pelo ID
exports.atualizar = (id, { name, email, phone }, callback) => {
  const sql =
    "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?";
  connection.query(sql, [name, email, phone, id], callback);
};

// Deleta um usuário pelo ID
exports.deletar = (id, callback) => {
  connection.query("DELETE FROM users WHERE id = ?", [id], callback);
};