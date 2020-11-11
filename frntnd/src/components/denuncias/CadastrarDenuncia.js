import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cadastrar } from "../../actions/denuncia";

const CadastrarDenuncia = (props) => {
  const { estaLogado, usuario } = useSelector((state) => state.auth);
  const { mensagem } = useSelector((state) => state.mensagem);

  // Valida se está logado, deverá para usar o objeto
  if (!estaLogado) {
    props.history.push("/login");
    window.location.reload();
  }

  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [descritivo, setDescritivo] = useState("");

  const [loading, setLoading] = useState("");

  const [mensagemTitulo, setMensagemTitulo] = useState("");
  const [mensagemDescritivo, setMensagemDescritivo] = useState("");
  const [mensagemBackend, setMensagemBackend] = useState("");
  const [tipoMensagemBackend, setTipoMensagemBackend] = useState("");

  const dispatch = useDispatch();

  const validarPreenchido = (valor) => {
    if (!valor) {
      return false;
    } else {
      return true;
    }
  };

  const aoMudarTitulo = (e) => {
    const tituloInserido = e.target.value;
    validarPreenchido(tituloInserido)
      ? setMensagemTitulo("")
      : setMensagemTitulo("Preencher título!");
    setTitulo(tituloInserido);
  };

  const aoMudarSubtitulo = (e) => {
    const subTituloInserido = e.target.value;
    setSubtitulo(subTituloInserido);
  };

  const aoMudarDescritivo = (e) => {
    const descritivoInserido = e.target.value;
    validarPreenchido(descritivoInserido)
      ? setMensagemDescritivo("")
      : setMensagemDescritivo("Preencher descritivo!");
    setDescritivo(descritivoInserido);
  };

  const handleDenuncia = (e) => {
    e.preventDefault();
    setLoading(true);

    if (titulo && descritivo) {
      const dados = {
        titulo: titulo,
        subtitulo: subtitulo,
        descritivo: descritivo,
        usuario: usuario,
      };
      dispatch(cadastrar(dados))
        .then((resposta) => {
          setMensagemBackend(resposta.message);
          setTipoMensagemBackend("s");
        })
        .catch((erro) => {
          console.log("mensagem erro", erro);
          setMensagemBackend(erro);
          setTipoMensagemBackend("e");
        });
    } else {
      validarPreenchido(titulo)
        ? setMensagemTitulo("")
        : setMensagemTitulo("Preencher título!");

      validarPreenchido(descritivo)
        ? setMensagemDescritivo("")
        : setMensagemDescritivo("Preencher descritivo!");
    }
    setLoading(false);
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <form onSubmit={handleDenuncia}>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="titulo">Título</label>
              <input
                type="text"
                className="form-control"
                name="titulo"
                value={titulo}
                onChange={aoMudarTitulo}
              />

              {mensagemTitulo && (
                <div className="alert alert-danger" role="alert">
                  {mensagemTitulo}
                </div>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="subtitulo">Subtítulo</label>
              <input
                type="text"
                className="form-control"
                name="subtitulo"
                value={subtitulo}
                onChange={aoMudarSubtitulo}
              />

            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="descritivo">Descritivo</label>
              <textarea
                type="text"
                className="form-control"
                name="descritivo"
                value={descritivo}
                onChange={aoMudarDescritivo}
              />

              {mensagemDescritivo && (
                <div className="alert alert-danger" role="alert">
                  {mensagemDescritivo}
                </div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col">
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Cadastrar denuncia</span>
              </button>
            </div>
          </div>

          {mensagemBackend && (
            <div className="form-group row">
              <div className="form-group col">
                <div
                  className={
                    tipoMensagemBackend === "e"
                      ? "alert alert-danger"
                      : "alert alert-primary"
                  }
                  role="alert"
                >
                  {mensagem}
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CadastrarDenuncia;
