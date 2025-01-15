import React, { useState, useEffect } from 'react';
import log from 'loglevel';
import { fetchRewardsData } from '../../utils/reward.js';
import Loading from '../Loading.jsx';
import TabButtons from '../TabButton/TabButton.jsx';
import RewardsContent from '../RewardsContent.jsx';
import './RewardsProgram.css';

//main function
const RewardsProgram = () => {
  const [monthlyRewards, setMonthlyRewards] = useState();
  const [quarterlyRewards, setQuarterlyRewards] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: 'All Transactions' },
    { id: 2, label: 'Monthly Rewards' },
    { id: 3, label: 'Quarterly Rewards' },
  ];

  //loading the data and storing it in state variables
  useEffect(() => {
    const loadData = async () => {
      try {
        log.info('Fetching data...');
        const {
          updatedTransactions,
          monthlyRewardsTable,
          quarterlyRewardsTable,
        } = await fetchRewardsData();

        //updating the updated values in state variables
        setTransactions(updatedTransactions);
        setMonthlyRewards(monthlyRewardsTable);
        setQuarterlyRewards(quarterlyRewardsTable);
        setLoading(false);
      } catch (e) {
        // Log the error for debugging
        log.error('Error fetching data:', e.message);
        log.error('Stack trace:', e.stack);
      }finally {
        // Ensure loading state is updated regardless of success or failure
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    );
  }

  return (
    <div className="rewards-program-container">
      <h1>Customer Rewards Program</h1>
      <div className="tab-buttons-container">
        <TabButtons
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      <div className="rewards-content">
        <RewardsContent
          activeTab={activeTab}
          transactions={transactions}
          monthlyRewards={monthlyRewards}
          quarterlyRewards={quarterlyRewards}
        />
      </div>
    </div>
  );
};

export default RewardsProgram;
