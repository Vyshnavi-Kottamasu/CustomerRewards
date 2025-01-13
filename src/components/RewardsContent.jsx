import React from 'react';
import PropTypes from 'prop-types';
import DataTable from './DataTable/DataTable';

const RewardsContent = ({
  activeTab,
  transactions,
  monthlyRewards,
  quarterlyRewards,
}) => {
  //creating a dataMapping object where the 'activeTab' serves as the key, and the corresponding values contain the 'columnNames' and 'data' for each table displayed on the screen.
  const dataMapping = {
    1: {
      columns: [
        'transactionId',
        'customerId',
        'customerName',
        'purchaseDate',
        'productPurchased',
        'price',
        'rewardPoints',
      ],
      data: transactions,
    },
    2: {
      columns: ['customerName', 'month', 'year', 'rewardPoints'],
      data: monthlyRewards,
    },
    3: {
      columns: ['customerName', 'rewardPoints'],
      data: quarterlyRewards,
    },
  };

  const { columns, data } = dataMapping[activeTab] || {}; //dataMapping details are mapped to columns array and data array based on the 'activeTab' value

  if (!columns || !data) return null;

  return <DataTable columns={columns} details={data} />;
};

RewardsContent.propTypes = {
  activeTab: PropTypes.number.isRequired,
  transactions: PropTypes.array.isRequired,
  monthlyRewards: PropTypes.array.isRequired,
  quarterlyRewards: PropTypes.array.isRequired,
};

export default RewardsContent;
