import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import GameHistory from './GameHistory';

jest.mock('axios');

describe('GameHistory', () => {
  it('renders loading state initially', () => {
    const { getByText } = render(<GameHistory />);
    expect(getByText('Loading game history...')).toBeInTheDocument();
  });

  it('renders game history after loading', async () => {
    const mockGames = [
      {
        id: 1,
        date_played: '2024-07-08T00:22:48',
        difficulty: 'easy',
        total_moves: 24,
        moves: []
      }
    ];

    axios.get.mockResolvedValueOnce({ data: mockGames });

    const { getByText } = render(<GameHistory />);

    await waitFor(() => {
      expect(getByText('Game History')).toBeInTheDocument();
      expect(getByText('Date: 7/8/2024, 12:22:48 AM')).toBeInTheDocument();
      expect(getByText('Difficulty: easy')).toBeInTheDocument();
      expect(getByText('Moves: 24')).toBeInTheDocument();
    });
  });
});