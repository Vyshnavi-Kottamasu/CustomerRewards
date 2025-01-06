/* eslint-disable no-undef */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { expect, jest, test, describe, afterEach } from '@jest/globals';
import RewardsProgram from './RewardsProgram';
import { calculatePoints } from '../reward.js';

// Mocking the fetchRewardsData function
jest.mock('../reward', () => ({
  fetchRewardsData: jest.fn(),
}));

// Mocking the Loading component
jest.mock('../../components/Loading', () => {
  const MockLoading = () => <div>Loading...</div>;
  MockLoading.displayName = 'MockLoading';
  return MockLoading;
});

// Mocking the RewardsContent component
jest.mock(
  '../RewardsContent/RewardsContent',
  () =>
    ({ transactions, monthlyRewards, quarterlyRewards }) => {
      const MockRewardTables = () => (
        <div>
          <p>Transactions: {JSON.stringify(transactions)}</p>
          <p>Monthly Rewards: {JSON.stringify(monthlyRewards)}</p>
          <p>Quarterly Rewards: {JSON.stringify(quarterlyRewards)}</p>
        </div>
      );
      MockRewardTables.displayName = 'MockRewardTables';
      return MockRewardTables;
    }
);

describe('RewardsProgram Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render loading initially', () => {
    // Mock the fetchRewardsData to resolve with empty data
    fetchRewardsData.mockResolvedValueOnce({
      updatedTransactions: [],
      monthlyRewardsTable: [],
      quarterlyRewardsTable: [],
    });
    render(<RewardsProgram />);

    // Check if the loading text is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('fetches and renders data correctly', async () => {
    const mockData = {
      updatedTransactions: [{ id: 1, amount: 100 }],
      monthlyRewardsTable: [{ month: 'January', points: 200 }],
      quarterlyRewardsTable: [{ quarter: 'Q1', points: 600 }],
    };

    // Mock the fetchRewardsData to return mock data
    fetchRewardsData.mockResolvedValueOnce(mockData);
    render(<RewardsProgram />);

    // Wait for the data to be fetched and rendered
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.getByText('Customer Rewards Program')).toBeInTheDocument();
    });

    // Check if the transaction data is rendered
    expect(screen.getByText('Transactions: [{"id":1,"amount":100}]')).toBeInTheDocument();
    expect(screen.getByText('Monthly Rewards: [{"month":"January","points":200}]')).toBeInTheDocument();
    expect(screen.getByText('Quarterly Rewards: [{"quarter":"Q1","points":600}]')).toBeInTheDocument();
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
