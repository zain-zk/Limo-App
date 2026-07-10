import { useState } from 'react';
import { useLocation } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Calendar, Clock, User, Phone, MapPin, Users, Briefcase, Plane, AlertCircle, CheckCircle, CreditCard, Wallet } from 'lucide-react';
import { SERVICE_TYPES } from '../../lib/constants';
import { submitBooking } from '../../lib/api';

export function BookNow() {
  const location = useLocation();
  const quick = (location.state as { quickBooking?: Record<string, string> })?.quickBooking;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    pickupAddress: quick?.pickup || '',
    dropoffAddress: quick?.dropoff || '',
    date: quick?.date || '',
    time: quick?.time || '',
    passengers: quick?.passengers || '1',
    luggage: quick?.luggage || '1',
    serviceType: quick?.serviceType || '',
    flightNumber: '',
    specialInstructions: '',
    paymentMethod: 'driver' as 'online' | 'driver',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.pickupAddress.trim()) newErrors.pickupAddress = 'Pickup address is required';
    if (!formData.dropoffAddress.trim()) newErrors.dropoffAddress = 'Drop-off address is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.passengers || parseInt(formData.passengers) < 1) newErrors.passengers = 'Number of passengers is required';
    if (!formData.luggage && formData.luggage !== '0') newErrors.luggage = 'Number of bags is required';
    if (!formData.serviceType) newErrors.serviceType = 'Service type is required';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment option is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await submitBooking(formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          fullName: '', phone: '', pickupAddress: '', dropoffAddress: '',
          date: '', time: '', passengers: '1', luggage: '1', serviceType: '',
          flightNumber: '', specialInstructions: '', paymentMethod: 'driver',
        });
      }, 5000);
    } catch (err) {
      setErrors({ submit: err instanceof Error ? err.message : 'Failed to submit booking' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-[#0B0B0B]">
      <section className="py-20 bg-gradient-to-br from-[#0B0B0B] via-[#0B1F3A] to-[#0B0B0B]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Book Your <span className="text-[#D4AF37]">Luxury Ride</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300">Submit your request and our team will contact you with a personalized quote.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {submitted ? (
            <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
              <CardContent className="p-12 text-center">
                <CheckCircle className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                <h3 className="text-3xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Booking Request Sent!</h3>
                <p className="text-gray-300 text-lg">Thank you for choosing High5 Limo. Our team will review your request and contact you shortly with a quote.</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
              <CardHeader>
                <CardTitle className="text-3xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>Booking <span className="text-[#D4AF37]">Details</span></CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl text-[#D4AF37]" style={{ fontFamily: 'var(--font-heading)' }}>Customer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="fullName" className="text-white flex items-center gap-2"><User className="w-4 h-4" /> Full Name *</Label>
                        <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Smith" className={`mt-2 bg-[#0B0B0B] border-[#D4AF37]/20 text-white ${errors.fullName ? 'border-red-500' : ''}`} />
                        {errors.fullName && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.fullName}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="phone" className="text-white flex items-center gap-2"><Phone className="w-4 h-4" /> Phone Number *</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 (234) 567-890" className={`mt-2 bg-[#0B0B0B] border-[#D4AF37]/20 text-white ${errors.phone ? 'border-red-500' : ''}`} />
                        {errors.phone && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl text-[#D4AF37]" style={{ fontFamily: 'var(--font-heading)' }}>Trip Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pickupAddress" className="text-white flex items-center gap-2"><MapPin className="w-4 h-4" /> Pickup Address *</Label>
                        <Input id="pickupAddress" name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} className={`mt-2 bg-[#0B0B0B] border-[#D4AF37]/20 text-white ${errors.pickupAddress ? 'border-red-500' : ''}`} />
                        {errors.pickupAddress && <p className="text-red-500 text-sm mt-1">{errors.pickupAddress}</p>}
                      </div>
                      <div>
                        <Label htmlFor="dropoffAddress" className="text-white flex items-center gap-2"><MapPin className="w-4 h-4" /> Drop-off Address *</Label>
                        <Input id="dropoffAddress" name="dropoffAddress" value={formData.dropoffAddress} onChange={handleChange} className={`mt-2 bg-[#0B0B0B] border-[#D4AF37]/20 text-white ${errors.dropoffAddress ? 'border-red-500' : ''}`} />
                        {errors.dropoffAddress && <p className="text-red-500 text-sm mt-1">{errors.dropoffAddress}</p>}
                      </div>
                      <div>
                        <Label htmlFor="date" className="text-white flex items-center gap-2"><Calendar className="w-4 h-4" /> Date *</Label>
                        <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className={`mt-2 bg-[#0B0B0B] border-[#D4AF37]/20 text-white ${errors.date ? 'border-red-500' : ''}`} />
                        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                      </div>
                      <div>
                        <Label htmlFor="time" className="text-white flex items-center gap-2"><Clock className="w-4 h-4" /> Time *</Label>
                        <Input id="time" name="time" type="time" value={formData.time} onChange={handleChange} className={`mt-2 bg-[#0B0B0B] border-[#D4AF37]/20 text-white ${errors.time ? 'border-red-500' : ''}`} />
                        {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                      </div>
                      <div>
                        <Label htmlFor="passengers" className="text-white flex items-center gap-2"><Users className="w-4 h-4" /> Passengers *</Label>
                        <Input id="passengers" name="passengers" type="number" min="1" max="10" value={formData.passengers} onChange={handleChange} className={`mt-2 bg-[#0B0B0B] border-[#D4AF37]/20 text-white ${errors.passengers ? 'border-red-500' : ''}`} />
                        {errors.passengers && <p className="text-red-500 text-sm mt-1">{errors.passengers}</p>}
                      </div>
                      <div>
                        <Label htmlFor="luggage" className="text-white flex items-center gap-2"><Briefcase className="w-4 h-4" /> Bags / Luggage *</Label>
                        <Input id="luggage" name="luggage" type="number" min="0" max="15" value={formData.luggage} onChange={handleChange} className={`mt-2 bg-[#0B0B0B] border-[#D4AF37]/20 text-white ${errors.luggage ? 'border-red-500' : ''}`} />
                        {errors.luggage && <p className="text-red-500 text-sm mt-1">{errors.luggage}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="serviceType" className="text-white">Service Type *</Label>
                        <select id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleChange} className={`mt-2 w-full h-10 px-3 rounded-md bg-[#0B0B0B] border text-white ${errors.serviceType ? 'border-red-500' : 'border-[#D4AF37]/20'}`}>
                          <option value="">Select a service</option>
                          {SERVICE_TYPES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                        {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="flightNumber" className="text-white flex items-center gap-2"><Plane className="w-4 h-4" /> Flight Number (Optional)</Label>
                        <Input id="flightNumber" name="flightNumber" value={formData.flightNumber} onChange={handleChange} placeholder="e.g. AC123" className="mt-2 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="specialInstructions" className="text-white">Special Instructions (Optional)</Label>
                        <Textarea id="specialInstructions" name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} rows={4} className="mt-2 bg-[#0B0B0B] border-[#D4AF37]/20 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl text-[#D4AF37]" style={{ fontFamily: 'var(--font-heading)' }}>Payment Option *</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${formData.paymentMethod === 'online' ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-[#D4AF37]/20 bg-[#0B0B0B]'}`}>
                        <input type="radio" name="paymentMethod" value="online" checked={formData.paymentMethod === 'online'} onChange={handleChange} className="mt-1" />
                        <div>
                          <div className="flex items-center gap-2 text-white font-semibold"><CreditCard className="w-5 h-5 text-[#D4AF37]" /> Pay Online</div>
                          <p className="text-gray-400 text-sm mt-1">After we send your quote, you'll get a secure Stripe payment link to pay by card.</p>
                        </div>
                      </label>
                      <label className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${formData.paymentMethod === 'driver' ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-[#D4AF37]/20 bg-[#0B0B0B]'}`}>
                        <input type="radio" name="paymentMethod" value="driver" checked={formData.paymentMethod === 'driver'} onChange={handleChange} className="mt-1" />
                        <div>
                          <div className="flex items-center gap-2 text-white font-semibold"><Wallet className="w-5 h-5 text-[#D4AF37]" /> Pay Driver</div>
                          <p className="text-gray-400 text-sm mt-1">Pay in person during your ride.</p>
                        </div>
                      </label>
                    </div>
                    {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}
                  </div>

                  {errors.submit && <p className="text-red-500 text-center">{errors.submit}</p>}

                  <Button type="submit" disabled={submitting} className="w-full bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90 text-lg py-6 font-semibold">
                    {submitting ? 'Submitting...' : 'Submit Booking Request'}
                  </Button>
                  <p className="text-gray-400 text-sm text-center">* Required fields. Our team will contact you with a personalized quote.</p>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
