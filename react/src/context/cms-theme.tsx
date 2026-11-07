import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type CmsTheme = 'light' | 'dark';

const STORAGE_KEY = 'limo_cms_theme';

interface CmsThemeContextValue {
  theme: CmsTheme;
  setTheme: (theme: CmsTheme) => void;
  toggleTheme: () => void;
}

const CmsThemeContext = createContext<CmsThemeContextValue>({
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
});

export function CmsThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<CmsTheme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (next: CmsTheme) => setThemeState(next);
  const toggleTheme = () => setThemeState((current) => (current === 'light' ? 'dark' : 'light'));

  return (
    <CmsThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </CmsThemeContext.Provider>
  );
}

export function useCmsTheme() {
  return useContext(CmsThemeContext);
}
