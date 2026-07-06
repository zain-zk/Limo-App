import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Calculator, DollarSign, Info } from 'lucide-react';

export function Pricing() {
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    date: '',
    vehicleType: '',
    passengers: '1',
  });

  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);

  const vehiclePrices: Record<string, number> = {
    yukon: 75,
    denali: 95,
    escalade: 120,
    suburban: 85,
  };

  const calculateFare = () => {
    if (!formData.vehicleType || !formData.passengers) {
      setEstimatedFare(null);
      return;
    }

    const basePrice = vehiclePrices[formData.vehicleType] || 75;
    const passengerCount = parseInt(formData.passengers) || 1;
    const passengerFee = (passengerCount - 1) * 5;
    const total = basePrice + passengerFee;

    setEstimatedFare(total);
  };

  useEffect(() => {
    if (formData.vehicleType && formData.passengers) {
      calculateFare();
    }
  }, [formData.vehicleType, formData.passengers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateFare();
  };

  return (
    <div className="min-h-screen pt-20 bg-[#0F0F0F]">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#0F0F0F] via-[#0B1F3A] to-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Transparent <span className="text-[#D4AF37]">Pricing</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Get an instant estimate for your luxury transportation needs. No hidden fees.
          </p>
        </div>
      </section>

      {/* Quote Calculator */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-2">
              <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <Calculator className="w-6 h-6 text-[#D4AF37]" />
                    Get Your <span className="text-[#D4AF37]">Quote</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="pickup" className="text-white">
                        Pickup Location
                      </Label>
                      <Input
                        id="pickup"
                        name="pickup"
                        value={formData.pickup}
                        onChange={handleChange}
                        placeholder="Enter pickup address"
                        className="mt-2 bg-[#0F0F0F] border-[#D4AF37]/20 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="dropoff" className="text-white">
                        Drop-off Location
                      </Label>
                      <Input
                        id="dropoff"
                        name="dropoff"
                        value={formData.dropoff}
                        onChange={handleChange}
                        placeholder="Enter drop-off address"
                        className="mt-2 bg-[#0F0F0F] border-[#D4AF37]/20 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="date" className="text-white">
                        Date
                      </Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-2 bg-[#0F0F0F] border-[#D4AF37]/20 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="vehicleType" className="text-white">
                        Vehicle Type *
                      </Label>
                      <select
                        id="vehicleType"
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        className="mt-2 w-full h-10 px-3 rounded-md bg-[#0F0F0F] border border-[#D4AF37]/20 text-white"
                      >
                        <option value="">Select a vehicle</option>
                        <option value="yukon">GMC Yukon XL - $75 base</option>
                        <option value="denali">GMC Yukon Denali - $95 base</option>
                        <option value="escalade">Cadillac Escalade - $120 base</option>
                        <option value="suburban">Chevrolet Suburban - $85 base</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="passengers" className="text-white">
                        Number of Passengers
                      </Label>
                      <Input
                        id="passengers"
                        name="passengers"
                        type="number"
                        min="1"
                        max="10"
                        value={formData.passengers}
                        onChange={handleChange}
                        className="mt-2 bg-[#0F0F0F] border-[#D4AF37]/20 text-white"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90 text-lg py-6"
                    >
                      Calculate Fare
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Estimate Display */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-[#D4AF37] to-[#D4AF37]/80 border-none">
                <CardContent className="p-8 text-center">
                  <DollarSign className="w-12 h-12 text-[#0F0F0F] mx-auto mb-4" />
                  <h3 className="text-lg text-[#0F0F0F] mb-2">Estimated Fare</h3>
                  {estimatedFare !== null ? (
                    <div>
                      <div className="text-5xl text-[#0F0F0F] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        ${estimatedFare}
                      </div>
                      <p className="text-sm text-[#0F0F0F]/80">Base rate per trip</p>
                    </div>
                  ) : (
                    <div className="text-[#0F0F0F] text-lg">Select vehicle and passengers to see estimate</div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Info className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white mb-2">Important Notes</h4>
                      <ul className="space-y-2 text-sm text-gray-400">
                        <li>• This is an estimated base fare</li>
                        <li>• Final price confirmed by admin</li>
                        <li>• Additional fees may apply for:</li>
                        <li className="ml-4">- Wait time</li>
                        <li className="ml-4">- Tolls & parking</li>
                        <li className="ml-4">- Late-night service</li>
                        <li>• All prices in CAD</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Information */}
      <section className="py-20 bg-[#0B1F3A]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl text-white mb-12 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            What's <span className="text-[#D4AF37]">Included</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Professional chauffeur',
              'Fuel & vehicle maintenance',
              'Insurance coverage',
              'Wi-Fi connectivity',
              'Climate control',
              'Premium sound system',
              'Bottled water',
              'Phone chargers',
              'Luggage assistance',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-white">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Ready to <span className="text-[#D4AF37]">Book?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">Get your luxury ride confirmed in minutes.</p>
          <Button className="bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90 text-lg px-8 py-6">
            Book Now
          </Button>
        </div>
      </section>
    </div>
  );
}
