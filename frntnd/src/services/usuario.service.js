import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL_PAGINA;

const obterTelaPublica = () => {
  return axios.get(API_URL + "publico");
};

const obterTelaUsuario = () => {
  return axios.get(API_URL + "usuario", { headers: authHeader() });
};

const obterTelaMod = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const obterTelaAdmin = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
    obterTelaPublica,
    obterTelaUsuario,
    obterTelaMod,
    obterTelaAdmin,
};
