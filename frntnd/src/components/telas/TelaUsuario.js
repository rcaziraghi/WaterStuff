import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import servicoUsuario from "../../services/usuario.service";

const TelaUsuario = () => {
  const [conteudo, setConteudo] = useState("");
  const [selecao, setSelecao] = useState("instalacao");
  const [liberado, setLiberado] = useState(false);

  useEffect(() => {
    servicoUsuario.obterTelaUsuario().then(
      (resposta) => {
        setConteudo(resposta.data);
        setLiberado(true);
      },
      (erro) => {
        console.log("erro", erro);
        const _content =
          // (erro.resposta &&
          //   erro.resposta.data &&
          //   erro.resposta.data.mensagem) ||
          // erro.message ||
          erro.response.data.message.toString();
        console.log("content", _content);
        setConteudo(_content);
        setLiberado(false);
      }
    );
  }, []);

  return (
    <div className="container">
      <header>
        <h5 className="col border">{conteudo}</h5>
      </header>
      {liberado && (
        <div className="row">
          <div className="col-4">
            <div className="list-group" id="list-tab" role="tablist">
              <button
                className={
                  selecao === "instalacao"
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item list-group-item-action"
                }
                id="instalacao"
                data-toggle="list"
                onClick={() => setSelecao("instalacao")}
                role="tab"
                aria-controls="home"
              >
                Ligação de água
              </button>

              <button
                className={
                  selecao === "fatura"
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item list-group-item-action"
                }
                id="fatura"
                data-toggle="list"
                onClick={() => setSelecao("fatura")}
                role="tab"
                aria-controls="profile"
              >
                Fatura
              </button>

              <button
                className={
                  selecao === "solicitacoes"
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item list-group-item-action"
                }
                id="solicitacoes"
                data-toggle="list"
                onClick={() => setSelecao("solicitacoes")}
                role="tab"
                aria-controls="messages"
              >
                Solicitações
              </button>

              <button
                className={
                  selecao === "protocolos"
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item list-group-item-action"
                }
                id="protocolos"
                data-toggle="list"
                onClick={() => setSelecao("protocolos")}
                role="tab"
                aria-controls="settings"
              >
                Protocolos
              </button>

              <button
                className={
                  selecao === "avaliacoes"
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item list-group-item-action"
                }
                id="avaliacoes"
                data-toggle="list"
                onClick={() => setSelecao("avaliacoes")}
                role="tab"
                aria-controls="settings"
              >
                Avaliações
              </button>
            </div>
          </div>

          <div className="col-8">
            <div className="tab-content" id="nav-tabContent">
              <div
                className={
                  selecao === "instalacao"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="list-instalacao"
                role="tabpanel"
                aria-labelledby="instalacao"
              >
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <Link to={"/instalacao/cadastro"} className="form-group">
                      Cadastrar instalação de água
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link to={"/instalacao/listar"} className="form-group">
                      Lista de instalação de água
                    </Link>
                  </li>
                </ul>
              </div>

              <div
                className={
                  selecao === "fatura"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="list-fatura"
                role="tabpanel"
                aria-labelledby="fatura"
              >
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <Link to={"/fatura/listar"} className="form-group">
                      Histórico de faturas
                    </Link>
                  </li>
                </ul>
              </div>

              <div
                className={
                  selecao === "solicitacoes"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="list-solicitacoes"
                role="tabpanel"
                aria-labelledby="solicitacoes"
              >
                Em breve...
              </div>

              <div
                className={
                  selecao === "protocolos"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="list-protocolos"
                role="tabpanel"
                aria-labelledby="protocolos"
              >
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <Link to={"/denuncia/cadastrar"} className="form-group">
                      Protocolar denúncia
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link to={"/denuncia/listar"} className="form-group">
                      Listar denúncias protocoladas
                    </Link>
                  </li>
                </ul>
              </div>

              <div
                className={
                  selecao === "avaliacoes"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="list-avaliacoes"
                role="tabpanel"
                aria-labelledby="avaliacoes"
              >
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <Link to={"/avaliacao/criar"} className="form-group">
                      Avaliar
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link to={"/avaliacao/listar"} className="form-group">
                      Listar avaliações
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TelaUsuario;
