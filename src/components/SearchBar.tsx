import React from 'react';
import { Search } from 'lucide-react';
import { ThemePalette } from '../types/theme';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  theme: ThemePalette;
}

export function SearchBar({ searchTerm, onSearchChange, theme }: SearchBarProps) {
  return (
    <div className="relative max-w-xl mx-auto mb-12">
      <Search 
        className="absolute left-4 top-1/2 transform -translate-y-1/2" 
        style={{ color: theme.secondary }}
        size={20}
      />
      <input
        type="text"
        placeholder="Search links..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-4 py-4 rounded-xl border bg-white dark:bg-gray-800 
                   text-gray-900 dark:text-white focus:outline-none focus:ring-2 
                   transition-colors duration-200"
        style={{ 
          borderColor: theme.secondary,
          '--tw-ring-color': theme.primary
        } as React.CSSProperties}
      />
    </div>
  );
}