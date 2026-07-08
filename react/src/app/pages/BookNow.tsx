import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Calendar, Clock, User, Mail, Phone, MapPin, Users, AlertCircle, CheckCircle } from 'lucide-react';

export function BookNow() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pickupAddress: '',
    dropoffAddress: '',
    date: '',
    time: '',
    passengers: '1',
    serviceType: '',
    specialInstructions: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
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
    if (!formData.pickupAddress.trim()) newErrors.pickupAddress = 'Pickup address is required';
    if (!formData.dropoffAddress.trim()) newErrors.dropoffAddress = 'Drop-off address is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.passengers || parseInt(formData.passengers) < 1) {
      newErrors.passengers = 'Number of passengers is required';
    }
    if (!formData.serviceType) newErrors.serviceType = 'Service type is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Booking submitted:', formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          pickupAddress: '',
          dropoffAddress: '',
          date: '',
          time: '',
          passengers: '1',
          serviceType: '',
          specialInstructions: '',
        });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-[#0F0F0F]">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#0F0F0F] via-[#0B1F3A] to-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Book Your <span className="text-[#D4AF37]">Luxury Ride</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Fill out the form below and we'll confirm your booking within minutes.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {submitted ? (
            <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-[#D4AF37]" />
                </div>
                <h3 className="text-3xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  Booking Request Sent!
                </h3>
                <p className="text-gray-300 text-lg">
                  Thank you for choosing High5 Limo. We've received your booking request and will contact you shortly
                  to confirm the details.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
              <CardHeader>
                <CardTitle className="text-3xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  Booking <span className="text-[#D4AF37]">Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-xl text-[#D4AF37]" style={{ fontFamily: 'var(--font-heading)' }}>
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="fullName" className="text-white flex items-center gap-2">
                          <User className="w-4 h-4" /> Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={`mt-2 bg-[#0F0F0F] border-[#D4AF37]/20 text-white ${
                            errors.fullName ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.fullName}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white flex items-center gap-2">
                          <Mail className="w-4 h-4" /> Email *
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
                        <Label htmlFor="phone" className="text-white flex items-center gap-2">
                          <Phone className="w-4 h-4" /> Phone *
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
                  </div>

                  {/* Trip Details */}
                  <div className="space-y-4">
                    <h3 className="text-xl text-[#D4AF37]" style={{ fontFamily: 'var(--font-heading)' }}>
                      Trip Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pickupAddress" className="text-white flex items-center gap-2">
                          <MapPin className="w-4 h-4" /> Pickup Address *
                        </Label>
                        <Input
                          id="pickupAddress"
                          name="pickupAddress"
                          value={formData.pickupAddress}
                          onChange={handleChange}
                          placeholder="123 Main St, Toronto, ON"
                          className={`mt-2 bg-[#0F0F0F] border-[#D4AF37]/20 text-white ${
                            errors.pickupAddress ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.pickupAddress && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.pickupAddress}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="dropoffAddress" className="text-white flex items-center gap-2">
                          <MapPin className="w-4 h-4" /> Drop-off Address *
                        </Label>
                        <Input
                          id="dropoffAddress"
                          name="dropoffAddress"
                          value={formData.dropoffAddress}
                          onChange={handleChange}
                          placeholder="Toronto Pearson Airport"
                          className={`mt-2 bg-[#0F0F0F] border-[#D4AF37]/20 text-white ${
                            errors.dropoffAddress ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.dropoffAddress && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.dropoffAddress}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="date" className="text-white flex items-center gap-2">
                          <Calendar className="w-4 h-4" /> Date *
                        </Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className={`mt-2 bg-[#0F0F0F] border-[#D4AF37]/20 text-white ${
                            errors.date ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.date && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.date}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="time" className="text-white flex items-center gap-2">
                          <Clock className="w-4 h-4" /> Time *
                        </Label>
                        <Input
                          id="time"
                          name="time"
                          type="time"
                          value={formData.time}
                          onChange={handleChange}
                          className={`mt-2 bg-[#0F0F0F] border-[#D4AF37]/20 text-white ${
                            errors.time ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.time && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.time}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="passengers" className="text-white flex items-center gap-2">
                          <Users className="w-4 h-4" /> Number of Passengers *
                        </Label>
                        <Input
                          id="passengers"
                          name="passengers"
                          type="number"
                          min="1"
                          max="10"
                          value={formData.passengers}
                          onChange={handleChange}
                          className={`mt-2 bg-[#0F0F0F] border-[#D4AF37]/20 text-white ${
                            errors.passengers ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.passengers && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.passengers}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="serviceType" className="text-white">
                          Service Type *
                        </Label>
                        <select
                          id="serviceType"
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          className={`mt-2 w-full h-10 px-3 rounded-md bg-[#0F0F0F] border text-white ${
                            errors.serviceType ? 'border-red-500' : 'border-[#D4AF37]/20'
                          }`}
                        >
                          <option value="">Select a service</option>
                          <option value="airport">Airport Transfer</option>
                          <option value="wedding">Wedding</option>
                          <option value="corporate">Corporate</option>
                          <option value="special">Special Event</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.serviceType && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.serviceType}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="specialInstructions" className="text-white">
                          Special Instructions (Optional)
                        </Label>
                        <Textarea
                          id="specialInstructions"
                          name="specialInstructions"
                          value={formData.specialInstructions}
                          onChange={handleChange}
                          placeholder="Any special requests or additional information..."
                          rows={4}
                          className="mt-2 bg-[#0F0F0F] border-[#D4AF37]/20 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90 text-lg py-6">
                    Submit Booking Request
                  </Button>

                  <p className="text-gray-400 text-sm text-center">
                    * Required fields. We'll contact you within 15 minutes to confirm your booking.
                  </p>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
