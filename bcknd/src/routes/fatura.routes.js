const { authJwt } = require("../middlewares");
const controller = require("../controllers/fatura.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    // app.post(
    //   "/api/fatura/cadastrar",
    //   [
    //     authJwt.verificaToken,
    //     authJwt.ehUsuario
    //   ],
    //   controller.cadastrarFatura
    // );

    app.post(
      "/api/fatura/listar",
      [
        authJwt.verificaToken,
        authJwt.ehUsuario
      ],
      controller.listarFatura
    );
  };