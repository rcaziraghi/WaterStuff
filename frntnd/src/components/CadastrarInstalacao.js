import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { cadastrar } from "../actions/instalacao";

const validarRequerido = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo é requerido!
      </div>
    );
  }
};

const validarCPF = (cpf) => {	
	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf === '') {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo é requerido!
      </div>
    );
  }
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length !== 11 || 
		cpf === "00000000000" || 
		cpf === "11111111111" || 
		cpf === "22222222222" || 
		cpf === "33333333333" || 
		cpf === "44444444444" || 
		cpf === "55555555555" || 
		cpf === "66666666666" || 
		cpf === "77777777777" || 
		cpf === "88888888888" || 
		cpf === "99999999999")
      return (
        <div className="alert alert-danger" role="alert">
          CPF inválido!
        </div>
      );	
	// Valida 1o digito	
	let add = 0;	
	for (let i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		let rev = 11 - (add % 11);	
		if (rev === 10 || rev === 11)		
			rev = 0;	
		if (rev !== parseInt(cpf.charAt(9)))		
      return (
        <div className="alert alert-danger" role="alert">
          CPF inválido!
        </div>
      );		
	// Valida 2o digito	
	add = 0;	
	for (let i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev === 10 || rev === 11)	
		rev = 0;	
	if (rev !== parseInt(cpf.charAt(10)))
    return (
      <div className="alert alert-danger" role="alert">
        CPF inválido!
      </div>
    );		  
}

// pagina login
const CadastrarInstalacao = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [cpf, setCpf] = useState("");
  const [codConsumidor, setCodConsumidor] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const { estaLogado, usuario } = useSelector(state => state.auth);
  const { mensagem } = useSelector(state => state.mensagem);

  const dispatch = useDispatch();

  const aoMudarCpf = (e) => {
    const cpf = e.target.value;
    setCpf(cpf);
  };

  const aoMudarCodConsumidor = (e) => {
    const codConsumidor = e.target.value;
    setCodConsumidor(codConsumidor);
  };

  const handleCadastro = (e) => {
    // Evita comportamento default do navegador
    // ex. refresh/reload  por causa do submit do formulário
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0
            && estaLogado) {
        console.log("usuario", usuario);
        const dados = {
            codConsumidor: codConsumidor,
            email: usuario.email,
            cpf: cpf
        };
      dispatch(cadastrar(dados))
        .then(() => {
          setTipoMensagem(false);
          console.log('Sucesso Cadastro!');
        })
        .catch(() => {
          console.log('Erro cadastro!', mensagem, estaLogado);
          setTipoMensagem(true);
        });
    } else {
      console.log('Erro tela login!');
    }
    setLoading(false);
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">

        <Form onSubmit={handleCadastro} ref={form}>
          <div className="form-group">
            <label htmlFor="email">CPF</label>
            <Input
              type="text"
              className="form-control"
              name="cpf"
              value={cpf}
              onChange={aoMudarCpf}
              validations={[validarCPF]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Código de consumidor</label>
            <Input
              type="text"
              className="form-control"
              name="codConsumidor"
              value={codConsumidor}
              onChange={aoMudarCodConsumidor}
              validations={[validarRequerido]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Cadastrar</span>
            </button>
          </div>

          {mensagem && (
            <div className="form-group">
              <div className={tipoMensagem ? "alert alert-danger" : "alert alert-primary"} role="alert">
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

export default CadastrarInstalacao;