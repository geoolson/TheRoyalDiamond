import React from 'react';
import logo from './logo.svg';
import './App.css';

function Game(props) {
  return (
    <div className="Game">
      <h1>Royal Diamond</h1>
      <button>Back to Main Menu</button>
      <br/>
      <table>
      <tr>
        <th></th>
        <th><button>NORTH</button></th>
        <th></th>
      </tr>
      <tr>
        <th><button>WEST</button></th>
        <th></th>
        <th><button>EAST</button></th>
      </tr>
      <tr>
        <th></th>
        <th><button>SOUTH</button></th>
        <th></th>
      </tr>
      </table>
      <br/>
      <br/>
    </div>
  );
}

export default Game;
