# MetaWill Smart Contracts

<img src="../frontend/public/mascott2.png" alt="MetaWill Logo" width="120"/>

Smart contract implementation for MetaWill, a decentralized platform for creating and managing personal commitments with financial accountability on the **Base** blockchain.

## Overview

The MetaWill smart contracts provide the blockchain foundation for the MetaWill platform, enabling users to:

- Create binding commitments with financial stakes in **USDC**
- Assign validators to verify commitment completion
- Automate fund distribution based on commitment outcomes
- Track commitment history and statistics

## Contract Architecture

The project uses a factory pattern with three main contracts:

1.  **`MetaWillFactory`**: Central registry that manages the creation and tracking of all commitment contracts.
2.  **`MetaWillCommitment`**: Individual commitment contracts created for each user commitment.
3.  **`MetaWillDonation`**: Handles the donation logic, now adapted for USDC.

## Key Features

- **Commitment Creation**: Users can create commitments with **USDC** stakes.
- **Validation System**: Third-party validators can confirm commitment completion.
- **Fund Management**: Automated handling of staked **USDC** based on commitment outcomes.
- **Donation Integration**: Failed commitments result in the stake being transferred to a chosen donation contract.

## Development Environment

This project uses [Foundry](https://book.getfoundry.sh/), a fast and flexible Ethereum development toolkit.

### Prerequisites

- [Foundry](https://book.getfoundry.sh/)
- Solidity ^0.8.20

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/yourusername/metawill.git
    cd metawill/contract
    ```

2.  Install dependencies (Foundry will often handle this automatically with `forge build`):

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

### Deploy to Base Sepolia

1.  **Set up environment variables**:

    Create a `.env` file in this directory (`/contract`) with the following content:

    ```env
    # Your deployer wallet's private key (must have Base Sepolia ETH for gas)
    PRIVATE_KEY=YOUR_PRIVATE_KEY_HERE

    # Base Sepolia USDC Address
    USDC_ADDRESS=0x0DB1C29b18398bf3a00209c185a4F972eBaA1F63

    # Your RPC URL for Base Sepolia (e.g., from Alchemy, Infura)
    BASE_SEPOLIA_RPC_URL=YOUR_BASE_SEPOLIA_RPC_URL_HERE

    # Your Basescan API Key for contract verification
    ETHERSCAN_API_KEY=YOUR_BASESCAN_API_KEY_HERE
    ```

2.  **Run the deployment script**:

    ```bash
    forge script script/Deploy.s.sol:DeployScript --rpc-url $BASE_SEPOLIA_RPC_URL --broadcast --verify -vvvv
    ```

## Deployed Contracts (Base Sepolia)

- **MetaWill Factory**: `0xbc2640EB9F38ccf70876a7A5A91d2a91d6072a3D`
- **Donation Option 1**: `0xFd91fe35d280eF6aA1092b1794F2B84DB002E180`
- **Donation Option 2**: `0x5376FB433b18F2445D2f34C1f8197Cc293C6eAaD`
- **Donation Option 3**: `0xB49c145192dAbf316b72D4cD18e260B3D59be2e5`
- **USDC (Base Sepolia)**: `0x0DB1C29b18398bf3a00209c185a4F972eBaA1F63`

## Security Considerations

- The contracts have been developed with security best practices in mind
- All functions that handle funds implement proper access controls
- Commitment validation requires confirmation from the assigned validator

## License

This project is licensed under the MIT License.
