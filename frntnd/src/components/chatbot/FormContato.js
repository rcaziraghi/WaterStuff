import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";

export default class Contato extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: "",
      contato: "",
      duvida: "",
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { nome, contato, duvida } = steps;

    this.setState({ nome, contato, duvida });
    console.log("nome", nome);
    console.log("contato", contato);
    console.log("duvida", duvida);
  }

  render() {
    const { nome, contato, duvida } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Nome:</td>
              <td>{nome.value}</td>
            </tr>
            <tr>
              <td>Contato:</td>
              <td>{contato.value}</td>
            </tr>
            <tr>
              <td>Dúvida:</td>
              <td>{duvida.value}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

Contato.propTypes = {
  steps: PropTypes.object,
};

Contato.defaultProps = {
  steps: undefined,
};
