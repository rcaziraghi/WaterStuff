import { SETAR_MENSAGEM, LIMPAR_MENSAGEM } from "./tipo";

export const setarMensagem = (mensagem) => ({
  type: SETAR_MENSAGEM,
  payload: mensagem,
});

export const limparMensagem = () => ({
  type: LIMPAR_MENSAGEM,
});
