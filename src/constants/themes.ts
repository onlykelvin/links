import { ThemePalette } from '../types/theme';

// Default dark mode colors that will be used regardless of theme when in dark mode
export const DARK_MODE_COLORS = {
  background: '#1a1b1e',
  surface: '#2c2e33',
  text: '#e5e7eb',
  textSecondary: '#9ca3af',
  border: '#374151'
};

export const DEFAULT_THEMES: ThemePalette[] = [
  {
    id: 'classic',
    name: 'Classic',
    colors: {
      primary: '#2563eb',
      secondary: '#4f46e5',
      accent: '#f59e0b',
      background: '#f9fafb',
      text: '#111827',
      surface: '#ffffff',
      border: '#e5e7eb'
    }
  },
  {
    id: 'ocean',
    name: 'Ocean',
    colors: {
      primary: '#0891b2',
      secondary: '#0284c7',
      accent: '#2dd4bf',
      background: '#f0fdfa',
      text: '#134e4a',
      surface: '#ffffff',
      border: '#e5e7eb'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset',
    colors: {
      primary: '#db2777',
      secondary: '#e11d48',
      accent: '#fb923c',
      background: '#fff1f2',
      text: '#881337',
      surface: '#ffffff',
      border: '#e5e7eb'
    }
  },
  {
    id: 'forest',
    name: 'Forest',
    colors: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#fbbf24',
      background: '#f0fdf4',
      text: '#064e3b',
      surface: '#ffffff',
      border: '#e5e7eb'
    }
  },
  {
    id: 'lavender',
    name: 'Lavender',
    colors: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      accent: '#ec4899',
      background: '#faf5ff',
      text: '#4c1d95',
      surface: '#ffffff',
      border: '#e5e7eb'
    }
  }
];