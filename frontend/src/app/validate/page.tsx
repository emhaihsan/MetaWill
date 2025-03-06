'use client';

import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';

export default function ValidatePage() {
  const { isConnected } = useAccount();
  const router = useRouter();

  const [validationRequests, setValidationRequests] = useState([
    {
      id: '1',
      title: 'Complete Marathon Training',
      description: 'Train and complete a full marathon',
      deadline: '2025-05-10',
      amount: '0.5',
      creator: '0x9876...5432',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Learn Spanish',
      description: 'Complete Spanish language course and pass B1 level test',
      deadline: '2025-06-30',
      amount: '0.3',
      creator: '0x6543...2109',
      status: 'pending'
    }
  ]);

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  const handleApprove = (id: string) => {
    setValidationRequests(prev => 
      prev.map(req => 
        req.id === id ? {...req, status: 'approved'} : req
      )
    );
  };

  const handleReject = (id: string) => {
    setValidationRequests(prev => 
      prev.map(req => 
        req.id === id ? {...req, status: 'rejected'} : req
      )
    );
  };

  if (!isConnected) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow p-6 md:p-10 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Validation Requests</h1>
          
          {validationRequests.length > 0 ? (
            <div className="space-y-6 mt-6">
              {validationRequests.map(request => (
                <div 
                  key={request.id} 
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 ${
                    request.status === 'pending' 
                      ? 'border-yellow-500' 
                      : request.status === 'approved' 
                        ? 'border-green-500' 
                        : 'border-red-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold">{request.title}</h2>
                    <span 
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        request.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : request.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {request.status === 'pending' 
                        ? 'Pending' 
                        : request.status === 'approved' 
                          ? 'Approved' 
                          : 'Rejected'}
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Description</h3>
                    <p className="text-gray-700 dark:text-gray-300">{request.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Creator</h3>
                      <p className="text-gray-700 dark:text-gray-300 font-mono">{request.creator}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Deadline</h3>
                      <p className="text-gray-700 dark:text-gray-300">{request.deadline}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Stake Amount</h3>
                      <p className="text-gray-700 dark:text-gray-300">{request.amount} ETH</p>
                    </div>
                  </div>
                  
                  {request.status === 'pending' && (
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                      >
                        Approve Completion
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                      >
                        Mark as Failed
                      </button>
                    </div>
                  )}
                  
                  {request.status === 'approved' && (
                    <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-md text-green-800 dark:text-green-200">
                      You have approved this commitment as completed. The staked ETH has been returned to the creator.
                    </div>
                  )}
                  
                  {request.status === 'rejected' && (
                    <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-md text-red-800 dark:text-red-200">
                      You have marked this commitment as failed. The staked ETH has been donated to charity.
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center mt-6">
              <p className="text-gray-600 dark:text-gray-300 mb-2">You don't have any validation requests</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                When someone selects you as a validator for their commitment, it will appear here
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
