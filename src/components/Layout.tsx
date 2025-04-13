
import React from 'react';
import Navbar from './Navbar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className={cn("flex-1 container mx-auto px-4 py-8", className)}>
        {children}
      </main>
      <footer className="bg-gray-100 border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} TaxSathi. All rights reserved.</p>
          <p className="mt-1">Disclaimer: This tool provides general tax information and is not a substitute for professional tax advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
