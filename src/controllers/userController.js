const userModel = require("../models/userModel");
const userService = require("../services/userService");

// Lista todos os usuários - apenas admin
exports.listar = (req, res) => {
  userModel.buscarTodos((err, results) => {
    if (err) return res.status(500).send("Erro ao listar usuários");
    res.json(results);
  });
};

// Busca usuário por ID - admin ou próprio usuário
exports.buscarPorId = (req, res) => {
  const id = req.params.id;

  // Verifica se é admin ou o próprio usuário
  if (req.userRole !== "admin" && req.userId !== parseInt(id)) {
    return res.status(403).send("Acesso negado");
  }

  userModel.buscarPorId(id, (err, results) => {
    if (err) return res.status(500).send("Erro ao buscar usuário");
    if (results.length === 0) return res.status(404).send("Usuário não encontrado");
    res.json(results[0]);
  });
};

// Cadastra novo usuário - rota pública
exports.cadastrar = async (req, res) => {
  userService.cadastrar(req.body, (err) => {
    if (err && err.status) {
      return res.status(err.status).send(err.message);
    }
    if (err && err.code === "ER_DUP_ENTRY") {
      return res.status(400).send("Email já cadastrado");
    }
    if (err) return res.status(500).send("Erro ao cadastrar usuário");
    res.status(201).send("Usuário cadastrado com sucesso");
  });
};

// Atualiza usuário - admin ou próprio usuário
exports.atualizar = (req, res) => {
  const id = req.params.id;

  // Verifica se é admin ou o próprio usuário
  if (req.userRole !== "admin" && req.userId !== parseInt(id)) {
    return res.status(403).send("Acesso negado");
  }

  userModel.atualizar(id, req.body, (err, result) => {
    if (err) return res.status(500).send("Erro ao atualizar usuário");
    if (result.affectedRows === 0) return res.status(404).send("Usuário não encontrado");
    res.send("Usuário atualizado com sucesso");
  });
};

// Deleta usuário - apenas admin
exports.deletar = (req, res) => {
  userModel.deletar(req.params.id, (err, result) => {
    if (err) return res.status(500).send("Erro ao deletar usuário");
    if (result.affectedRows === 0) return res.status(404).send("Usuário não encontrado");
    res.send("Usuário deletado com sucesso");
  });
};