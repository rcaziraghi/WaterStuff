import React, { Component } from "react";
import { isEmail } from "validator";

import { recuperarSenha } from "../actions/auth";

const validarFormulario = ({ erro }) => {
    let ehValido = false;

    Object.values(erro).forEach(val => {
        if (val.length > 0) {
            ehValido = false
        } else {
            ehValido = true
        }
    });

    return ehValido;
};

export default class RecuperarSenha extends Component {

    constructor(props) {

        super(props);

        this.state = {
            carregando: false,
            email: '',
            erro: {
                email: ''
            },
            sucesso: {
                email: ''
            }
        };

    };

    aoMudarEmail = (e) => {
        e.preventDefault();
        const valor = e.target.value;
        let Erro = { ...this.state.erro};
        console.log('aoMudarEmail',valor);

        Erro.email = !isEmail(valor) ? "Email inválido!" : '';

        console.log("Resultado",Erro.email)

        this.setState({
            email: valor,
            erro: Erro
        });
        
      };

    handleRecuperarSenha = (e) => {
        // Evita comportamento default do navegador
        // ex. refresh/reload  por causa do submit do formulário
        e.preventDefault();
        this.setState({
            carregando: true
        });

        if(validarFormulario(this.state)) {
            console.log("Valido",this.state);
            // recuperarSenha(this.state.email)
            // .then( (resposta) => {
                this.setState({
                    carregando: false,
                    sucesso: {
                        email: recuperarSenha(this.state.email)
                    }
                });
                console.log('Email encontrado e recuperação de senha enviada.');
                console.log("State",this.state);
            // });            
        } else {
            console.log("Invalido",this.state);
            this.setState({
                carregando: false
            });
        }
    };

    render() {
    
        const { erro } = this.state;

        return (
                <div className="col-md-12">
                  <div className="card card-container">
        
                    <form onSubmit={this.handleRecuperarSenha} noValidate>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                                <input
                                type="text"
                                className={erro.email.length > 0 ? "is-invalid form-control" : "form-control"}
                                name="email"
                                value={this.state.email}
                                onChange={this.aoMudarEmail}
                                />
                        </div>

                        {erro.email.length > 0 && (
                       <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                            {erro.email}
                            </div>
                        </div>
                        )}

                        {this.state.sucesso.email.length > 0 && (
                       <div className="form-group">
                            <div className="alert alert-primary" role="alert">
                            {this.state.sucesso.email}
                            </div>
                        </div>
                        )}

                       <div className="form-group">
                         <button className="btn btn-primary btn-block"
                            disabled={this.state.carregando} >
                            {
                            !this.state.carregando ? 
                            <span className="spinner-border spinner-border-sm"></span>
                            :
                             "Recuperar senha"
                            }
                         </button>
                       </div>

                    </form>

                  </div>
                </div>
        )
    }
}