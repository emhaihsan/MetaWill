# iPROMISE: Web3 Commitment Platform

iPROMISE is a decentralized platform that leverages blockchain technology to enable users to create and fulfill personal commitments with financial accountability. Users stake Ethereum as collateral, which is either returned upon successful completion or donated to charity if the commitment is not fulfilled.

## Key Features

- **Wallet-Based Authentication**: Connect your Ethereum wallet to access the platform
- **Commitment Creation**: Create detailed commitments with financial stakes
- **Single Validator System**: Assign one trusted validator to verify your commitment completion
- **Financial Staking Mechanism**: Lock Ethereum as collateral for commitments
- **Commitment Validation**: Simplified validation process with one validator per commitment
- **User Dashboard**: Central interface for managing active and past commitments
- **Validation Page**: Dedicated area to review and validate commitments assigned to you
- **User Profile**: Manage your personal information and notification preferences

## Current Implementation

The frontend of iPROMISE is built with Next.js 15 and includes the following pages:

- **Home Page**: Landing page with information about the platform
- **Dashboard**: View your active and past commitments
- **Create Commitment**: Form to create new commitments with multi-step process
- **Validate**: Review and respond to validation requests assigned to you
- **Profile**: Manage your personal information and settings

## Technical Stack

- **Frontend**:
  - Next.js 15.2.1
  - React 19
  - Tailwind CSS 4
  - RainbowKit 2.2.4 for wallet connection
  - Wagmi 2.14.12 for Ethereum interactions
  - TypeScript 5

- **Smart Contracts**:
  - Solidity 0.8.20+
  - Foundry for development and testing

## Project Structure

The project is organized into two main directories:

- **`/frontend`**: Contains the Next.js web application
- **`/contracts`**: Contains the Solidity smart contracts

## Smart Contract Details

The iPROMISE smart contract implements the following core functionality:

- **Commitment Creation**: Users can create commitments with a title, description, deadline, and charity address while staking ETH
- **Validator Assignment**: Commitment creators can assign a single trusted validator to verify completion
- **Validation Process**: Validators can approve or reject commitment completion
- **Stake Management**: Upon approval, 99% of the stake is returned to the user (1% platform fee)
- **Charity Donation**: Upon rejection, 99% of the stake is donated to the specified charity
- **Cancellation**: Users can cancel commitments before a validator is assigned
- **Force Completion**: After deadline, commitments without validation are automatically marked as failed

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- An Ethereum wallet (MetaMask, Coinbase Wallet, etc.)
- Foundry (for smart contract development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ipromise.git
   cd ipromise
   ```

2. Install and run the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

4. To work with the smart contracts:
   ```bash
   cd contracts
   forge build
   forge test
   ```

## Current Status

- The frontend UI is functional with mock data
- Smart contracts have been developed and tested
- Single validator model implemented for simpler commitment validation
- The application uses a responsive design that works on mobile and desktop

## Next Steps

- Integrate frontend with smart contracts
- Add IPFS integration for storing commitment details
- Implement real-time notifications
- Add support for multiple blockchains
- Deploy to testnet and mainnet

## License

This project is licensed under the MIT License
