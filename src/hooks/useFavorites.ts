import { useState, useEffect } from 'react';

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

  return { favorites, toggleFavorite, isFavorite };
}