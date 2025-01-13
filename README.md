# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Rewards Calculation System:
This project calculates customer reward points based on their transactions and provides insights into monthly and quarterly rewards.

Features:
Transaction-Based Reward Calculation: Calculates reward points based on transaction amounts.
Monthly Rewards: Displays reward points for each customer per month.
Quarterly Rewards: Displays the total reward points for each customer over the last three months.

Process:

1. Calculate the reward points for each transaction and update it in the transaction array(state variable). The reward calculation is based on the following rules:
   =>No points for amounts ≤ $50.
   =>1 point for every dollar spent above $50.
   =>An additional 1 point for every dollar spent above $100.

2. Compute reward points on a monthly and quarterly basis by populating an empty object with key-value pairs. The 'key' represents a unique identifier containing all customer details to be displayed in the table, while the 'value' holds the reward points.

Below are few variables used in fetchRewardsData():
=>updatedTransactions: List of all transactions with reward points.
=>Monthly Rewards: Total rewards per customer per month.
=>Quarterly Rewards: Total rewards for the last three months, grouped by customer.
=>monthlyRewardsTable: Array of monthly rewards.
=>quarterlyRewardsTable: Array of quarterly rewards for the last three months.

3. Create a UI with 3 tabs, where each tab displays a different table. Clicking on a tab dynamically loads and displays the corresponding table content. Each tab is dedicated to one table, allowing users to switch between views seamlessly.

4. Create a RewardContent component that dynamically renders the DataTable component. The RewardContent component passes the selected tab details and the corresponding data to the DataTable component based on the user's selection.

5. Installed prop-types for prop validation and ESLint for code formatting.

6. Test cases are written using Jest.
