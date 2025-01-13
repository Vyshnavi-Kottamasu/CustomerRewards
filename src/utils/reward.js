import dateHelper from './dateHelper';

//calculate points based on transaction amount
export const calculatePoints = (amt) => {
  if (isNaN(amt)) return '';
  const amount = Math.round(amt);
  if (amount <= 50) return 0;
  const pointsAbove50 = amount - 50;
  const pointsAbove100 = Math.max(0, amount - 100);
  return pointsAbove50 + pointsAbove100;
};

export const fetchRewardsData = async () => {
  const response = await fetch('/data/transactions.json'); // fetching data
  const transactionsData = await response.json();

  const currentDate = new Date();
  const threeMonthsAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 2,
    1
  );

  //updatedTransactions contains the details of the whole transaction table along with the calculated reward points
  const updatedTransactions = transactionsData.map((transaction) => {
    const points = calculatePoints(transaction.price);
    return { ...transaction, rewardPoints: points };
  });

  //monthlyRewards and quarterlyRewards are the objects that have multiple keys where each key represents a row data and its value represents the reward points
  const { monthlyRewards } = updatedTransactions.reduce(
    (acc, transaction) => {
      const transactionDate = dateHelper.parseDate(transaction.purchaseDate);
      const month = dateHelper.getMonth(transactionDate);
      const monthKey = `${transaction.customerName}-${transactionDate.getFullYear()}-${month}`;

      acc.monthlyRewards[monthKey] =
        (acc.monthlyRewards[monthKey] || 0) +
        (isNaN(transaction.price) ? 0 : transaction.rewardPoints);

      return acc;
    },
    { monthlyRewards: {} }
  );

  // Quarterly rewards logic updated to consider only last 3 months
  const quarterlyRewards = updatedTransactions
    .filter((transaction) => {
      const transactionDate = dateHelper.parseDate(transaction.purchaseDate);
      return (
        transactionDate >= threeMonthsAgo && transactionDate <= currentDate
      );
    })
    .reduce((acc, transaction) => {
      const customerKey = transaction.customerName; // Group by customer
      acc[customerKey] =
        (acc[customerKey] || 0) +
        (isNaN(transaction.price) ? 0 : transaction.rewardPoints);
      return acc;
    }, {});

  //transforming the monthlyRewards into a 2D array, extracting the details and adding them to monthlyRewardsTable
  const monthlyRewardsTable = Object.entries(monthlyRewards).map(
    ([key, rewardPoints]) => {
      const [customerName, year, month] = key.split('-');
      return { customerName, year, month, rewardPoints };
    }
  );

  //transforming the quarterlyRewards into a 2D array, extracting the details, and adding them to quarterlyRewardsTable.
  const quarterlyRewardsTable = Object.entries(quarterlyRewards).map(
    ([customerName, rewardPoints]) => {
      return { customerName, rewardPoints };
    }
  );

  return { updatedTransactions, monthlyRewardsTable, quarterlyRewardsTable };
};
