import React, { useState } from 'react';
import { Link2, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { LinkWithCategory } from '../types';

interface LinkCardProps {
  link: LinkWithCategory;
  viewMode: 'grid' | 'list';
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function LinkCard({ link, viewMode, isFavorite, onToggleFavorite }: LinkCardProps) {
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);

  const cardClasses = viewMode === 'grid'
    ? "bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden"
    : "bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden flex";

  return (
    <div className={cardClasses}>
      <div className={viewMode === 'grid' ? 'p-8' : 'p-6 flex-1'}>
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-xl flex-shrink-0">
            <Link2 className="text-blue-600 dark:text-blue-400" size={24} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">{link.category}</p>
              <div className="flex gap-2">
                <button
                  onClick={onToggleFavorite}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Star
                    className={`w-5 h-5 ${
                      isFavorite 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-400 dark:text-gray-600'
                    }`}
                  />
                </button>
                <button
                  onClick={() => setIsTagsExpanded(!isTagsExpanded)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  aria-label={isTagsExpanded ? 'Hide tags' : 'Show tags'}
                >
                  {isTagsExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
            <a
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {link.name}
              </h3>
            </a>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{link.short_description}</p>
            
            {isTagsExpanded && (
              <div className="flex flex-wrap gap-2">
                {link.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-xl"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}