import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const Perfil = () => {
  const { usuario: usuarioAtual } = useSelector((state) => state.auth);

  // Redireciona para página de login caso usuario não esteja logado
  if (!usuarioAtual) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          Perfil de: <strong>{usuarioAtual.nomeCompleto}</strong>
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {usuarioAtual.id}
      </p>
      <p>
        <strong>Cidade/Estado:</strong> {usuarioAtual.cidade}/{usuarioAtual.siglaEstado}
      </p>
      <p>
        <strong>Email:</strong> {usuarioAtual.email}
      </p>
      <strong>Cargo(s):</strong>
      <ul>
        {usuarioAtual.cargos &&
          usuarioAtual.cargos.map((cargo, index) => <li key={index}>{cargo}</li>)}
      </ul>
    </div>
  );
};

export default Perfil;
