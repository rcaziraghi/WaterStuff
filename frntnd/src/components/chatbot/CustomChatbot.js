import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import AuthService from "../../services/auth.service";
import FormContato from "./FormContato";

export default class CustomChatbot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //-------------------------------------------
      usuario: AuthService.usuarioLogado(),
      //-------------------------------------------
      // configuração de visualização
      config: {
        width: "600px",
        height: "400px",
        floating: true,
      },
      //-------------------------------------------
      // Tema do chatbot
      temaChatbot: {
        background: "##e9ecef",
        fontFamily:
          "Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue",
        headerBgColor: "#343a40",
        headerFontColor: "#fff",
        headerFontSize: "15px",
        botBubbleColor: "#e9ecef",
        botFontColor: "#212529",
        userBubbleColor: "#e9ecef",
        userFontColor: "#212529",
      },
    };
  }
  steps = () => {
    const state = this.state.usuario;
    console.log("teste", state);
    return [
      // Cumprimento
      {
        id: "cumprimentar",
        message: "Olá como eu posso ajudar?",
        trigger: "opcoes iniciais",
      },
      // Opcoes iniciais
      {
        id: "opcoes iniciais",
        options: [
          {
            value: "FAQ",
            label: "->FAQ",
            trigger: "mostrar FAQ",
          },
          {
            value: "entrar em contato",
            label: "->Entrar em contato",
            trigger: "entrar em contato",
          },
        ],
      },
      // Mostrar FAQ
      {
        id: "mostrar FAQ",
        options: [
          {
            value: "duvida 1",
            label: "Dúvida 1",
            trigger: "duvida 1",
          },
          {
            value: "duvida 2",
            label: "Dúvida 2",
            trigger: "duvida 2",
          },
        ],
      },
      // Duvida 1
      {
        id: "duvida 1",
        message: "Dúdiva 1: resposta 1.",
        end: true,
      },
      // Duvida 2
      {
        id: "duvida 2",
        message: "Dúdiva 2: resposta 2.",
        end: true,
      },
      // Entrar em contato ------------------
      {
        id: "entrar em contato",
        message: "Qual seu nome?",
        trigger: "nome",
      },
      {
        id: "nome",
        user: true,
        trigger: "mostrar contato",
      },
      {
        id: "mostrar contato",
        message: "{previousValue}, qual seu contato?",
        trigger: "contato",
      },
      {
        id: "contato",
        user: true,
        trigger: "mostrar duvida",
      },
      {
        id: "mostrar duvida",
        message: "Qual sua dúvida?",
        trigger: "duvida",
      },
      {
        id: "duvida",
        user: true,
        trigger: "mostrar confirmacao",
      },
      {
        id: "mostrar confirmacao",
        message: "Confirmando os dados:",
        trigger: "mostrar revisao",
      },
      {
        id: "mostrar revisao",
        component: <FormContato />,
        asMessage: true,
        trigger: "obrigado",
      },
      {
        id: "obrigado",
        message: "Obrigado!",
        end: true,
      },
    ];
  };
  guardarDuvida({ steps, values }) {
    console.log(steps);
    console.log(values);
  }
  render() {
    return (
      <ThemeProvider theme={this.state.temaChatbot}>
        <ChatBot
          steps={this.steps()}
          {...this.state.config}
          handleEnd={this.guardarDuvida}
        />
      </ThemeProvider>
    );
  }
}
