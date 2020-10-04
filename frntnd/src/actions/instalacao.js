import {
    INSTALACAO_CADASTRADA, 
    SETAR_MENSAGEM
} from "./tipo";

import InstalacaoService from "../services/instalacao.service";

export const cadastrar = (dados) => (dispatch) => {
    return InstalacaoService.cadastrar(dados).then(
        (resposta) => {
            console.log("resposta",resposta);
            dispatch({
                type: INSTALACAO_CADASTRADA,
            });

            dispatch({
                type: SETAR_MENSAGEM,
                payload: resposta.message,
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
                type: SETAR_MENSAGEM,
                payload: mensagem,
            });
      
            return Promise.reject();
          }
    )
}