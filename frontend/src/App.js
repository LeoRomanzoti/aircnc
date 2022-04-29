import React from 'react';

import './App.css';

import logo from './assets/logo.svg';

import Rotas from './routes';

function App() {
  return (
    <div className="container">
      <img src={logo} alt="AirCnC" />

      <div className="content">
        <Rotas />      
     </div>
    </div>
  );
}

export default App;
