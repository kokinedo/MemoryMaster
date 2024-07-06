import React, { useEffect, useState } from 'react';
import '../styles/GameHistory.css'



const GameHistory = () => {
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    // Fetch game history from the backend
  }, []);

  return (
    <div className="game-history">
      <h2>Game History</h2>
      <ul>
        {gameHistory.map((game, index) => (
          <li key={index}>
            {/* Display game details and add expandable audit trail */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameHistory;