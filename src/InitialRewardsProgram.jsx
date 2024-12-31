import React, { useState, useEffect } from "react";
import InitialCustomerRewards from "./InitialCustomerRewards";

const fetchTransactions = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { customerId: 1, name: "John Doe", transactions: [
                    { month: "January", amount: 120.50 },
                    { month: "February", amount: 110 },
                    { month: "March", amount: 45 },
                ] },
                { customerId: 2, name: "Jane Smith", transactions: [
                    { month: "January", amount: 50 },
                    { month: "February", amount: 150 },
                    { month: "March", amount: 200 },
                ] },
            ]);
        }, 1000);
    });
};

const InitialRewardsProgram = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTransactions = async () => {
            const data = await fetchTransactions();
            setCustomers(data);
            setLoading(false);
        };

        getTransactions();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Customer Rewards Program</h1>
            {customers.map((customer) => (
                <InitialCustomerRewards key={customer.customerId} customer={customer} />
            ))}
        </div>
    );
};

export default InitialRewardsProgram;
