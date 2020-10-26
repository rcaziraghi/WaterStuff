import React, { Component } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import PropTypes from "prop-types";

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
          <Modal.Title>{this.props.avaliacao.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>
            {this.props.avaliacao.atendimento}
            <Badge variant="light">{this.props.avaliacao.nota}</Badge>
          </h3>
          {this.props.avaliacao.observacoes}
        </Modal.Body>
        <Modal.Footer>
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
