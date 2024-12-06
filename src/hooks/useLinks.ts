import { useMemo } from 'react';
import { categories } from '../data';
import { LinkWithCategory } from '../types';

export function useLinks(searchTerm: string) {
  const allLinks = useMemo(() => 
    categories.flatMap(category => 
      category.links.map(link => ({
        ...link,
        category: category.name
      }))
    ), []
  );

  const filteredLinks = useMemo(() => 
    allLinks.filter(link => 
      link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.short_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ), [allLinks, searchTerm]
  );

  return {
    filteredLinks
  };
}