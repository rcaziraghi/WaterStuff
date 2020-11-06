import React, { Component } from "react";
import { isEmail } from "validator";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";

import moment from "moment";
import "moment/locale/pt";
import authService from "../../services/auth.service";
import estadoService from "../../services/estado.service";

registerLocale("pt", pt);
moment.locale("pt");

// valida campo requerido
const validarRequerido = (value) => {
  return !value;
};

// valida o email
const validarEmail = (value) => {
  return !isEmail(value);
};

//Valida o tamanho da senha
const validarTamanhoSenha = (value) => {
  return value.length < 6 || value.length > 25;
};

const validarFormulario = (estado) => {
  // Analisa os erros (todas variaveis vazias)
  for (const [key, value] of Object.entries(estado.erro)) {
    if (value) {
      console.log("erro erro", key, value);
      return false;
    }
  }

  // Analisa as variaveis (todas variaveis preenchidas)
  for (const [key, value] of Object.entries(estado.usuario)) {
    if (!value) {
      console.log("erro estado", key, value);
      return false;
    }
  }

  return true;
};

export default class cadastrarUsuario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      estado: {
        usuario: {
          email: "",
          nomeCompleto: "",
          senha: "",
          // idperfil: 0,
          dtNascimento: new Date(moment().subtract(16, "years")),
          cidade: "",
          estado: "",
          cargos: [],
        },
        erro: {
          nomeCompleto: "",
          email: "",
          senha: "",
          confSenha: "",
          dtNascimento: "",
          cidade: "",
          estado: "",
          cargos: "",
        },
        mensagemErro: [],
        carregando: false,
        ufs: [],
        cargos: ["MODERADOR", "ADMIN", "USUARIO"],
        usuarioLogado: "",
      },
    };
  }

  async componentDidMount() {
    let usuarioLogado = authService.usuarioLogado();
    if (!usuarioLogado) {
      this.props.history.push("/login");
      window.location.reload();
    }
    console.log("usuario", usuarioLogado);
    console.log("usuario admin?", usuarioLogado.cargos.includes("ADMIN"));
    if (!usuarioLogado.cargos.includes("ADMIN")) {
      this.props.history.push("/home");
      window.location.reload();
    }
    let Estado = this.state.estado;
    Estado.carregando = true;
    this.setState({
      estado: Estado,
    });
    console.log("estado", Estado);
    Estado.ufs = await estadoService.listar().then((dados) => {
      console.log("dados", typeof dados);
      return Object.entries(dados)[0][1].map((dados) => {
        return { value: dados.sigla, label: dados.estado };
      });
    });
    console.log("UF inicial", Estado.ufs[0].label);
    Estado.usuario.estado = Estado.ufs[0].label;
    Estado.carregando = false;
    this.setState({
      estado: Estado,
    });
  }

  verificarCampos(nomeCampo, valorCampo) {
    let Estado = {
      ...this.state.estado,
    };

    switch (nomeCampo) {
      case "nomeCompleto":
        return valorCampo.length < 4
          ? "O nome completo deve ter no mínimo 4 caracteres."
          : "";
      case "email":
        return validarEmail(valorCampo)
          ? "Favor preencher um email válido."
          : "";
      case "senha":
        return validarTamanhoSenha(valorCampo)
          ? "A senha deve ter no mínimo 6 caracteres."
          : "";
      case "confSenha":
        return Estado.erro.confSenha;
      case "dtNascimento":
        console.log(nomeCampo, valorCampo);
        return validarRequerido(valorCampo) ? "Este campo é requerido." : "";
      case "cidade":
        return validarRequerido(valorCampo) ? "Este campo é requerido." : "";
      case "estado":
        return validarRequerido(valorCampo) ? "Este campo é requerido." : "";
      case "concordo":
        return valorCampo
          ? "Você deve concordar com os termos de uso e serviço."
          : "";
      default:
        break;
    }
    return "";
  }

  handleModData = (data) => {
    let Estado = {
      ...this.state.estado,
    };

    Estado.dados.dtNascimento = data;

    this.setState({
      estado: Estado,
    });
  };

  aoMudarInput = (e) => {
    e.preventDefault();

    let Estado = {
      ...this.state.estado,
    };

    console.log("e", e);
    const nomeCampo = e.target.name;
    const valorCampo = e.target.value;

    Estado.erro[nomeCampo] = this.verificarCampos(nomeCampo, valorCampo);

    Estado.usuario[nomeCampo] = valorCampo;

    this.setState({
      estado: Estado,
    });
  };

  aoMudarEstado(e) {
    let Estado = { ...this.state.estado };
    console.log("estado", e.target.value);
    Estado.usuario.estado = e.target.value;
    this.setState({
      estado: Estado,
    });
  }

  aoMudarCargo(e) {
    let Estado = { ...this.state.estado };
    let cargos = Array.from(e.target.selectedOptions, (option) => option.value);
    console.log("cargo", cargos);
    Estado.usuario.cargos = cargos;
    this.setState({
      estado: Estado,
    });
  }

  handleRegistrar = (e) => {
    e.preventDefault();

    let Estado = {
      ...this.state.estado,
    };

    Estado.mensagemErro = [];

    this.setState({
      estado: Estado,
    });

    if (Estado.usuario.senha !== Estado.usuario.confSenha) {
      Estado.erro.senha = "As duas senhas não conferem.";
      Estado.erro.confSenha = "As duas senhas não conferem.";

      this.setState({
        estado: Estado,
      });
    }

    if (
      !Array.isArray(Estado.usuario.cargos) ||
      !Estado.usuario.cargos.length
    ) {
      Estado.erro.cargos = "Por favor selecione um cargo!";

      this.setState({
        estado: Estado,
      });
    }

    console.log("estado", Estado);

    if (validarFormulario(Estado) && Estado.mensagemErro.length < 1) {
      console.log("Estado valido:", Estado);
      authService
        .registrar(Estado.usuario)
        .then((response) => {
          console.log("funcionou", response);
          //   authService
          //     .login(Estado.usuario.email, Estado.usuario.senha)
          //     .then(() => {
          //       this.props.history.push("/perfil");
          //       window.location.reload();
          //     });
        })
        .catch((error) => {
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
            estado: Estado,
          });
        });
    } else {
      Estado.mensagemErro.push(
        "Favor verifique o formulário e tente novamente."
      );
      Object.entries(Estado.usuario).forEach((entrada) => {
        const [key, value] = entrada;
        Estado.erro[key] = this.verificarCampos(key, value);
      });
      Estado.carregando = false;
      this.setState({
        estado: Estado,
      });
      console.log("Estado inválido", Estado);
    }
  };

  render() {
    const { erro } = this.state.estado;
    return (
      <div className="col-md-12">
        <div className="card cardRegistrar-container">
          {/* <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          /> */}

          <form onSubmit={(e) => this.handleRegistrar(e)} noValidate>
            <div className="form-group">
              <label htmlFor="nomeCompleto"> Nome completo</label>
              <input
                type="text"
                className={
                  erro.nomeCompleto.length > 0
                    ? "is-invalid form-control"
                    : "form-control"
                }
                name="nomeCompleto"
                onChange={(e) => this.aoMudarInput(e)}
              />
            </div>

            {erro.nomeCompleto.length > 0 && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {" "}
                  {erro.nomeCompleto}
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email"> Email </label>
              <input
                type="text"
                className={
                  erro.email.length > 0
                    ? "is-invalid form-control"
                    : "form-control"
                }
                name="email"
                onChange={(e) => this.aoMudarInput(e)}
              />{" "}
            </div>

            {erro.email.length > 0 && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {" "}
                  {erro.email}
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="senha"> Senha</label>
              <input
                type="password"
                className={
                  erro.senha.length > 0
                    ? "is-invalid form-control"
                    : "form-control"
                }
                name="senha"
                onChange={(e) => this.aoMudarInput(e)}
              />
            </div>

            {erro.senha.length > 0 && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {" "}
                  {erro.senha}
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="password"> Confirmar senha </label>
              <input
                type="password"
                className={
                  erro.confSenha.length > 0
                    ? "is-invalid form-control"
                    : "form-control"
                }
                name="confSenha"
                onChange={(e) => this.aoMudarInput(e)}
              />
            </div>

            {erro.confSenha.length > 0 && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {" "}
                  {erro.confSenha}
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="dtNascimento">Data de nascimento:</label>
              <DatePicker
                className={
                  erro.dtNascimento.length > 0
                    ? "is-invalid form-control"
                    : "form-control"
                }
                name="dtNascimento"
                dateFormat="dd/MM/yyyy"
                selected={this.state.estado.usuario.dtNascimento}
                locale="pt"
                onChange={(date) => this.handleModData(date)}
              />
            </div>

            {erro.dtNascimento.length > 0 && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {" "}
                  {erro.dtNascimento}
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="cidade"> Cidade: </label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                className={
                  erro.cidade.length > 0
                    ? "is-invalid form-control"
                    : "form-control"
                }
                onChange={(e) => this.aoMudarInput(e)}
              />
            </div>

            {erro.cidade.length > 0 && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {" "}
                  {erro.cidade}
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="estado"> Estado: </label>
              <select
                className="form-control"
                name="estado"
                onChange={(e) => this.aoMudarEstado(e)}
              >
                {this.state.estado.ufs.map((dados) => (
                  <option key={dados.value} value={dados.label}>
                    {dados.label}
                  </option>
                ))}
              </select>
            </div>

            {erro.estado.length > 0 && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {" "}
                  {erro.estado}
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="cargos"> Cargo(s): </label>
              <select
                multiple={true}
                className="form-control"
                name="cargos"
                onChange={(e) => this.aoMudarCargo(e)}
              >
                {this.state.estado.cargos.map((cargo) => (
                  <option key={cargo} value={cargo}>
                    {cargo}
                  </option>
                ))}
              </select>
            </div>

            {erro.cargos.length > 0 && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {" "}
                  {erro.cargos}
                </div>
              </div>
            )}

            {this.state.estado.mensagemErro.length > 0 && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.estado.mensagemErro.map((mensagem) => (
                    <li key={mensagem}>{mensagem}</li>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.estado.carregando}
              >
                {" "}
                {this.state.estado.carregando && this.state.estado.concordo ? (
                  <span className="spinner-border spinner-border-sm"> </span>
                ) : (
                  "Cadastrar"
                )}{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
