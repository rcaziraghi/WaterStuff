import React, { Component } from "react";

import InstalacaoService from "../services/instalacao.service";
import AuthService from "../services/auth.service";

import moment from 'moment';
import 'moment/locale/pt';
moment.locale('pt');

export default class listarInstalacao extends Component {

  constructor(props) {

    super(props);

    this.state = {
      usuario: AuthService.usuarioLogado(),
      instalacoes: []
    };
  }

    componentDidMount(){
      let Estado = { ...this.state };
      console.log('Estado',Estado);
      InstalacaoService.listar(Estado.usuario.email)
        .then( response => {
          console.log('response', response.instalacoes);
          Estado.instalacoes = response.instalacoes;
          this.setState({
            usuario: Estado.usuario,
            instalacoes: Estado.instalacoes
          });
        })
        .catch( error => {
          console.log('error',error);
        })
    };

    render() {

      const { instalacoes } = this.state;
      
      const listaItens = instalacoes.map( instalacao => {
                                  return (
                                    <div className="row" key={['row',instalacao.id].toString()}>
                                      <div className="col border" key={["id",instalacao.id].toString()}>
                                          {instalacao.id}
                                      </div>
                                      <div className="col border" key={["codConsumidor",instalacao.codConsumidor].toString()}>
                                          {instalacao.codConsumidor}
                                      </div>
                                      <div className="col border" key={["cpf",instalacao.cpf].toString()}>
                                          {instalacao.cpf}
                                      </div>
                                      <div className="col border" key={["createdAt",instalacao.createdAt].toString()}>
                                          {moment(instalacao.createdAt).format('LLL')}
                                      </div>
                                      <div className="col border" key={["updatedAt",instalacao.id].toString()}>
                                          {moment(instalacao.updatedAt).format('LLL')}
                                      </div>
                                    </div>
                                  )
                                });
    
      return (
    <div className="container-fluid">
      <div className="card card-body">

      <div className="row">
        <div className="col border">
          ID:
        </div>
        <div className="col border">
          Código de consumidor:
        </div>
        <div className="col border">
          CPF:
        </div>
        <div className="col border">
          Criado em:
        </div>
        <div className="col border">
          Atualizado em:
        </div>
      </div>
        
        {listaItens}

      </div>
     </div>
    );
  }
};