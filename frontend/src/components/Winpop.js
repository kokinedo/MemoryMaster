import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/WinPopup.css';

const WinPopup = ({ moves, onPlayAgain }) => {
  return (
    <div className="win-popup-overlay">
      <div className="win-popup">
        <h2>Congratulations!</h2>
        <p>You won in {moves} moves!</p>
        <div className="win-popup-buttons">
          <button onClick={onPlayAgain}>Play Again</button>
          <Link to="/" className="menu-button">Return to Menu</Link>
        </div>
      </div>
    </div>
  );
};

export default WinPopup;