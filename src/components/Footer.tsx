import { ASSETS } from '../data/factionData';

export function Footer() {
  return (
    <footer className="bg-[#0A080C] py-14">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="flex flex-col gap-8 border-b border-[#F3EEF7]/10 pb-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 shrink-0 overflow-hidden border border-[#C9A24D]/35 bg-[#120F17]">
              <img
                src={ASSETS.crestSeal}
                alt="Герб-камон фракции Инструкторы"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-[#F3EEF7]">Инструкторы</p>
              <p className="mt-1 text-xs text-[#9C92A8]">
                Отряд Даки и Гютаро · Знание, субординация и сила ночи
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="border border-[#F3EEF7]/15 hover:border-[#C9A24D] px-5 py-2.5 text-xs font-medium text-[#D8D0E0] hover:text-[#F3EEF7] transition-colors cursor-pointer whitespace-nowrap"
            >
              Наверх
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 text-xs text-[#9C92A8] sm:flex-row sm:items-center sm:justify-between">
          <p>Кодекс фракции «Инструкторы» · Сеттинг Demon Slayer</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#about" className="hover:text-[#F3EEF7] transition-colors">
              О фракции
            </a>
            <a href="#hierarchy" className="hover:text-[#F3EEF7] transition-colors">
              Иерархия
            </a>
            <a href="#quotas-points" className="hover:text-[#F3EEF7] transition-colors">
              Квота и баллы
            </a>
            <a href="#ranks" className="hover:text-[#F3EEF7] transition-colors">
              12 рангов
            </a>
            <a href="#tea-ceremony" className="hover:text-[#F3EEF7] transition-colors">
              Чайная церемония
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
