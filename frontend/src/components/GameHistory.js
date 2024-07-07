// src/components/GameHistory.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/GameHistory.css';

const GameHistory = () => {
  const [games, setGames] = useState([]);
  const [expandedGame, setExpandedGame] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/history/player1'); // Replace with actual player ID
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching game history:', error);
      }
    };

    fetchHistory();
  }, []);

  const toggleGameExpansion = (gameId) => {
    setExpandedGame(expandedGame === gameId ? null : gameId);
  };

  return (
    <div className="game-history">
      <h2>Game History</h2>
      {games.map(game => (
        <div key={game.id} className="game-item">
          <div className="game-summary" onClick={() => toggleGameExpansion(game.id)}>
            <span>Date: {new Date(game.date_played).toLocaleString()}</span>
            <span>Difficulty: {game.difficulty}</span>
            <span>Moves: {game.moves}</span>
          </div>
          {expandedGame === game.id && (
            <div className="audit-trail">
              {game.audit_trail.map((move, index) => (
                <p key={index}>
                  Player revealed a {move.card_name} Card at the coordinates {move.coordinates} and 
                  {move.found_match ? ' found' : " didn't find"} a match.
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GameHistory;