import React, { Component } from "react";

import ModalAvaliacao from "./ModalAvaliacao";
import { Card, CardColumns, Badge } from "react-bootstrap";
import AvaliacaoService from "../../services/avaliacao.service";
import AuthService from "../../services/auth.service";

import moment from "moment";
import "moment/locale/pt";
moment.locale("pt");

export default class listarAvaliacao extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avaliacoes: [],
      avaliacaoModal: {},
      modalAberto: false,
      usuario: AuthService.usuarioLogado(),
    };
  }

  componentDidMount() {
    if (!this.state.usuario) {
      this.props.history.push("/login");
      window.location.reload();
    }
    AvaliacaoService.listar(this.state.usuario)
      .then((resposta) => {
        this.setState({
          avaliacoes: resposta.avaliacoes,
        });
      })
      .catch((erro) => {
        console.log("erro", erro);
      });
  }

  objectFindByKey = (array, key, value) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
  };

  abrirModal = (id) => {
    const avaliacaoSelecionada = this.objectFindByKey(
      this.state.avaliacoes,
      "id",
      id
    );
    this.setState({
      avaliacaoModal: avaliacaoSelecionada,
      modalAberto: true,
    });
  };

  fecharModal = () => {
    this.setState({
      modalAberto: false,
    });
  };

  render() {
    let cards =
      !this.state.avaliacoes.length > 0 ? (
        <div>Nenhuma avaliação encontrada</div>
      ) : (
        this.state.avaliacoes.map((avaliacao) => {
          return (
            <Card key={["card", avaliacao.id]}>
              <Card.Body key={["cardBody", avaliacao.id]}>
                <Card.Title>{avaliacao.atendimento}</Card.Title>
                <Card.Text>
                  <strong>
                    {avaliacao.titulo} -
                    <Badge variant="light">{avaliacao.nota}</Badge>
                  </strong>
                  <br></br>
                  {avaliacao.observacoes}
                </Card.Text>
                <Card.Text>
                  <small className="text-muted">
                    {moment(avaliacao.createdAt).fromNow()}
                  </small>
                </Card.Text>
                <Card.Link onClick={() => this.abrirModal(avaliacao.id)}>
                  Detalhes
                </Card.Link>
              </Card.Body>
            </Card>
          );
        })
      );

    return (
      <div>
        <CardColumns>{cards}</CardColumns>
        <ModalAvaliacao
          avaliacao={this.state.avaliacaoModal}
          show={this.state.modalAberto}
          fecharModal={this.fecharModal}
        />
      </div>
    );
  }
}
