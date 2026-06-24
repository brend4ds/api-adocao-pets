const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

// Cadastra um novo usuário com senha criptografada
exports.cadastrar = async (dados, callback) => {
  const { name, email, password, phone, role } = dados;

  if (!name || !email || !password) {
    return callback({ status: 400, message: "Nome, email e senha são obrigatórios" });
  }

  // Criptografa a senha antes de salvar
  const senhaCriptografada = await bcrypt.hash(password, 10);

  const novoUsuario = {
    name,
    email,
    password: senhaCriptografada,
    phone: phone || null,
    role: role === "admin" ? "admin" : "adopter",
  };

  userModel.inserir(novoUsuario, callback);
};