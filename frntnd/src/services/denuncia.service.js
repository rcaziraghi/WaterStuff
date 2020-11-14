import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL_DENUNCIA;

const cadastrar = (dados) => {
  console.log("api", API_URL);
  console.log("dados", dados);
  return axios
    .post(
      API_URL + "cadastrar",
      {
        titulo: dados.titulo,
        subtitulo: dados.subtitulo,
        descritivo: dados.descritivo,
        usuario: dados.usuario,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      console.log("denunciaService", response);
      return response.data;
    });
};

const listar = (dados) => {
  console.log("listar", dados);
  return axios
    .post(
      API_URL + "listar",
      { usuario: dados.usuario },
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data;
    });
};

export default {
  cadastrar,
  listar,
};
