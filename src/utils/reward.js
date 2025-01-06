//calculate points based on transaction amount
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
  const response = await fetch('/data/transactions.json'); // fetching data
  const transactionsData = await response.json();

  //updatedTransactions contains the details of the whole transaction table along with the calculated reward points
  const updatedTransactions = transactionsData.map((transaction) => {
    const points = calculatePoints(transaction.price);
    return { ...transaction, rewardPoints: points };
  });

  const monthlyRewards = {};
  const quarterlyRewards = {};

  //monthlyRewards and quarterlyRewards are the objects that have multiple keys where each key represents a row data and its value represents the reward points
  updatedTransactions.forEach((transaction) => {
    const date = new Date(transaction.purchaseDate);
    const month = date.toLocaleString('default', { month: 'long' });
    const monthKey = `${transaction.customerName}-${date.getFullYear()}-${month}`; //unique key that contains all the row details to be displayed
    const quarterKey = `${transaction.customerName}-${date.getFullYear()}-Q${Math.ceil((date.getMonth() + 1) / 3)}`; //unique key that contains all the row details to be displayed

    monthlyRewards[monthKey] =
      (monthlyRewards[monthKey] || 0) + transaction.rewardPoints; //Sum of reward points based on monthly basis
    quarterlyRewards[quarterKey] =
      (quarterlyRewards[quarterKey] || 0) + transaction.rewardPoints; //Sum of reward points based on quarterly basis
  });

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
