const { usuario, todosCargos } = require("../models");
const db = require("../models");
const Cargo = db.cargo;
const Usuario = db.usuario;

verificarEmailDup = (req, res, next) => {
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

verificarCargoExiste = (req, res, next) => {
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


const verificarRegistrar = {
    verificarEmailDup: verificarEmailDup,
    verificarCargoExiste: verificarCargoExiste
};

module.exports = verificarRegistrar;
