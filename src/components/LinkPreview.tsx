import React from 'react';
import { usePreview } from '../hooks/usePreview';
import { Loader } from 'lucide-react';

interface LinkPreviewProps {
  url: string;
}

export function LinkPreview({ url }: LinkPreviewProps) {
  const { preview, loading, error } = usePreview(url);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <Loader className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">Preview unavailable</p>
      </div>
    );
  }

  return preview ? (
    <div className="relative h-auto rounded-lg overflow-hidden">
      <img 
        src={preview} 
        alt="Website preview"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  ) : null;
}