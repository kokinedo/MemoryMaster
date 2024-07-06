import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/StartScreen.css'

const StartScreen = () => {
  return (
    <div className="start-screen">
      <h1 className="game-title">Memory Master</h1>
      <div className="game-modes">
        <Link to="/game?mode=easy" className="mode-button easy">Easy</Link>
        <Link to="/game?mode=medium" className="mode-button medium">Medium</Link>
        <Link to="/game?mode=hard" className="mode-button hard">Hard</Link>
      </div>
      <Link to="/history" className="history-link">View Game History</Link>
    </div>
  );
};

export default StartScreen;