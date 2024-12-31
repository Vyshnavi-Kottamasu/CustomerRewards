

const TotalRewards = ({ totals }) => (
    <div>
        <h2>Total Rewards</h2>
        <table border="1">
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Reward Points</th>
                </tr>
            </thead>
            <tbody>
                {totals.map((total, index) => (
                    <tr key={index}>
                        <td>{total.name}</td>
                        <td>{total.rewardPoints}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default TotalRewards;