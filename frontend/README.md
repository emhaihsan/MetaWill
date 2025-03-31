# MetaWill Frontend

<img src="public/mascott.png" alt="MetaWill Logo" width="120"/>

The frontend application for MetaWill, a decentralized platform for creating and managing personal commitments with financial accountability on the Linea blockchain.

## Overview

This Next.js application provides the user interface for MetaWill, allowing users to:

- Create new commitments with ETH stakes
- View and manage their active and past commitments
- Validate commitments as a third-party validator
- Track commitment progress and outcomes
- Connect with the Linea blockchain through their wallet

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI Components**: Tailwind CSS with shadcn/ui
- **State Management**: React Hooks
- **Blockchain Integration**:
  - Wagmi for React hooks
  - Viem for Ethereum interactions
  - Custom API endpoints for contract interaction
- **Authentication**: Wallet-based authentication

## Project Structure

```
frontend/
├── public/             # Static assets
├── src/
│   ├── abi/            # Contract ABIs
│   ├── app/            # Next.js app router pages
│   │   ├── api/        # API routes for blockchain interaction
│   │   ├── dashboard/  # Dashboard and commitment management pages
│   │   └── ...         # Other pages
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utility functions and configurations
├── .env                # Environment variables (create from .env.example)
└── ...                 # Configuration files
```

## Key Features

- **Dashboard**: Central hub showing active commitments, past commitments, and validation requests
- **Commitment Creation**: Form-based interface for creating new commitments
- **Validation Interface**: Tools for validators to review and confirm commitment completion
- **Commitment Details**: Detailed view of individual commitments with status updates
- **Wallet Integration**: Seamless connection with MetaMask and other wallets

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask or compatible wallet with Linea Sepolia testnet configured

### Installation

1. Clone the repository and navigate to the frontend directory:

```bash
git clone https://github.com/yourusername/metawill.git
cd metawill/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file based on `.env.example` and add your configuration:

```
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_WALLET_CONNECT_ID=your_wallet_connect_id
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## API Endpoints

The frontend includes several API endpoints to interact with the blockchain:

- `/api/read-contract`: Read data from smart contracts
- `/api/commitment-details`: Get detailed information about specific commitments
- `/api/write-contract`: Write data to smart contracts (create commitments, report completion, etc.)

## Build for Production

```bash
npm run build
npm run start
```

## Testing

```bash
npm run test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
