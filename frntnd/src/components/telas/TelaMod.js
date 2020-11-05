import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import servicoUsuario from "../../services/usuario.service";

const TelaMod = (props) => {
  const [conteudo, setConteudo] = useState("");
  const [selecao, setSelecao] = useState("instalacao");
  const [liberado, setLiberado] = useState(false);

  const { estaLogado } = useSelector((state) => state.auth);

  // Se não está logado
  if (!estaLogado) {
    props.history.push("/login");
    window.location.reload();
  }

  useEffect(() => {
    servicoUsuario.obterTelaMod().then(
      (resposta) => {
        setConteudo(resposta.data);
        setLiberado(true);
      },
      (erro) => {
        const _content =
          // (erro.resposta &&
          //   erro.resposta.data &&
          //   erro.resposta.data.mensagem) ||
          // erro.message ||
          // erro.toString();
          erro.response.data.message.toString();

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
                  selecao === "usuario"
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item list-group-item-action"
                }
                id="usuario"
                data-toggle="list"
                onClick={() => setSelecao("usuario")}
                role="tab"
                aria-controls="home"
              >
                Manutenção de usuários
              </button>

              {/* <button className={selecao === 'fatura' ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} 
                id="fatura" data-toggle="list" onClick={()=>setSelecao('fatura')} role="tab" aria-controls="profile">Fatura</button>

            <button className={selecao === 'solicitacoes' ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} 
                id="solicitacoes" data-toggle="list" onClick={()=>setSelecao('solicitacoes')} role="tab" aria-controls="messages">Solicitações</button>

            <button className={selecao === 'protocolos' ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} 
                id="protocolos" data-toggle="list" onClick={()=>setSelecao('protocolos')} role="tab" aria-controls="settings">Protocolos</button>
            
            <button className={selecao === 'avaliacoes' ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} 
                id="avaliacoes" data-toggle="list" onClick={()=>setSelecao('avaliacoes')} role="tab" aria-controls="settings">Avaliações</button> */}
            </div>
          </div>

          <div className="col-8">
            <div className="tab-content" id="nav-tabContent">
              <div
                className={
                  selecao === "usuario"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="list-usuario"
                role="tabpanel"
                aria-labelledby="usuario"
              >
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <Link to={"/usuario/registrar"} className="form-group">
                      Cadastrar usuário
                    </Link>
                  </li>
                  {/* <li className="list-group-item">
                    <Link to={"/usuario/listar"} className="form-group">
                      Lista de instalação de água
                    </Link>
                  </li> */}
                </ul>
              </div>

              {/* <div className={selecao === 'fatura' ? "tab-pane fade show active" : "tab-pane fade"}
              id="list-fatura" role="tabpanel" aria-labelledby="fatura">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                  <Link to={"/fatura/listar"} className="form-group">
                    Histórico de faturas
                  </Link>
                  </li>
                </ul>
            </div>

            <div className={selecao === 'solicitacoes' ? "tab-pane fade show active" : "tab-pane fade"}
              id="list-solicitacoes" role="tabpanel" aria-labelledby="solicitacoes">
                Em breve...
            </div>

            <div className={selecao === 'protocolos' ? "tab-pane fade show active" : "tab-pane fade"}
              id="list-protocolos" role="tabpanel" aria-labelledby="protocolos">
               <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                  <Link to={"/denuncia/criar"} className="form-group">
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

            <div className={selecao === 'avaliacoes' ? "tab-pane fade show active" : "tab-pane fade"}
              id="list-avaliacoes" role="tabpanel" aria-labelledby="avaliacoes">
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
            </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TelaMod;
