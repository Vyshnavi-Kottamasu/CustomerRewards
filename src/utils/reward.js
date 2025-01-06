export const calculatePoints = (amt) => {
  let points = 0;
  let amount = Math.round(amt);
  if (amount > 100) {
    points = 2 * (amount - 100);
    amount = 100;
  }
  if (amount > 50) {
    points += amount - 50;
  }
  return points;
};

export const fetchRewardsData = async () => {
  const response = await fetch('/data/transactions.json');
  const transactionsData = await response.json();

  const updatedTransactions = transactionsData.map((transaction) => {
    const points = calculatePoints(transaction.price);
    return { ...transaction, rewardPoints: points };
  });

  const monthlyRewards = {};
  const quarterlyRewards = {};

  updatedTransactions.forEach((transaction) => {
    const date = new Date(transaction.purchaseDate);
    const month = date.toLocaleString('default', { month: 'long' });
    const monthKey = `${transaction.customerName}-${date.getFullYear()}-${month}`;
    const quarterKey = `${transaction.customerName}-${date.getFullYear()}-Q${Math.ceil((date.getMonth() + 1) / 3)}`;

    monthlyRewards[monthKey] =
      (monthlyRewards[monthKey] || 0) + transaction.rewardPoints;
    quarterlyRewards[quarterKey] =
      (quarterlyRewards[quarterKey] || 0) + transaction.rewardPoints;
  });

  const monthlyRewardsTable = Object.entries(monthlyRewards).map(
    ([key, rewardPoints]) => {
      const [customerName, year, month] = key.split('-');
      return { customerName, year, month, rewardPoints };
    }
  );

  const quarterlyRewardsTable = Object.entries(quarterlyRewards).map(
    ([key, rewardPoints]) => {
      const [customerName, year, quarter] = key.split('-');
      return { customerName, year, quarter, rewardPoints };
    }
  );

  return { updatedTransactions, monthlyRewardsTable, quarterlyRewardsTable };
};
