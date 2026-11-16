import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const FACTION_LINKS = [
  { href: '#about', label: 'О фракции' },
  { href: '#hierarchy', label: 'Иерархия' },
  { href: '#quotas-points', label: 'Квота и баллы' },
  { href: '#ranks', label: 'Ранги' },
  { href: '#tea-ceremony', label: 'Чайная церемония' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#F3EEF7]/10 bg-[#0A080C]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-8 px-6 lg:px-10">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-2xl font-semibold tracking-wide text-[#F3EEF7] whitespace-nowrap shrink-0 transition-colors hover:text-[#F2B8C6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A24D]"
        >
          Инструкторы
        </a>

        {/* Zone 2: 4 clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#B8B0C2]" aria-label="Основная навигация">
          {FACTION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#9E1B32] hover:text-[#F3EEF7] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A24D]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#ranks"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#ranks');
            }}
            className="hidden sm:inline-flex items-center justify-center whitespace-nowrap shrink-0 bg-[#9E1B32] hover:bg-[#B8203B] text-[#F3EEF7] text-xs font-semibold tracking-wide px-5 py-2.5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A24D]"
          >
            Система рангов
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center text-[#F3EEF7] hover:text-[#F2B8C6] transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#F3EEF7]/10 bg-[#0A080C] px-6 py-5 space-y-3">
          {FACTION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="block py-2 text-base font-medium text-[#B8B0C2] hover:text-[#F3EEF7] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
