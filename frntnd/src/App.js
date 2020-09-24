import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './waterstuff.jpg';
import './App.css';

// function App() {

// }

const App = () => {
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bem vindo ao Waterstuff!
        </p>
      </header>
    </div>
  );
}

export default App;
