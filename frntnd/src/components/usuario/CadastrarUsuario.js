import { Component } from "react";

import moment from "moment";
import "moment/locale/pt";
import authService from "../../services/auth.service";
import estadoService from "../../services/auth.service";
moment.locale("pt");

export default class cadastrarUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario = {
                email: '',
                nomeCompleto: '',
                senha: '',
                idperfil: 0,
                dtNascimento: new Date(moment().subtract(16, "years")),
                cidade: '',
                siglaEstado: '',
            },
            usuarioLogado: authService.usuarioLogado(),
            estados: estadoService.listar(),
        }
    }

    componentDidMount() {
        if (!this.state.usuario) {
            this.props.history.push("/login");
            window.location.reload();
          }
    };

    render() {
        return (
            <div>Usuario</div>
        )
    }
}