import { useReadContract, useWriteContract } from 'wagmi';
import { CONTRACT_ADDRESSES } from '../lib/contract-config';
import MetaWillFactoryABI from '../abi/MetaWillFactory.json';
import MetaWillCommitmentABI from '../abi/MetaWillCommitment.json';
import { Address } from 'viem';

// Hook untuk membaca data dari kontrak factory
export function useMetaWillFactory() {
  // Fungsi untuk membuat komitmen baru
  const { writeContract, isPending: isCreating } = useWriteContract();

  const createNewCommitment = async (
    title: string,
    description: string,
    deadline: number,
    validator: Address,
    donationAddressIndex: number,
    stakeAmount: bigint
  ) => {
    return writeContract({
      address: CONTRACT_ADDRESSES.FACTORY,
      abi: MetaWillFactoryABI,
      functionName: 'createCommitment',
      args: [title, description, deadline, validator, donationAddressIndex],
      value: stakeAmount,
    });
  };

  return {
    createNewCommitment,
    isCreating,
  };
}

// Hook untuk mendapatkan daftar donasi
export function useDonationAddresses() {
  // Definisikan tipe data yang diharapkan dari getDonationAddresses
  type DonationAddressesResult = [Address[], string[]];

  const { data, isLoading, error, refetch } = useReadContract({
    address: CONTRACT_ADDRESSES.FACTORY,
    abi: MetaWillFactoryABI,
    functionName: 'getDonationAddresses',
  });

  // Pastikan data memiliki tipe yang benar
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
  const { data, isLoading, error, refetch } = useReadContract({
    address: CONTRACT_ADDRESSES.FACTORY,
    abi: MetaWillFactoryABI,
    functionName: 'getUserCommitments',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress,
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
  const { data, isLoading, error, refetch } = useReadContract({
    address: CONTRACT_ADDRESSES.FACTORY,
    abi: MetaWillFactoryABI,
    functionName: 'getValidatorCommitments',
    args: validatorAddress ? [validatorAddress] : undefined,
    query: {
      enabled: !!validatorAddress,
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
  // Fungsi untuk mendapatkan detail komitmen
  const { data, isLoading, error, refetch } = useReadContract({
    address: commitmentAddress,
    abi: MetaWillCommitmentABI,
    functionName: 'getCommitmentDetails',
    query: {
      enabled: !!commitmentAddress,
    },
  });

  // Fungsi untuk melaporkan keberhasilan oleh creator
  const { writeContract: reportSuccess, isPending: isReporting } = useWriteContract();

  const reportCommitmentSuccess = async () => {
    if (!commitmentAddress) return;
    
    return reportSuccess({
      address: commitmentAddress,
      abi: MetaWillCommitmentABI,
      functionName: 'reportSuccess',
    });
  };

  // Fungsi untuk validator mengkonfirmasi keberhasilan
  const { writeContract: validateCompletion, isPending: isValidating } = useWriteContract();

  const validateCommitmentCompletion = async (isSuccessful: boolean) => {
    if (!commitmentAddress) return;
    
    return validateCompletion({
      address: commitmentAddress,
      abi: MetaWillCommitmentABI,
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
    isReporting,
    isValidating,
  };
}