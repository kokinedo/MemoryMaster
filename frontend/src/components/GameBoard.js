import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from './Card';
import WinPopup from './Winpop';
import { GameContext } from '../contexts/GameContext';
import axios from 'axios';
import '../styles/GameBoard.css'


const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const { gameMode, setGameMode } = useContext(GameContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [showWinPopup, setShowWinPopup] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    setGameMode(mode);
    initializeGame(mode);
  }, [location, setGameMode]);

  const initializeGame = async (mode) => {
    const cardCount = mode === 'easy' ? 10 : mode === 'medium' ? 15 : 20;
    try {
      const response = await axios.get(`https://randomuser.me/api/?results=${cardCount}`);
      const users = response.data.results;
      
      const gameCards = users.flatMap(user => [
        { id: `${user.login.uuid}-1`, image: user.picture.large, matched: false },
        { id: `${user.login.uuid}-2`, image: user.picture.large, matched: false }
      ]);

      setCards(shuffleArray(gameCards));
      setGameStarted(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error appropriately
    }
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || card.matched) return;
    
    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      checkForMatch(newFlippedCards);
    }
  };

  const checkForMatch = (flippedCards) => {
    if (flippedCards[0].image === flippedCards[1].image) {
      setCards(cards.map(card => 
        flippedCards.some(flipped => flipped.id === card.id) ? {...card, matched: true} : card
      ));
      setMatchedPairs(matchedPairs + 1);
      setFlippedCards([]);
    } else {
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  useEffect(() => {
    if (gameStarted && matchedPairs === cards.length / 2 && cards.length > 0) {
      setShowWinPopup(true);
    }
  }, [matchedPairs, cards.length, gameStarted]);

  const handlePlayAgain = () => {
    setShowWinPopup(false);
    initializeGame(gameMode);
    setMoves(0);
    setMatchedPairs(0);
  };

  if (!gameStarted) {
    return <div>Loading game...</div>;
  }

  return (
    <div className="game-board">
      <h2 className="game-mode">Game Mode: {gameMode}</h2>
      <div className="cards-container">
        {cards.map((card) => (
          <Card 
            key={card.id} 
            card={card} 
            flipped={flippedCards.some(flipped => flipped.id === card.id) || card.matched}
            onClick={() => handleCardClick(card)} 
          />
        ))}
      </div>
      <div className="game-info">
        <span className="moves-counter">Moves: {moves}</span>
      </div>
      {showWinPopup && (
        <WinPopup
          moves={moves}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
};
export default GameBoard;