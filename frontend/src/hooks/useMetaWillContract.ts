import { useReadContract, useWriteContract } from 'wagmi';
import { CONTRACT_ADDRESSES } from '../lib/contract-config';
import MetaWillFactoryABI from '../abi/MetaWillFactory.json';
import MetaWillCommitmentABI from '../abi/MetaWillCommitment.json';
import { Address } from 'viem';

// Hook untuk membaca data dari kontrak factory
export function useMetaWillFactory() {
  // Fungsi untuk mendapatkan semua komitmen user
  const getUserCommitments = useReadContract({
    address: CONTRACT_ADDRESSES.FACTORY,
    abi: MetaWillFactoryABI,
    functionName: 'getUserCommitments',
  });

  // Fungsi untuk mendapatkan komitmen yang divalidasi user
  const getValidatorCommitments = useReadContract({
    address: CONTRACT_ADDRESSES.FACTORY,
    abi: MetaWillFactoryABI,
    functionName: 'getValidatorCommitments',
  });

  // Fungsi untuk membuat komitmen baru
  const { writeContract: createCommitment, isPending: isCreating } = useWriteContract();

  const createNewCommitment = (
    validator: Address,
    title: string,
    description: string,
    deadline: number,
    stakeAmount: bigint
  ) => {
    return createCommitment({
      address: CONTRACT_ADDRESSES.FACTORY,
      abi: MetaWillFactoryABI,
      functionName: 'createCommitment',
      args: [validator, title, description, deadline, stakeAmount],
      value: stakeAmount,
    });
  };

  return {
    getUserCommitments,
    getValidatorCommitments,
    createNewCommitment,
    isCreating,
  };
}

// Hook untuk interaksi dengan kontrak commitment
export function useMetaWillCommitment(commitmentAddress: Address) {
  // Fungsi untuk mendapatkan detail komitmen
  const getCommitmentDetails = useReadContract({
    address: commitmentAddress,
    abi: MetaWillCommitmentABI,
    functionName: 'getCommitmentDetails',
  });

  // Fungsi untuk melaporkan keberhasilan oleh creator
  const { writeContract: reportSuccess, isPending: isReporting } = useWriteContract();

  const reportCommitmentSuccess = () => {
    return reportSuccess({
      address: commitmentAddress,
      abi: MetaWillCommitmentABI,
      functionName: 'reportSuccess',
    });
  };

  // Fungsi untuk validator mengkonfirmasi keberhasilan
  const { writeContract: validateCompletion, isPending: isValidating } = useWriteContract();

  const validateCommitmentCompletion = (isSuccessful: boolean) => {
    return validateCompletion({
      address: commitmentAddress,
      abi: MetaWillCommitmentABI,
      functionName: 'validateCompletion',
      args: [isSuccessful],
    });
  };

  return {
    getCommitmentDetails,
    reportCommitmentSuccess,
    validateCommitmentCompletion,
    isReporting,
    isValidating,
  };
}