import React from 'react';
import PropTypes from 'prop-types';

const TransactionsTable = ({ transactions }) => (
    <div>
        <h2>Transactions</h2>
        <table border="1">
            <thead>
                <tr>
                    <th>Transaction ID</th>
                    <th>Customer Name</th>
                    <th>Purchase Date</th>
                    <th>Product Purchased</th>
                    <th>Price</th>
                    <th>Reward Points</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction, index) => (
                    <tr key={index}>
                        <td>{transaction.transactionId}</td>
                        <td>{transaction.customerName}</td>
                        <td>{transaction.purchaseDate}</td>
                        <td>{transaction.productPurchased}</td>
                        <td>{transaction.price}</td>
                        <td>{transaction.rewardPoints}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

TransactionsTable.propTypes = {
    transactions: PropTypes.array.isRequired
};

export default TransactionsTable;