const { authJwt } = require("../middlewares");
const controller = require("../controllers/usuario.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.telaPublica);

  app.get(
    "/api/test/user",
    [authJwt.verificaToken],
    controller.telaDeUsuario
  );

  app.get(
    "/api/test/mod",
    [authJwt.verificaToken, authJwt.ehModerador],
    controller.telaDeModerador
  );

  app.get(
    "/api/test/admin",
    [authJwt.verificaToken, authJwt.ehAdmin],
    controller.telaDeAdmin
  );
};
