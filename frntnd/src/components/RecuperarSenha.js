import React, { useState, useRef, Component } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { recuperarSenha } from "../actions/auth";

// valida campo requerido
// const validarRequerido = (value) => {
    // if (!value) {
    //   return (
    //     <div className="alert alert-danger" role="alert">
    //       Este campo é requerido!
    //     </div>
    //   );
    // }
//   };
  
  // valida o email
//   const validarEmail = (value) => {
    // if (!isEmail(value)) {
    //   return false;
    //   (
    //     <div className="alert alert-danger" role="alert">
    //       Este email não é válido.
    //     </div>
    //   );
    // };
//   };

// const RecuperarSenha = () => {
//     const form = useRef();
//     const checkBtn = useRef();

//     const [email, setEmail] = useState("");
//     const [sucesso, setSucesso] = useState(false);

//     const { mensagem } = useSelector(state => state.mensagem);

//     const dispatch = useDispatch();

//     const aoMudarEmail = (e) => {
//         const email = e.target.value;
//         setEmail(email);
//       };

//     const handleRecuperarSenha = (e) => {
//         // Evita comportamento default do navegador
//         // ex. refresh/reload  por causa do submit do formulário
//         e.preventDefault();

//         form.current.validateAll();

//         if(checkBtn.current.context._errors.lenght === 0) {
//             dispatch(recuperarSenha(email))
//             .then( () => {
//                 setSucesso(true);
//                 console.log('Email encontrado e recuperação de senha enviada.');
//             });
//         }

//     };

//     return (
//         <div className="col-md-12">
//           <div className="card card-container">

//             <Form onSubmit={handleRecuperarSenha} ref={form}>
//               {!sucesso && (
//                 <div>
//                   <div className="form-group">
//                     <label htmlFor="email">Email</label>
//                     <Input
//                       type="text"
//                       className="form-control"
//                       name="email"
//                       value={email}
//                       onChange={aoMudarEmail}
//                       validations={[validarRequerido, validarEmail]}
//                     />
//                   </div>
    
//                   <div className="form-group">
//                     <button className="btn btn-primary btn-block">Recuperar senha</button>
//                   </div>
//                 </div>
//               )}
    
//               {mensagem && (
//                 <div className="form-group">
//                   <div className={ sucesso ? "alert alert-success" : "alert alert-danger" } role="alert">
//                     {mensagem}
//                   </div>
//                 </div>
//               )}
//               <CheckButton style={{ display: "none" }} ref={checkBtn} />
//             </Form>
//           </div>
//         </div>
//       );
// };

// export default RecuperarSenha;

// -------------------------------------------------------------

const validarFormulario = ({ erro }) => {
    let ehValido = false;

    Object.values(erro).forEach(val => {
        if (val.length > 0) {
            ehValido = false
        } else {
            ehValido = true
        }
    });

    // Object.values(rest).forEach(val => {
    //     if (val === null) {
    //         isValid = false
    //     } else {
    //         isValid = true
    //     }
    // });

    return ehValido;
};

export default class RecuperarSenha extends Component {

    constructor(props) {

        super(props);

        this.state = {
            carregando: false,
            email: '',
            erro: {
                email: ''
            },
            sucesso: {
                email: ''
            }
        };

        // this.dispatch = useDispatch();
    };

    aoMudarEmail = (e) => {
        e.preventDefault();
        const valor = e.target.value;
        let Erro = { ...this.state.erro};
        console.log('aoMudarEmail',valor);

        Erro.email = !isEmail(valor) ? "Email inválido!" : '';

        console.log("Resultado",Erro.email)

        this.setState({
            email: valor,
            erro: Erro
        });
        
      };

    handleRecuperarSenha = (e) => {
        // Evita comportamento default do navegador
        // ex. refresh/reload  por causa do submit do formulário
        e.preventDefault();
        this.setState({
            carregando: true
        });

        if(validarFormulario(this.state)) {
            console.log("Valido",this.state);
            // recuperarSenha(this.state.email)
            // .then( (resposta) => {
                this.setState({
                    carregando: false,
                    sucesso: {
                        email: recuperarSenha(this.state.email)
                    }
                });
                console.log('Email encontrado e recuperação de senha enviada.');
                console.log("State",this.state);
            // });            
        } else {
            console.log("Invalido",this.state);
            this.setState({
                carregando: false
            });
        }
    };

    render() {
    
        const { erro } = this.state;

        return (
                <div className="col-md-12">
                  <div className="card card-container">
        
                    <form onSubmit={this.handleRecuperarSenha} noValidate>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                                <input
                                type="text"
                                className={erro.email.length > 0 ? "is-invalid form-control" : "form-control"}
                                name="email"
                                value={this.state.email}
                                onChange={this.aoMudarEmail}
                                />
                        </div>

                        {erro.email.length > 0 && (
                       <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                            {erro.email}
                            </div>
                        </div>
                        )}

                        {this.state.sucesso.email.length > 0 && (
                       <div className="form-group">
                            <div className="alert alert-primary" role="alert">
                            {this.state.sucesso.email}
                            </div>
                        </div>
                        )}

                       <div className="form-group">
                         <button className="btn btn-primary btn-block"
                            disabled={this.state.carregando} >
                            {this.state.carregando = false && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                             Recuperar senha
                         </button>
                       </div>

                    </form>

                  </div>
                </div>
        )
    }
}

// -------------------------------------------