import { useState, useEffect } from 'react';
import { LinkWithCategory } from '../types';

interface FavoritesExport {
  version: string;
  favorites: string[];
  timestamp: number;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (linkUrl: string) => {
    setFavorites(prev => 
      prev.includes(linkUrl)
        ? prev.filter(url => url !== linkUrl)
        : [...prev, linkUrl]
    );
  };

  const isFavorite = (linkUrl: string) => favorites.includes(linkUrl);

  const exportFavorites = () => {
    const exportData: FavoritesExport = {
      version: '1.0',
      favorites,
      timestamp: Date.now()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    return URL.createObjectURL(blob);
  };

  const importFavorites = async (file: File): Promise<void> => {
    try {
      const text = await file.text();
      const importData: FavoritesExport = JSON.parse(text);
      
      if (importData.version !== '1.0') {
        throw new Error('Unsupported favorites file version');
      }

      // Merge with existing favorites, removing duplicates
      setFavorites(prev => [...new Set([...prev, ...importData.favorites])]);
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error('Invalid favorites file'));
    }
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    exportFavorites,
    importFavorites
  };
}