import React from 'react';
import logo from './logo.svg';

import GDPAnalysis from './components/GDPAnalysis.js';
import './App.css';

function App() {
  return (
    <div className="App">

      <div className="App-chart">
        <GDPAnalysis />
      </div>
    </div>

  );
}

export default App;
