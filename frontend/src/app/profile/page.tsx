'use client';

import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';

export default function ProfilePage() {
  const { isConnected, address } = useAccount();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Blockchain enthusiast and productivity hacker.',
    notificationPreferences: {
      email: true,
      browser: true,
      commitmentReminders: true,
      validationRequests: true
    }
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: checked
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: checked }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call to update profile
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
    }, 1000);
  };

  if (!isConnected) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow p-6 md:p-10 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Profile Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-md mb-6">
                  <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-200 mb-1">Wallet Address</h3>
                  <p className="font-mono text-indigo-700 dark:text-indigo-300">{address}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Display Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                      />
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300">{formData.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                      />
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300">{formData.email}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                    />
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300">{formData.bio}</p>
                  )}
                </div>
                
                {isEditing && (
                  <>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="notificationPreferences.email"
                              name="notificationPreferences.email"
                              type="checkbox"
                              checked={formData.notificationPreferences.email}
                              onChange={handleCheckboxChange}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="notificationPreferences.email" className="font-medium text-gray-700 dark:text-gray-300">
                              Email Notifications
                            </label>
                            <p className="text-gray-500 dark:text-gray-400">Receive updates via email</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="notificationPreferences.browser"
                              name="notificationPreferences.browser"
                              type="checkbox"
                              checked={formData.notificationPreferences.browser}
                              onChange={handleCheckboxChange}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="notificationPreferences.browser" className="font-medium text-gray-700 dark:text-gray-300">
                              Browser Notifications
                            </label>
                            <p className="text-gray-500 dark:text-gray-400">Receive notifications in your browser</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="notificationPreferences.commitmentReminders"
                              name="notificationPreferences.commitmentReminders"
                              type="checkbox"
                              checked={formData.notificationPreferences.commitmentReminders}
                              onChange={handleCheckboxChange}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="notificationPreferences.commitmentReminders" className="font-medium text-gray-700 dark:text-gray-300">
                              Commitment Reminders
                            </label>
                            <p className="text-gray-500 dark:text-gray-400">Get reminders about your upcoming commitment deadlines</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="notificationPreferences.validationRequests"
                              name="notificationPreferences.validationRequests"
                              type="checkbox"
                              checked={formData.notificationPreferences.validationRequests}
                              onChange={handleCheckboxChange}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="notificationPreferences.validationRequests" className="font-medium text-gray-700 dark:text-gray-300">
                              Validation Requests
                            </label>
                            <p className="text-gray-500 dark:text-gray-400">Get notified when someone selects you as a validator</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                      >
                        {isSaving ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : "Save Changes"}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        disabled={isSaving}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:bg-gray-300 dark:disabled:bg-gray-800 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-md transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-2xl font-semibold mb-6">Account Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg text-center">
                <span className="block text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">7</span>
                <span className="text-gray-600 dark:text-gray-300">Total Commitments</span>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg text-center">
                <span className="block text-3xl font-bold text-green-600 dark:text-green-400 mb-1">5</span>
                <span className="text-gray-600 dark:text-gray-300">Completed Commitments</span>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg text-center">
                <span className="block text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">4</span>
                <span className="text-gray-600 dark:text-gray-300">Validations Performed</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
