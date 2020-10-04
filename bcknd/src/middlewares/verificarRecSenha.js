const { usuarios } = require("../models");
const db = require("../models");
const Usuario = db.usuario;

verificarEmailExiste = (req, res, next) => {
    // Email
    Usuario.findOne({
      where: {
        email: req.body.email
      }
    }).then(usuario => {
      if (!usuario) {
        res.status(400).send({
          message: "Erro! Email não registrado."
        });
        return;
      }
      next();
    });
  };

  const verificarRecSenha = {
    verificarEmailExiste: verificarEmailExiste
};

module.exports = verificarRecSenha;