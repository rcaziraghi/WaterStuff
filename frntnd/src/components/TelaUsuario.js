import React, { useState, useEffect } from "react";

import servicoUsuario from "../services/usuario.service";

const TelaUsuario = () => {
  const [conteudo, setConteudo] = useState("");

  useEffect(() => {
    servicoUsuario.obterTelaUsuario().then(
      (resposta) => {
        setConteudo(resposta.data);
      },
      (erro) => {
        const _content =
          (erro.resposta &&
            erro.resposta.data &&
            erro.resposta.data.mensagem) ||
          erro.message ||
          erro.toString();

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

export default TelaUsuario;
