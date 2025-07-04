# MetaWill

MetaWill is a decentralized application (dApp) that helps you commit to your goals by putting your crypto on the line. If you succeed, you get your money back. If you fail, your money is donated to a cause you care about.

This project runs on the **Base Sepolia testnet** and uses **USDC** for all commitments.

---

## How It Works

1.  **Create a Commitment**: Define a goal you want to achieve. This could be anything from "finish a project by Friday" to "go to the gym three times a week."
2.  **Set the Stakes**: You decide how much USDC you want to stake as collateral. This amount is held in a smart contract.
3.  **Assign a Validator**: Choose a trusted friend or colleague (using their wallet address) to verify whether you completed your goal.
4.  **Achieve Your Goal**: Once you've done what you promised, you report it in the app.
5.  **Get Validated**: Your validator confirms your success.

- **If you succeed**, the smart contract returns your staked USDC to your wallet.
- **If you fail** (or your validator says you did), your staked USDC is automatically sent to a donation address you chose during setup.

## Key Features

- **On-Chain Accountability**: All commitments and validations are recorded on the blockchain, making the process transparent and tamper-proof.
- **Real Financial Incentive**: Using USDC as a stake creates a powerful motivation to follow through on your goals.
- **Simple User Interface**: A clean and easy-to-use dashboard to create, track, and validate commitments.
- **Donation on Failure**: Turn failure into a positive outcome by supporting a good cause.

## Tech Stack

This project is built with the following technologies:

- **Blockchain**: Base Sepolia Testnet
- **Smart Contracts**:
  - Solidity
  - Foundry (for development, testing, and deployment)
  - OpenZeppelin Contracts
- **Frontend**:
  - Next.js (App Router)
  - React & TypeScript
  - Tailwind CSS
  - Wagmi & Viem for wallet interaction

## Project Structure

```
/MetaWill
├── /contract/      # Solidity smart contracts and tests
├── /frontend/      # Next.js frontend application
└── README.md       # You are here
```

### Contract Details

- **Network**: Base Sepolia
- **USDC Token Address**: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
- **MetaWillFactory Contract**: `0xdf86d9E5c1F084e38759593a979BE83F01a6d7F8`

This factory contract is responsible for creating and managing all individual commitment contracts.
