import { useState, useEffect, useMemo } from 'react';
import { ThemePalette, ThemeMode, ThemeExport } from '../types/theme';
import { DEFAULT_THEMES, DARK_MODE_COLORS } from '../constants/themes';

const STORAGE_KEYS = {
  THEMES: 'app_themes',
  THEME_ID: 'app_current_theme',
  MODE: 'app_color_mode',
  LAYOUT: 'app_layout'
};

export function useThemeManager() {
  // Initialize state from localStorage with fallbacks
  const [themes] = useState<ThemePalette[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEMES);
    return saved ? JSON.parse(saved) : DEFAULT_THEMES;
  });

  const [currentThemeId, setCurrentThemeId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.THEME_ID) || DEFAULT_THEMES[0].id;
  });

  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MODE);
    if (saved) return saved as ThemeMode;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Compute the current theme colors based on mode and selected theme
  const currentTheme = useMemo(() => {
    const baseTheme = themes.find(t => t.id === currentThemeId)?.colors || DEFAULT_THEMES[0].colors;
    
    if (mode === 'dark') {
      return {
        ...baseTheme,
        ...DARK_MODE_COLORS,
        // Keep theme's primary, secondary, and accent colors
        primary: baseTheme.primary,
        secondary: baseTheme.secondary,
        accent: baseTheme.accent
      };
    }
    
    return baseTheme;
  }, [themes, currentThemeId, mode]);

  // Persist settings to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEMES, JSON.stringify(themes));
    localStorage.setItem(STORAGE_KEYS.THEME_ID, currentThemeId);
    localStorage.setItem(STORAGE_KEYS.MODE, mode);
    
    // Update document class for dark mode
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [themes, currentThemeId, mode]);

  const exportThemes = (): string => {
    const exportData: ThemeExport = {
      version: '1.0',
      themes,
      timestamp: Date.now()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    return URL.createObjectURL(blob);
  };

  const importThemes = async (file: File): Promise<void> => {
    try {
      const text = await file.text();
      const importData: ThemeExport = JSON.parse(text);
      
      if (importData.version !== '1.0') {
        throw new Error('Unsupported version');
      }
      
      localStorage.setItem(STORAGE_KEYS.THEMES, JSON.stringify(importData.themes));
      window.location.reload(); // Reload to apply imported themes
    } catch (error) {
      console.error('Failed to import themes:', error);
      throw error;
    }
  };

  return {
    themes,
    currentTheme,
    currentThemeId,
    mode,
    setCurrentThemeId,
    setMode,
    exportThemes,
    importThemes
  };
}