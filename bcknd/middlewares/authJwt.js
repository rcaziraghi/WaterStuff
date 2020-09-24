const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { usuario, cargos, cargo } = require("../../waterstuff/models");
const db = require("../../waterstuff/models");
const Usuario = db.usuario;

verificaToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Nenhum token provido!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Sem autorização!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

ehAdmin = (req, res, next) => {
  Usuario.findByPk(req.userId).then(usuario => {
    usuario.getCargos().then(cargos => {
      for (let i = 0; i < cargos.length; i++) {
        if (cargos[i].nome === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Necessário cargo de admin!"
      });
      return;
    });
  });
};

ehModerador = (req, res, next) => {
  Usuario.findByPk(req.userId).then(usuario => {
    usuario.getCargos().then(cargos => {
      for (let i = 0; i < cargos.length; i++) {
        if (cargos[i].nome === "moderador") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Necessário cargo de moderador!"
      });
    });
  });
};

ehModeradorOuAdmin = (req, res, next) => {
  Usuario.findByPk(req.userId).then(usuario => {
    usuario.getCargos().then(cargos => {
      for (let i = 0; i < cargos.length; i++) {
        if (cargos[i].nome === "moderador") {
          next();
          return;
        }
        if (cargos[i].nome === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Necessário cargo de moderador ou admin!"
      });
    });
  });
};

const authJwt = {
  verificaToken: verificaToken,
  ehAdmin: ehAdmin,
  ehModerador: ehModerador,
  ehModeradorOuAdmin: ehModeradorOuAdmin
};
module.exports = authJwt;
