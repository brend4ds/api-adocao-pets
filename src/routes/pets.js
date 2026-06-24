const express = require("express");
const router = express.Router();
const petController = require("../controllers/petController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// Rota pública - listar pets disponíveis
router.get("/available", petController.listarDisponiveis);

// Rotas protegidas - apenas admin
router.get("/", authMiddleware, adminMiddleware, petController.listar);
router.get("/:id", authMiddleware, adminMiddleware, petController.buscarPorId);
router.post("/", authMiddleware, adminMiddleware, petController.cadastrar);
router.put("/:id", authMiddleware, adminMiddleware, petController.atualizar);
router.delete("/:id", authMiddleware, adminMiddleware, petController.deletar);

module.exports = router;