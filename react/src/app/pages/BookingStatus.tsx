import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, AlertCircle, ExternalLink, MapPin, Calendar, Car } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { lookupBookingStatus, type BookingStatusResult } from '../../lib/api';
import { Seo } from '../../components/Seo';
import { PageHero } from '../../components/PageHero';
import { StatusBadge } from '../../components/StatusBadge';

export function BookingStatus() {
  const { t } = useTranslation();
  const [bookingId, setBookingId] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<BookingStatusResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await lookupBookingStatus(bookingId.trim(), email.trim());
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('bookingStatus.notFound'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-[#0B0B0B]">
      <Seo title="Booking Status | High5 Limo" description="Check your limo booking status, quote, and payment link." path="/booking/status" />
      <PageHero title={t('bookingStatus.title')} subtitle={t('bookingStatus.subtitle')} />

      <section className="py-16 pb-24">
        <div className="max-w-xl mx-auto px-4">
          <Card className="bg-[#1A1A1A] border-[#D4AF37]/20 shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label className="text-white">{t('bookingStatus.bookingId')}</Label>
                  <Input
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    placeholder="Paste your booking ID from confirmation email"
                    className="mt-2 bg-[#0B0B0B] border-[#D4AF37]/20 text-white"
                    required
                  />
                </div>
                <div>
                  <Label className="text-white">{t('bookingStatus.email')}</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Same email used when booking"
                    className="mt-2 bg-[#0B0B0B] border-[#D4AF37]/20 text-white"
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90 py-6 font-semibold">
                  <Search className="w-4 h-4 mr-2" />
                  {loading ? t('common.loading') : t('bookingStatus.lookup')}
                </Button>
              </form>
              {error && (
                <p className="text-red-400 text-sm mt-4 flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </p>
              )}
            </CardContent>
          </Card>

          {result && (
            <Card className="bg-[#1A1A1A] border-[#D4AF37]/30 mt-8 shadow-xl">
              <CardContent className="p-8 space-y-5">
                <div className="flex flex-wrap gap-2">
                  <StatusBadge label={result.status} />
                  <StatusBadge label={result.paymentStatus} />
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 text-gray-300">
                    <Calendar className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                    <span>{result.date} at {result.time}</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-300">
                    <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                    <span>{result.pickupAddress} → {result.dropoffAddress}</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-400">
                    <Car className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                    <span>
                      {result.serviceType}
                      {result.vehicleSelection ? ` · ${result.vehicleSelection}` : ''}
                    </span>
                  </div>
                </div>

                {result.quoteAmount != null && (
                  <div className="border-t border-[#D4AF37]/10 pt-4">
                    <p className="text-gray-400 text-xs mb-1">Your Quote</p>
                    <p className="text-[#D4AF37] text-3xl font-semibold">${Number(result.quoteAmount).toFixed(2)} <span className="text-lg">CAD</span></p>
                    {result.quoteNotes && <p className="text-gray-400 text-sm mt-2">{result.quoteNotes}</p>}
                  </div>
                )}

                {result.paymentUrl && (
                  <a
                    href={result.paymentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90 font-semibold py-4 rounded-lg transition-colors"
                  >
                    Pay Online Securely <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
