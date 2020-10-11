import axios from "axios";
require('dotenv').config();

const API_URL = "http://localhost:8080/api/auth/";

const registrar = (dados) => {
  console.log("chegou registrar");
  console.log(dados);
  return axios.post(API_URL + "registrar", {
    email: dados.email,
    nomeCompleto: dados.nomeCompleto,
    senha: dados.senha,
    dtNascimento: dados.dtNascimento,
    cidade: dados.cidade,
    siglaEstado: dados.estado
  });
};

const login = (email, senha) => {
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
  return axios.post(API_URL + "recuperar/senha", {
    email
  }).then((response) => {
    return response.data;
  });
};

const usuarioLogado = () => {
  return JSON.parse(localStorage.getItem('usuario'));
}

export default {
  registrar,
  login,
  logout,
  recuperarSenha,
  usuarioLogado
};
