const adoptionModel = require("../models/adoptionModel");
const petModel = require("../models/petModel");

exports.adotar = (user_id, pet_id, callback) => {
  // Verifica se o pet existe e está disponível
  petModel.buscarPorId(pet_id, (err, pets) => {
    if (err) return callback({ status: 500, message: "Erro ao buscar pet" });
    if (pets.length === 0) return callback({ status: 404, message: "Pet não encontrado" });

    const pet = pets[0];

    if (pet.status !== "available") {
      return callback({ status: 400, message: "Pet não está disponível para adoção" });
    }

    // Verifica se o usuário já adotou esse pet
    adoptionModel.verificarAdocaoDuplicada(user_id, pet_id, (err, adocoes) => {
      if (err) return callback({ status: 500, message: "Erro ao verificar adoção" });
      if (adocoes.length > 0) {
        return callback({ status: 400, message: "Você já adotou esse pet" });
      }

      // Registra a adoção
      const adoption_date = new Date().toISOString().split("T")[0];
      adoptionModel.inserir({ user_id, pet_id, adoption_date }, (err) => {
        if (err) return callback({ status: 500, message: "Erro ao registrar adoção" });

        // Atualiza o status do pet para 'adopted'
        petModel.atualizarStatus(pet_id, "adopted", (err) => {
          if (err) return callback({ status: 500, message: "Erro ao atualizar status do pet" });
          callback(null, { message: "Adoção realizada com sucesso" });
        });
      });
    });
  });
};