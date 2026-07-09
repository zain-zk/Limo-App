import { Shield, Award, Users, Clock, Car, Heart } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'All our drivers are licensed, insured, and undergo rigorous background checks.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards of service quality and professionalism.',
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Your satisfaction is our priority. We go above and beyond for every client.',
    },
    {
      icon: Clock,
      title: 'Punctuality',
      description: 'We value your time. Our drivers are always on time, every time.',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#0F0F0F] via-[#0B1F3A] to-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            About <span className="text-[#D4AF37]">High5 Limo</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Canada's premier luxury limousine service, dedicated to providing exceptional transportation experiences.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-[#0F0F0F]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Our <span className="text-[#D4AF37]">Story</span>
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Founded with a vision to redefine luxury transportation in Canada, High5 Limo has been serving
                  discerning clients for over a decade. What started as a small operation with a single vehicle has
                  grown into one of Canada's most trusted premium limousine services.
                </p>
                <p>
                  We pride ourselves on our commitment to punctuality, professionalism, and providing an unparalleled
                  luxury experience. Every member of our team is dedicated to ensuring your journey is not just a ride,
                  but a memorable experience.
                </p>
                <p>
                  Our fleet of meticulously maintained GMC and Cadillac vehicles represents the pinnacle of automotive
                  luxury. Each vehicle is equipped with premium amenities to ensure your comfort, whether you're heading
                  to the airport, a wedding, or a corporate event.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-lg p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-[#D4AF37] text-6xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  10+
                </div>
                <div className="text-white text-xl">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PDF-required focus areas */}
      <section className="py-20 bg-[#0B1F3A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Award, title: 'Professional Experience', description: 'Over 10 years serving Canada with expert chauffeurs trained in safety, discretion, and luxury hospitality.' },
              { icon: Shield, title: 'Commitment To Safety', description: 'Licensed, insured drivers with background checks. Every vehicle maintained to the highest safety standards.' },
              { icon: Car, title: 'Commitment To Luxury Service', description: 'Premium GMC luxury vehicles with leather interiors, climate control, Wi-Fi, and amenities for every journey.' },
              { icon: Heart, title: 'Customer Satisfaction Focus', description: 'Your comfort and satisfaction drive everything we do — from booking to drop-off, we exceed expectations.' },
            ].map((item, index) => (
              <div key={index} className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-[#0B1F3A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Our <span className="text-[#D4AF37]">Core Values</span>
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-10 h-10 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  {value.title}
                </h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl text-white mb-12 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            Why Choose <span className="text-[#D4AF37]">Us</span>
          </h2>
          <div className="space-y-6">
            {[
              {
                title: 'Licensed & Insured',
                description:
                  'All our drivers are fully licensed, insured, and have passed comprehensive background checks.',
              },
              {
                title: 'Professional Chauffeurs',
                description:
                  'Our drivers are not just skilled behind the wheel; they are trained professionals who understand the importance of discretion, courtesy, and punctuality.',
              },
              {
                title: 'Premium Fleet',
                description:
                  'We maintain a fleet of luxury GMC and Cadillac vehicles, meticulously cleaned and maintained to the highest standards.',
              },
              {
                title: '24/7 Availability',
                description:
                  'Whether you need an early morning airport pickup or late-night event transportation, we are always available to serve you.',
              },
              {
                title: 'Competitive Pricing',
                description:
                  'Luxury doesn\'t have to break the bank. We offer transparent, competitive pricing with no hidden fees.',
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-4 p-6 bg-[#1A1A1A] rounded-lg border border-[#D4AF37]/20">
                <div className="flex-shrink-0 w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></div>
                <div>
                  <h3 className="text-xl text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.title}
                  </h3>
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
