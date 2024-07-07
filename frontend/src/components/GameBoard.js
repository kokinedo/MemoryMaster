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
  const [gameStarted, setGameStarted] = useState(false);
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [removingCards, setRemovingCards] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    setGameMode(mode);
    initializeGame(mode);
  }, [location, setGameMode]);

  const initializeGame = async (mode) => {
    const cardCount = mode === 'easy' ? 5 : mode === 'medium' ? 5 : 5; // 5 unique cards for each mode
    try {
      const response = await axios.get(`https://randomuser.me/api/?results=${cardCount}`);
      const users = response.data.results;
      
      const gameCards = users.flatMap(user => {
        const cards = [
          { id: `${user.login.uuid}-1`, image: user.picture.large, matched: false },
          { id: `${user.login.uuid}-2`, image: user.picture.large, matched: false },
        ];
        if (mode === 'medium') {
          cards.push({ id: `${user.login.uuid}-3`, image: user.picture.large, matched: false });
        } else if (mode === 'hard') {
          cards.push(
            { id: `${user.login.uuid}-3`, image: user.picture.large, matched: false },
            { id: `${user.login.uuid}-4`, image: user.picture.large, matched: false }
          );
        }
        return cards;
      });

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

  const saveGame = async () => {
    try {
      await axios.post('http://localhost:5000/api/game', {
        difficulty: gameMode,
        moves: moves,
        player_id: 'player1',
        moves: gameHistory
      });
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  const handleCardClick = (card) => {
    if (flippedCards.length === getRequiredMatches() || card.matched) return;
    
    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    
    setGameHistory(prevHistory => [...prevHistory, {
      card_name: card.name || 'Unknown', 
      coordinates: `[${card.x || 0}, ${card.y || 0}]`,
      found_match: false,
      move_number: prevHistory.length + 1
    }]);

    if (newFlippedCards.length === getRequiredMatches()) {
      setMoves(moves + 1);
      checkForMatch(newFlippedCards);
    }
  };

  const checkForMatch = (flippedCards) => {
    const allMatch = flippedCards.every(card => card.image === flippedCards[0].image);
    if (allMatch) {
      setRemovingCards(flippedCards.map(card => card.id));
      setTimeout(() => {
        setCards(prevCards => prevCards.filter(card => !flippedCards.some(flipped => flipped.id === card.id)));
        setRemovingCards([]);
      }, 500); // This should match the duration of the CSS transition

      // Update game history to mark these moves as matches
      setGameHistory(prevHistory => {
        const lastMoves = prevHistory.slice(-getRequiredMatches());
        const updatedLastMoves = lastMoves.map(move => ({...move, found_match: true}));
        return [...prevHistory.slice(0, -getRequiredMatches()), ...updatedLastMoves];
      });

      setMatchedPairs(matchedPairs + 1);
      setFlippedCards([]);
    } else {
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  useEffect(() => {
    if (gameStarted && cards.length === 0) {
      setShowWinPopup(true);
      saveGame();
    }
  }, [cards.length, gameStarted]);

  const handlePlayAgain = () => {
    setShowWinPopup(false);
    initializeGame(gameMode);
    setMoves(0);
    setMatchedPairs(0);
  };

  const getRequiredMatches = () => {
    switch (gameMode) {
      case 'easy': return 2;
      case 'medium': return 3;
      case 'hard': return 4;
      default: return 2;
    }
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
            flipped={flippedCards.some(flipped => flipped.id === card.id)}
            removing={removingCards.includes(card.id)}
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