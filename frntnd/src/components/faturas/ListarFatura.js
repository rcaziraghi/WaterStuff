import React, { Component } from "react";

import FaturaService from "../../services/fatura.service";
import AuthService from "../../services/auth.service";

import moment from "moment";
import "moment/locale/pt";
moment.locale("pt");

export default class listarFatura extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuario: AuthService.usuarioLogado(),
      faturas: [],
      faturasFiltradas: [],
    };
  }

  componentDidMount() {
    if (!this.state.usuario) {
      this.props.history.push("/login");
      window.location.reload();
    }
    let Estado = { ...this.state };
    console.log("Estado", Estado);
    FaturaService.listar(Estado.usuario.email)
      .then((response) => {
        console.log("response", response.faturas);
        Estado.faturas = response.faturas;
        this.setState({
          usuario: Estado.usuario,
          faturas: Estado.faturas,
          faturasFiltradas: Estado.faturas,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  filtro = (e) => {
    if (!e.target.value) {
      this.setState({
        faturasFiltradas: this.state.faturas,
      });
    } else {
      const listaFiltrada = this.state.faturas.filter((fatura) => {
        console.log(fatura[e.target.id]);
        return fatura[e.target.id].toString().indexOf(e.target.value) === 0;
      });
      console.log("target value", e.target.value);
      console.log("lista filtrada", listaFiltrada);
      this.setState({
        faturasFiltradas: listaFiltrada,
      });
    }
  };

  render() {
    let faturas =
      !this.state.faturasFiltradas.length > 0 ? (
        <div>Nenhuma fatura encontrada</div>
      ) : (
        this.state.faturasFiltradas.map((fatura) => {
          return (
            <div className="row" key={["row", fatura.id].toString()}>
              <div className="col border" key={["id", fatura.id].toString()}>
                {fatura.id}
              </div>
              <div
                className="col border"
                key={["instalacaoId", fatura.instalacaoId].toString()}
              >
                {fatura.instalacaoId}
              </div>
              <div
                className="col border"
                key={["numFatura", fatura.numFatura].toString()}
              >
                {fatura.numFatura}
              </div>
              <div className="col border" key={["ano", fatura.ano].toString()}>
                {fatura.ano}
              </div>
              <div className="col border" key={["mes", fatura.mes].toString()}>
                {fatura.mes}
              </div>
              <div
                className="col border"
                key={["valor", fatura.valor].toString()}
              >
                R$ {fatura.valor}
              </div>
              <div
                className="col border"
                key={["situacao", fatura.situacao].toString()}
              >
                {fatura.situacao}
              </div>
              <div
                className="col border"
                key={["createdAt", fatura.createdAt].toString()}
              >
                {moment(fatura.createdAt).format("LLL")}
              </div>
            </div>
          );
        })
      );

    return (
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Filtros:</h5>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  placeholder="Filtro Id"
                  onChange={this.filtro}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  id="instalacaoId"
                  placeholder="Filtro inst. Id"
                  onChange={this.filtro}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  id="numFatura"
                  placeholder="Filtro No fat"
                  onChange={this.filtro}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  id="ano"
                  placeholder="Filtro Ano"
                  onChange={this.filtro}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  id="mes"
                  placeholder="Filtro Mês"
                  onChange={this.filtro}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  id="valor"
                  placeholder="Filtro Valor"
                  onChange={this.filtro}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  id="situacao"
                  placeholder="Filtro Sit"
                  onChange={this.filtro}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  id="createdAt"
                  placeholder="Filtro Data"
                  onChange={this.filtro}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col border">ID:</div>
            <div className="col border">ID instalação:</div>
            <div className="col border">Número da fatura:</div>
            <div className="col border">Ano:</div>
            <div className="col border">Mês:</div>
            <div className="col border">Valor:</div>
            <div className="col border">Situação:</div>
            <div className="col border">Data:</div>
          </div>

          {faturas}
        </div>
      </div>
    );
  }
}
