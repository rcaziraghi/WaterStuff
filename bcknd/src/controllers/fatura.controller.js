const db = require("../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Usuario = db.usuario;
const Instalacao = db.instalacao;
const Fatura = db.fatura;

cadastrarFatura = (req, res) => {

};

listarFatura = (req,res) => {
    // Acha o usuario
    Usuario.findOne({
        where: {
          email: req.body.email
        }
      })
      // Depois de executar a busca de usuario
      .then(usuario => {
        console.log(usuario);
        if (!usuario) {
          return res.status(403).send({
            message: "Email não cadastrado."
          });
        } else {
          // busca as instalacoes
          console.log("usuarioId",usuario.id);
          Instalacao.findAll({
            where: { 
                usuarioId: usuario.id
              }
          })
          .then( instalacoes => {
              console.log("instalacoes", instalacoes)
              if(!instalacoes){
                return res.status(403).send({
                    message: "Instalacao não cadastrada."
                  });
              } else {
              let arrayIds = [];
              instalacoes.map(instalacao => {
                  arrayIds.push(instalacao.id)
              });
              console.log('arrayIds', arrayIds);
              Fatura.findAll({
                  where: {
                      instalacaoId: {
                          [Op.in]: arrayIds
                      }
                  }
              })
              .then( faturas => {
                  if(!faturas){
                    return res.status(403).send({
                        message: "Fatura não cadastrada."
                      });
                  } else {
                    res.status(200).send({
                        faturas: faturas
                    });
                  }
              })
            }
          })
          .catch(err => {
            res.status(500).send({
              message: err.message
            });
          });
        }  
      });
};

const fatura = {
    // cadastrarFatura: cadastrarFatura,
    listarFatura: listarFatura
};

module.exports = fatura;