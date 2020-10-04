// Criador das ações relacionadas a autenticação

import {
    SUCESSO_REGISTRO,
    FALHA_REGISTRO,
    SUCESSO_LOGIN,
    FALHA_LOGIN,
    LOGOUT,
    SETAR_MENSAGEM,
    SENHA_RECUPERADA
  } from "./tipo";
  
  import AuthService from "../services/auth.service";
  
  export const registrar = (email, senha) => (dispatch) => {
    return AuthService.registrar(email, senha).then(
      (resposta) => {
        dispatch({
            type: SUCESSO_REGISTRO,
        });
  
        dispatch({
          type: SETAR_MENSAGEM,
          payload: resposta.data.mensagem,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const mensagem =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
            type: FALHA_REGISTRO,
        });
  
        dispatch({
            type: SETAR_MENSAGEM,
          payload: mensagem,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const login = (email, senha) => (dispatch) => {
    return AuthService.login(email, senha).then(
      (data) => {
        dispatch({
          type: SUCESSO_LOGIN,
          payload: { usuario: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        const mensagem =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        
          console.log('Erro:',mensagem);

        dispatch({
            type: FALHA_LOGIN,
        });
  
        dispatch({
            type: SETAR_MENSAGEM,
            payload: mensagem,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
        type: LOGOUT,
    });
  };

  export const recuperarSenha = (email) => (dispatch) => {
    return AuthService.login(email).then(
      (data) => {
        dispatch({
          type: SENHA_RECUPERADA,
          payload: data,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const mensagem =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        
          console.log('Erro:',mensagem);
  
        dispatch({
            type: SETAR_MENSAGEM,
            payload: mensagem,
        });
  
        return Promise.reject();
      }
    );
  };
  