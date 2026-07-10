import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';
import { BackToTop } from './BackToTop';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <Header />
      <Outlet />
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}
