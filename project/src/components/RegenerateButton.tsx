import React from 'react';
import { RefreshCw } from 'lucide-react';

interface RegenerateButtonProps {
  onClick: () => void;
}

export const RegenerateButton: React.FC<RegenerateButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mx-auto mt-8 flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    >
      <RefreshCw className="w-5 h-5" />
      <span>Regenerate Recommendations</span>
    </button>
  );
};