import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello High5 Limo, I would like to book a ride.');
    const phoneNumber = '1234567890'; // Replace with actual WhatsApp number
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0F0F0F] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}
