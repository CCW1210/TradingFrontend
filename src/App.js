// src/App.js
import React from 'react';
import KLineChart from './components/KLineChart';

function App() {
  return (
    <div className="App">
      <header style={{ textAlign: 'center', margin: '20px' }}>
        <h1>看盤軟體前端</h1>
      </header>
      <main style={{ padding: '0 20px' }}>
        <KLineChart />
      </main>
    </div>
  );
}

export default App;
