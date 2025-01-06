import React, { useState, useEffect } from 'react';
import log from 'loglevel';
import { fetchRewardsData } from '../reward.js';
import Loading from '../../components/Loading.jsx';
import TabButtons from '../../components/TabButton.jsx';
import RewardsContent from '../RewardsContent/RewardsContent.jsx';

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
        log.error('Error fetching data:', e.message);
        log.error('Stack trace:', e.stack);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Customer Rewards Program</h1>
      <TabButtons
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <RewardsContent
        activeTab={activeTab}
        transactions={transactions}
        monthlyRewards={monthlyRewards}
        quarterlyRewards={quarterlyRewards}
      />
    </div>
  );
};

export default RewardsProgram;
