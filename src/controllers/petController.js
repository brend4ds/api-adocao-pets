const petModel = require("../models/petModel");
const petService = require("../services/petService");

// Lista todos os pets - apenas admin
exports.listar = (req, res) => {
  petModel.buscarTodos((err, results) => {
    if (err) return res.status(500).send("Erro ao listar pets");
    res.json(results);
  });
};

// Lista pets disponíveis - rota pública
exports.listarDisponiveis = (req, res) => {
  petModel.buscarDisponiveis((err, results) => {
    if (err) return res.status(500).send("Erro ao listar pets disponíveis");
    res.json(results);
  });
};

// Busca pet por ID - apenas admin
exports.buscarPorId = (req, res) => {
  petModel.buscarPorId(req.params.id, (err, results) => {
    if (err) return res.status(500).send("Erro ao buscar pet");
    if (results.length === 0) return res.status(404).send("Pet não encontrado");
    res.json(results[0]);
  });
};

// Cadastra novo pet - apenas admin
exports.cadastrar = (req, res) => {
  petService.cadastrar(req.body, (err) => {
    if (err && err.status) {
      return res.status(err.status).send(err.message);
    }
    if (err) return res.status(500).send("Erro ao cadastrar pet");
    res.status(201).send("Pet cadastrado com sucesso");
  });
};

// Atualiza pet - apenas admin
exports.atualizar = (req, res) => {
  petModel.buscarPorId(req.params.id, (err, results) => {
    if (err) return res.status(500).send("Erro ao buscar pet");
    if (results.length === 0) return res.status(404).send("Pet não encontrado");

    petModel.atualizar(req.params.id, req.body, (err, result) => {
      if (err) return res.status(500).send("Erro ao atualizar pet");
      res.send("Pet atualizado com sucesso");
    });
  });
};

// Deleta pet - apenas admin, somente se status = available
exports.deletar = (req, res) => {
  petModel.buscarPorId(req.params.id, (err, results) => {
    if (err) return res.status(500).send("Erro ao buscar pet");
    if (results.length === 0) return res.status(404).send("Pet não encontrado");

    if (results[0].status === "adopted") {
      return res.status(400).send("Pets adotados não podem ser removidos");
    }

    petModel.deletar(req.params.id, (err) => {
      if (err) return res.status(500).send("Erro ao deletar pet");
      res.send("Pet deletado com sucesso");
    });
  });
};