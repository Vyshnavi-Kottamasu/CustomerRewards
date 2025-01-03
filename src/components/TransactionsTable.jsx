import React from 'react';
import PropTypes from 'prop-types';

const TransactionsTable = ({ transactionsData }) => (
    <div>
        <h2>Transactions</h2>
        <table border="1" style={{margin: "0 auto"}}>
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
                {transactionsData.map((transaction, index) => (
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
    transactionsData: PropTypes.array.isRequired
};

export default TransactionsTable;