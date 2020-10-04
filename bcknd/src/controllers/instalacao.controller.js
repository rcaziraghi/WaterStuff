const crypto = require("crypto");
const db = require("../models");
const Usuario = db.usuario;
const Instalacao = db.instalacao;

require('dotenv').config();

var bcrypt = require("bcryptjs");

cadastrarInstalacao = (req, res) => {
    Usuario.findOne({
        where: {
          email: req.body.email
        }
      })
      .then(usuario => {
        console.log(usuario);
        if (!usuario) {
          return res.status(403).send({
            message: "Email não cadastrado."
          });
        } else {
          // cadastra nova instalacao
          Instalacao.create({
              codConsumidor: req.body.codConsumidor,
              usuarioId: usuario.id,
              cpf: req.body.cpf
          })
          .then( instalacao => {
            res.send({
                message: "Instalação registrada com sucesso!"
              });
          })
          .catch(err => {
            res.status(500).send({
              message: err.message
            });
          });
        }  
      });
  };
  
  const instalacao = {
    cadastrarInstalacao: cadastrarInstalacao
  }
  
  module.exports = instalacao;