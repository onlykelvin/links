import React from 'react';
import { ThemePalette } from '../types/theme';

type Tab = 'all' | 'favorites';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  theme: ThemePalette;
}

export function Navigation({ activeTab, onTabChange, theme }: NavigationProps) {
  const tabs: Tab[] = ['all', 'favorites'];

  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex rounded-lg p-1 bg-gray-100 dark:bg-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`
              px-4 py-2 rounded-lg transition-all duration-200
              ${activeTab === tab 
                ? `bg-white dark:bg-gray-700 text-${theme.primary} shadow-sm` 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }
            `}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}