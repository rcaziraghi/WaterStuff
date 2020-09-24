const { usuario, todosCargos } = require("../../waterstuff/models");
const db = require("../../waterstuff/models");
const Cargo = db.cargo;
const Usuario = db.usuario;

verificaEmailDup = (req, res, next) => {
    // Email
    Usuario.findOne({
      where: {
        email: req.body.email
      }
    }).then(usuario => {
      if (usuario) {
        res.status(400).send({
          message: "Erro! Email já em uso."
        });
        return;
      }
      next();
    });
};

verificaCargoExiste = (req, res, next) => {
  if (req.body.cargos) {
    Cargo.findAll({
      attributes : [ 'nome' ],
      raw : true
    }).then( todosCargos => {
    cargos = todosCargos.map( (item) => item.nome );
    console.log("Todos cargos:", cargos);
    for (let i = 0; i < req.body.cargos.length; i++) {
      if (!cargos.includes(req.body.cargos[i])) {
        res.status(400).send({
          message: "Erro! Cargo não existe = " + req.body.cargos[i]
        });
        return;
      }
    }
  });
  }
  next();
};

const verificaSignUp = {
    verificaEmailDup: verificaEmailDup,
    verificaCargoExiste: verificaCargoExiste
};

module.exports = verificaSignUp;
