import React, { Component } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import PropTypes from "prop-types";

import moment from "moment";
import "moment/locale/pt";
moment.locale("pt");

class ModalDenuncia extends Component {
  fechar = (e) => {
    this.props.fecharModal && this.props.fecharModal(e);
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.fechar}
        ref={this.props.ref}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.denuncia.titulo}
            {/* <Badge variant="light">{this.props.avaliacao.nota}</Badge> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{this.props.denuncia.subtitulo}</h3>
          {this.props.denuncia.descritivo}
        </Modal.Body>
        <Modal.Footer>
          <small className="text-muted">
            {moment(this.props.denuncia.createdAt).fromNow()}
          </small>
          <Button variant="secondary" onClick={this.fechar}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ModalDenuncia.propTypes = {
  fecharModal: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

export default ModalDenuncia;
