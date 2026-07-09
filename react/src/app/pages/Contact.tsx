import { useState } from 'react';
import { Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { SITE_PHONE, SITE_PHONE_DISPLAY } from '../../lib/constants';
import { submitContact } from '../../lib/api';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      await submitContact(formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', phone: '', message: '' });
      }, 3000);
    } catch (err) {
      setErrors({ submit: err instanceof Error ? err.message : 'Failed to send message' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-[#0B0B0B]">
      <section className="py-20 bg-gradient-to-br from-[#0B0B0B] via-[#0B1F3A] to-[#0B0B0B]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Contact <span className="text-[#D4AF37]">Us</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300">Have questions or ready to book? Call us 24/7.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-2xl text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Phone</h3>
                <a href={`tel:${SITE_PHONE}`} className="text-2xl text-[#D4AF37] hover:underline block mb-4">{SITE_PHONE_DISPLAY}</a>
                <p className="text-gray-400 mb-6">Available 24/7, every day of the year</p>
                <a href={`tel:${SITE_PHONE}`}>
                  <Button className="w-full bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90 text-lg py-6 font-semibold">Call Now</Button>
                </a>
              </CardContent>
            </Card>

            <div>
              {submitted ? (
                <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
                  <CardContent className="p-12 text-center">
                    <CheckCircle className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                    <h3 className="text-3xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Message Sent!</h3>
                    <p className="text-gray-300 text-lg">We'll get back to you shortly.</p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
                  <CardContent className="p-8">
                    <h2 className="text-3xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Send a <span className="text-[#D4AF37]">Message</span></h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="name" className="text-white">Name *</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} className={`mt-2 bg-[#0B0B0B] border-[#D4AF37]/20 text-white ${errors.name ? 'border-red-500' : ''}`} />
                        {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className={`mt-2 bg-[#0B0B0B] border-[#D4AF37]/20 text-white ${errors.phone ? 'border-red-500' : ''}`} />
                        {errors.phone && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                      </div>
                      <div>
                        <Label htmlFor="message" className="text-white">Message *</Label>
                        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={6} className={`mt-2 bg-[#0B0B0B] border-[#D4AF37]/20 text-white ${errors.message ? 'border-red-500' : ''}`} />
                        {errors.message && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
                      </div>
                      {errors.submit && <p className="text-red-500 text-center">{errors.submit}</p>}
                      <Button type="submit" disabled={submitting} className="w-full bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90 text-lg py-6 font-semibold flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />{submitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
