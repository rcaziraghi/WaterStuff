// Atualiza o estado do objeto mensagem quando ela é despachada
// de qualquer lugar da aplicação

import { SETAR_MENSAGEM, LIMPAR_MENSAGEM } from "../actions/tipo";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SETAR_MENSAGEM:
      return { mensagem: payload };

    case LIMPAR_MENSAGEM:
      return { mensagem: "" };

    default:
      return state;
  }
}
