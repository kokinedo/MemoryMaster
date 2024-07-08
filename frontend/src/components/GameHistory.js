import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/GameHistory.css';

const GameHistory = () => {
  const [games, setGames] = useState([]);
  const [expandedGame, setExpandedGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5000/api/history/player1');
        console.log('Game history response:', response.data);
        setGames(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching game history:', error);
        setError('Failed to fetch game history. Please try again later.');
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const toggleGameExpansion = (gameId) => {
    setExpandedGame(prevExpandedGame => prevExpandedGame === gameId ? null : gameId);
  };

  if (isLoading) return <div>Loading game history...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="game-history">
      <h2>Game History</h2>
      {games && games.length > 0 ? (
        games.map(game => (
          <div key={game.id} className="game-item">
            <div className="game-summary" onClick={() => toggleGameExpansion(game.id)}>
              <span>Date: {new Date(game.date_played).toLocaleString()}</span>
              <span> | </span>
              <span>Difficulty: {game.difficulty}</span>
              <span> | </span>
              <span>Moves: {game.total_moves}</span>
            </div>
            {expandedGame === game.id && (
              <div className="audit-trail">
                <h3>Audit Trail:</h3>
                {game.moves && game.moves.length > 0 ? (
                  game.moves.map((move, index) => (
                    <p key={index}>
                      Player revealed a {move.card_name} Card at the coordinates {move.coordinates} and
                      {move.found_match ? ' found' : " didn't find"} a match.
                    </p>
                  ))
                ) : (
                  <p>No moves available for this game.</p>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No game history available.</div>
      )}
    </div>
  );
};

export default GameHistory;