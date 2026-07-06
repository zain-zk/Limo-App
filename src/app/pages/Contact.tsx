import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Contact form submitted:', formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-[#0F0F0F]">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#0F0F0F] via-[#0B1F3A] to-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Get in <span className="text-[#D4AF37]">Touch</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Have questions or ready to book? We're here to help 24/7.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        Phone
                      </h3>
                      <a href="tel:+1234567890" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                        +1 (234) 567-890
                      </a>
                      <p className="text-gray-500 text-sm mt-1">24/7 Available</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        Email
                      </h3>
                      <a
                        href="mailto:info@high5limo.com"
                        className="text-gray-300 hover:text-[#D4AF37] transition-colors"
                      >
                        info@high5limo.com
                      </a>
                      <p className="text-gray-500 text-sm mt-1">Response within 1 hour</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        WhatsApp
                      </h3>
                      <p className="text-gray-300 mb-3">Chat with us instantly</p>
                      <Button className="bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90">
                        Open WhatsApp
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        Location
                      </h3>
                      <p className="text-gray-300">
                        123 Luxury Lane
                        <br />
                        Toronto, ON M5H 2N2
                        <br />
                        Canada
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        Hours
                      </h3>
                      <p className="text-gray-300">
                        Open 24/7
                        <br />
                        Every Day of the Year
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-3xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-300 text-lg">
                      Thank you for contacting High5 Limo. We'll get back to you within 1 hour.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
                  <CardContent className="p-8">
                    <h2 className="text-3xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                      Send Us a <span className="text-[#D4AF37]">Message</span>
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="name" className="text-white">
                          Your Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={`mt-2 bg-[#0F0F0F] border-[#D4AF37]/20 text-white ${
                            errors.name ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email" className="text-white">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className={`mt-2 bg-[#0F0F0F] border-[#D4AF37]/20 text-white ${
                              errors.email ? 'border-red-500' : ''
                            }`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="phone" className="text-white">
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (234) 567-890"
                            className={`mt-2 bg-[#0F0F0F] border-[#D4AF37]/20 text-white ${
                              errors.phone ? 'border-red-500' : ''
                            }`}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-white">
                          Your Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your transportation needs..."
                          rows={6}
                          className={`mt-2 bg-[#0F0F0F] border-[#D4AF37]/20 text-white ${
                            errors.message ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90 text-lg py-6 flex items-center justify-center gap-2"
                      >
                        <Send className="w-5 h-5" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Map */}
              <Card className="bg-[#1A1A1A] border-[#D4AF37]/20 mt-8">
                <CardContent className="p-0">
                  <div className="h-64 bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="w-12 h-12 mx-auto mb-2 text-[#D4AF37]" />
                      <p>Map Placeholder</p>
                      <p className="text-sm">Toronto, ON, Canada</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
