const { verificarRegistrar, verificarRecSenha } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/registrar",
    [
      verificarRegistrar.verificarEmailDup,
      verificarRegistrar.verificarCargoExiste
    ],
    controller.registrar
  );

  app.post("/api/auth/login", controller.login);

  app.post(
    "/api/auth/recuperar/senha",
  [
    verificarRecSenha.verificarEmailExiste
  ],
  controller.recuperarSenha
  );
};
