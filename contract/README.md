# MetaWill Smart Contracts

<img src="../frontend/public/mascott2.png" alt="MetaWill Logo" width="120"/>

Smart contract implementation for MetaWill, a decentralized platform for creating and managing personal commitments with financial accountability on the Linea blockchain.

## Overview

The MetaWill smart contracts provide the blockchain foundation for the MetaWill platform, enabling users to:

- Create binding commitments with financial stakes
- Assign validators to verify commitment completion
- Automate fund distribution based on commitment outcomes
- Track commitment history and statistics

## Contract Architecture

The project uses a factory pattern with two main contracts:

1. **MetaWillFactory**: Central registry that manages the creation and tracking of all commitment contracts
2. **MetaWillCommitment**: Individual commitment contracts created for each user commitment

## Key Features

- **Commitment Creation**: Users can create commitments with ETH stakes
- **Validation System**: Third-party validators can confirm commitment completion
- **Fund Management**: Automated handling of staked ETH based on commitment outcomes
- **Tracking & Statistics**: Functions to track user and validator commitments

## Contract Functions

### MetaWillFactory

- `createCommitment`: Creates a new commitment contract
- `getUserCommitments`: Returns all commitments created by a user
- `getValidatorCommitments`: Returns all commitments assigned to a validator
- `getTotalCommitments`: Returns the total number of commitments created
- `allCommitments`: Returns a list of all commitment contracts

### MetaWillCommitment

- `reportCompletion`: User reports that a commitment has been completed
- `validateCompletion`: Validator confirms commitment completion
- `refundStake`: Returns stake to user after successful completion
- `donateStake`: Donates stake to charity if commitment fails

## Development Environment

This project uses [Foundry](https://book.getfoundry.sh/), a fast and flexible Ethereum development toolkit.

### Prerequisites

- [Foundry](https://book.getfoundry.sh/)
- Solidity 0.8.19+

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/metawill.git
cd metawill/contract
```

2. Install Foundry:

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

3. Install dependencies:

```bash
forge install
```

### Build

```bash
forge build
```

### Test

```bash
forge test
```

### Deploy

1. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your private key and RPC URL
```

2. Deploy to Linea Sepolia testnet:

```bash
forge script script/DeployMetaWill.s.sol:DeployMetaWill --rpc-url $LINEA_SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast
```

## Contract Addresses

- **Linea Sepolia Testnet**:
  - MetaWillFactory: `0x...` (replace with actual address)

## Security Considerations

- The contracts have been developed with security best practices in mind
- All functions that handle funds implement proper access controls
- Commitment validation requires confirmation from the assigned validator

## License

This project is licensed under the MIT License.
