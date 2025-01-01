import React from 'react';
import PropTypes from 'prop-types';

const InitialCustomerRewards = ({ customer }) => {

    const calculatePoints = (amount) => {
        let points = 0;
        if (amount > 100) {
            points += 2 * (amount - 100);
            amount = 100;
        }
        if (amount > 50) {
            points += 1 * (amount - 50);
        }
        return points;
    };

    const calculateRewards = (transactions) => {
        const monthlyRewards = {};
        let totalRewards = 0;

        transactions.forEach(({ month, amount }) => {
            const points = calculatePoints(amount);
            totalRewards += points;
            monthlyRewards[month] = points;
        });
        return { monthlyRewards, totalRewards };
    };

    const { monthlyRewards, totalRewards } = calculateRewards(customer.transactions);

    return (
        <div>
            <h2>{customer.name}</h2>
            <table>
                {Object.entries(monthlyRewards).map(([month, points]) => 
                <tr key={month}>
                    <td key={month}>
                        {month}: {points} points
                    </td>
                </tr>                    
                )}
            </table>
            <strong>Total Rewards: {totalRewards} points</strong>
        </div>
    );
};

InitialCustomerRewards.propTypes = {
    customer: PropTypes.object
};

export default InitialCustomerRewards