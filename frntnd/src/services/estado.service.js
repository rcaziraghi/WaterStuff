import Axios from "axios";
require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL_ESTADO;

const listar = () => {
  return Axios.get(API_URL).then((response) => response.data);
};

export default {
  listar,
};
