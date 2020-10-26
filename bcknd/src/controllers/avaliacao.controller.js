const db = require("../models");
const Usuario = db.usuario;
const Avaliacao = db.avaliacao;

criarAvaliacao = (req, res) => {
  console.log("avalContro", req.body);
  Usuario.findOne({
    where: {
      email: req.body.usuario.email,
    },
  }).then((usuario) => {
    if (!usuario) {
      return res.status(403).send({
        message: "Usuário não encontrado.",
      });
    } else {
      // Cadastra a nova avaliacao
      Avaliacao.create({
        titulo: req.body.titulo,
        atendimento: req.body.atendimento,
        nota: req.body.nota,
        observacoes: req.body.observacoes,
        OS_idOS: 1,
        OS_usuario_id: usuario.id,
        protocolo_idprotocolo: 1,
        usuarioId: usuario.id,
      })
        .then((avaliacao) => {
          res.send({
            message: "Avaliacao criada! Obrigado.",
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

listarAvaliacao = (req, res) => {
  console.log("dados", req.body);
  Usuario.findOne({
    where: {
      email: req.body.usuario.email,
    },
  }).then((usuario) => {
    if (!usuario) {
      return res.status(403).send({
        message: "Usuário não encontrado.",
      });
    } else {
      // Busca avaliações
      console.log("UsuarioID", usuario.id);
      Avaliacao.findAll({
        where: {
          usuarioId: usuario.id,
        },
      })
        .then((avaliacoes) => {
          res.status(200).send({
            avaliacoes: avaliacoes,
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

const avaliacao = {
  criarAvaliacao: criarAvaliacao,
  listarAvaliacao: listarAvaliacao,
};

module.exports = avaliacao;
