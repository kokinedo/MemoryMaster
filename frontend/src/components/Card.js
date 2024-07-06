import React from 'react';
import '../styles/Card.css';

const Card = ({ card, flipped, onClick, removing }) => {
  return (
    <div 
      className={`card ${flipped ? 'flipped' : ''} ${removing ? 'removing' : ''}`} 
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back">
          <img src={card.image} alt="Card" />
        </div>
      </div>
    </div>
  );
};

export default Card;