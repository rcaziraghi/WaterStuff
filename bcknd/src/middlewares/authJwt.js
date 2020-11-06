const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { usuario, cargos, cargo } = require("../models");
const db = require("../models");
const Usuario = db.usuario;

// Verifica o token de autenticacao
verificaToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Nenhum token provido!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Favor conectar novamente.",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

// Verifica se o usuário é admin
ehUsuario = (req, res, next) => {
  Usuario.findByPk(req.userId).then((usuario) => {
    usuario.getCargos().then((cargos) => {
      for (let i = 0; i < cargos.length; i++) {
        if (cargos[i].nome === "USUARIO") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Necessário ser usuario!",
      });
      return;
    });
  });
};

// Verifica se o usuário é admin
ehAdmin = (req, res, next) => {
  Usuario.findByPk(req.userId).then((usuario) => {
    usuario.getCargos().then((cargos) => {
      for (let i = 0; i < cargos.length; i++) {
        if (cargos[i].nome === "ADMIN") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Necessário cargo de admin!",
      });
      return;
    });
  });
};

// Verifica se o usuario é moderador
ehModerador = (req, res, next) => {
  Usuario.findByPk(req.userId).then((usuario) => {
    usuario.getCargos().then((cargos) => {
      for (let i = 0; i < cargos.length; i++) {
        if (cargos[i].nome === "MODERADOR") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Necessário cargo de moderador!",
      });
    });
  });
};

// Verifica se o usuario é admin ou moderador
ehModeradorOuAdmin = (req, res, next) => {
  Usuario.findByPk(req.userId).then((usuario) => {
    usuario.getCargos().then((cargos) => {
      for (let i = 0; i < cargos.length; i++) {
        if (cargos[i].nome === "MODERADOR") {
          next();
          return;
        }
        if (cargos[i].nome === "ADMIN") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Necessário cargo de moderador ou admin!",
      });
    });
  });
};

// Verifica se o email está no BD
registradoEmail = (req, res, next) => {
  Usuario.findOnde({
    where: {
      email: req.email,
    },
  }).then((usuario) => {
    if (usuario) {
      next();
      return;
    } else {
      res.status(403).send({
        message: "Email não registrado.",
      });
      return;
    }
  });
};

const authJwt = {
  verificaToken: verificaToken,
  ehUsuario: ehUsuario,
  ehAdmin: ehAdmin,
  ehModerador: ehModerador,
  ehModeradorOuAdmin: ehModeradorOuAdmin,
  registradoEmail: registradoEmail,
};
module.exports = authJwt;
