import { SETAR_MENSAGEM } from "./tipo";

import DenunciaService from "../services/denuncia.service";

export const cadastrar = (dados) => (dispatch) => {
  return DenunciaService.cadastrar(dados).then(
    (resposta) => {
      dispatch({
        type: SETAR_MENSAGEM,
        payload: resposta.message,
      });

      return Promise.resolve(resposta);
    },
    (error) => {
      const mensagem =
        (error.response && error.response.data & error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SETAR_MENSAGEM,
        payload: mensagem,
      });

      return Promise.reject(mensagem);
    }
  );
};
