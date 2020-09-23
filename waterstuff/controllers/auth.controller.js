const db = require("../models");
const config = require("../config/auth.config");
const Usuario = db.usuario;
const Cargo = db.cargo;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Salvar usuario no BD
  Usuario.create({
    email: req.body.email,
    senha: bcrypt.hashSync(req.body.senha, 8)
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
            res.send({ message: "Usuario registrado com sucesso!" });
          });
        });
      } else {
        // usuario/cargo = 1
        usuario.setCargos([1]).then(() => {
          res.send({ message: "Usuario regostrado com sucesso!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  Usuario.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(usuario => {
    console.log(usuario);
      if (!usuario) {
        return res.status(404).send({ message: "Usuario não encontrado." });
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

      var token = jwt.sign({ id: usuario.id }, config.secret, {
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
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
