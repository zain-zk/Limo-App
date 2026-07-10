import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useContent } from '../../context/ContentContext';
import { resolveIcon } from '../../lib/icons';

export function Services() {
  const { home } = useContent();
  const services = home.services;

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-gradient-to-br from-[#0F0F0F] via-[#0B1F3A] to-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Our <span className="text-[#D4AF37]">Premium Services</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300">Luxury transportation tailored to every occasion.</p>
        </div>
      </section>

      <section className="py-20 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = resolveIcon(service.icon);
              return (
                <Card key={index} className="bg-[#1A1A1A] border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all flex flex-col h-full">
                  <CardContent className="p-8 flex flex-col flex-1">
                    <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-2xl text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{service.title}</h3>
                    <p className="text-gray-400 mb-6 flex-1">{service.description}</p>
                    <Link to="/book">
                      <Button className="w-full bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90 font-semibold">Book This Service</Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0B1F3A] text-center">
        <Link to="/book">
          <Button className="bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90 text-lg px-10 py-6 font-semibold">Request a Quote</Button>
        </Link>
      </section>
    </div>
  );
}
