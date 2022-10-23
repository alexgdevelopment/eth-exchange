# ETH-Exchange

A demo application that displays available ETH and NEXO balances, given a MetaMask extension is installed and the user has an account connected.

## Setup

### Clone the repo and cd into the folder

```bash
git clone git@github.com:alexgdevelopment/eth-exchange.git
cd eth-exchange
```

### Install Node and NPM via NVM

#### Install NVM

For the most up-to-date guide follow the instructions [here](https://github.com/nvm-sh/nvm#installing-and-updating).

#### Install the version of node specified in the `.nvmrc` file and switch to it

```bash
nvm install
nvm use
```

### Install dependencies

```bash
npm ci
```

### Set .env vars

```bash
cp .env.example .env
```

If using a local network, make sure that it is running, for instance:

```bash
npx hardhat node
```

### Done!

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
