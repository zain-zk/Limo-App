export interface SiteContent {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: {
    street: string;
    city: string;
    province: string;
    postal: string;
    country: string;
  };
}

export interface HeroContent {
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaButtons: Array<{
    label: string;
    link: string;
    variant: 'primary' | 'outline' | 'ghost';
  }>;
}

export interface ContentItem {
  icon?: string;
  title: string;
  description: string;
}

export interface FleetItem {
  name: string;
  passengers: number;
  luggage: number;
  features: string[];
}

export interface TestimonialItem {
  name: string;
  role: string;
  rating: number;
  text: string;
}

export interface HomeContent {
  hero: HeroContent;
  quoteWidget: {
    title: string;
    buttonLabel: string;
  };
  services: ContentItem[];
  whyChooseUs: ContentItem[];
  fleet: FleetItem[];
  testimonials: TestimonialItem[];
  cta: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    buttonLabel: string;
    buttonLink: string;
  };
}

export interface NavItem {
  label: string;
  path: string;
}

export interface AboutContent {
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  storyTitle: string;
  storyHighlight: string;
  storyParagraphs: string[];
  yearsLabel: string;
  yearsValue: string;
  focusAreas: ContentItem[];
  values: ContentItem[];
  whyChooseUs: Array<{ title: string; description: string }>;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  items: FaqItem[];
  ctaTitle: string;
  ctaHighlight: string;
  ctaSubtitle: string;
}

export interface CmsContent {
  site: SiteContent;
  home: HomeContent;
  navigation: NavItem[];
  about: AboutContent;
  faq: FaqContent;
  services?: Record<string, unknown>;
  fleet?: Record<string, unknown>;
  pricing?: Record<string, unknown>;
  testimonials?: Record<string, unknown>;
  contact?: Record<string, unknown>;
}
