interface PageHeroProps {
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  className?: string;
}

export function PageHero({ title, titleHighlight, subtitle, className = '' }: PageHeroProps) {
  return (
    <section className={`py-20 bg-gradient-to-br from-[#0B0B0B] via-[#0B1F3A] to-[#0B0B0B] ${className}`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
          {title}
          {titleHighlight && (
            <>
              {' '}
              <span className="text-[#D4AF37]">{titleHighlight}</span>
            </>
          )}
        </h1>
        <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8" />
        {subtitle && <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    </section>
  );
}
