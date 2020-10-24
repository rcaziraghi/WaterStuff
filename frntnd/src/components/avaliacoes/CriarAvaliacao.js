import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from 'react-select';

// import { cadastrar } from "../../actions/avaliacoes";

const CriarAvaliacao = (props) => {

    const [titulo, setTitulo] = useState("");
    const [nota, setNota] = useState("");
    const [atendimento, setAtendimento] = useState("");
    const [observacoes, setObservacoes] = useState("");

    const [loading, setLoading] = useState("");
    const [mostrarDropdown, setMostrarDropdown] = useState(false);

    const [mensagemTitulo, setMensagemTitulo] = useState("");
    const [mensagemNota, setMensagemNota] = useState("");
    const [mensagemAtendimento, setMensagemAtendimento] = useState("");
    const [mensagemObservacoes, setMensagemObservacoes] = useState("");

    const [mensagemBackend, setMensagemBackend] = useState("");

    const { estaLogado, usuario } = useSelector(state => state.auth);
    const { mensagem } = useSelector(state => state.mensagem);

    const dispatch = useDispatch();

    const valores = [0,1,2,3,4,5,6,7,8,9,10];

    const rangeAvaliacoes = valores.map(i => {
        return (
            <option key={i}>{i}</option>
        )
    });

    const aoMudarTitulo = (e) => {

    };

    const aoMudarNota = (e) => {

    };

    const aoMudarAtendimento = (e) => {

    };

    const handleAvaliacao = (e) => {

    };

    // showDropdownMenu = (e) => {
    //     e.preventDefault();
    //     setState({ displayMenu: true }, () => {
    //     document.addEventListener('click', this.hideDropdownMenu);
    //     });
    //   }
    
    //   hideDropdownMenu = (e) => {
    //    setState({ displayMenu: false }, () => {
    //       document.removeEventListener('click', this.hideDropdownMenu);
    //     });
    
    //   }

    const dropdownMenu = (e) => {
        e.preventDefault();
        setMostrarDropdown(!mostrarDropdown);
      };

    return (
        <div className="container-fluid">

          <div className="card">
    
            <form onSubmit={handleAvaliacao}>
          
            <div className="form-group row">

              <div className="form-group col-md-10">

                <label htmlFor="titulo">Título</label>
                <input
                  type="text"
                  className="form-control"
                  name="titulo"
                  value={titulo}
                  onChange={aoMudarTitulo}
                />

                {mensagemTitulo &&
              <div className="alert alert-danger" role="alert">
                {mensagemTitulo}
              </div>
              }

              </div>

              <div className="form-group col-md-2">
              <label htmlFor="titulo">Nota</label>
                <select className="custom-select" id="inputNota">
                    <option defaultValue>Escolha</option>
                    {rangeAvaliacoes}
                </select>

                {mensagemTitulo &&
              <div className="alert alert-danger" role="alert">
                {mensagemTitulo}
              </div>
              }

              </div>

            </div>
    
            <div className="form-group row">

            <div className="form-group col">
            <label htmlFor="titulo">Atendimento</label>
                <input
                  type="text"
                  className="form-control"
                  name="atendimento"
                  value={atendimento}
                  onChange={aoMudarAtendimento}
                />

                {mensagemAtendimento &&
              <div className="alert alert-danger" role="alert">
                {mensagemAtendimento}
              </div>
              }
            </div>

            </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Avaliar</span>
                </button>
              </div>
    
              {mensagem && (
                <div className="form-group">
                  <div className={mensagemBackend ? "alert alert-danger" : "alert alert-primary"} role="alert">
                    {mensagem}
                  </div>
                </div>
              )}

            </form>
          </div>
        </div>
      );

};

export default CriarAvaliacao;