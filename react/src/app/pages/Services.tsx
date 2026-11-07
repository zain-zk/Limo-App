import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useContent } from '../../context/ContentContext';
import { resolveIcon } from '../../lib/icons';
import { resolvePublicServices } from '../../lib/servicesCatalog';
import { PageHero } from '../../components/PageHero';
import { Seo } from '../../components/Seo';

export function Services() {
  const { t, i18n } = useTranslation();
  const { home } = useContent();
  const services = resolvePublicServices(home.services, t, i18n.language);

  return (
    <div className="min-h-screen pt-20">
      <Seo title="Services | High5 Limo" description="Airport transfers, weddings, corporate travel, and more — luxury chauffeur services across Canada." path="/services" />
      <PageHero title="Our" titleHighlight="Premium Services" subtitle="Luxury transportation tailored to every occasion." />

      <section className="py-20 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = resolveIcon(service.icon);
              return (
                <Card key={index} className="group bg-[#1A1A1A] border-[#D4AF37]/15 hover:border-[#D4AF37]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 flex flex-col h-full">
                  <CardContent className="p-8 flex flex-col flex-1">
                    <div className="w-14 h-14 bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 rounded-full flex items-center justify-center mb-6 transition-colors">
                      <Icon className="w-7 h-7 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-2xl text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{service.title}</h3>
                    <p className="text-gray-400 mb-6 flex-1 leading-relaxed">{service.description}</p>
                    <Link to="/book">
                      <Button className="w-full bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#c9a12f] font-semibold transition-colors">{t('services.bookCta')}</Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0B1F3A] text-center px-4">
        <h2 className="text-3xl text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Not sure which service fits?</h2>
        <p className="text-gray-400 mb-8">Tell us about your trip and we'll recommend the perfect option.</p>
        <Link to="/book">
          <Button className="bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#c9a12f] text-lg px-10 py-6 font-semibold shadow-lg shadow-[#D4AF37]/20 transition-all hover:-translate-y-0.5">Request a Quote</Button>
        </Link>
      </section>
    </div>
  );
}
