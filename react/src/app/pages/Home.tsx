import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  Car, ChevronLeft, ChevronRight, Star, Users,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { SERVICE_AREAS, SERVICE_TYPES } from '../../lib/constants';
import { useContent } from '../../context/ContentContext';
import { resolveIcon } from '../../lib/icons';

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

function resolveCtaLink(link: string, phone: string) {
  if (link === 'tel') return phoneHref(phone);
  if (link === 'whatsapp') return '#';
  return link;
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

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [currentTestimonial, testimonials.length]);

  const current = testimonials[currentTestimonial] ?? testimonials[0];

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-body)' }}>
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-[#0B0B0B] via-[#0B1F3A] to-[#0B0B0B]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566124436323-1bfc77e208f5?w=1600')] bg-cover bg-center opacity-25"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl mb-6 text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            {hero.title} <span className="text-[#D4AF37]">{hero.titleHighlight}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">{hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {hero.ctaButtons.map((btn) => {
              const href = resolveCtaLink(btn.link, site.phone);
              const isExternal = btn.link === 'tel';
              const className = btn.variant === 'primary'
                ? 'bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90 text-lg px-8 py-6 font-semibold'
                : btn.variant === 'outline'
                  ? 'border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0B0B] text-lg px-8 py-6 font-semibold'
                  : 'border-white text-white hover:bg-white hover:text-[#0B0B0B] text-lg px-8 py-6 font-semibold';

              if (isExternal) {
                return (
                  <a key={btn.label} href={href}>
                    <Button className={className}>{btn.label}</Button>
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
        </div>
      </section>

      <section className="py-12 bg-[#0B1F3A]">
        <div className="max-w-5xl mx-auto px-4">
          <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
            <CardContent className="p-6">
              <h3 className="text-2xl text-[#D4AF37] mb-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                {quoteWidget.title}
              </h3>
              <form onSubmit={handleQuickSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div><Label className="text-white text-sm">Pickup Location</Label><Input name="pickup" value={quickForm.pickup} onChange={handleQuickChange} placeholder="Pickup" className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
                  <div><Label className="text-white text-sm">Drop-off Location</Label><Input name="dropoff" value={quickForm.dropoff} onChange={handleQuickChange} placeholder="Drop-off" className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
                  <div><Label className="text-white text-sm">Date</Label><Input name="date" type="date" value={quickForm.date} onChange={handleQuickChange} min={new Date().toISOString().split('T')[0]} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
                  <div><Label className="text-white text-sm">Time</Label><Input name="time" type="time" value={quickForm.time} onChange={handleQuickChange} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
                  <div><Label className="text-white text-sm">Passengers</Label><Input name="passengers" type="number" min="1" max="10" value={quickForm.passengers} onChange={handleQuickChange} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
                  <div><Label className="text-white text-sm">Bags / Luggage</Label><Input name="luggage" type="number" min="0" max="15" value={quickForm.luggage} onChange={handleQuickChange} className="mt-1 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" /></div>
                  <div className="md:col-span-2">
                    <Label className="text-white text-sm">Service Type</Label>
                    <select name="serviceType" value={quickForm.serviceType} onChange={handleQuickChange} className="mt-1 w-full h-10 px-3 rounded-md bg-[#0B0B0B] border border-[#D4AF37]/20 text-white">
                      <option value="">Select service</option>
                      {SERVICE_TYPES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4 bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90 font-semibold py-6">
                  {quoteWidget.buttonLabel}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Our <span className="text-[#D4AF37]">Premium Services</span></h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = resolveIcon(service.icon);
              return (
                <Card key={index} className="bg-[#1A1A1A] border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all flex flex-col h-full">
                  <CardContent className="p-6 text-center flex flex-col flex-1">
                    <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-xl text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{service.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 flex-1">{service.description}</p>
                    <Link to="/services" className="text-[#D4AF37] hover:underline text-sm font-semibold">Learn More →</Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0B1F3A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Why Choose <span className="text-[#D4AF37]">High5 Limo</span></h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = resolveIcon(item.icon);
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Our Luxury <span className="text-[#D4AF37]">Fleet</span></h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fleet.map((vehicle, index) => (
              <Card key={index} className="bg-[#1A1A1A] border-[#D4AF37]/20 overflow-hidden flex flex-col h-full">
                <div className="h-48 bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] flex items-center justify-center">
                  <Car className="w-24 h-24 text-[#D4AF37]/30" />
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{vehicle.name}</h3>
                  <div className="flex gap-4 mb-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Users className="w-4 h-4 text-[#D4AF37]" /> {vehicle.passengers} Passengers</span>
                    <span>🧳 {vehicle.luggage} Bags</span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {vehicle.features.map((f, i) => <li key={i} className="text-gray-400 text-sm">✓ {f}</li>)}
                  </ul>
                  <Link to="/book"><Button className="w-full bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90 font-semibold">Book This Vehicle</Button></Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {current && (
        <section className="py-20 bg-[#0B1F3A]">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>What Our <span className="text-[#D4AF37]">Clients Say</span></h2>
              <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
            </div>
            <div className="relative">
              <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(current.rating)].map((_, i) => <Star key={i} className="w-6 h-6 fill-[#D4AF37] text-[#D4AF37]" />)}
                  </div>
                  <p className="text-lg text-gray-300 mb-6 italic">"{current.text}"</p>
                  <h4 className="text-xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>{current.name}</h4>
                  <p className="text-[#D4AF37]">{current.role}</p>
                </CardContent>
              </Card>
              <button onClick={prevTestimonial} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#D4AF37] text-[#0B0B0B] w-10 h-10 rounded-full flex items-center justify-center"><ChevronLeft className="w-6 h-6" /></button>
              <button onClick={nextTestimonial} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#D4AF37] text-[#0B0B0B] w-10 h-10 rounded-full flex items-center justify-center"><ChevronRight className="w-6 h-6" /></button>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-[#0B0B0B]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Service <span className="text-[#D4AF37]">Areas</span></h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-gray-400 mb-10">Premium limousine service across the Greater Toronto Area and major Canadian cities.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICE_AREAS.map((area) => (
              <div key={area} className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg py-4 px-6 text-white hover:border-[#D4AF37] transition-all">{area}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0B1F3A]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            {cta.title} <span className="text-[#D4AF37]">{cta.titleHighlight}</span>
          </h2>
          {cta.subtitle && <p className="text-gray-300 mb-8">{cta.subtitle}</p>}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={cta.buttonLink}><Button className="bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90 text-lg px-12 py-6 font-semibold">{cta.buttonLabel}</Button></Link>
            <a href={phoneHref(site.phone)}><Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#0B0B0B] text-lg px-12 py-6 font-semibold">Call Now</Button></a>
          </div>
        </div>
      </section>
    </div>
  );
}
