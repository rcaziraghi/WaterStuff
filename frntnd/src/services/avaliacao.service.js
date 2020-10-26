import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL_AVALIACAO;

const criar = (dados) => {
  return axios
    .post(
      API_URL + "criar",
      {
        titulo: dados.titulo,
        nota: dados.nota,
        atendimento: dados.atendimento,
        observacoes: dados.observacoes,
        usuario: dados.usuario,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      console.log("avaliService", response);
      return response.data;
    });
};

const listar = (usuario) => {
  return axios
    .post(
      API_URL + "listar",
      {
        usuario: usuario,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      console.log("resposta listar", response);
      return response.data;
    });
};

export default {
  criar,
  listar,
};
