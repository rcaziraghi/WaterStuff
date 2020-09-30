import React, { Component } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

// import { registrar, login } from "../actions/auth";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";
import moment from 'moment';

registerLocale("pt", pt);

// valida campo requerido
const validarRequerido = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo é requerido!
      </div>
    );
  }
};

// valida o email
const validarEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Este email não é válido.
      </div>
    );
  }
};

//Valida o tamanho da senha
const validarTamanhoSenha = (value) => {
  if (value.length < 6 || value.length > 25) {
    return (
      <div className="alert alert-danger" role="alert">
        A senha deve possuir entre 6 e 25 caracteres.
      </div>
    );
  }
};

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

export default class Registrar extends Component {

  constructor(props) {

    super(props);

    this.state = {
        carregando: false,
        nomeCompleto: '',
        email: '',
        senha: '',
        dtNascimento: new Date(moment().subtract(16, 'years')),
        cidade: '',
        estado: '',
        concordo: false,
        erro: {
          nomeCompleto: '',
          email: '',
          senha: '',
          dtNascimento: '',
          cidade: '',
          estado: '',
        },
        sucesso: {
          nomeCompleto: '',
          email: '',
          senha: '',
          dtNascimento: '',
          cidade: '',
          estado: '',
        }
    };

    this.handleModData = this.handleModData.bind(this);
};

handleModData(data) {
  this.setState({
    dtNascimento: data
  });
}

aoMudarInput = (e) => {
  e.preventDefault();
  const nomeCampo = e.target.name;
  const valorCampo = e.target.value;
  let Erro = { ...this.state.erro };

  switch (nomeCampo) {
    case 'nomeCompleto':
      console.log(nomeCampo,valorCampo);
    case 'email':
      console.log(nomeCampo,valorCampo);
    case 'senha':
      console.log(nomeCampo,valorCampo);
    case 'confSenha':
      console.log(nomeCampo,valorCampo);
    case 'dtNascimento':
      console.log(nomeCampo,valorCampo);
  }

}

handleRegistrar = (e) => {
  e.preventDefault();
        this.setState({
            carregando: true
        });
  if(validarFormulario(this.state)) {
    console.log('Estado valido:', this.state);
  } else {
    console.log('Estado INvalido:', this.state);
  }
}

  render () {
    const { erro } = this.state;

    return (
      <div className="col-md-12">
      <div className="card cardRegistrar-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={this.handleRegistrar} noValidate>

              <div className="form-group">
                <label htmlFor="email">Nome completo</label>
                <input
                  type="text"
                  className={erro.nomeCompleto.length > 0 ? "is-invalid form-control" : "form-control"}
                  name="nomeCompleto"
                  value={this.state.nomeCompleto}
                  onChange={this.aoMudarInput}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.aoMudarInput}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  name="senha"
                  value={this.state.senha}
                  onChange={this.aoMudarInput}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Confirmar senha</label>
                <input
                  type="password"
                  className="form-control"
                  name="confSenha"
                  value={this.state.confSenha}
                  onChange={this.aoMudarInput}
                />
              </div>

              <div className="form-group">
              <label htmlFor="dtNascimento">
                Data de nascimento:
              </label>
              <DatePicker
                className="form-control"
                name="dtNascimento"
                dateFormat="dd/MM/yyyy"
                selected={this.state.dtNascimento}
                locale="pt"
                openToDate={new Date(moment().subtract(16, 'years'))}
                onChange={this.handleModData}
              />
              </div>

                <div className="form-group">
                  <label htmlFor="cidade">Cidade:</label>
                  <input type="text" className="form-control" id="inputCity" />
                </div>
                <div className="form-group">
                  <label htmlFor="estado">Estado:</label>
                  <select id="inputState" className="form-control">
                    <option>Escolha...</option>
                    <option>...</option>
                  </select>
                </div>

              <div className="form-group">
                <input
                  className="form-group"
                  id="concordo"
                  // class="form-check-input"
                  name="concordo"
                  type="checkbox"
                  checked={this.state.concordo}
                  onChange={this.aoMudarInput} />
                  &nbsp; Concordo com os termos de uso e serviço.
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block"
                  disabled={this.state.carregando} >
                    {
                      this.state.carregando ? 
                      <span className="spinner-border spinner-border-sm"></span>
                      :
                      "Cadastrar"
                    }
                </button>
              </div>

        </form>
      </div>
    </div>
    );
  }
};
