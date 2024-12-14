import React from 'react';
import { X, Monitor, Layout } from 'lucide-react';
import { ThemePalette, LayoutMode, ThemeMode } from '../../types/theme';
import { ThemePreview } from './ThemePreview';
import { SettingsSection } from './SettingsSection';
import { SettingsToggle } from './SettingsToggle';
import { FavoritesSection } from './FavoritesSection';

interface SettingsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  themes: ThemePalette[];
  currentThemeId: string;
  mode: ThemeMode;
  layout: LayoutMode;
  onThemeChange: (id: string) => void;
  onModeToggle: () => void;
  onLayoutToggle: () => void;
  onExportThemes: () => void;
  onImportThemes: (file: File) => void;
  onExportFavorites: () => void;
  onImportFavorites: (file: File) => void;
}

export function SettingsPopup({
  isOpen,
  onClose,
  themes,
  currentThemeId,
  mode,
  layout,
  onThemeChange,
  onModeToggle,
  onLayoutToggle,
  onExportThemes,
  onImportThemes,
  onExportFavorites,
  onImportFavorites
}: SettingsPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
          <SettingsSection title="Appearance">
            <div className="space-y-4">
              <SettingsToggle
                icon={Monitor}
                label="Color Mode"
                value={mode === 'dark' ? 'Dark' : 'Light'}
                onClick={onModeToggle}
              />
              
              <SettingsToggle
                icon={Layout}
                label="Layout"
                value={layout === 'grid' ? 'Grid' : 'Full Width'}
                onClick={onLayoutToggle}
              />
            </div>
          </SettingsSection>

          <SettingsSection title="Theme">
            <div className="grid grid-cols-2 gap-4">
              {themes.map(theme => (
                <ThemePreview
                  key={theme.id}
                  theme={theme}
                  isSelected={theme.id === currentThemeId}
                  onClick={() => onThemeChange(theme.id)}
                />
              ))}
            </div>
          </SettingsSection>

          <FavoritesSection
            onExport={onExportFavorites}
            onImport={onImportFavorites}
          />
        </div>
      </div>
    </div>
  );
}