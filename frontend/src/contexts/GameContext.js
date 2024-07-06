import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameMode, setGameMode] = useState('easy');

  return (
    <GameContext.Provider value={{ gameMode, setGameMode }}>
      {children}
    </GameContext.Provider>
  );
};