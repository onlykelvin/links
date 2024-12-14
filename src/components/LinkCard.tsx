import React from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Star } from 'lucide-react';
import { LinkWithCategory } from '../types';
import { LinkPreview } from './LinkPreview';

interface LinkCardProps {
  link: LinkWithCategory;
  isExpanded: boolean;
  isFavorite: boolean;
  onToggle: () => void;
  onToggleFavorite: () => void;
  theme: any;
}

export function LinkCard({ 
  link, 
  isExpanded, 
  isFavorite,
  onToggle, 
  onToggleFavorite,
  theme 
}: LinkCardProps) {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
      style={{ borderColor: theme.primary }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium mb-2" style={{ color: theme.primary }}>
              {link.category}
            </p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {link.name}
            </h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onToggleFavorite}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <Star
                className={`w-5 h-5 ${
                  isFavorite ? 'fill-current text-yellow-400' : 'text-gray-400'
                }`}
              />
            </button>
            <button
              onClick={onToggle}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
        
        <a
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-2 text-blue-500 hover:text-blue-700"
        >
          <ExternalLink className="w-4 h-4" />
          Visit Link
        </a>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              {link.short_description}
            </p>
            
            <LinkPreview url={link.link} />

            <div className="flex flex-wrap gap-1.5">
              {link.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}