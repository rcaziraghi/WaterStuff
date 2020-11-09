import React, { useState, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Registrar from "./components/Registrar";
import Home from "./components/Home";
import Perfil from "./components/Perfil";
import TelaUsuario from "./components/telas/TelaUsuario";
import TelaMod from "./components/telas/TelaMod";
import TelaAdmin from "./components/telas/TelaAdmin";
import RecuperarSenha from "./components/RecuperarSenha";
import CadastrarInstalacao from "./components/instalacoes/CadastrarInstalacao";
import ListarInstalacao from "./components/instalacoes/ListarInstalacao";
import ListarFatura from "./components/faturas/ListarFatura";
import CadastrarUsuario from "./components/usuarios/CadastrarUsuario";
import CadastrarDenuncia from "./components/denuncias/CadastrarDenuncia";

import ListarAvaliacao from "./components/avaliacoes/ListarAvaliacao";
import CriarAvaliacao from "./components/avaliacoes/CriarAvaliacao";

import { logout } from "./actions/auth";
import { limparMensagem } from "./actions/mensagem";

import { historico } from "./helpers/historico";

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const AppWrapper = () => {
  const middleware = [thunk];

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const [mostrarTelaMod, setMostrarTelaMod] = useState(false);
  const [mostrarTelaAdmin, setMostrarTelaAdmin] = useState(false);

  const { usuario: usuarioAtual } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    historico.listen((location) => {
      dispatch(limparMensagem()); // Limpa mensagem quando trocar localização
    });
  }, [dispatch]);

  useEffect(() => {
    if (usuarioAtual) {
      setMostrarTelaMod(usuarioAtual.cargos.includes("MODERADOR"));
      setMostrarTelaAdmin(usuarioAtual.cargos.includes("ADMIN"));
    }
  }, [usuarioAtual]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={historico}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            WaterStuff
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {mostrarTelaMod && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderação
                </Link>
              </li>
            )}

            {mostrarTelaAdmin && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Administração
                </Link>
              </li>
            )}

            {usuarioAtual && (
              <li className="nav-item">
                <Link to={"/usuario"} className="nav-link">
                  Seus serviços
                </Link>
              </li>
            )}
          </div>

          {usuarioAtual ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/perfil"} className="nav-link">
                  {usuarioAtual.email}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/registrar"} className="nav-link">
                  Registrar
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registrar" component={Registrar} />
            <Route exact path="/perfil" component={Perfil} />
            <Route exact path="/recuperar/senha" component={RecuperarSenha} />
            <Route
              exact
              path="/instalacao/cadastro"
              component={CadastrarInstalacao}
            />
            <Route
              exact
              path="/instalacao/listar"
              component={ListarInstalacao}
            />
            <Route exact path="/fatura/listar" component={ListarFatura} />
            <Route exact path="/avaliacao/listar" component={ListarAvaliacao} />
            <Route exact path="/avaliacao/criar" component={CriarAvaliacao} />
            <Route
              exact
              path="/denuncia/cadastrar"
              component={CadastrarDenuncia}
            />
            <Route
              exact
              path="/usuario/registrar"
              component={CadastrarUsuario}
            />
            <Route path="/usuario" component={TelaUsuario} />
            <Route path="/mod" component={TelaMod} />
            <Route path="/admin" component={TelaAdmin} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default AppWrapper;
