import { useState, useEffect } from 'react';

const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

interface CacheEntry {
  timestamp: number;
  preview: string;
}

const previewCache = new Map<string, CacheEntry>();

export function usePreview(url: string) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check cache first
        const cached = previewCache.get(url);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
          setPreview(cached.preview);
          return;
        }

        // Fallback preview if embedding is blocked
        const fallbackPreview = `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
        
        setPreview(fallbackPreview);
        previewCache.set(url, {
          timestamp: Date.now(),
          preview: fallbackPreview
        });
      } catch (err) {
        setError('Failed to load preview');
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchPreview();
    }
  }, [url]);

  return { preview, loading, error };
}