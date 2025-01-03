import React, { useState, useEffect } from "react";
import log from 'loglevel';
import UserMonthlyRewards from "../../components/UserMonthlyRewardsTable";
import TotalRewards from "../../components/TotalRewardsTable";
import TransactionsTable from "../../components/TransactionsTable";

//Main function
const RewardsProgram = () => {
  const [monthlyRewards, setMonthlyRewards] = useState();
  const [totalRewards, setTotalRewards] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(1);


  //Loading the data and storing it in state variables
  useEffect(() => {
    const fetchData = async () => {
      try {
        log.info('Fetching data...');
        const [transactionDataJson] = await Promise.all([
          fetch("/data/transactions.json"),
        ]);

        const [transactionsData] = await Promise.all([
          transactionDataJson.json(),
        ]);

        //Calculating points for transaction table and storing in "updatedTransactions" variable
        const updatedTransactions = transactionsData.map((eachTransaction) => {
          const points = calculatePoints(eachTransaction.price);
          return { ...eachTransaction, rewardPoints: points };
        });
        
        const monthlyRewards = {};
        const quarterlyRewards = {};
        updatedTransactions.map((eachTransaction) => {
          const date = new Date(eachTransaction.purchaseDate);
          const month = new Date(eachTransaction.purchaseDate).toLocaleString("default",{ month: "long" });
          const monthKey = `${eachTransaction.customerName}-${date.getFullYear()}-${month}`;
          const quarterKey = `${eachTransaction.customerName}-${date.getFullYear()}-Q${Math.ceil((date.getMonth() + 1) / 3)}`;
          monthlyRewards[monthKey] = (monthlyRewards[monthKey] || 0) + eachTransaction.rewardPoints;
          quarterlyRewards[quarterKey] = (quarterlyRewards[quarterKey] || 0) + eachTransaction.rewardPoints;
        });

        const monthlyRewardsTable = Object.entries(monthlyRewards).map(([key, rewardPoints]) => {
            const [customerName, year, month] = key.split('-');
            return {
              customerName,
              year,
              month,
              rewardPoints,
            };
          });

        const quarterlyRewardsTable = Object.entries(quarterlyRewards).map(([key, rewardPoints]) => {
            const [customerName, year, quarter] = key.split("-");
            return {
              customerName,
              year,
              quarter,
              rewardPoints,
            };
          }
        );

        //Updating the updated values in state variables
        setTransactions(updatedTransactions);
        setMonthlyRewards(monthlyRewardsTable);
        setTotalRewards(quarterlyRewardsTable);
        setLoading(false);
      } catch (e) {
        log.error("Error fetching data:", e.message);
        log.error("Stack trace:", e.stack);
      }
    };

    fetchData();
  }, []);

  //function to calculate the reward points based on transaction amount
  const calculatePoints = (amt) => {
    var points = 0;
    var amount = Math.round(amt);
    if (amount > 100) {
      points = 2 * (amount - 100);
      amount = 100;
    }
    if (amount > 50) {
      points += amount - 50;
    }
    return points;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Customer Rewards Program</h1>
      <div>
        <button onClick={() => setActiveTab(1)}>All Transactions</button>
        <button onClick={() => setActiveTab(2)}>Monthly Rewards</button>
        <button onClick={() => setActiveTab(3)}>Quarterly Rewards</button>
      </div>
      {activeTab === 1 && <TransactionsTable transactionsData={transactions} />}
      {activeTab === 2 && <UserMonthlyRewards monthlyData={monthlyRewards} />}
      {activeTab === 3 && <TotalRewards totalData={totalRewards} />}
    </div>
  );
};

export default RewardsProgram;
