import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Game from './Game';
import * as serviceWorker from './serviceWorker';



function goToGame()
{
    var element = <Game/>
    ReactDOM.render(element, document.getElementById('root'));
}
ReactDOM.render(<App callback={goToGame}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
