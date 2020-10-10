const { authJwt } = require("../middlewares");
const controller = require("../controllers/instalacao.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post(
      "/api/instalacao/cadastrar",
      [
        authJwt.verificaToken,
        authJwt.ehUsuario
      ],
      controller.cadastrarInstalacao
    );

    app.post(
      "/api/instalacao/listar",
      [
        authJwt.verificaToken,
        authJwt.ehUsuario
      ],
      controller.listarInstalacao
    );
  };