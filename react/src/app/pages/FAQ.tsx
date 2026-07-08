import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I book a ride with High5 Limo?',
      answer:
        'Booking with High5 Limo is easy! You can book through our website by filling out the booking form, calling our 24/7 hotline at +1 (234) 567-890, or sending us a message on WhatsApp. Simply provide your pickup location, destination, date, and time, and we\'ll confirm your reservation within minutes.',
    },
    {
      question: 'Do you operate 24/7?',
      answer:
        'Yes! High5 Limo operates 24 hours a day, 7 days a week, including holidays. Whether you need an early morning airport pickup or late-night event transportation, our professional chauffeurs are always ready to serve you.',
    },
    {
      question: 'Can I cancel or modify my booking?',
      answer:
        'Yes, you can cancel or modify your booking. We require at least 4 hours notice for cancellations to receive a full refund. For modifications to your trip (time, location, etc.), please contact us as soon as possible. We\'ll do our best to accommodate your changes based on availability.',
    },
    {
      question: 'How is pricing calculated?',
      answer:
        'Our pricing is based on several factors including vehicle type, distance, duration, and time of day. Base rates start at $75 for our GMC Yukon XL. Additional costs may include wait time, tolls, parking fees, and gratuity. Use our online quote calculator for an instant estimate, or contact us for a detailed quote. All prices are in Canadian dollars.',
    },
    {
      question: 'Do you provide child seats?',
      answer:
        'Yes, we can provide child safety seats upon request at no additional charge. We have infant seats, convertible seats, and booster seats available. Please specify your child seat requirements when booking, including the child\'s age and weight, so we can ensure the appropriate seat is installed.',
    },
    {
      question: 'What areas do you serve?',
      answer:
        'High5 Limo serves all major cities and airports across Canada, including Toronto, Vancouver, Montreal, Calgary, and Ottawa. We also provide long-distance intercity transfers. Contact us if you\'re unsure whether we serve your location.',
    },
    {
      question: 'Are your drivers licensed and insured?',
      answer:
        'Absolutely! All our chauffeurs are fully licensed, insured, and have undergone comprehensive background checks. They are professional drivers with years of experience and training in customer service, safety, and defensive driving.',
    },
    {
      question: 'What amenities are included in your vehicles?',
      answer:
        'All our vehicles come standard with Wi-Fi connectivity, climate control, premium sound systems, leather seats, bottled water, and phone chargers. Our luxury models also feature heated/cooled seats, entertainment systems, and panoramic sunroofs.',
    },
    {
      question: 'Do you track flights for airport pickups?',
      answer:
        'Yes! When you book an airport transfer, we automatically track your flight in real-time. If your flight is delayed or arrives early, we adjust your pickup time accordingly at no extra charge. Your chauffeur will be ready when you land.',
    },
    {
      question: 'What is your payment policy?',
      answer:
        'We accept all major credit cards, debit cards, and cash. Payment can be made when booking online or after your trip. For corporate clients, we offer invoicing and account services. Gratuity is not included in the base fare but is always appreciated for exceptional service.',
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
            <a
              href="/contact"
              className="inline-block bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90 px-8 py-4 rounded-md transition-colors text-lg font-medium"
            >
              Contact Us
            </a>
            <a
              href="tel:+1234567890"
              className="inline-block border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F0F0F] px-8 py-4 rounded-md transition-colors text-lg font-medium"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
