export type ThemePalette = {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    surface: string;
  };
};

export type ThemeMode = 'light' | 'dark';

export type LayoutMode = 'grid' | 'full';

export interface ThemeExport {
  version: string;
  themes: ThemePalette[];
  timestamp: number;
}