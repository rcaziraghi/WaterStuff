// Como somente existe uma store em uma aplicação Redux, tem que
// usar composição para 

import { combineReducers } from "redux";
import auth from "./auth";
import mensagem from "./mensagem";

export default combineReducers({
  auth,
  mensagem,
});
