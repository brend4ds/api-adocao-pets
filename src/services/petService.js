const petModel = require("../models/petModel");

// Valida e cadastra um novo pet
exports.cadastrar = (dados, callback) => {
  const { name, age, species, size, description } = dados;

  if (!name || !species || !size) {
    return callback({ status: 400, message: "Nome, espécie e porte são obrigatórios" });
  }

  petModel.inserir({ name, age, species, size, description }, callback);
};