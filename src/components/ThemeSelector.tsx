import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { ThemeOption, ThemePalette } from '../types/theme';

interface ThemeSelectorProps {
  currentTheme: ThemePalette;
  themeOption: ThemeOption;
  onThemeChange: (theme: ThemeOption) => void;
  onModeToggle: () => void;
}

export function ThemeSelector({ 
  currentTheme, 
  themeOption, 
  onThemeChange, 
  onModeToggle 
}: ThemeSelectorProps) {
  const themes: ThemeOption[] = ['classic', 'ocean', 'sunset'];

  return (
    <div className="flex items-center gap-4 mb-8">
      <button
        onClick={onModeToggle}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Sun className="hidden dark:block w-5 h-5" />
        <Moon className="block dark:hidden w-5 h-5" />
      </button>

      <div className="relative group">
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <Palette className="w-5 h-5" />
        </button>

        <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => onThemeChange(theme)}
              className={`
                w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700
                ${themeOption === theme ? 'text-' + currentTheme.primary : ''}
              `}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}