import { useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchContent } from '../lib/api';
import { DEFAULT_ABOUT, DEFAULT_FAQ, DEFAULT_HOME, DEFAULT_NAVIGATION, DEFAULT_SITE } from '../lib/defaults';
import type { CmsContent } from '../types/content';
import { ContentContext, type ContentContextValue } from './content-context';

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

  const value: ContentContextValue = {
    content,
    loading,
    error,
    refresh: loadContent,
    site: content?.site ?? DEFAULT_SITE,
    home: content?.home ?? DEFAULT_HOME,
    navigation: content?.navigation ?? DEFAULT_NAVIGATION,
    about: content?.about ?? DEFAULT_ABOUT,
    faq: content?.faq ?? DEFAULT_FAQ,
  };

  return (
    <ContentContext.Provider value={value}>
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
