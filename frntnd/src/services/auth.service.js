import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const registrar = (email, senha) => {
  return axios.post(API_URL + "signup", {
    email,
    senha,
  });
};

const login = (email, senha) => {
  return axios
    .post(API_URL + "signin", {
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

export default {
  registrar,
  login,
  logout,
};
