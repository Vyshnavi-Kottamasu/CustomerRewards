import React from 'react';
import PropTypes from 'prop-types';
import DataTable from '../../components/DataTable';

const RewardsContent = ({
  activeTab,
  transactions,
  monthlyRewards,
  quarterlyRewards,
}) => {
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
      columns: ['customerName', 'year', 'quarter', 'rewardPoints'],
      data: quarterlyRewards,
    },
  };

  const { columns, data } = dataMapping[activeTab] || {};

  if (!columns || !data) return null;

  return <DataTable columns={columns} details={data} />;
};

RewardsContent.propTypes = {
  activeTab: PropTypes.number.isRequired, // Fixed type
  transactions: PropTypes.array.isRequired,
  monthlyRewards: PropTypes.array.isRequired,
  quarterlyRewards: PropTypes.array.isRequired, // Corrected from `func` to `array`
};

export default RewardsContent;
