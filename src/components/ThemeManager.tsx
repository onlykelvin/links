import React, { useRef } from 'react';
import { Download, Upload, Sun, Moon, Layout } from 'lucide-react';
import { ThemePalette, LayoutMode } from '../types/theme';

interface ThemeManagerProps {
  themes: ThemePalette[];
  currentThemeId: string;
  mode: 'light' | 'dark';
  layout: LayoutMode;
  onThemeChange: (id: string) => void;
  onModeToggle: () => void;
  onLayoutToggle: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
}

export function ThemeManager({
  themes,
  currentThemeId,
  mode,
  layout,
  onThemeChange,
  onModeToggle,
  onLayoutToggle,
  onExport,
  onImport
}: ThemeManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onImport(file);
  };

  return (
    <div className="flex items-center gap-4 mb-8">
      <button
        onClick={onModeToggle}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
      >
        {mode === 'light' ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </button>

      <button
        onClick={onLayoutToggle}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label={`Switch to ${layout === 'grid' ? 'full' : 'grid'} layout`}
      >
        <Layout className="w-5 h-5" />
      </button>

      <div className="relative group">
        <div className="flex gap-2">
          <select
            value={currentThemeId}
            onChange={(e) => onThemeChange(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          >
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>

          <button
            onClick={onExport}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Export themes"
          >
            <Download className="w-5 h-5" />
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Import themes"
          >
            <Upload className="w-5 h-5" />
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".svg"
          className="hidden"
          onChange={handleImport}
        />
      </div>
    </div>
  );
}