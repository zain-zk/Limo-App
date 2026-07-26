import { useContent } from '../../context/ContentContext';
import { DEFAULT_LEGAL } from '../../lib/defaults';
import { Seo } from '../../components/Seo';
import { PageHero } from '../../components/PageHero';

export function Privacy() {
  const { content } = useContent();
  const legal = content?.legal ?? DEFAULT_LEGAL;

  return (
    <div className="min-h-screen pt-20 bg-[#0B0B0B]">
      <Seo title={`${legal.privacyTitle} | High5 Limo`} path="/privacy" />
      <PageHero title={legal.privacyTitle} subtitle="How we collect, use, and protect your information." />
      <section className="py-16 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="legal-content" dangerouslySetInnerHTML={{ __html: legal.privacyBody }} />
        </div>
      </section>
    </div>
  );
}

export function Terms() {
  const { content } = useContent();
  const legal = content?.legal ?? DEFAULT_LEGAL;

  return (
    <div className="min-h-screen pt-20 bg-[#0B0B0B]">
      <Seo title={`${legal.termsTitle} | High5 Limo`} path="/terms" />
      <PageHero title={legal.termsTitle} subtitle="Terms and conditions for using High5 Limo services." />
      <section className="py-16 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="legal-content" dangerouslySetInnerHTML={{ __html: legal.termsBody }} />
        </div>
      </section>
    </div>
  );
}
