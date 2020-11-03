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
                estado: '',
            },
            carregando: false,
            usuarioLogado: authService.usuarioLogado(),
            ufs: {},
        }
    }

    async componentDidMount() {
        if (!this.state.usuario) {
            this.props.history.push("/login");
            window.location.reload();
          }
        let Estado = { ...this.state };
        this.setState({
            carregando: true,
        });
        console.log("estado", Estado);
        Estado.ufs = await EstadoService.listar().then((dados) => {
            console.log("dados", typeof dados);
            return Object.entries(dados)[0][1].map((dados) => {
                return { value: dados.sigla, label: dados.estado };
            });
        });
        Estado.estado = Estado.ufs[0].label;
        this.setState({
            carregando: false,
        });
    };

    render() {
        return (
            <div>Usuario</div>
        )
    }
}