const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// Rota pública - cadastrar usuário
router.post("/", userController.cadastrar);

// Rotas protegidas
router.get("/", authMiddleware, adminMiddleware, userController.listar);
router.get("/:id", authMiddleware, userController.buscarPorId);
router.put("/:id", authMiddleware, userController.atualizar);
router.delete("/:id", authMiddleware, adminMiddleware, userController.deletar);

module.exports = router;