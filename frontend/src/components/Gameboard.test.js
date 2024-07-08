import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import GameBoard from './GameBoard';
import { GameContext } from '../contexts/GameContext';

// Mock axios
jest.mock('axios');

describe('GameBoard', () => {
  it('renders without crashing', () => {
    render(
      <GameContext.Provider value={{ gameMode: 'easy', setGameMode: jest.fn() }}>
        <GameBoard />
      </GameContext.Provider>
    );
  });

  it('displays the correct game mode', () => {
    const { getByText } = render(
      <GameContext.Provider value={{ gameMode: 'medium', setGameMode: jest.fn() }}>
        <GameBoard />
      </GameContext.Provider>
    );
    expect(getByText('Game Mode: medium')).toBeInTheDocument();
  });

  it('initializes the game with the correct number of cards', async () => {
    const { container } = render(
      <GameContext.Provider value={{ gameMode: 'easy', setGameMode: jest.fn() }}>
        <GameBoard />
      </GameContext.Provider>
    );
    await waitFor(() => {
      const cards = container.querySelectorAll('.card');
      expect(cards.length).toBe(10); // 5 pairs for easy mode
    });
  });
});