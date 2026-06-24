const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const SECRET = "segredo_jwt_pets";

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email e senha são obrigatórios");
  }

  userModel.buscarPorEmail(email, async (err, results) => {
    if (err) return res.status(500).send("Erro ao buscar usuário");
    if (results.length === 0) return res.status(401).send("Email ou senha incorretos");

    const usuario = results[0];

    // Compara a senha enviada com a senha criptografada no banco
    const senhaCorreta = await bcrypt.compare(password, usuario.password);
    if (!senhaCorreta) {
      return res.status(401).send("Email ou senha incorretos");
    }

    // Gera o token JWT com userId e role, expira em 1 hora
    const token = jwt.sign(
      { userId: usuario.id, role: usuario.role },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  });
};