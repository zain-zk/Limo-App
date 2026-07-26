import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const setLang = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('limo_lang', lng);
    document.documentElement.lang = lng;
  };

  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-[#1A1A1A] border border-[#D4AF37]/20">
      {(['en', 'fr'] as const).map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => setLang(lng)}
          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
            i18n.language.startsWith(lng)
              ? 'bg-[#D4AF37] text-[#0B0B0B]'
              : 'text-gray-400 hover:text-[#D4AF37]'
          }`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
