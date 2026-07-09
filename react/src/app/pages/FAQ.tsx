import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Link } from 'react-router';
import { SITE_PHONE } from '../../lib/constants';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I book a ride?',
      answer: 'Booking is easy! Fill out our online booking form at high5limo.ca/book, call our 24/7 hotline, or send us a WhatsApp message. Provide your pickup location, destination, date, time, and passenger details. Our team will contact you with a personalized quote.',
    },
    {
      question: 'Can I pay online?',
      answer: 'Yes! When booking, you can choose Pay Online (via Stripe once your quote is confirmed) or Pay Driver (pay in person during your ride). Our admin will confirm payment details when contacting you with your quote.',
    },
    {
      question: 'Do you operate 24/7?',
      answer: 'Yes! High5 Limo operates 24 hours a day, 7 days a week, including holidays. Whether you need an early morning airport pickup or late-night event transportation, our professional chauffeurs are always ready.',
    },
    {
      question: 'Can I schedule rides in advance?',
      answer: 'Absolutely. We encourage advance bookings for airport transfers, weddings, and corporate events. Simply submit your booking request with your preferred date and time, and our team will confirm availability.',
    },
    {
      question: 'Do you provide airport transportation?',
      answer: 'Yes! Airport transfers are one of our core services. We provide pickups and drop-offs at all major Canadian airports with flight tracking, meet & greet, and luggage assistance.',
    },
    {
      question: 'What areas do you serve?',
      answer: 'We serve the Greater Toronto Area including Toronto, Mississauga, Brampton, Vaughan, and Hamilton, as well as major cities across Canada. Contact us for intercity and long-distance transfers.',
    },
    {
      question: 'Are your drivers licensed and insured?',
      answer: 'All our chauffeurs are fully licensed, insured, and background-checked with years of professional driving experience.',
    },
    {
      question: 'What amenities are included?',
      answer: 'All vehicles include Wi-Fi, climate control, premium sound systems, leather seats, bottled water, and phone chargers. Luxury models feature heated seats and entertainment systems.',
    },
    {
      question: 'Do you track flights for airport pickups?',
      answer: 'Yes! We automatically track your flight in real-time. If your flight is delayed or arrives early, we adjust your pickup time at no extra charge.',
    },
    {
      question: 'How does pricing work?',
      answer: 'High5 Limo uses a manual quote system. Submit your booking request and our admin team will contact you with a personalized, transparent quote. No automatic fare calculator — every trip is priced individually.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-20 bg-[#0F0F0F]">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#0F0F0F] via-[#0B1F3A] to-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Frequently Asked <span className="text-[#D4AF37]">Questions</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Find answers to common questions about our luxury limousine services.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#2A2A2A] transition-colors"
                >
                  <span className="text-lg text-white pr-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-[#D4AF37]" />
                    ) : (
                      <Plus className="w-5 h-5 text-[#D4AF37]" />
                    )}
                  </div>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-5 pt-2 border-t border-[#D4AF37]/10">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-[#0B1F3A]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Still Have <span className="text-[#D4AF37]">Questions?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our team is here to help! Contact us anytime, and we'll be happy to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-block bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90 px-8 py-4 rounded-md transition-colors text-lg font-semibold">
              Contact Us
            </Link>
            <a href={`tel:${SITE_PHONE}`} className="inline-block border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0B0B] px-8 py-4 rounded-md transition-colors text-lg font-semibold">
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
