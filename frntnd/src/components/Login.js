import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { login } from "../actions/auth";

const validarRequerido = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo é requerido!
      </div>
    );
  }
};

const validarEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          Este não é um email válido.
        </div>
      );
    }
  };

// pagina login
const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const { estaLogado } = useSelector(state => state.auth);
  const { mensagem } = useSelector(state => state.mensagem);

  const dispatch = useDispatch();

  const aoMudarEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const aoMudarSenha = (e) => {
    const senha = e.target.value;
    setSenha(senha);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, senha))
        .then(() => {
          console.log('Sucesso login!');
          props.history.push("/perfil");
          window.location.reload();
        })
        .catch(() => {
          console.log('Erro login!', mensagem, estaLogado);
          setLoading(false);
        });
    } else {
      console.log('Erro tela login!');
      setLoading(false);
    }
  };

  if (estaLogado) {
    console.log('Esta logado!');
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

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={aoMudarEmail}
              validations={[validarRequerido, validarEmail]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <Input
              type="password"
              className="form-control"
              name="senha"
              value={senha}
              onChange={aoMudarSenha}
              validations={[validarRequerido]}
            />
          </div>

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
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
