import React from 'react';
import PropTypes from 'prop-types';

const UserMonthlyRewards = ({ monthlyData }) => (
    <div>
        <h2>User Monthly Rewards</h2>
        <table border="1" style={{margin: "0 auto"}}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>month</th>
                    <th>year</th>
                    <th>Reward Points</th>
                </tr>
            </thead>
            <tbody>
                {monthlyData.map((reward, index) => (
                    <tr key={index}>
                        <td>{reward.customerName}</td>
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
    monthlyData: PropTypes.array.isRequired
};

export default UserMonthlyRewards;