const express = require("express");
const router = express.Router();
const adoptionController = require("../controllers/adoptionController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// Listar adoções - apenas admin
router.get("/", authMiddleware, adminMiddleware, adoptionController.listar);

// Realizar adoção - apenas adopter
router.post("/", authMiddleware, adoptionController.adotar);

module.exports = router;