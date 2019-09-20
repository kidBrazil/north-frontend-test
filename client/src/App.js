import React from 'react';
import logo from './assets/images/logo.svg';
import './assets/styles/global-main.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          <i className="fab fa-facebook"></i>
        </a>
      </header>
    </div>
  );
}

export default App;
