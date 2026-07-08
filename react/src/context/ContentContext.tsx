import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchContent } from '../lib/api';
import type { CmsContent } from '../types/content';

interface ContentContextValue {
  content: CmsContent | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const ContentContext = createContext<ContentContextValue | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<CmsContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchContent();
      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading, error, refresh: loadContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }

  return context;
}
