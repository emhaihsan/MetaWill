# MetaWill Frontend

This is the frontend for the MetaWill dApp, built with Next.js, TypeScript, and Tailwind CSS. It interacts with the MetaWill smart contracts on the Base Sepolia testnet.

---

## Features

- **Wallet Connection**: Connect your wallet using the **MetaMask SDK** .
- **Dashboard**: A central place to view all your active, completed, and failed commitments.
- **Create Commitments**: An easy-to-use, multi-step form to create a new commitment.
- **Validation**: A dedicated page for validators to see and act on pending validation requests.

## Getting Started

Follow these instructions to run the frontend application on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [Yarn](https://yarnpkg.com/)
- A web3 wallet like [MetaMask](https://metamask.io/)

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/MetaWill.git
    cd MetaWill/frontend
    ```

2.  **Install dependencies**:

    ```bash
    yarn install
    ```

3.  **Set up environment variables**:

    Create a file named `.env.local` in the `frontend` directory and add the following variables. You need a WalletConnect Cloud project ID to enable wallet connections.

    ```
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="YOUR_WALLETCONNECT_PROJECT_ID"
    ```

    You can get a `PROJECT_ID` from [WalletConnect Cloud](https://cloud.walletconnect.com/).

4.  **Run the development server**:

    ```bash
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Important Notes

- **Network**: The app is hardcoded to work with the **Base Sepolia testnet**. Please ensure your wallet is connected to this network.
- **USDC**: You will need Base Sepolia USDC to create commitments. You can get some from a faucet.

## Tech Stack & Libraries

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Blockchain Interaction**: [Wagmi](https://wagmi.sh/) & [Viem](https://viem.sh/), using the **MetaMask SDK** for wallet connections.
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Date Management**: [date-fns](https://date-fns.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
