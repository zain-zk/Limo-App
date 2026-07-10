import { MessageCircle } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export function WhatsAppButton() {
  const { site } = useContent();

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hello ${site.name}, I would like to book a ride.`);
    const phoneNumber = site.whatsapp.replace(/\D/g, '');
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
