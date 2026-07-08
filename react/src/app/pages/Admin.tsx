import { ContentProvider } from '../../context/ContentContext';

export function Admin() {
  return (
    <div className="min-h-screen pt-20 bg-[#0F0F0F]">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Admin <span className="text-[#D4AF37]">CMS</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 leading-relaxed mb-4">
            CMS dashboard coming next. The Node API is ready to manage site content by section.
          </p>
          <p className="text-gray-400">
            API: <code className="text-[#D4AF37]">GET /api/content</code> ·{' '}
            <code className="text-[#D4AF37]">PUT /api/content/:section</code>
          </p>
        </div>
      </section>
    </div>
  );
}

export function AdminWithProvider() {
  return (
    <ContentProvider>
      <Admin />
    </ContentProvider>
  );
}
