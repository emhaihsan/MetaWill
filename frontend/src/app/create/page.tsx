'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import NavBar from '../../components/NavBar';

export default function CreateCommitment() {
  const { isConnected } = useAccount();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    amount: '',
    validator: ''
  });
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here would be the code to interact with the smart contract
    // For the prototype, we'll just simulate a delay and redirect
    
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/dashboard');
    }, 2000);
  };

  if (!isConnected) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow p-6 md:p-10 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create a New Commitment</h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">New Commitment</h2>
            
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <span className="text-sm mt-1">Details</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </div>
                  <span className="text-sm mt-1">Validator</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    3
                  </div>
                  <span className="text-sm mt-1">Confirm</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Step 1: Commitment Details */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Commitment Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                      placeholder="e.g., Complete 30-day workout challenge"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                      placeholder="Describe what you're committing to do..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Deadline *
                    </label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Stake Amount (ETH) *
                    </label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                      min="0.01"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                      placeholder="0.1"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      This amount will be staked as collateral for your commitment.
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Validator Selection */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="validator" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Validator Address *
                    </label>
                    <input
                      type="text"
                      id="validator"
                      name="validator"
                      value={formData.validator}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                      placeholder="0x..."
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Enter the Ethereum address of a trusted person who will validate your commitment.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-md">
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Important Information</h3>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Your validator will need to confirm whether you've completed your commitment by the deadline. 
                      Choose someone who can reliably assess your progress.
                    </p>
                  </div>
                  
                  <div className="pt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Review & Confirm */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Review Your Commitment</h2>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Title:</span>
                        <span className="font-medium">{formData.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Deadline:</span>
                        <span className="font-medium">{formData.deadline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Stake Amount:</span>
                        <span className="font-medium">{formData.amount} ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Validator:</span>
                        <span className="font-medium truncate max-w-xs">{formData.validator}</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Description:</span>
                      <p className="mt-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">{formData.description}</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Transaction Summary</h3>
                    <div className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300">
                      <div className="flex justify-between">
                        <span>Stake Amount:</span>
                        <span className="font-medium">{formData.amount} ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Gas:</span>
                        <span className="font-medium">0.005 ETH</span>
                      </div>
                      <div className="flex justify-between font-medium pt-1 border-t border-blue-200 dark:border-blue-700">
                        <span>Total:</span>
                        <span>{(parseFloat(formData.amount) + 0.005).toFixed(3)} ETH</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating Commitment...
                        </>
                      ) : "Create Commitment"}
                    </button>
                    
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={isSubmitting}
                      className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:bg-gray-300 dark:disabled:bg-gray-800 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
