import React from 'react';
import { Check } from 'lucide-react';
import { ThemePalette } from '../../types/theme';

interface ThemePreviewProps {
  theme: ThemePalette;
  isSelected: boolean;
  onClick: () => void;
}

export function ThemePreview({ theme, isSelected, onClick }: ThemePreviewProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative p-4 rounded-lg border-2 transition-all
        ${isSelected ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'}
      `}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900 dark:text-white">{theme.name}</span>
          {isSelected && (
            <Check className="w-4 h-4 text-blue-500" />
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(theme.colors).map(([key, color]) => (
            <div
              key={key}
              className="h-6 rounded"
              style={{ backgroundColor: color }}
              title={key}
            />
          ))}
        </div>
      </div>
    </button>
  );
}