import React from 'react';
import Typography from '../lib/typography';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Typography.Headline size="3">
Welcome to React
        </Typography.Headline>
      </header>
      <Typography.Body size="2">
        Aliquip irure duis nulla eu nostrud aliquip id tempor. Tempor elit minim esse anim tempor
        qui. Dolore pariatur sit aute laborum ipsum dolor nulla est duis pariatur irure culpa veniam
        ea.
      </Typography.Body>
    </div>
  );
}

export default App;
