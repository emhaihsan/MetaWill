import { useReadContract, useWriteContract, useChainId } from 'wagmi';
import { contractConfig } from '../lib/contract-config';
import { Address } from 'viem';

// Hook untuk interaksi dengan kontrak factory
export function useMetaWillFactory() {
  const chainId = useChainId();
  const config = contractConfig[chainId];

  const { writeContractAsync, isPending: isExecuting } = useWriteContract();

  const createNewCommitment = async (
    title: string,
    description: string,
    deadline: number,
    validator: Address,
    donationAddressIndex: number,
    stakeAmount: bigint
  ) => {
    if (!config) {
      throw new Error('Unsupported network. Please switch to a supported network.');
    }

    // Step 1: Approve the factory to spend USDC
    await writeContractAsync({
      address: config.usdc.address,
      abi: config.usdc.abi,
      functionName: 'approve',
      args: [config.metaWillFactory.address, stakeAmount],
    });

    // Step 2: Create the commitment
    return writeContractAsync({
      address: config.metaWillFactory.address,
      abi: config.metaWillFactory.abi,
      functionName: 'createCommitment',
      args: [title, description, deadline, validator, donationAddressIndex, stakeAmount],
    });
  };

  return {
    createNewCommitment,
    isCreating: isExecuting,
  };
}

// Hook untuk mendapatkan daftar donasi
export function useDonationAddresses() {
  const chainId = useChainId();
  const config = contractConfig[chainId];

  type DonationAddressesResult = [Address[], string[]];

  const { data, isLoading, error, refetch } = useReadContract({
    address: config?.metaWillFactory.address,
    abi: config?.metaWillFactory.abi,
    functionName: 'getDonationAddresses',
    query: {
      enabled: !!config,
    },
  });

  const typedData = data as DonationAddressesResult | undefined;

  return {
    donationAddresses: typedData ? typedData[0] : [],
    donationNames: typedData ? typedData[1] : [],
    isLoading,
    error,
    refetch,
  };
}

// Hook untuk mendapatkan komitmen user
export function useUserCommitments(userAddress?: Address) {
  const chainId = useChainId();
  const config = contractConfig[chainId];

  const { data, isLoading, error, refetch } = useReadContract({
    address: config?.metaWillFactory.address,
    abi: config?.metaWillFactory.abi,
    functionName: 'getUserCommitments',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress && !!config,
    },
  });

  return {
    commitments: data as Address[] | undefined,
    isLoading,
    error,
    refetch,
  };
}

// Hook untuk mendapatkan komitmen validator
export function useValidatorCommitments(validatorAddress?: Address) {
  const chainId = useChainId();
  const config = contractConfig[chainId];

  const { data, isLoading, error, refetch } = useReadContract({
    address: config?.metaWillFactory.address,
    abi: config?.metaWillFactory.abi,
    functionName: 'getValidatorCommitments',
    args: validatorAddress ? [validatorAddress] : undefined,
    query: {
      enabled: !!validatorAddress && !!config,
    },
  });

  return {
    commitments: data as Address[] | undefined,
    isLoading,
    error,
    refetch,
  };
}

// Hook untuk interaksi dengan kontrak commitment
export function useMetaWillCommitment(commitmentAddress?: Address) {
  const chainId = useChainId();
  const config = contractConfig[chainId];

  const { data, isLoading, error, refetch } = useReadContract({
    address: commitmentAddress,
    abi: config?.metaWillCommitment.abi,
    functionName: 'getCommitmentDetails',
    query: {
      enabled: !!commitmentAddress && !!config,
    },
  });

  const { writeContractAsync, isPending: isExecutingTransaction } = useWriteContract();

  const reportCommitmentSuccess = async () => {
    if (!commitmentAddress || !config) return;
    
    return writeContractAsync({
      address: commitmentAddress,
      abi: config.metaWillCommitment.abi,
      functionName: 'reportSuccess',
    });
  };

  const validateCommitmentCompletion = async (isSuccessful: boolean) => {
    if (!commitmentAddress || !config) return;
    
    return writeContractAsync({
      address: commitmentAddress,
      abi: config.metaWillCommitment.abi,
      functionName: 'validateCompletion',
      args: [isSuccessful],
    });
  };

  return {
    commitmentDetails: data,
    isLoading,
    error,
    refetch,
    reportCommitmentSuccess,
    validateCommitmentCompletion,
    isReporting: isExecutingTransaction,
    isValidating: isExecutingTransaction,
  };
}