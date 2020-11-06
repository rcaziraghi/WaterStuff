import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL_AUTH;

const registrar = (dados) => {
  console.log("chegou registrar");
  console.log(dados);
  return axios.post(API_URL + "registrar", {
    email: dados.email,
    nomeCompleto: dados.nomeCompleto,
    senha: dados.senha,
    dtNascimento: dados.dtNascimento,
    cidade: dados.cidade,
    siglaEstado: dados.estado,
    cargos: dados.cargos,
  });
};

const login = (email, senha) => {
  console.log("env", API_URL);
  return axios
    .post(API_URL + "login", {
      email,
      senha,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("usuario", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("usuario");
};

const recuperarSenha = (email) => {
  console.log("chegou registrar");
  console.log(email);
  return axios
    .post(API_URL + "recuperar/senha", {
      email,
    })
    .then((response) => {
      return response.data;
    });
};

const usuarioLogado = () => {
  return JSON.parse(localStorage.getItem("usuario"));
};

export default {
  registrar,
  login,
  logout,
  recuperarSenha,
  usuarioLogado,
};
