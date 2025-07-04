import { Address, erc20Abi } from 'viem';
import { baseSepolia } from 'wagmi/chains';
import MetaWillFactoryABI from '../abi/MetaWillFactory.json';
import MetaWillCommitmentABI from '../abi/MetaWillCommitment.json';

const minimalErc20Abi = [
  { constant: true, inputs: [], name: 'name', outputs: [{ name: '', type: 'string' }], type: 'function' },
  { constant: false, inputs: [{ name: '_spender', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'approve', outputs: [{ name: '', type: 'bool' }], type: 'function' },
  { constant: true, inputs: [], name: 'totalSupply', outputs: [{ name: '', type: 'uint256' }], type: 'function' },
  { constant: false, inputs: [{ name: '_from', type: 'address' }, { name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'transferFrom', outputs: [{ name: '', type: 'bool' }], type: 'function' },
  { constant: true, inputs: [], name: 'decimals', outputs: [{ name: '', type: 'uint8' }], type: 'function' },
  { constant: true, inputs: [{ name: '_owner', type: 'address' }], name: 'balanceOf', outputs: [{ name: 'balance', type: 'uint256' }], type: 'function' },
  { constant: true, inputs: [], name: 'symbol', outputs: [{ name: '', type: 'string' }], type: 'function' },
  { constant: false, inputs: [{ name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'transfer', outputs: [{ name: '', type: 'bool' }], type: 'function' },
  { constant: true, inputs: [{ name: '_owner', type: 'address' }, { name: '_spender', type: 'address' }], name: 'allowance', outputs: [{ name: '', type: 'uint256' }], type: 'function' },
] as const;

const baseSepoliaConfig = {
  metaWillFactory: {
    address: "0xdf86d9E5c1F084e38759593a979BE83F01a6d7F8" as Address,
    abi: MetaWillFactoryABI,
  },
  metaWillCommitment: {
    abi: MetaWillCommitmentABI,
  },
  donation: {
    // These addresses are for the donation options
    address1: "0x60D07A4346040C20AE4c698B9DCa7AD92FdBA454" as Address,
    address2: "0xAb4da96960Ae0C7dd3dFeb06c858a42F82D7d7ec" as Address,
    address3: "0xC55157c0d032064e09F173aD08566f9031be44F5" as Address,
  },
  usdc: {
    address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as Address,
    abi: minimalErc20Abi,
  },
};

// Define a type for the config object that includes a numeric index signature
type ContractConfig = {
  [key: number]: typeof baseSepoliaConfig;
};

export const contractConfig: ContractConfig = {
  [baseSepolia.id]: baseSepoliaConfig,
  // You can add other network configs here in the future
  // e.g., [base.id]: baseMainnetConfig
};
