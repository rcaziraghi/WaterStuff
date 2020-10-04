const crypto = require("crypto");
const db = require("../models");
const config = require("../config/auth.config");
const Usuario = db.usuario;
const Cargo = db.cargo;

require('dotenv').config();

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { userInfo } = require("os");

const nodemailer = require('nodemailer');

// Função para registro
registrar = (req, res) => {
  // Salvar usuario no BD
  Usuario.create({
      email: req.body.email,
      nomeCompleto: req.body.nomeCompleto,
      senha: bcrypt.hashSync(req.body.senha, 8),
      dtNascimento: req.body.dtNascimento,
      cidade: req.body.cidade,
      siglaEstado: req.body.siglaEstado
    })
    .then(usuario => {
      if (req.body.cargos) {
        Cargo.findAll({
          where: {
            nome: {
              [Op.or]: req.body.cargos
            }
          }
        }).then(cargos => {
          usuario.setCargos(cargos).then(() => {
            res.send({
              message: "Usuario registrado com sucesso!"
            });
          });
        });
      } else {
        // usuario/cargo = 1
        usuario.setCargos([1]).then(() => {
          res.send({
            message: "Usuario regostrado com sucesso!"
          });
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

login = (req, res) => {
  Usuario.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(usuario => {
      console.log(usuario);
      if (!usuario) {
        return res.status(404).send({
          message: "Usuario não encontrado."
        });
      }

      var senhaValida = bcrypt.compareSync(
        req.body.senha,
        usuario.senha
      );

      if (!senhaValida) {
        return res.status(401).send({
          accessToken: null,
          message: "Senha inválida!"
        });
      }

      var token = jwt.sign({
        id: usuario.id
      }, config.secret, {
        expiresIn: 86400 // 24 horas
      });

      var authorities = [];
      usuario.getCargos().then(cargos => {
        for (let i = 0; i < cargos.length; i++) {
          authorities.push("CARGO_" + cargos[i].nome.toUpperCase());
        }
        console.log(authorities);
        res.status(200).send({
          id: usuario.id,
          email: usuario.email,
          cargos: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

recuperarSenha = (req, res) => {
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
        // Cria nova senha
        const novaSenha = crypto.randomBytes(10).toString('hex');
        // Atualiza senha
        usuario.update({
          senha: bcrypt.hashSync(novaSenha, 8)
        });

        // Envia por email senha nova
        const transporte = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: `${process.env.ENDERECO_EMAIL}`,
            pass: `${process.env.SENHA_EMAIL}`,
          }
        });

        const opcoesEmail = {
          from: 'naoresponda@waterstuff.com.br',
          to: `${usuario.email}`,
          subject: 'Nova senha',
          text: 
            "Esta é a sua nova senha para acessar o sistema: " + `${novaSenha}`
        };

        console.log('Enviado email');

        transporte.sendMail(opcoesEmail, (erro, resposta) => {
          if(erro){
            console.log('Erro ao enviar o email!');
          } else {
            console.log('Resposta: ', resposta);
            res.status(200).send({
              message: "Verifique o seu email!"
            });
          }
        })
      }
      

    });
};

const auth = {
  registrar: registrar,
  login: login,
  recuperarSenha: recuperarSenha
}

module.exports = auth;