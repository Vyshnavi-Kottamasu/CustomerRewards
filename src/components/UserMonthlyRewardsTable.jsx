import React from 'react';
import PropTypes from 'prop-types';

const UserMonthlyRewards = ({ rewards }) => (
    <div>
        <h2>User Monthly Rewards</h2>
        <table border="1">
            <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Name</th>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Reward Points</th>
                </tr>
            </thead>
            <tbody>
                {rewards.map((reward, index) => (
                    <tr key={index}>
                        <td>{reward.customerId}</td>
                        <td>{reward.name}</td>
                        <td>{reward.month}</td>
                        <td>{reward.year}</td>
                        <td>{reward.rewardPoints}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

UserMonthlyRewards.propTypes = {
    rewards: PropTypes.array.isRequired
};

export default UserMonthlyRewards;