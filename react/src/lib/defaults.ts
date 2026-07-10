import {
  Award, Briefcase, Car, Clock, DollarSign, Heart, MapPin,
  PartyPopper, Plane, Shield, Star, Timer, Users,
} from 'lucide-react';
import type { AboutContent, FaqContent, HomeContent, SiteContent, NavItem } from '../types/content';

export const DEFAULT_SITE: SiteContent = {
  name: 'High5 Limo',
  tagline: 'Premium Limousine Service Across Canada',
  phone: '+1 (234) 567-890',
  email: 'info@high5limo.com',
  whatsapp: '1234567890',
  address: {
    street: '123 Luxury Lane',
    city: 'Toronto',
    province: 'ON',
    postal: 'M5H 2N2',
    country: 'Canada',
  },
};

export const DEFAULT_NAVIGATION: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Fleet', path: '/fleet' },
  { label: 'Book Now', path: '/book' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export const DEFAULT_HOME: HomeContent = {
  hero: {
    title: 'Premium Limousine Service',
    titleHighlight: 'Across Canada',
    subtitle: 'Airport Transfers, Corporate Travel, Weddings & Special Events',
    ctaButtons: [
      { label: 'Book Ride', link: '/book', variant: 'primary' },
      { label: 'Request Quote', link: '/pricing', variant: 'outline' },
      { label: 'Call Now', link: 'tel', variant: 'ghost' },
    ],
  },
  quoteWidget: {
    title: 'Quick Booking',
    buttonLabel: 'Request Quote',
  },
  services: [
    { icon: 'Plane', title: 'Airport Transfers', description: 'Reliable airport pickups and drop-offs with flight tracking across all major Canadian airports.' },
    { icon: 'Briefcase', title: 'Corporate Transportation', description: 'Executive travel for meetings, conferences, and corporate events with professional chauffeurs.' },
    { icon: 'Heart', title: 'Wedding Transportation', description: 'Elegant wedding day transportation for the bride, groom, and wedding party in luxury GMC vehicles.' },
    { icon: 'PartyPopper', title: 'Special Occasions', description: 'Luxury rides for proms, anniversaries, birthdays, and celebrations that deserve the best.' },
    { icon: 'MapPin', title: 'Short Distance Rides', description: 'Premium city travel for dinners, meetings, and local destinations with comfort and style.' },
    { icon: 'Car', title: 'Long Distance Rides', description: 'Intercity luxury transfers with rest stops, Wi-Fi, and refreshments for a relaxing journey.' },
    { icon: 'Timer', title: 'Hourly Chauffeur Service', description: 'Flexible hourly bookings for events, shopping, or multi-stop itineraries at your pace.' },
  ],
  whyChooseUs: [
    { icon: 'Car', title: 'Luxury Vehicles', description: 'Premium GMC fleet' },
    { icon: 'Award', title: 'Professional Chauffeurs', description: 'Trained & courteous' },
    { icon: 'Clock', title: '24/7 Availability', description: 'Always ready to serve' },
    { icon: 'Shield', title: 'Licensed & Insured', description: 'Fully compliant' },
    { icon: 'DollarSign', title: 'Competitive Pricing', description: 'Transparent quotes' },
    { icon: 'Star', title: 'On-Time Guarantee', description: 'Punctual every ride' },
  ],
  fleet: [
    { name: 'GMC Yukon XL', passengers: 6, luggage: 6, features: ['Wi-Fi', 'Leather Seats', 'Climate Control', 'Premium Sound'] },
    { name: 'GMC Yukon Denali', passengers: 6, luggage: 5, features: ['Wi-Fi', 'Heated Seats', 'Panoramic Roof', 'Entertainment System'] },
    { name: 'Cadillac Escalade', passengers: 7, luggage: 7, features: ['Wi-Fi', 'Premium Interior', 'Advanced Safety', 'Luxury Comfort'] },
  ],
  testimonials: [
    { name: 'Sarah Johnson', role: 'Corporate Executive', rating: 5, text: 'Exceptional service! The driver was professional, punctual, and the vehicle was pristine. High5 Limo made my airport transfer seamless.' },
    { name: 'Michael Chen', role: 'Groom', rating: 5, text: 'Our wedding day transportation was perfect thanks to High5 Limo. The GMC Yukon XL was luxurious and accommodated our entire wedding party comfortably.' },
    { name: 'Emily Rodriguez', role: 'Business Traveler', rating: 5, text: 'I use High5 Limo for all my business trips. Reliable, professional, and always on time. The best limo service in Canada!' },
  ],
  cta: {
    title: 'Ready To',
    titleHighlight: 'Ride?',
    subtitle: 'Book your premium limousine service today and experience the High5 difference.',
    buttonLabel: 'Book Now',
    buttonLink: '/book',
  },
};

export const DEFAULT_ABOUT: AboutContent = {
  heroTitle: 'About',
  heroHighlight: 'High5 Limo',
  heroSubtitle: "Canada's premier luxury limousine service, dedicated to providing exceptional transportation experiences.",
  storyTitle: 'Our',
  storyHighlight: 'Story',
  storyParagraphs: [
    'Founded with a vision to redefine luxury transportation in Canada, High5 Limo has been serving discerning clients for over a decade. What started as a small operation with a single vehicle has grown into one of Canada\'s most trusted premium limousine services.',
    'We pride ourselves on our commitment to punctuality, professionalism, and providing an unparalleled luxury experience. Every member of our team is dedicated to ensuring your journey is not just a ride, but a memorable experience.',
    'Our fleet of meticulously maintained GMC and Cadillac vehicles represents the pinnacle of automotive luxury. Each vehicle is equipped with premium amenities to ensure your comfort, whether you\'re heading to the airport, a wedding, or a corporate event.',
  ],
  yearsValue: '10+',
  yearsLabel: 'Years of Excellence',
  focusAreas: [
    { icon: 'Award', title: 'Professional Experience', description: 'Over 10 years serving Canada with expert chauffeurs trained in safety, discretion, and luxury hospitality.' },
    { icon: 'Shield', title: 'Commitment To Safety', description: 'Licensed, insured drivers with background checks. Every vehicle maintained to the highest safety standards.' },
    { icon: 'Car', title: 'Commitment To Luxury Service', description: 'Premium GMC luxury vehicles with leather interiors, climate control, Wi-Fi, and amenities for every journey.' },
    { icon: 'Heart', title: 'Customer Satisfaction Focus', description: 'Your comfort and satisfaction drive everything we do — from booking to drop-off, we exceed expectations.' },
  ],
  values: [
    { icon: 'Shield', title: 'Safety First', description: 'All our drivers are licensed, insured, and undergo rigorous background checks.' },
    { icon: 'Award', title: 'Excellence', description: 'We maintain the highest standards of service quality and professionalism.' },
    { icon: 'Users', title: 'Customer Focus', description: 'Your satisfaction is our priority. We go above and beyond for every client.' },
    { icon: 'Clock', title: 'Punctuality', description: 'We value your time. Our drivers are always on time, every time.' },
  ],
  whyChooseUs: [
    { title: 'Licensed & Insured', description: 'All our drivers are fully licensed, insured, and have passed comprehensive background checks.' },
    { title: 'Professional Chauffeurs', description: 'Our drivers are trained professionals who understand discretion, courtesy, and punctuality.' },
    { title: 'Premium Fleet', description: 'We maintain a fleet of luxury GMC and Cadillac vehicles, meticulously cleaned and maintained.' },
    { title: '24/7 Availability', description: 'Whether you need an early morning airport pickup or late-night event transportation, we are always available.' },
    { title: 'Competitive Pricing', description: 'Luxury doesn\'t have to break the bank. Transparent, competitive pricing with no hidden fees.' },
  ],
};

export const DEFAULT_FAQ: FaqContent = {
  heroTitle: 'Frequently Asked',
  heroHighlight: 'Questions',
  heroSubtitle: 'Find answers to common questions about our luxury limousine services.',
  items: [
    { question: 'How do I book a ride?', answer: 'Fill out our online booking form, call our 24/7 hotline, or send us a WhatsApp message. Provide pickup, destination, date, time, and passenger details. Our team will contact you with a personalized quote.' },
    { question: 'Can I pay online?', answer: 'Yes! When booking, you can choose Pay Online (card payment after your quote is confirmed) or Pay Driver (pay in person during your ride). Our admin will confirm payment details with your quote.' },
    { question: 'Do you operate 24/7?', answer: 'Yes! High5 Limo operates 24 hours a day, 7 days a week, including holidays.' },
    { question: 'Can I schedule rides in advance?', answer: 'Absolutely. We encourage advance bookings for airport transfers, weddings, and corporate events.' },
    { question: 'Do you provide airport transportation?', answer: 'Yes! Airport transfers are one of our core services, with flight tracking, meet & greet, and luggage assistance.' },
    { question: 'What areas do you serve?', answer: 'We serve the Greater Toronto Area and major cities across Canada. Contact us for intercity and long-distance transfers.' },
    { question: 'Are your drivers licensed and insured?', answer: 'All our chauffeurs are fully licensed, insured, and background-checked.' },
    { question: 'What amenities are included?', answer: 'Wi-Fi, climate control, premium sound, leather seats, bottled water, and phone chargers. Luxury models may include heated seats and entertainment systems.' },
    { question: 'Do you track flights for airport pickups?', answer: 'Yes! We track your flight in real-time and adjust pickup time if needed at no extra charge.' },
    { question: 'How does pricing work?', answer: 'We use a manual quote system. Submit your booking request and our team will contact you with a personalized, transparent quote.' },
  ],
  ctaTitle: 'Still Have',
  ctaHighlight: 'Questions?',
  ctaSubtitle: "Our team is here to help! Contact us anytime, and we'll be happy to assist you.",
};

// Keep lucide references so tree-shaking doesn't drop icons used only via strings
void [Plane, Briefcase, Heart, PartyPopper, MapPin, Car, Timer, Award, Clock, Shield, DollarSign, Star, Users];
