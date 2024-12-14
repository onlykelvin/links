import { useState, useMemo } from 'react';
import { categories } from '../data';
import { LinkWithCategory } from '../types';

export function useLinks(searchTerm: string) {
  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  const allLinks = useMemo(() => 
    categories.flatMap(category => 
      category.links.map(link => ({
        ...link,
        category: category.name
      }))
    ), []
  );

  const filteredLinks = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return allLinks.filter(link => 
      link.name.toLowerCase().includes(searchLower) ||
      link.short_description.toLowerCase().includes(searchLower) ||
      link.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchLower)
      ) ||
      link.category.toLowerCase().includes(searchLower)
    );
  }, [allLinks, searchTerm]);

  const toggleCard = (linkUrl: string) => {
    setExpandedCards(prev => 
      prev.includes(linkUrl)
        ? prev.filter(url => url !== linkUrl)
        : [...prev, linkUrl]
    );
  };

  return {
    filteredLinks,
    expandedCards,
    toggleCard
  };
}