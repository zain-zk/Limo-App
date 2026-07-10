import { Link, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { fetchPaymentSession } from '../../lib/api';

export function PaymentSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const bookingId = params.get('booking_id');
  const [loading, setLoading] = useState(Boolean(sessionId));
  const [booking, setBooking] = useState<{
    id: string;
    fullName: string;
    quoteAmount?: number | null;
    paymentStatus?: string;
    status?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    fetchPaymentSession(sessionId)
      .then((data) => {
        setBooking(data.booking);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Could not verify payment');
      })
      .finally(() => setLoading(false));
  }, [sessionId]);

  return (
    <div className="min-h-screen pt-20 bg-[#0B0B0B]">
      <section className="py-20">
        <div className="max-w-xl mx-auto px-4">
          <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
            <CardContent className="p-10 text-center">
              {loading ? (
                <Loader2 className="w-12 h-12 animate-spin text-[#D4AF37] mx-auto" />
              ) : (
                <>
                  <CheckCircle className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                  <h1 className="text-3xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    Payment <span className="text-[#D4AF37]">Received</span>
                  </h1>
                  <p className="text-gray-300 mb-6">
                    Thank you{booking?.fullName ? `, ${booking.fullName}` : ''}. Your ride is confirmed. Our team will contact you with trip details.
                  </p>
                  {booking?.quoteAmount != null && (
                    <p className="text-[#D4AF37] text-xl mb-2">${Number(booking.quoteAmount).toFixed(2)} CAD</p>
                  )}
                  {(bookingId || booking?.id) && (
                    <p className="text-gray-500 text-xs mb-6">Booking ID: {booking?.id || bookingId}</p>
                  )}
                  {error && <p className="text-amber-400 text-sm mb-4">{error}</p>}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/"><Button className="bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90">Back to Home</Button></Link>
                    <Link to="/contact"><Button variant="outline" className="border-[#D4AF37] text-[#D4AF37]">Contact Us</Button></Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export function PaymentCancelled() {
  const [params] = useSearchParams();
  const bookingId = params.get('booking_id');

  return (
    <div className="min-h-screen pt-20 bg-[#0B0B0B]">
      <section className="py-20">
        <div className="max-w-xl mx-auto px-4">
          <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
            <CardContent className="p-10 text-center">
              <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h1 className="text-3xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Payment <span className="text-[#D4AF37]">Cancelled</span>
              </h1>
              <p className="text-gray-300 mb-6">
                No charge was made. You can pay later using the link from our team, or choose pay-driver when confirming your quote.
              </p>
              {bookingId && <p className="text-gray-500 text-xs mb-6">Booking ID: {bookingId}</p>}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/book"><Button className="bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90">Book Again</Button></Link>
                <Link to="/contact"><Button variant="outline" className="border-[#D4AF37] text-[#D4AF37]">Contact Us</Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
