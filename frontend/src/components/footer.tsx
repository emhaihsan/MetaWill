"use client";

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full py-12 bg-gray-950 border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-48 bg-orange-500/10 blur-[120px]"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-6">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/metawillicon.png" // Pastikan file logo.png ada di folder /public
              width={32}
              height={32}
              alt="MetaWill Logo"
            />
            <span className="text-2xl font-bold text-white">MetaWill</span>
          </Link>

          <p className="text-sm text-gray-500 text-center">
            {new Date().getFullYear()} MetaWill. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
