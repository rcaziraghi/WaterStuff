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

listarDenuncia = (req, res) => {
  // Procura usuário das denuncias
  Usuario.findOne({
    where: {
      email: req.body.usuario.email,
    },
  }).then((usuario) => {
    // Se não houver usuário, retorna erro
    if (!usuario) {
      return res.status(403).send({
        message: "Usuário não encontrado.",
      });
    } else {
      Denuncia.findAll({
        where: {
          usuarioId: usuario.id,
        },
      })
        .then((denuncias) => {
          if (!denuncias) {
            return res.status(403).send({
              message: "Denuncia não cadastrada.",
            });
          } else {
            res.send({
              denuncias: denuncias,
            });
          }
        })
        .catch((erro) => {
          res.status(500).send({
            message: err.message,
          });
        });
    }
  });
};

const denuncia = {
  cadastrarDenuncia: cadastrarDenuncia,
  listarDenuncia: listarDenuncia,
};

module.exports = denuncia;
