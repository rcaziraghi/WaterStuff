const db = require("../models");
const Usuario = db.usuario;
const Denuncia = db.denuncia;

cadastrarDenuncia = (req, res) => {
  console.log("criarDenController", req.body);
  // Procura usuario
  Usuario.findOne({
    where: {
      email: req.body.usuario.email,
    },
  }).then((usuario) => {
    // Se não achar o usuario retorna mensagem e 403
    if (!usuario) {
      return res.status(403).send({
        message: "Usuário não encontrado.",
      });
    } else {
      // Cadastra(cria) a nova denuncia
      Denuncia.create({
        titulo: req.body.titulo,
        subtitulo: req.body.subtitulo,
        descritivo: req.body.descritivo,
        usuarioId: req.body.usuario.id,
      })
        .then((denuncia) => {
          res.send({
            message: "Denuncia criada! Obrigado.",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    }
  });
};

const denuncia = {
  cadastrarDenuncia: cadastrarDenuncia,
};

module.exports = denuncia;
