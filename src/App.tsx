import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { LinkCard } from './components/LinkCard';
import { Navigation } from './components/Navigation';
import { SettingsPopup } from './components/SettingsPopup';
import { useLinks } from './hooks/useLinks';
import { useFavorites } from './hooks/useFavorites';
import { useThemeManager } from './hooks/useThemeManager';
import type { LayoutMode } from './types/theme';

type Tab = 'all' | 'favorites';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [layout, setLayout] = useState<LayoutMode>('grid');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const { filteredLinks, expandedCards, toggleCard } = useLinks(searchTerm);
  const { 
    favorites, 
    toggleFavorite, 
    isFavorite,
    exportFavorites,
    importFavorites 
  } = useFavorites();
  
  const { 
    themes,
    currentTheme,
    currentThemeId,
    mode,
    setCurrentThemeId,
    setMode,
    exportThemes,
    importThemes
  } = useThemeManager();

  const displayedLinks = activeTab === 'favorites'
    ? filteredLinks.filter(link => isFavorite(link.link))
    : filteredLinks;

  const handleExportFavorites = () => {
    const url = exportFavorites();
    const link = document.createElement('a');
    link.href = url;
    link.download = 'favorites.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className={`min-h-screen transition-colors duration-200 ${
        mode === 'dark' ? 'dark' : ''
      }`}
      style={{ backgroundColor: currentTheme.background, color: currentTheme.text }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Open settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center">Useful Links</h1>
        
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          theme={currentTheme}
        />

        <Navigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          theme={currentTheme}
        />

        <div className={`
          ${layout === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'flex flex-col gap-6'
          }
        `}>
          {displayedLinks.map((link) => (
            <LinkCard
              key={link.link}
              link={link}
              isExpanded={expandedCards.includes(link.link)}
              isFavorite={isFavorite(link.link)}
              onToggle={() => toggleCard(link.link)}
              onToggleFavorite={() => toggleFavorite(link.link)}
              theme={currentTheme}
            />
          ))}
        </div>

        <SettingsPopup
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          themes={themes}
          currentThemeId={currentThemeId}
          mode={mode}
          layout={layout}
          onThemeChange={setCurrentThemeId}
          onModeToggle={() => setMode(mode === 'light' ? 'dark' : 'light')}
          onLayoutToggle={() => setLayout(layout === 'grid' ? 'full' : 'grid')}
          onExportThemes={exportThemes}
          onImportThemes={importThemes}
          onExportFavorites={handleExportFavorites}
          onImportFavorites={importFavorites}
        />
      </div>
    </div>
  );
}

export default App;