const adoptionModel = require("../models/adoptionModel");
const adoptionService = require("../services/adoptionService");

// Lista todas as adoções - apenas admin
exports.listar = (req, res) => {
  adoptionModel.buscarTodos((err, results) => {
    if (err) return res.status(500).send("Erro ao listar adoções");
    res.json(results);
  });
};

// Registra uma adoção - apenas adopter
exports.adotar = (req, res) => {
  const { pet_id } = req.body;
  const user_id = req.userId;

  if (!pet_id) {
    return res.status(400).send("pet_id é obrigatório");
  }

  // Verifica se o usuário é adopter
  if (req.userRole !== "adopter") {
    return res.status(403).send("Apenas adotantes podem adotar pets");
  }

  adoptionService.adotar(user_id, pet_id, (err, result) => {
    if (err) return res.status(err.status).send(err.message);
    res.status(201).json(result);
  });
};