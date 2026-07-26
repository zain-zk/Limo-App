import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Link } from 'react-router';
import { useContent } from '../../context/ContentContext';
import { phoneHref } from '../../lib/phone';
import { PageHero } from '../../components/PageHero';
import { Seo } from '../../components/Seo';

export function FAQ() {
  const { faq, site } = useContent();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-20 bg-[#0F0F0F]">
      <Seo title="FAQ | High5 Limo" description="Answers to common questions about bookings, quotes, payments, and our services." path="/faq" />
      <PageHero title={faq.heroTitle} titleHighlight={faq.heroHighlight} subtitle={faq.heroSubtitle} />

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {faq.items.map((item, index) => (
              <div key={index} className={`bg-[#1A1A1A] border rounded-lg overflow-hidden transition-colors ${openIndex === index ? 'border-[#D4AF37]/50' : 'border-[#D4AF37]/15 hover:border-[#D4AF37]/40'}`}>
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#2A2A2A] transition-colors"
                >
                  <span className="text-lg text-white pr-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.question}
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
                    <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0B1F3A]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            {faq.ctaTitle} <span className="text-[#D4AF37]">{faq.ctaHighlight}</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">{faq.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-block bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90 px-8 py-4 rounded-md transition-colors text-lg font-semibold">
              Contact Us
            </Link>
            <a href={phoneHref(site.phone)} className="inline-block border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0B0B] px-8 py-4 rounded-md transition-colors text-lg font-semibold">
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
