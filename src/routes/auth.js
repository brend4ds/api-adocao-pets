const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Rota pública - login
router.post("/", authController.login);

module.exports = router;