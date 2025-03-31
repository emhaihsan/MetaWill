// Alamat kontrak yang sudah di-deploy di Linea Sepolia
import { Address } from 'viem';

export const CONTRACT_ADDRESSES: {
  FACTORY: Address;
  DONATION_1: Address;
  DONATION_2: Address;
  DONATION_3: Address;
} = {
  FACTORY: "0x4A83D7f2E360F159925E9FD9feC9175dbDB2fcbD",
  DONATION_1: "0x3803d8099e9f78E05f0444e53f927083BE33375F",
  DONATION_2: "0xd427cc15dE0b1a1094cfC7FD88D5ED35e7e78555",
  DONATION_3: "0xD92f9783a08dd409cC7E93FA7fE7a4a0C821dD23"
};
  
// Chain ID untuk Linea Sepolia
export const CHAIN_ID = 59141;
