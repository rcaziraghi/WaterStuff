import axios from "axios";
import authHeader from "./auth-header";

require('dotenv').config();

console.log(require('dotenv').config())

const API_URL = "http://localhost:8080/api/fatura/";

const cadastrar = (dados) => {
    console.log("chegou cadastrar");
    console.log("dados",dados);
    console.log("rota", API_URL);


};

const listar = (email) => {
    console.log("listar",email);
    console.log("rota", API_URL);
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