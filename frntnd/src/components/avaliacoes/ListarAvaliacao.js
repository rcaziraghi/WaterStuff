import React, { Component } from "react";

import AvaliacaoModal from "./AvaliacaoModal";
import { Card, Cardcolumns, Badge } from "react-bootstrap";
import AvaliacaoService from "../../services/avaliacao.service";
import AuthService from "../../services/auth.service";

import moment from "moment";
import "moment/locale/pt";
moment.locale("pt");

export default class listarAvaliacao extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();

    this.state = {
      avaliacoes: [],
      avaliacaoModal: {},
      modalAberto: false,
      usuario: AuthService.usuarioLogado(),
    };
  }

  componentDidMount() {
    if (!this.state.usuario) {
    }
    AvaliacaoService.listar(this.state.usuario)
      .then((resposta) => {
        console.log("avaliacoes", resposta.avaliacoes);
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
    console.log("busca id", avaliacaoSelecionada);
    this.setState({
      avaliacaoModal: avaliacaoSelecionada,
      modalAberto: true,
    });
  };

  fecharModal = () => {
    console.log("fechar modal");
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
                <Card.Title>
                  {avaliacao.atendimento} -
                  <Badge variant="light">{avaliacao.nota}</Badge>
                </Card.Title>
                <Card.Text>
                  <h5>{avaliacao.titulo}</h5>
                  {avaliacao.observacoes}
                </Card.Text>
                <Card.Text>
                  <small className="text-muted">
                    {moment(avaliacao.createdAt).fromNow()}
                  </small>
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })
      );

    return (
      <div>
        <div className="card-columns">{cards}</div>
        <AvaliacaoModal
          avaliacao={this.state.avaliacaoModal}
          show={this.state.modalAberto}
          fecharModal={this.fecharModal}
          key={this.wrapper}
        />
      </div>
    );
  }
}
