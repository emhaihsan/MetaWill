## iPROMISE Smart Contract

The iPROMISE platform allows users to make commitments, stake ETH, and have validators verify their commitment completion. This repository contains the Solidity smart contract and tests for the iPROMISE platform.

### Key Features

- **Create Commitments**: Users can create commitments by staking ETH and specifying a deadline.
- **Validator System**: Multiple validators can verify whether a commitment was completed successfully.
- **Charity Integration**: If a commitment fails, the staked ETH can go to a predefined charity.
- **Platform Fee**: A small platform fee is charged on completed or failed commitments.

## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy to Testnet

1. Create a `.env` file with your private key and RPC URL:

```
PRIVATE_KEY=your_private_key_here
RPC_URL=your_rpc_url_here
```

2. Source the environment variables:

```shell
$ source .env
```

3. Deploy the iPROMISE contract:

```shell
$ forge script script/IPROMISEDeploy.s.sol:IPROMISEDeployScript --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
```

## Contract Structure

- **IPROMISEContract.sol**: The main contract for the iPROMISE platform.
- **IPROMISEContract.t.sol**: Comprehensive tests for the iPROMISE contract.
- **IPROMISEDeploy.s.sol**: Deployment script for the contract.

## Integration with Frontend

To integrate with the frontend, you'll need:

1. The deployed contract address
2. The contract ABI (available in `out/IPROMISEContract.sol/IPROMISEContract.json` after building)

```javascript
// Example frontend integration with ethers.js
import { ethers } from 'ethers';
import IPROMISEContractABI from '../contracts/out/IPROMISEContract.sol/IPROMISEContract.json';

// Contract address from deployment
const contractAddress = '0x...';

// Connect to the contract
const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send('eth_requestAccounts', []);
const signer = provider.getSigner();
const ipromiseContract = new ethers.Contract(contractAddress, IPROMISEContractABI.abi, signer);

// Create a commitment
const createCommitment = async (title, description, deadline, charityAddress, validationsRequired) => {
  const tx = await ipromiseContract.createCommitment(
    title,
    description,
    deadline,
    charityAddress,
    validationsRequired,
    { value: ethers.utils.parseEther('0.1') } // 0.1 ETH stake
  );
  
  await tx.wait();
  return tx;
};
