import React, { useState, useEffect } from "react";
import UserMonthlyRewards from "../UserMonthlyRewardsTable";
import TotalRewards from "../TotalRewardsTable";
import TransactionsTable from "../TransactionsTable";

//Main function
const RewardsProgram = () => {
    const [monthlyRewards, setMonthlyRewards] = useState([]);
    const [totalRewards, setTotalRewards] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    //Loading the data and storing it in state variables
    useEffect(() => {
        const fetchData = async () => {
            try{
            const [monthlyRewardsJson, totalRewardsJson, transactionDataJson] = await Promise.allSettled([
                fetch('/data/monthlyRewards.json'),
                fetch('/data/totalRewards.json'),
                fetch('/data/transactions.json'),
            ]);

            const [monthlyRewardsData, totalRewardsData, transactionsData] = await Promise.allSettled([
                monthlyRewardsJson.json(),
                totalRewardsJson.json(),
                transactionDataJson.json(),
              ]);

            //Calculating points for transaction table and storing in "updatedTransactions" variable
            const updatedTransactions = transactionsData.map((txn) => {
                const points = calculatePoints(txn.price);
                return { ...txn, rewardPoints: points };
            });

            //Calculating monthly reward points for each customer every month based on the transaction table's updated data
            const updatedMonthlyRewards = monthlyRewardsData.map((reward) => {
                const monthlyPoints = updatedTransactions
                    .filter(
                        (txn) => (txn.customerName === reward.name) && (new Date(txn.purchaseDate).toLocaleString('default', { month: 'long' }) === reward.month) && (new Date(txn.purchaseDate).getFullYear() === reward.year)
                    )
                    .reduce((sum, txn) => sum + txn.rewardPoints, 0);

                return { ...reward, rewardPoints: monthlyPoints };
            });

            //Calculating total rewards for every customer
            const updatedTotalRewards = totalRewardsData.map((total) => {
                const totalPoints = updatedMonthlyRewards
                    .filter((mon) => mon.name === total.name)
                    .reduce((sum, mon) => sum + mon.rewardPoints, 0);

                return { ...total, rewardPoints: totalPoints };
            });
       
            //Updating the updated values in state variables
            setTransactions(updatedTransactions);
            setMonthlyRewards(updatedMonthlyRewards);
            setTotalRewards(updatedTotalRewards);
            setLoading(false);
        }
        catch(e){
            console.log("Error", e)
        }

        };

        fetchData();
    }, []);

    //function to calculate the reward points based on transaction amount
    const calculatePoints = (amt) => {
        var points = 0
        var amount = Math.round(amt)
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
            <UserMonthlyRewards rewards={monthlyRewards} />
            <TotalRewards totals={totalRewards} />
            <TransactionsTable transactions={transactions} />
        </div>
    );
};

export default RewardsProgram;
