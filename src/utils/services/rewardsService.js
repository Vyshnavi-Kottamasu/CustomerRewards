export const fetchTransactionsData = async () => {
  try {
    const response = await fetch('/data/transactions.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch transactions data:', error.message);
    return null;
  }
};
