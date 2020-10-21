import axios from "axios";
import authHeader from "./auth-header";
require('dotenv').config();

const API_URL = process.env.REACT_APP_API_URL_INSTALACAO;

const cadastrar = (dados) => {
    console.log("chegou cadastrar");
    console.log("dados",dados);
    console.log("rota", API_URL);
    return axios.post(API_URL + "cadastrar", {
        codConsumidor: dados.codConsumidor,
        email: dados.email,
        cpf: dados.cpf
    }, {
        headers: authHeader()
    })
    .then((response) => {
        console.log('resposta instal servi',response);
        return response.data;
    })
};

const listar = (email) => {
    console.log("listar",email);
    return axios.post(API_URL + "listar", {
        email: email
    }, {
        headers: authHeader()
    })
    .then((response) => {
        console.log('resposta listar',response);
        return response.data;
    })
};

export default {
    cadastrar,
    listar
};