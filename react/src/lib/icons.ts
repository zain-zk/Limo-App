import {
  Car, Clock, Shield, Star, Users, Briefcase, Plane, Heart,
  PartyPopper, MapPin, Timer, DollarSign, Award, Headphones,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Car,
  Clock,
  Shield,
  Star,
  Users,
  Briefcase,
  Plane,
  Heart,
  PartyPopper,
  MapPin,
  Timer,
  DollarSign,
  Award,
  Headphones,
};

export function resolveIcon(name?: string): LucideIcon {
  if (!name) return Car;
  return ICON_MAP[name] ?? Car;
}
