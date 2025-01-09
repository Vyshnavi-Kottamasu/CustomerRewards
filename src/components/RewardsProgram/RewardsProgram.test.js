/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import RewardsProgram from './RewardsProgram.jsx';
import { calculatePoints } from '../../utils/reward.js';

describe('RewardsProgram Component', () => {
  test('should render loading initially', () => {
    render(<RewardsProgram />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('should calculate points correctly based on price', () => {
    expect(calculatePoints(30)).toBe(0); // Below the 50 threshold
    expect(calculatePoints(70.4)).toBe(20); // Between 50 and 100
    expect(calculatePoints(120)).toBe(90); // Above 100
    expect(calculatePoints(0)).toBe(0); // Edge case: 0 value
    expect(calculatePoints(-1)).toBe(0); // Edge case: negative value
    expect(calculatePoints(null)).toBe(0); // Edge case: null value
  });
});
