import React, { Component } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import PropTypes from "prop-types";

import moment from "moment";
import "moment/locale/pt";
moment.locale("pt");

class AvaliacaoModal extends Component {
  constructor(props) {
    super(props);
  }

  fechar = (e) => {
    this.props.fecharModal && this.props.fecharModal(e);
  };

  render() {
    console.log("show", this.props.show);
    if (!this.props.show) {
      console.log("hoje nao");
      return null;
    }
    return (
      <Modal
        show={this.props.show}
        onHide={this.fechar}
        ref={this.props.ref}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.avaliacao.titulo}
            <Badge variant="light">{this.props.avaliacao.nota}</Badge>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{this.props.avaliacao.atendimento}</h3>
          {this.props.avaliacao.observacoes}
        </Modal.Body>
        <Modal.Footer>
          <small className="text-muted">
            {moment(this.props.avaliacao.createdAt).fromNow()}
          </small>
          <Button variant="secondary" onClick={this.fechar}>
            Fechar
          </Button>
          {/* <Button variant="primary" onClick={this.fechar}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    );
  }
}

AvaliacaoModal.propTypes = {
  fecharModal: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

export default AvaliacaoModal;
