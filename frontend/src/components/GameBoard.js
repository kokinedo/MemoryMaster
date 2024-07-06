import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './Card';
import { GameContext } from '../contexts/GameContext';

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const { gameMode, setGameMode } = useContext(GameContext);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    setGameMode(mode);
    // Initialize cards based on game mode
    // Fetch card images from randomuser.me API
  }, [location, setGameMode]);

  const handleCardClick = (index) => {
    // Implement card click logic here
    console.log(`Card clicked at index ${index}`);
    // Update moves
    setMoves(prevMoves => prevMoves + 1);
  };

  return (
    <div className="game-board">
      <h2>Game Mode: {gameMode}</h2>
      <div className="cards-container">
        {cards.map((card, index) => (
          <Card key={index} card={card} onClick={() => handleCardClick(index)} />
        ))}
      </div>
      <div className="game-info">Moves: {moves}</div>
    </div>
  );
};

export default GameBoard;