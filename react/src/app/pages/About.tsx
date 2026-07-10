import { useContent } from '../../context/ContentContext';
import { resolveIcon } from '../../lib/icons';

export function About() {
  const { about } = useContent();

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-gradient-to-br from-[#0F0F0F] via-[#0B1F3A] to-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            {about.heroTitle} <span className="text-[#D4AF37]">{about.heroHighlight}</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 leading-relaxed">{about.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-20 bg-[#0F0F0F]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                {about.storyTitle} <span className="text-[#D4AF37]">{about.storyHighlight}</span>
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                {about.storyParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-lg p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-[#D4AF37] text-6xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  {about.yearsValue}
                </div>
                <div className="text-white text-xl">{about.yearsLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0B1F3A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {about.focusAreas.map((item, index) => {
              const Icon = resolveIcon(item.icon);
              return (
                <div key={index} className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0B1F3A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Our <span className="text-[#D4AF37]">Core Values</span>
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.values.map((value, index) => {
              const Icon = resolveIcon(value.icon);
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl text-white mb-12 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            Why Choose <span className="text-[#D4AF37]">Us</span>
          </h2>
          <div className="space-y-6">
            {about.whyChooseUs.map((item, index) => (
              <div key={index} className="flex gap-4 p-6 bg-[#1A1A1A] rounded-lg border border-[#D4AF37]/20">
                <div className="flex-shrink-0 w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></div>
                <div>
                  <h3 className="text-xl text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
