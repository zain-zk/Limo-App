import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  Car, ChevronLeft, ChevronRight, Star, Users, Briefcase, ChevronDown, MapPin, Quote,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { SERVICE_AREAS, SERVICE_TYPES } from '../../lib/constants';
import { useContent } from '../../context/ContentContext';
import { resolveIcon } from '../../lib/icons';
import { Seo } from '../../components/Seo';
import { FeatureStrip } from '../../components/FeatureStrip';

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

function resolveCtaLink(link: string, phone: string, whatsapp: string) {
  if (link === 'tel') return phoneHref(phone);
  if (link === 'whatsapp') {
    const message = encodeURIComponent('Hello, I would like to book a ride.');
    return `https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${message}`;
  }
  return link;
}

function SectionHeader({ title, highlight, subtitle }: { title: string; highlight: string; subtitle?: string }) {
  return (
    <div className="text-center mb-14">
      <h2 className="text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
        {title} <span className="text-[#D4AF37]">{highlight}</span>
      </h2>
      <div className="w-24 h-1 bg-[#D4AF37] mx-auto" />
      {subtitle && <p className="text-gray-400 mt-6 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

export function Home() {
  const navigate = useNavigate();
  const { site, home } = useContent();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [quickForm, setQuickForm] = useState({
    pickup: '', dropoff: '', date: '', time: '', passengers: '1', luggage: '1', serviceType: '',
  });

  const { hero, quoteWidget, services, whyChooseUs, fleet, testimonials, cta } = home;

  const handleQuickChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setQuickForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/book', { state: { quickBooking: quickForm } });
  };

  const nextTestimonial = useCallback(
    () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length),
    [testimonials.length],
  );
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  const current = testimonials[currentTestimonial] ?? testimonials[0];

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-body)' }}>
      <Seo path="/" />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B0B0B] via-[#0B1F3A] to-[#0B0B0B]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566124436323-1bfc77e208f5?w=1600&q=80')] bg-cover bg-center opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/60" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <p className="text-[#D4AF37] tracking-[0.3em] uppercase text-sm mb-6">Luxury Chauffeur Service</p>
          <h1 className="text-5xl md:text-7xl mb-6 text-white leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {hero.title} <span className="text-[#D4AF37]">{hero.titleHighlight}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">{hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {hero.ctaButtons.map((btn) => {
              const href = resolveCtaLink(btn.link, site.phone, site.whatsapp);
              const isExternal = btn.link === 'tel' || btn.link === 'whatsapp';
              const className = btn.variant === 'primary'
                ? 'bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#c9a12f] text-lg px-8 py-6 font-semibold shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 transition-all hover:-translate-y-0.5'
                : btn.variant === 'outline'
                  ? 'border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0B0B] text-lg px-8 py-6 font-semibold transition-all hover:-translate-y-0.5'
                  : 'border-white/60 text-white hover:bg-white hover:text-[#0B0B0B] text-lg px-8 py-6 font-semibold transition-all hover:-translate-y-0.5';

              if (isExternal) {
                return (
                  <a key={btn.label} href={href} target={btn.link === 'whatsapp' ? '_blank' : undefined} rel={btn.link === 'whatsapp' ? 'noreferrer' : undefined}>
                    <Button variant={btn.variant === 'primary' ? 'default' : 'outline'} className={className}>{btn.label}</Button>
                  </a>
                );
              }

              return (
                <Link key={btn.label} to={href}>
                  <Button variant={btn.variant === 'primary' ? 'default' : 'outline'} className={className}>
                    {btn.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Trust stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-16 pt-8 border-t border-[#D4AF37]/20">
            {[
              { value: '10+', label: 'Years of Service' },
              { value: '24/7', label: 'Availability' },
              { value: '5.0', label: 'Client Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl text-[#D4AF37] font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{stat.value}</p>
                <p className="text-gray-400 text-xs mt-1 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <a href="#quick-booking" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors animate-bounce" aria-label="Scroll down">
          <ChevronDown className="w-8 h-8" />
        </a>
      </section>

      <FeatureStrip />

      {/* ── Quick booking ────────────────────────────────── */}
      <section id="quick-booking" className="py-16 bg-[#0B1F3A] scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4">
          <Card className="bg-[#1A1A1A] border-[#D4AF37]/20 shadow-2xl shadow-black/40">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl text-[#D4AF37] mb-2 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                {quoteWidget.title}
              </h3>
              <p className="text-gray-400 text-sm text-center mb-8">Fill in your trip details — we'll prepare a personalized quote.</p>
              <form onSubmit={handleQuickSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div><Label className="text-white text-sm">Pickup Location</Label><Input name="pickup" value={quickForm.pickup} onChange={handleQuickChange} placeholder="Address or airport" className="mt-1.5 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
                  <div><Label className="text-white text-sm">Drop-off Location</Label><Input name="dropoff" value={quickForm.dropoff} onChange={handleQuickChange} placeholder="Destination" className="mt-1.5 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
                  <div><Label className="text-white text-sm">Date</Label><Input name="date" type="date" value={quickForm.date} onChange={handleQuickChange} min={new Date().toISOString().split('T')[0]} className="mt-1.5 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
                  <div><Label className="text-white text-sm">Time</Label><Input name="time" type="time" value={quickForm.time} onChange={handleQuickChange} className="mt-1.5 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
                  <div><Label className="text-white text-sm">Passengers</Label><Input name="passengers" type="number" min="1" max="10" value={quickForm.passengers} onChange={handleQuickChange} className="mt-1.5 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
                  <div><Label className="text-white text-sm">Bags / Luggage</Label><Input name="luggage" type="number" min="0" max="15" value={quickForm.luggage} onChange={handleQuickChange} className="mt-1.5 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
                  <div className="md:col-span-2">
                    <Label className="text-white text-sm">Service Type</Label>
                    <select name="serviceType" value={quickForm.serviceType} onChange={handleQuickChange} className="form-select mt-1.5">
                      <option value="">Select service</option>
                      {SERVICE_TYPES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                </div>
                <Button type="submit" className="w-full mt-6 bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#c9a12f] font-semibold py-6 text-base transition-all">
                  {quoteWidget.buttonLabel} →
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────── */}
      <section className="py-20 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Our" highlight="Premium Services" subtitle="Luxury transportation tailored to every occasion — from airport runs to your biggest celebrations." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = resolveIcon(service.icon);
              return (
                <Card key={index} className="group bg-[#1A1A1A] border-[#D4AF37]/15 hover:border-[#D4AF37]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 flex flex-col h-full">
                  <CardContent className="p-8 text-center flex flex-col flex-1">
                    <div className="w-16 h-16 bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-5 transition-colors">
                      <Icon className="w-8 h-8 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-xl text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{service.title}</h3>
                    <p className="text-gray-400 text-sm mb-5 flex-1 leading-relaxed">{service.description}</p>
                    <Link to="/services" className="text-[#D4AF37] hover:underline text-sm font-semibold">Learn More →</Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why choose us ────────────────────────────────── */}
      <section className="py-20 bg-[#0B1F3A]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Why Choose" highlight="High5 Limo" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = resolveIcon(item.icon);
              return (
                <div key={index} className="text-center p-6 rounded-xl border border-transparent hover:border-[#D4AF37]/30 hover:bg-[#0B0B0B]/40 transition-all duration-300">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-lg md:text-xl text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Fleet ────────────────────────────────────────── */}
      <section className="py-20 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Our Luxury" highlight="Fleet" subtitle="Meticulously maintained premium vehicles, chauffeured by licensed professionals." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fleet.map((vehicle, index) => (
              <Card key={index} className="group bg-[#1A1A1A] border-[#D4AF37]/15 hover:border-[#D4AF37]/50 overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40">
                <div className="h-52 relative overflow-hidden bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A]">
                  {vehicle.image ? (
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Car className="w-24 h-24 text-[#D4AF37]/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{vehicle.name}</h3>
                  <div className="flex gap-5 mb-5 text-sm text-gray-400">
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#D4AF37]" /> {vehicle.passengers} Passengers</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-[#D4AF37]" /> {vehicle.luggage} Bags</span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {vehicle.features.map((f, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/book"><Button className="w-full bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#c9a12f] font-semibold transition-colors">Book This Vehicle</Button></Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      {current && (
        <section className="py-20 bg-[#0B1F3A]">
          <div className="max-w-4xl mx-auto px-4">
            <SectionHeader title="What Our" highlight="Clients Say" />
            <div className="relative px-12 md:px-16">
              <Card className="bg-[#1A1A1A] border-[#D4AF37]/20 shadow-xl shadow-black/30">
                <CardContent className="p-8 md:p-10 text-center relative">
                  <Quote className="w-10 h-10 text-[#D4AF37]/20 absolute top-6 left-6" />
                  <div className="flex justify-center mb-4">
                    {[...Array(current.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />)}
                  </div>
                  <p className="text-lg text-gray-300 mb-6 italic leading-relaxed">"{current.text}"</p>
                  <h4 className="text-xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>{current.name}</h4>
                  <p className="text-[#D4AF37] text-sm">{current.role}</p>
                </CardContent>
              </Card>
              <button onClick={prevTestimonial} aria-label="Previous testimonial" className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#D4AF37] hover:bg-[#c9a12f] text-[#0B0B0B] w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors"><ChevronLeft className="w-5 h-5" /></button>
              <button onClick={nextTestimonial} aria-label="Next testimonial" className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#D4AF37] hover:bg-[#c9a12f] text-[#0B0B0B] w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors"><ChevronRight className="w-5 h-5" /></button>

              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${i === currentTestimonial ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Service areas ────────────────────────────────── */}
      <section className="py-20 bg-[#0B0B0B]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <SectionHeader title="Service" highlight="Areas" subtitle="Premium limousine service across the Greater Toronto Area and major Canadian cities." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICE_AREAS.map((area) => (
              <div key={area} className="group bg-[#1A1A1A] border border-[#D4AF37]/15 rounded-lg py-4 px-6 text-white hover:border-[#D4AF37]/60 hover:bg-[#1A1A1A]/80 transition-all flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative py-24 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            {cta.title} <span className="text-[#D4AF37]">{cta.titleHighlight}</span>
          </h2>
          {cta.subtitle && <p className="text-gray-300 mb-10 text-lg">{cta.subtitle}</p>}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={cta.buttonLink}><Button className="bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#c9a12f] text-lg px-12 py-6 font-semibold shadow-lg shadow-[#D4AF37]/20 transition-all hover:-translate-y-0.5">{cta.buttonLabel}</Button></Link>
            <a href={phoneHref(site.phone)}><Button variant="outline" className="border-white/60 text-white hover:bg-white hover:text-[#0B0B0B] text-lg px-12 py-6 font-semibold transition-all hover:-translate-y-0.5">Call Now</Button></a>
          </div>
        </div>
      </section>
    </div>
  );
}
