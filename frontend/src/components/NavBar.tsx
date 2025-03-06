'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NavBar() {
  const { isConnected } = useAccount();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Show full navbar if connected and not on home page
  const displayFullNavbar = isConnected && pathname !== '/';
  
  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      active: pathname === '/dashboard',
      icon: '📊'
    },
    {
      name: 'Create Commitment',
      href: '/create',
      active: pathname === '/create',
      icon: '✍️'
    },
    {
      name: 'Validate',
      href: '/validate',
      active: pathname === '/validate',
      icon: '✅'
    },
    {
      name: 'Profile',
      href: '/profile',
      active: pathname === '/profile',
      icon: '👤'
    }
  ];

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" prefetch={true} className="flex items-center gap-2">
              <Image src="/logo.svg" alt="iPROMISE Logo" width={40} height={40} priority className="rounded-full" />
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">iPROMISE</span>
            </Link>
          </div>
          
          {displayFullNavbar && (
            <div className="hidden md:flex items-center space-x-4">
              {menuItems.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href} 
                  prefetch={true}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.active 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 hover:text-indigo-600 dark:hover:bg-gray-800 dark:hover:text-indigo-400'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          )}
          
          <div className="flex items-center">
            <ConnectButton />
            
            {/* Mobile menu button */}
            {displayFullNavbar && (
              <div className="md:hidden ml-2">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {displayFullNavbar && isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
            {menuItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href} 
                prefetch={true}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  item.active 
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 hover:text-indigo-600 dark:hover:bg-gray-800 dark:hover:text-indigo-400'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
