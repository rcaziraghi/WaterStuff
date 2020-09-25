// Pagina publica. Usuarios não logados podem acessar

import React, { useState, useEffect } from "react";

import servicoUsuario from "../services/usuario.service";

const Home = () => {
  const [conteudo, setConteudo] = useState("");

  useEffect(() => {
    servicoUsuario.obterTelaPublica().then(
      (response) => {
        setConteudo(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setConteudo(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{conteudo}</h3>
      </header>
    </div>
  );
};

export default Home;
