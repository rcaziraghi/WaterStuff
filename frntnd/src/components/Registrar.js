import React, { Component } from "react";
import { isEmail } from "validator";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";
import moment from 'moment';

import Select from 'react-select';

import AuthService from "../services/auth.service";

registerLocale("pt", pt);

// valida campo requerido
const validarRequerido=(value) => {
  return !value;
};

// valida o email
const validarEmail=(value) => {
  return !isEmail(value);
};

//Valida o tamanho da senha
const validarTamanhoSenha=(value) => {
  return value.length < 6 || value.length > 25;
};

const validarFormulario=(estado) => {

  // Analisa os erros (todas variaveis vazias)
  for (const [key, value] of Object.entries(estado.erro)) {
    if (value) {
      console.log("erro erro",key,value);
      return false;
    }
  }

  // Analisa as variaveis (todas variaveis preenchidas)
  for (const [key, value] of Object.entries(estado.dados)) {
    if (!value) {
      console.log("erro estado",key,value);
      return false;
    }
  }

  return true;
};

export default class Registrar extends Component {

  constructor(props) {

    super(props);

    this.state={
      estado: {
        carregando: false,
        concordo: false,
        mensagemErro: [],
        dados: {
          nomeCompleto: '',
          email: '',
          senha: '',
          confSenha: '',
          dtNascimento: new Date(moment().subtract(16, 'years')),
          cidade: '',
          estado: ''
          },
        erro: {
          nomeCompleto: '',
          email: '',
          senha: '',
          confSenha: '',
          dtNascimento: '',
          cidade: '',
          estado: ''
        },
        ufs: [ 
          { value: 'RS', label: 'Rio Grande do Sul'},
          { value: 'SC', label: "Santa Catarina"},
          { value: 'PR', label: "Paraná"},
          { value: 'SP', label: "São Paulo" }
        ]
    }
    };

    this.handleModData=this.handleModData.bind(this);
    this.aoMudarInput=this.aoMudarInput.bind(this);
    this.handleRegistrar=this.handleRegistrar.bind(this);
    this.verificarCampos=this.verificarCampos.bind(this);
    this.aoMudarConcordo=this.aoMudarConcordo.bind(this);
    this.aoMudarEstado=this.aoMudarEstado.bind(this);
  };

  aoMudarEstado(e){
    let Estado = { ...this.state.estado }
    Estado.dados.estado = e.value;
    this.setState({
      estado: Estado
    });
  }

  aoMudarConcordo=(e) => {
    let Estado = { ...this.state.estado };
    Estado.concordo = e.target.checked;
    this.setState({
      estado: Estado
    });
  }

  verificarCampos(nomeCampo, valorCampo) {

    let Estado={
      ...this.state.estado
    };

    switch (nomeCampo) {
      case 'nomeCompleto':
        return valorCampo.length < 4 ? "O nome completo deve ter no mínimo 4 caracteres." : "";
      case 'email':
        return validarEmail(valorCampo) ? "Favor preencher um email válido." : "";
      case 'senha':
        return validarTamanhoSenha(valorCampo) ? "A senha deve ter no mínimo 6 caracteres." : "";
      case 'confSenha':
        return Estado.erro.confSenha;
      case 'dtNascimento':
        console.log(nomeCampo, valorCampo);
        return validarRequerido(valorCampo) ? "Este campo é requerido." : "";
      case 'cidade':
        return validarRequerido(valorCampo) ? "Este campo é requerido." : "";
      case 'estado':
        return validarRequerido(valorCampo) ? "Este campo é requerido." : "";
      case 'concordo':
        return valorCampo ? "Você deve concordar com os termos de uso e serviço." : "";
      default:
        break;
    }
    return '';
  };

  handleModData=(data) => {
    
    let Estado={
      ...this.state.estado
    };

    Estado.dados.dtNascimento = data;

    this.setState({
      estado: Estado
    });

  }

  aoMudarInput=(e) => {
    e.preventDefault();

    let Estado={
      ...this.state.estado
    };

    const nomeCampo=e.target.name;
    const valorCampo=e.target.value;

    Estado.erro[nomeCampo]=this.verificarCampos(nomeCampo, valorCampo);

    Estado.dados[nomeCampo]=valorCampo;

    this.setState({
      estado: Estado
    });

  };

  handleRegistrar=(e) => {
    e.preventDefault();

    let Estado={
      ...this.state.estado
    };

    Estado.mensagemErro = [];

    this.setState({
      estado: Estado
    });

    if (!Estado.concordo) {

      Estado.mensagemErro.push("Favor concordar com os termos de uso e serviço.");

      this.setState({
        estado: Estado
      });
    } else {

      Estado.mensagemErro =  [];

      this.setState({
        estado: Estado
      });
    };

    if (Estado.dados.senha !== Estado.dados.confSenha) {

      Estado.erro.senha = "As duas senhas não conferem.";
      Estado.erro.confSenha = "As duas senhas não conferem.";

      this.setState({
        estado: Estado
      });
    }

    if (validarFormulario(Estado) && Estado.mensagemErro.length < 1) {
      console.log('Estado valido:', Estado);
      AuthService.registrar(Estado.dados)
      .then( response => {
        console.log("funcionou",response);
        AuthService.login(Estado.dados.email,Estado.dados.senha)
        .then(() => {
          this.props.history.push("/perfil");
          window.location.reload();
        })
      }).catch((error) => {
        console.log("erro!", error);
        const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("Erro", resMessage);
      Estado.mensagemErro.push(resMessage);
      this.setState({
        estado: Estado
        });
      }
    );
    } else {
      Estado.mensagemErro.push("Favor verifique o formulário e tente novamente.");
      Object.entries(Estado.dados).forEach(entrada => {
        const [key, value]=entrada;
        Estado.erro[key]=this.verificarCampos(key, value);
      });
      Estado.carregando = false;
      this.setState({
        estado: Estado
      });
      console.log("Estado inválido", Estado);
    }
  }

  render() {

    const {
      erro
    }=this.state.estado;

    return ( 
    
      <div className="col-md-12" >
      <div className="card cardRegistrar-container" >
      <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      alt="profile-img"
      className="profile-img-card" />

      <form onSubmit={
        this.handleRegistrar
      } noValidate >

      <div className="form-group" >
      <label htmlFor="nomeCompleto" > Nome completo 
      </label> 
      <input type="text"
      className={
        erro.nomeCompleto.length > 0 ? "is-invalid form-control" : "form-control"
      }
      name="nomeCompleto"
      onChange={
        this.aoMudarInput
      }
      /> 
      </div>

      {
        erro.nomeCompleto.length > 0 && ( 
          <div className="form-group" >
          <div className="alert alert-danger"
          role="alert" > {
            erro.nomeCompleto
          } 
          </div> 
          </div>
        )
      }

      <div className="form-group" >
      <label htmlFor="email" > Email </label> 
      <input type="text"
      className={
        erro.email.length > 0 ? "is-invalid form-control" : "form-control"
      }
      name="email"
      onChange={
        this.aoMudarInput
      }
      /> </div>

      {
        erro.email.length > 0 && ( 
          <div className="form-group" >
          <div className="alert alert-danger"
          role="alert" > {
            erro.email
          } 
          </div> 
          </div>
        )
      }

      <div className="form-group" >
      <label htmlFor="senha" > Senha 
      </label> 
      <input type="password"
      className={
        erro.senha.length > 0 ? "is-invalid form-control" : "form-control"
      }
      name="senha"
      onChange={
        this.aoMudarInput
      }
      /> 
      </div>

      {
        erro.senha.length > 0 && ( 
          <div className="form-group" >
          <div className="alert alert-danger"
          role="alert" > {
            erro.senha
          } 
          </div> 
          </div>
        )
      }

      <div className="form-group" >
      <label htmlFor="password" > Confirmar senha </label> 
      <input type="password"
      className={
        erro.confSenha.length > 0 ? "is-invalid form-control" : "form-control"
      }
      name="confSenha"
      onChange={
        this.aoMudarInput
      }
      /> 
      </div>

      {
        erro.confSenha.length > 0 && ( 
          <div className="form-group" >
          <div className="alert alert-danger"
          role="alert" > {
            erro.confSenha
          } 
          </div> 
          </div>
        )
      }

      <div className="form-group" >
      <label htmlFor="dtNascimento" >
      Data de nascimento:
      </label> 
      <DatePicker 
      className={
        erro.dtNascimento.length > 0 ? "is-invalid form-control" : "form-control"
      }
      name="dtNascimento"
      dateFormat="dd/MM/yyyy"
      selected={
        this.state.estado.dados.dtNascimento
      }
      locale="pt"
      onChange={date => 
        this.handleModData(date)
      }
      /> 
      </div>

      {
        erro.dtNascimento.length > 0 && ( 
          <div className="form-group" >
          <div className="alert alert-danger"
          role="alert" > {
            erro.dtNascimento
          } 
          </div> 
          </div>
        )
      }

      <div className="form-group" >
      <label htmlFor="cidade" > Cidade: </label> 
      <input type="text"
      id="cidade"
      name="cidade"
      className={
        erro.cidade.length > 0 ? "is-invalid form-control" : "form-control"
      }
      onChange={
        this.aoMudarInput
      }/>
      </div>

      {
        erro.cidade.length > 0 && ( 
          <div className="form-group" >
          <div className="alert alert-danger"
          role="alert" > {
            erro.cidade
          } 
          </div> 
          </div>
        )
      }

      <div className="form-group" >
      <label htmlFor="estado" > Estado: </label> 
      <Select 
        name='estado'
        options={this.state.estado.ufs} 
        onChange={this.aoMudarEstado}
        ></Select>
      </div>

      {
        erro.estado.length > 0 && ( 
          <div className="form-group" >
          <div className="alert alert-danger"
          role="alert" > {
            erro.estado
          } 
          </div> 
          </div>
        )
      }

      <div className="form-group" >
      <input className="form-group"
      id="concordo"
      name="concordo"
      type="checkbox"
      onChange={
        this.aoMudarConcordo
      }
      /> &nbsp; Concordo com os termos de uso e serviço. 
      </div>

      {this.state.estado.mensagemErro.length > 0 && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
              {this.state.estado.mensagemErro.map( (mensagem) => (
                              <li key={mensagem}>{mensagem}</li>
                              ))}
          </div>
        </div>
        )}

      <div className="form-group" >
      <button className="btn btn-primary btn-block"
      disabled={
        this.state.carregando
      } > {
        this.state.carregando && this.state.concordo ?
        <span className="spinner-border spinner-border-sm" > </span> :
          "Cadastrar"
      } </button> 
      </div> 
      </form> 
      </div> 
      </div>
    );
  }
};