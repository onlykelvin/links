import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { SettingsSection } from './SettingsSection';

interface FavoritesSectionProps {
  onExport: () => void;
  onImport: (file: File) => void;
}

export function FavoritesSection({ onExport, onImport }: FavoritesSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onImport(file);
  };

  return (
    <SettingsSection title="Favorites">
      <div className="flex gap-4">
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Favorites
        </button>
        
        <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">
          <Upload className="w-4 h-4" />
          Import Favorites
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImport}
          />
        </label>
      </div>
    </SettingsSection>
  );
}