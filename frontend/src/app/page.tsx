'use client';

import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '../components/NavBar';

export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push('/dashboard');
    }
  }, [isConnected, router]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center md:text-left md:w-2/3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
                Achieve Your Goals with <span className="text-indigo-600 dark:text-indigo-400">Blockchain Accountability</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                iPROMISE is a Web3 platform that helps you achieve your goals by putting a financial stake on your commitments. Set goals, find validators, and earn rewards for success.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <button
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Learn More
                </button>
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 font-medium py-3 px-6 rounded-lg border border-indigo-200 dark:border-gray-600 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 h-3/4">
            <div className="relative h-full">
              <Image
                src="/hero-image.svg"
                alt="iPROMISE Platform Illustration"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>
        </section>
        
        {/* How it Works Section */}
        <section className="py-16 bg-white dark:bg-gray-800" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How iPROMISE Works</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Make a commitment, add a financial stake, and let trusted validators verify your success
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 text-center">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">✍️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create a Commitment</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Set a clear goal, add a deadline, and stake ETH to ensure you follow through.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 text-center">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">👥</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Select Validators</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose trusted individuals to verify that you've completed your commitment.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 text-center">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Complete & Verify</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Achieve your goal, get validated, and receive your ETH back. Or donate to charity if you fail.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose iPROMISE</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Leverage the power of Web3 for personal accountability and growth
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 w-12 h-12 rounded-full flex items-center justify-center">
                    <span className="text-xl">💰</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Financial Incentives</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Studies show that having money on the line increases your chances of following through on goals by up to 3x.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 w-12 h-12 rounded-full flex items-center justify-center">
                    <span className="text-xl">🔒</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Secure & Transparent</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Built on Ethereum blockchain, ensuring that your commitments and stakes are secure and tamper-proof.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 w-12 h-12 rounded-full flex items-center justify-center">
                    <span className="text-xl">🌱</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Positive Impact</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Failed commitments result in donations to vetted charitable organizations, ensuring a positive outcome either way.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 w-12 h-12 rounded-full flex items-center justify-center">
                    <span className="text-xl">👋</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Easy to Use</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    No technical blockchain knowledge required. Connect your wallet and start making commitments right away.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Link
                href="/dashboard"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
              >
                Start Your First Commitment
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Success Stories</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                See how iPROMISE has helped people achieve their goals
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-xl mr-4">
                    👨
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Alex T.</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Software Developer</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "I've been trying to learn Spanish for years but always gave up. Staking 0.5 ETH on iPROMISE kept me accountable, and I finally completed my B1 certification!"
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-xl mr-4">
                    👩
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Sarah M.</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fitness Enthusiast</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "Training for a marathon is tough, but having my friends as validators and my ETH on the line kept me going even on the hardest days. Completed my first marathon thanks to iPROMISE!"
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-xl mr-4">
                    👨‍🦱
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Michael K.</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Entrepreneur</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "I used iPROMISE to commit to launching my business within 6 months. The financial stake motivated me to push through the challenges, and now my business is up and running!"
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-indigo-600 dark:bg-indigo-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Make Your Promise?</h2>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Connect your wallet and start your journey to achieving your goals with iPROMISE.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-white hover:bg-gray-100 text-indigo-600 font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Get Started Now
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-100 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Image src="/logo.svg" alt="iPROMISE Logo" width={30} height={30} className="mr-2 rounded-full" />
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">iPROMISE</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                About
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Terms
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Privacy
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} iPROMISE. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
