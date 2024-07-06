import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import GameBoard from './components/GameBoard';
import GameHistory from './components/GameHistory';

import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/game" element={<GameBoard />} />
          <Route path="/history" element={<GameHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;