// Atualiza o estado de "estaLogado" e o usuario da aplicação
import {
    SUCESSO_REGISTRO,
    FALHA_REGISTRO,
    SUCESSO_LOGIN,
    FALHA_LOGIN,
    LOGOUT,
  } from "../actions/tipo";
  
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  
  const initialState = usuario
    ? { estaLogado: true, usuario }
    : { estaLogado: false, usuario: null };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case SUCESSO_REGISTRO:
        return {
          ...state,
          estaLogado: false,
        };
      case FALHA_REGISTRO:
        return {
          ...state,
          estaLogado: false,
        };
      case SUCESSO_LOGIN:
        return {
          ...state,
          estaLogado: true,
          usuario: payload.usuario,
        };
      case FALHA_LOGIN:
        return {
          ...state,
          estaLogado: false,
          usuario: null,
        };
      case LOGOUT:
        return {
          ...state,
          estaLogado: false,
          usuario: null,
        };
      default:
        return state;
    }
  }
  