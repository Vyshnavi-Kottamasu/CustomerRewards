import React, { useState, useEffect } from "react";
import UserMonthlyRewards from "./UserMonthlyRewards";
import TotalRewards from "./TotalRewards";
import TransactionsTable from "./TransactionsTable";

const fetchUserMonthlyRewards = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { customerId: 1, name: "John Doe", month: "January", year: 2024, rewardPoints: 0 },
                { customerId: 1, name: "John Doe", month: "February", year: 2024, rewardPoints: 0 },
                { customerId: 2, name: "Jane Smith", month: "January", year: 2024, rewardPoints: 0 },
                { customerId: 2, name: "Jane Smith", month: "February", year: 2024, rewardPoints: 0 },
            ]);
        }, 1000);
    });
};

const fetchTotalRewards = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { name: "John Doe", rewardPoints: 0 },
                { name: "Jane Smith", rewardPoints: 0 },
            ]);
        }, 1000);
    });
};

const fetchTransactions = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { transactionId: 1, customerName: "John Doe", purchaseDate: "2024-01-15", productPurchased: "Laptop", price: 120, rewardPoints: 0 },
                { transactionId: 2, customerName: "John Doe", purchaseDate: "2024-02-20", productPurchased: "Phone", price: 110, rewardPoints: 0 },
                { transactionId: 3, customerName: "John Doe", purchaseDate: "2024-02-21", productPurchased: "Phone", price: 51, rewardPoints: 0 },
                { transactionId: 4, customerName: "John Doe", purchaseDate: "2024-02-22", productPurchased: "Phone", price: 10, rewardPoints: 0 },
                { transactionId: 5, customerName: "Jane Smith", purchaseDate: "2024-01-20", productPurchased: "Phone", price: 85, rewardPoints: 0 },
                { transactionId: 6, customerName: "Jane Smith", purchaseDate: "2024-01-10", productPurchased: "Tablet", price: 200, rewardPoints: 0 },
            ]);
        }, 1000);
    });
};





const RewardsProgram = () => {
    const [userMonthlyRewards, setUserMonthlyRewards] = useState([]);
    const [totalRewards, setTotalRewards] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const [monthlyRewards, totals, transactionData] = await Promise.all([
                fetchUserMonthlyRewards(),
                fetchTotalRewards(),
                fetchTransactions(),
            ]);

            const updatedTransactions = transactionData.map((txn) => {
                const points = calculatePoints(txn.price);
                return { ...txn, rewardPoints: points };
            });

            const updatedMonthlyRewards = monthlyRewards.map((reward) => {
                const monthlyPoints = updatedTransactions
                    .filter(
                        (txn) => (txn.customerName === reward.name) && (new Date(txn.purchaseDate).toLocaleString('default', { month: 'long' }) === (reward.month))
                    )
                    .reduce((sum, txn) => sum + txn.rewardPoints, 0);

                return { ...reward, rewardPoints: monthlyPoints };
            });

         
            const updatedTotalRewards = totals.map((total) => {
                const totalPoints = updatedMonthlyRewards
                    .filter((mon) => mon.name === total.name)
                    .reduce((sum, mon) => sum + mon.rewardPoints, 0);

                return { ...total, rewardPoints: totalPoints };
            });

            setTransactions(updatedTransactions);
            setUserMonthlyRewards(updatedMonthlyRewards);
            setTotalRewards(updatedTotalRewards);
            setLoading(false);
        };

        fetchData();
    }, []);

    const calculatePoints = (amount) => {
        var points = 0
        if(amount > 100){
            points = 2 * (amount - 100)
            amount = 100
        }
        if (amount > 50){
            points += (amount - 50);
        }
        return points;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Customer Rewards Program</h1>
            <UserMonthlyRewards rewards={userMonthlyRewards} />
            <TotalRewards totals={totalRewards} />
            <TransactionsTable transactions={transactions} />
        </div>
    );
};

export default RewardsProgram;
