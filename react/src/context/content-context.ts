import { createContext, type Context } from 'react';
import type { CmsContent } from '../types/content';

export interface ContentContextValue {
  content: CmsContent | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  site: CmsContent['site'];
  home: CmsContent['home'];
  navigation: CmsContent['navigation'];
  about: CmsContent['about'];
  faq: CmsContent['faq'];
}

type ContentStore = {
  context: Context<ContentContextValue | null>;
};

const globalStore = globalThis as typeof globalThis & {
  __limoContentStore?: ContentStore;
};

function getContentContext() {
  if (!globalStore.__limoContentStore) {
    globalStore.__limoContentStore = {
      context: createContext<ContentContextValue | null>(null),
    };
  }
  return globalStore.__limoContentStore.context;
}

/** Singleton context — survives Vite HMR so Provider and consumers stay in sync. */
export const ContentContext = getContentContext();
