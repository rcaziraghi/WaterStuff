import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import { isEmail } from "validator";
import { login } from "../actions/auth";

// pagina login
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagemEmail, setMensagemEmail] = useState("");
  const [mensagemSenha, setMensagemSenha] = useState("");

  const { estaLogado } = useSelector((state) => state.auth);
  const { mensagem } = useSelector((state) => state.mensagem);

  const dispatch = useDispatch();

  const aoMudarEmail = (e) => {
    const email = e.target.value;

    if (!email) {
      setMensagemEmail("Este campo é requerido!");
    } else if (!isEmail(email)) {
      setMensagemEmail("Este não é um email válido.");
    } else {
      setMensagemEmail("");
    }

    setEmail(email);
  };

  const aoMudarSenha = (e) => {
    const senha = e.target.value;

    if (!senha) {
      setMensagemSenha("Este campo é requerido!");
    } else if (senha.length < 7) {
      setMensagemSenha("É necessário 6 dígitos ao menos na senha!");
    } else {
      setMensagemSenha("");
    }

    setSenha(senha);
  };

  const handleLogin = (e) => {
    // Evita comportamento default do navegador
    // ex. refresh/reload  por causa do submit do formulário
    e.preventDefault();
    setLoading(true);
    if (!mensagemEmail && !mensagemSenha) {
      dispatch(login(email, senha))
        .then(() => {
          props.history.push("/perfil");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      console.log("Erro tela login!");
      setLoading(false);
    }
  };

  if (estaLogado) {
    return <Redirect to="/perfil" />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => aoMudarEmail(e)}
            />
          </div>
          {mensagemEmail && (
            <div className="alert alert-danger" role="alert">
              {mensagemEmail}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              className="form-control"
              name="senha"
              value={senha}
              onChange={(e) => aoMudarSenha(e)}
            />
          </div>
          {mensagemSenha && (
            <div className="alert alert-danger" role="alert">
              {mensagemSenha}
            </div>
          )}

          <Link to={"/recuperar/senha"} className="form-group">
            Esqueceu sua senha?
          </Link>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {mensagem && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {mensagem}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
