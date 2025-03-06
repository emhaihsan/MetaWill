# iPROMISE: Web3 Commitment Platform

iPROMISE is a decentralized platform that leverages blockchain technology to enable users to create and fulfill personal commitments with financial accountability. Users stake Ethereum as collateral, which is either returned upon successful completion or donated to charity if the commitment is not fulfilled.

## Key Features

- **Wallet-Based Authentication**: Users connect their Ethereum wallet to access the platform.
- **Commitment Creation**: Users can create detailed commitments with financial stakes.
- **Validator Selection**: Users assign a trusted validator for their commitments.
- **Financial Staking Mechanism**: Ethereum is locked as collateral for commitments.
- **Commitment Validation Process**: Two-party verification system for commitment completion.
- **Outcome Processing**: Automatic handling of funds based on commitment outcome.
- **User Dashboard**: Central interface for managing commitments.
- **Donation Mechanism**: Handles failed commitment stakes with predefined donation addresses.

## Technical Overview

- **Frontend**: React-based application with RainbowKit integration for wallet connection.
- **Backend/Blockchain**: Ethereum blockchain integration with IPFS for storing commitment details.
- **Smart Contracts**: Solidity-based contracts for commitment management and fund distribution.

## Getting Started

1. **Connect Wallet**: Use RainbowKit to connect your Ethereum wallet.
2. **Create a Commitment**: Enter details, set a deadline, and specify a stake.
3. **Assign a Validator**: Designate a validator for your commitment.
4. **Monitor Progress**: Keep track of your commitments via the user dashboard.
5. **Complete or Fail**: Upon deadline, validators verify the outcome, and funds are processed accordingly.
