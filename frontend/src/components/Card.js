import React from 'react';

const Card = ({ card, onClick }) => {
  return (
    <div className={`card ${card.isFlipped ? 'flipped' : ''}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back">
          <img src={card.image} alt={card.name} />
        </div>
      </div>
    </div>
  );
};

export default Card;