exports.telaPublica = (req, res) => {
    res.status(200).send("Acesso público.");
  };
  
  exports.telaDeUsuario = (req, res) => {
    res.status(200).send("Serviços de usuário:");
  };
  
  exports.telaDeAdmin = (req, res) => {
    res.status(200).send("Serviços de admin.");
  };
  
  exports.telaDeModerador = (req, res) => {
    res.status(200).send("Serviços de moderador.");
  };