const { authJwt } = require("../middlewares");
const controller = require("../controllers/denuncia.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/denuncia/cadastrar",
    [authJwt.verificaToken, authJwt.ehUsuario],
    controller.cadastrarDenuncia
  );

  app.post(
    "/api/denuncia/listar",
    [authJwt.verificaToken, authJwt.ehUsuario],
    controller.listarDenuncia
  );
};
