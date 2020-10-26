const { authJwt } = require("../middlewares");
const controller = require("../controllers/avaliacao.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/avaliacao/criar",
    [authJwt.verificaToken, authJwt.ehUsuario],
    controller.criarAvaliacao
  );

  app.post(
    "/api/avaliacao/listar",
    [authJwt.verificaToken, authJwt.ehUsuario],
    controller.listarAvaliacao
  );
};
