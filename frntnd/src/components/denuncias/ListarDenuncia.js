import React, { Component } from "react";

import ModalDenuncia from "./ModalDenuncia";
import { Card, CardGroup } from "react-bootstrap";
import DenunciaService from "../../services/denuncia.service";
import AuthService from "../../services/auth.service";

import moment from "moment";
import "moment/locale/pt";
moment.locale("pt");

export default class ListarDenuncia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      denuncias: [],
      denunciaModal: {},
      modalAberto: false,
      usuario: AuthService.usuarioLogado(),
    };
  }

  componentDidMount() {
    console.log("entrou");
    if (!this.state.usuario) {
      this.props.history.push("/login");
      window.location.reload();
    }
    console.log("usuario", this.state.usuario);
    const dados = {
      usuario: this.state.usuario,
    };
    DenunciaService.listar(dados)
      .then((resposta) => {
        console.log("denuncias", resposta);
        this.setState({
          denuncias: resposta.denuncias,
        });
      })
      .catch((erro) => {
        console.log("Erro", erro);
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
    const denunciaSelecionada = this.objectFindByKey(
      this.state.denuncias,
      "id",
      id
    );
    this.setState({
      denunciaModal: denunciaSelecionada,
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
      !this.state.denuncias.length > 0 ? (
        <div>Nenhuma denúncia encontrada</div>
      ) : (
        this.state.denuncias.map((denuncia) => {
          return (
            <Card key={["card", denuncia.id]}>
              <Card.Header as="h5">{denuncia.titulo}</Card.Header>
              <Card.Body key={["cardBody", denuncia.id]}>
                <Card.Title>{denuncia.subtitulo}</Card.Title>
                <Card.Text>
                  {/* <strong> */}
                  {/* <Badge variant="light">{denuncia.nota}</Badge> */}
                  {/* </strong> */}
                  {/* <br></br> */}
                  {denuncia.descritivo}
                </Card.Text>
                <Card.Text>
                  <small className="text-muted">
                    {moment(denuncia.createdAt).fromNow()}
                  </small>
                </Card.Text>
                <Card.Link onClick={() => this.abrirModal(denuncia.id)}>
                  Detalhes
                </Card.Link>
              </Card.Body>
            </Card>
          );
        })
      );

    return (
      <div>
        <CardGroup>{cards}</CardGroup>
        <ModalDenuncia
          denuncia={this.state.denunciaModal}
          show={this.state.modalAberto}
          fecharModal={this.fecharModal}
        />
      </div>
    );
  }
}
