# MetaWill

<img src="frontend/public/logo.png" alt="MetaWill Logo" width="120"/>

MetaWill is a Web3 platform designed to help users fulfill their commitments by leveraging financial incentives and transparent blockchain-based validation mechanisms on the Linea network.

## Overview

MetaWill enables users to create blockchain-backed commitments, where they stake funds as collateral to ensure they follow through on their promises. If commitments are fulfilled (validated by trusted validators), users receive their funds back. If not, the funds are donated to selected charitable causes.

## Key Features

- **Blockchain Commitments**: Create binding commitment contracts with specific goals and deadlines
- **Financial Incentives**: Deposit funds as collateral to motivate commitment fulfillment
- **Transparent Validation**: Third-party validation through a decentralized system
- **Social Impact**: Unclaimed funds from unfulfilled commitments are donated to selected charities
- **Wallet Integration**: Seamless connection with MetaMask and support for Linea networks

## Technologies

### Frontend

- **Framework**: Next.js 15 with App Router
- **UI**: Tailwind CSS v4 with custom theme configuration
- **State Management**: React Hooks
- **Wallet Integration**: Wagmi, Viem, MetaMask SDK

### Blockchain

- **Network**: Linea (Mainnet and Sepolia Testnet)
- **Smart Contracts**: Solidity (coming soon)
- **Web3 Integration**: Wagmi, Viem

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask wallet extension

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/MetaWill.git
cd MetaWill
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
metawill/
├── frontend/               # Next.js frontend application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── app/            # Next.js App Router pages
│   │   ├── components/     # Reusable UI components
│   │   ├── lib/            # Utility functions and configurations
│   │   └── ...
│   ├── tailwind.config.ts  # Tailwind CSS configuration
│   └── ...
├── contracts/              # Smart contracts (coming soon)
└── ...
```

## Connecting to Linea

MetaWill is built on the Linea blockchain network. To interact with the application:

1. Install MetaMask browser extension
2. Connect your wallet using the "Connect Wallet" button
3. Switch to Linea Mainnet or Linea Sepolia (testnet) when prompted

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Linea](https://linea.build/) - Layer 2 blockchain solution
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Wagmi](https://wagmi.sh/) - React Hooks for Ethereum
