import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { registrar, login } from "../actions/auth";

// valida campo requerido
const validarRequerido = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo é requerido!
      </div>
    );
  }
};

// valida o email
const validarEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Este email não é válido.
      </div>
    );
  }
};

//Valida o tamanho da senha
const validarTamanhoSenha = (value) => {
  if (value.length < 6 || value.length > 25) {
    return (
      <div className="alert alert-danger" role="alert">
        A senha deve possuir entre 6 e 25 caracteres.
      </div>
    );
  }
};

const Registrar = (props) => {
  const form = useRef();
  const checkBtn = useRef();

//   const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [sucesso, setSucesso] = useState(false);

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

  const handleRegister = (e) => {
    e.preventDefault();

    setSucesso(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(registrar(email, senha))
        .then(() => {
            // seta sucesso caso registre
          setSucesso(true);
          console.log("Registrado com sucesso!")
          })
          .then(() => {
          dispatch(login(email, senha))
          .then(() => {
            console.log('Sucesso login!');
            props.history.push("/perfil");
            window.location.reload();
          })
          .catch(() => {
            console.log('Erro login!', mensagem);
          });
        })
            // seta sucesso caso erro
        .catch(() => {
          setSucesso(false);
          console.log("Erro ao registrar!");
        });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!sucesso && (
            <div>
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
                <label htmlFor="password">Senha</label>
                <Input
                  type="password"
                  className="form-control"
                  name="senha"
                  value={senha}
                  onChange={aoMudarSenha}
                  validations={[validarRequerido, validarTamanhoSenha]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Registrar</button>
              </div>
            </div>
          )}

          {mensagem && (
            <div className="form-group">
              <div className={ sucesso ? "alert alert-success" : "alert alert-danger" } role="alert">
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

export default Registrar;
