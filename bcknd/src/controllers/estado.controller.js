const db = require("../models");
const Estado = db.estado;

listarEstado = (req, res) => {
  Estado.findAll()
    .then((estados) => {
      res.status(200).send({
        estados: estados,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

const estados = {
  listarEstado: listarEstado,
};

module.exports = estados;
