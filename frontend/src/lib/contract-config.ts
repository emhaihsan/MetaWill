// Alamat kontrak yang sudah di-deploy di Linea Sepolia
import { Address } from 'viem';

export const CONTRACT_ADDRESSES: {
  FACTORY: Address;
  DONATION_1: Address;
  DONATION_2: Address;
  DONATION_3: Address;
  USDC_TOKEN: Address;
} = {
  FACTORY: "0xbc2640EB9F38ccf70876a7A5A91d2a91d6072a3D",
  DONATION_1: "0xFd91fe35d280eF6aA1092b1794F2B84DB002E180",
  DONATION_2: "0x5376FB433b18F2445D2f34C1f8197Cc293C6eAaD",
  DONATION_3: "0xB49c145192dAbf316b72D4cD18e260B3D59be2e5",
  USDC_TOKEN: "0x0DB1C29b18398bf3a00209c185a4F972eBaA1F63"
};
  
// Chain ID untuk Linea Sepolia
export const CHAIN_ID = 84532;
