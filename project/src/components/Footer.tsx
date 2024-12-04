import React from 'react';
import { Copyright } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 mt-12 border-t border-purple-100">
      <div className="container mx-auto px-4 flex items-center justify-center gap-2 text-gray-600">
        <Copyright className="w-4 h-4" />
        <p>
          Made by Adriot <span className="mx-2">|</span> {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};