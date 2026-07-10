import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { MessageSquare, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { phoneHref } from '../../lib/phone';

export function Pricing() {
  const { site } = useContent();

  const steps = [
    { title: 'Submit Request', description: 'Fill out the booking form with your trip details.' },
    { title: 'Admin Review', description: 'Our team reviews your request and prepares a personalized quote.' },
    { title: 'We Contact You', description: 'An admin contacts you with the final quote via phone.' },
    { title: 'Confirm & Pay', description: 'Confirm the quote, then pay online or pay the driver on the day.' },
  ];

  return (
    <div className="min-h-screen pt-20 bg-[#0B0B0B]">
      <section className="py-20 bg-gradient-to-br from-[#0B0B0B] via-[#0B1F3A] to-[#0B0B0B]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Request a <span className="text-[#D4AF37]">Quote</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300">Personalized quotes from our team — every trip is unique.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-[#1A1A1A] border-[#D4AF37]/20 mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-8 h-8 text-[#D4AF37]" />
                <h2 className="text-2xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>How Quotes Work</h2>
              </div>
              <p className="text-gray-300 mb-8">
                {site.name} provides custom quotes tailored to your trip. Submit a booking request and our team will contact you with a transparent price.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 bg-[#D4AF37] text-[#0B0B0B] rounded-full flex items-center justify-center font-bold flex-shrink-0">{i + 1}</div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book">
              <Button className="bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90 text-lg px-8 py-6 font-semibold w-full sm:w-auto">
                Submit Booking Request <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Button>
            </Link>
            <a href={phoneHref(site.phone)}>
              <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0B0B] text-lg px-8 py-6 font-semibold w-full sm:w-auto">
                <Phone className="w-5 h-5 mr-2 inline" /> {site.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0B1F3A]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl text-white mb-12 text-center" style={{ fontFamily: 'var(--font-heading)' }}>What's <span className="text-[#D4AF37]">Included</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Professional chauffeur', 'Fuel & vehicle maintenance', 'Insurance coverage', 'Wi-Fi connectivity', 'Climate control', 'Premium sound system', 'Bottled water', 'Phone chargers', 'Luggage assistance'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white">
                <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
