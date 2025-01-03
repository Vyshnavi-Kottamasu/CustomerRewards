
import React from 'react';
import PropTypes from 'prop-types';

const TotalRewards = ({ totalData }) => (
    <div>
        <h2>Quaterly Rewards</h2>
        <table border="1" style={{margin: "0 auto"}}>
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Year</th>
                    <th>Quarter</th>
                    <th>Reward Points</th>
                </tr>
            </thead>
            <tbody>
                {totalData.map((total, index) => (
                    <tr key={index}>
                        <td>{total.customerName}</td>
                        <td>{total.year}</td>
                        <td>{total.quarter}</td>
                        <td>{total.rewardPoints}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

TotalRewards.propTypes = {
    totalData: PropTypes.array.isRequired
};

export default TotalRewards;