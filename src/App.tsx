import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { LinkCard } from './components/LinkCard';
import { Header } from './components/Header';
import { useLinks } from './hooks/useLinks';
import { useTheme } from './hooks/useTheme';
import { useFavorites } from './hooks/useFavorites';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { theme, toggleTheme } = useTheme();
  const { filteredLinks } = useLinks(searchTerm);
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Header
          theme={theme}
          viewMode={viewMode}
          onThemeToggle={toggleTheme}
          onViewModeToggle={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')}
        />
        
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className={
          viewMode === 'grid'
            ? "grid grid-cols-1 lg:grid-cols-2 gap-8"
            : "flex flex-col gap-6"
        }>
          {filteredLinks.map((link) => (
            <LinkCard
              key={link.link}
              link={link}
              viewMode={viewMode}
              isFavorite={isFavorite(link.link)}
              onToggleFavorite={() => toggleFavorite(link.link)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;