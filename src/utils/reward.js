//calculate points based on transaction amount
export const calculatePoints = (amt) => {
  const amount = Math.round(amt);
  if (amount <= 50) return 0;
  const pointsAbove50 = amount - 50;
  const pointsAbove100 = Math.max(0, amount - 100);
  return pointsAbove50 + pointsAbove100;
};

export const fetchRewardsData = async () => {
  const response = await fetch('/data/transactions.json'); // fetching data
  const transactionsData = await response.json();

  //updatedTransactions contains the details of the whole transaction table along with the calculated reward points
  const updatedTransactions = transactionsData.map((transaction) => {
    const points = calculatePoints(transaction.price);
    return { ...transaction, rewardPoints: points };
  });

  //monthlyRewards and quarterlyRewards are the objects that have multiple keys where each key represents a row data and its value represents the reward points
  const { monthlyRewards, quarterlyRewards } = updatedTransactions.reduce(
    (acc, transaction) => {
      const date = new Date(transaction.purchaseDate);
      const month = date.toLocaleString('default', { month: 'long' });
      const monthKey = `${transaction.customerName}-${date.getFullYear()}-${month}`;
      const quarterKey = `${transaction.customerName}-${date.getFullYear()}-Q${Math.ceil((date.getMonth() + 1) / 3)}`;

      acc.monthlyRewards[monthKey] =
        (acc.monthlyRewards[monthKey] || 0) + transaction.rewardPoints;
      acc.quarterlyRewards[quarterKey] =
        (acc.quarterlyRewards[quarterKey] || 0) + transaction.rewardPoints;

      return acc;
    },
    { monthlyRewards: {}, quarterlyRewards: {} }
  );

  //transforming the monthlyRewards into a 2D array, extracting the details and adding them to monthlyRewardsTable
  const monthlyRewardsTable = Object.entries(monthlyRewards).map(
    ([key, rewardPoints]) => {
      const [customerName, year, month] = key.split('-');
      return { customerName, year, month, rewardPoints };
    }
  );

  //transforming the quarterlyRewards into a 2D array, extracting the details, and adding them to quarterlyRewardsTable.
  const quarterlyRewardsTable = Object.entries(quarterlyRewards).map(
    ([key, rewardPoints]) => {
      const [customerName, year, quarter] = key.split('-');
      return { customerName, year, quarter, rewardPoints };
    }
  );

  return { updatedTransactions, monthlyRewardsTable, quarterlyRewardsTable };
};
