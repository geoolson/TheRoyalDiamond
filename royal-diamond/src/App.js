import React from 'react';
import logo from './logo.svg';
import './App.css';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Royal Diamond</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={props.callback}>
          Play
        </button>
      </header>
    </div>
  );
}

export default App;
