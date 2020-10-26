import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { criar } from "../../actions/avaliacao";

const CriarAvaliacao = (props) => {
  const { estaLogado, usuario } = useSelector((state) => state.auth);
  const { mensagem } = useSelector((state) => state.mensagem);

  // Se não está logado
  if (!estaLogado) {
    props.history.push("/login");
    window.location.reload();
  }

  const [titulo, setTitulo] = useState("");
  const [nota, setNota] = useState("");
  const [atendimento, setAtendimento] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [loading, setLoading] = useState("");

  const [mensagemTitulo, setMensagemTitulo] = useState("");
  const [mensagemNota, setMensagemNota] = useState("");
  const [mensagemAtendimento, setMensagemAtendimento] = useState("");

  const [mensagemBackend, setMensagemBackend] = useState("");
  const [tipoMensagemBackend, setTipoMensagemBackend] = useState("");

  const dispatch = useDispatch();

  const valores = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

  const rangeAvaliacoes = valores.map((i) => {
    return <option key={i}>{i}</option>;
  });

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

  const validarIsNaN = (valor) => {
    if (!isNaN(valor)) {
      return false;
    } else {
      return true;
    }
  };

  const aoMudarNota = (e) => {
    e.preventDefault();
    const notaSelecionada = e.target.value;
    setNota(notaSelecionada);
    validarPreenchido(notaSelecionada)
      ? setMensagemNota("")
      : setMensagemNota("Preencher nota!");

    if (validarIsNaN(notaSelecionada)) {
      setMensagemNota("Preencher nota!");
    } else {
      setMensagemNota("");
    }
    console.log("ao mudar nota", notaSelecionada);
  };

  const aoMudarAtendimento = (e) => {
    const atendimentoInserido = e.target.value;
    validarPreenchido(atendimentoInserido)
      ? setMensagemAtendimento("")
      : setMensagemAtendimento("Preencher atendimento!");
    setAtendimento(atendimentoInserido);
  };

  const aoMudarObservacoes = (e) => {
    const observacoesInseridas = e.target.value;
    setObservacoes(observacoesInseridas);
  };

  const handleAvaliacao = (e) => {
    e.preventDefault();
    setLoading(true);

    // Valida campos obrigatórios
    validarPreenchido(titulo)
      ? setMensagemTitulo("")
      : setMensagemTitulo("Preencher título!");

    console.log("nota", nota);

    if (!nota) {
      setMensagemNota("Preencher nota!");
      setLoading(false);
      return;
    } else {
      setMensagemNota("");
    }

    if (validarIsNaN(nota)) {
      setMensagemNota("Preencher nota!");
      setLoading(false);
      return;
    } else {
      setMensagemNota("");
    }

    console.log("mensagemNota", mensagemNota);

    validarPreenchido(atendimento)
      ? setMensagemAtendimento("")
      : setMensagemAtendimento("Preencher atendimento!");

    if (!mensagemTitulo && !mensagemNota && !mensagemAtendimento) {
      const dados = {
        titulo: titulo,
        nota: nota,
        atendimento: atendimento,
        observacoes: observacoes,
        usuario: usuario,
      };
      dispatch(criar(dados))
        .then((resposta) => {
          console.log("mensagem sucesso", resposta);
          setMensagemBackend(resposta.message);
          setTipoMensagemBackend("s");
        })
        .catch((erro) => {
          console.log("mensagem erro", erro);
          setMensagemBackend(erro);
          setTipoMensagemBackend("e");
        });
    }

    setLoading(false);
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <form onSubmit={handleAvaliacao}>
          <div className="form-row">
            <div className="col-md-10">
              <div className="form-group">
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

            <div className="col-md-2">
              <div className="form-group">
                <label htmlFor="titulo">Nota</label>
                <select
                  onChange={aoMudarNota}
                  value={nota}
                  className="custom-select"
                  id="inputNota"
                >
                  <option defaultValue>Escolha</option>
                  {rangeAvaliacoes}
                </select>

                {mensagemNota && (
                  <div className="alert alert-danger" role="alert">
                    {mensagemNota}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="titulo">Atendimento</label>
              <input
                type="text"
                className="form-control"
                name="atendimento"
                value={atendimento}
                onChange={aoMudarAtendimento}
              />

              {mensagemAtendimento && (
                <div className="alert alert-danger" role="alert">
                  {mensagemAtendimento}
                </div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="titulo">Observações</label>
              <textarea
                type="text"
                className="form-control"
                name="observacoes"
                value={observacoes}
                onChange={aoMudarObservacoes}
              />

              {mensagemAtendimento && (
                <div className="alert alert-danger" role="alert">
                  {mensagemAtendimento}
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
                <span>Avaliar</span>
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

export default CriarAvaliacao;
