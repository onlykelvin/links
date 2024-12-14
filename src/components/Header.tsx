import React from 'react';
import { Sun, Moon, LayoutGrid, List } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  viewMode: 'grid' | 'list';
  onThemeToggle: () => void;
  onViewModeToggle: () => void;
}

export function Header({ theme, viewMode, onThemeToggle, onViewModeToggle }: HeaderProps) {
  return (
    <div className="mb-12">
      <div className="flex justify-end gap-4 mb-8">
        <button
          onClick={onViewModeToggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle view mode"
        >
          {viewMode === 'grid' ? (
            <List className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <LayoutGrid className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
        <button
          onClick={onThemeToggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-gray-600" />
          ) : (
            <Sun className="w-5 h-5 text-gray-300" />
          )}
        </button>
      </div>
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">Useful Links</h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-12 text-lg">
        Discover and organize your favorite resources
      </p>
    </div>
  );
}