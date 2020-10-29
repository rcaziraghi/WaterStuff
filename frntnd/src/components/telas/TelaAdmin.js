import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import servicoUsuario from "../../services/usuario.service";

const TelaAdmin = (props) => {
  const [conteudo, setConteudo] = useState("");

  const { estaLogado } = useSelector((state) => state.auth);

  // Se não está logado
  if (!estaLogado) {
    props.history.push("/login");
    window.location.reload();
  }

  useEffect(() => {
    servicoUsuario.obterTelaAdmin().then(
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

export default TelaAdmin;
