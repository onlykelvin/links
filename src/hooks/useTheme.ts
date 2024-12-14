import { useState, useEffect } from 'react';
import { ThemeOption, ThemeMode, ThemePalette } from '../types/theme';
import { THEMES } from '../constants/themes';

export function useTheme() {
  const [themeOption, setThemeOption] = useState<ThemeOption>(() => {
    const saved = localStorage.getItem('themeOption');
    return (saved as ThemeOption) || 'classic';
  });

  const [mode, setMode] = useState<ThemeMode>(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeOption', themeOption);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [themeOption, mode]);

  const currentTheme: ThemePalette = THEMES[themeOption][mode];

  const toggleMode = () => setMode(prev => prev === 'light' ? 'dark' : 'light');

  return { currentTheme, themeOption, mode, setThemeOption, toggleMode };
}