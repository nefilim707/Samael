import { ArrowDownRight } from 'lucide-react';
import { ASSETS, FACTION_IDENTITY } from '../data/factionData';

const PETAL_CONFIG = [
  { left: '8%', delay: '0s', duration: '14s', size: 10 },
  { left: '22%', delay: '3s', duration: '17s', size: 8 },
  { left: '39%', delay: '1.5s', duration: '15s', size: 11 },
  { left: '57%', delay: '5s', duration: '18s', size: 9 },
  { left: '74%', delay: '2s', duration: '13s', size: 10 },
  { left: '89%', delay: '4.5s', duration: '16s', size: 8 },
];

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden border-b border-[#F3EEF7]/10"
    >
      {/* Background visual with resilient gradient fallback */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#170D19] via-[#0A080C] to-[#1D0A10]">
        <img
          src={ASSETS.heroBg}
          alt="Ночной японский храм под алой луной и падающие лепестки сакуры"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-70"
        />
        {/* Measured scrim for WCAG AA contrast across all frames */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0A080C] via-[#0A080C]/65 to-[#0A080C]/30"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0A080C]/90 via-[#0A080C]/45 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Subtle falling sakura petals */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {PETAL_CONFIG.map((petal, idx) => (
          <span
            key={idx}
            className="sakura-petal absolute -top-6 rounded-tl-full rounded-br-full bg-[#F2B8C6]/65"
            style={{
              left: petal.left,
              width: `${petal.size}px`,
              height: `${petal.size * 1.4}px`,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
            }}
          />
        ))}
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pt-28 pb-14 lg:px-10 lg:pb-18">
        <div className="max-w-3xl">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-xs tracking-widest uppercase text-[#C9A24D]">
            <span>Фракция Демонов</span>
            <span aria-hidden="true">·</span>
            <span>Главы Отряда: {FACTION_IDENTITY.leaders}</span>
            <span aria-hidden="true">·</span>
            <span>Субординация и знание</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.04] tracking-tight text-[#F3EEF7] text-balance">
            Инструкторы: знание, обращённое в кровь и порядок
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#D8D0E0]">
            {FACTION_IDENTITY.essence}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#about"
              className="inline-flex items-center gap-2.5 bg-[#9E1B32] hover:bg-[#B8203B] text-[#F3EEF7] text-sm font-semibold px-7 py-3.5 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A24D]"
            >
              <span>Кодекс и цели отряда</span>
              <ArrowDownRight className="h-4 w-4" />
            </a>

            <a
              href="#hierarchy"
              className="inline-flex items-center justify-center border border-[#C9A24D]/40 bg-[#120F17]/75 hover:border-[#C9A24D] hover:bg-[#17121E] text-[#F3EEF7] text-sm font-medium px-6 py-3.5 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A24D]"
            >
              Иерархия и система рангов
            </a>
          </div>
        </div>

        {/* Clean operational summary ribbon */}
        <div className="mt-14 grid grid-cols-1 gap-6 border-t border-[#F3EEF7]/12 pt-7 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-[#9C92A8]">Главы Отряда</p>
            <p className="mt-1 font-display text-xl font-semibold text-[#F3EEF7]">Даки и Гютаро</p>
          </div>
          <div>
            <p className="text-xs text-[#9C92A8]">Иерархия отряда</p>
            <p className="mt-1 font-display text-xl font-semibold text-[#F3EEF7] tabular-nums">5 командных ступеней</p>
          </div>
          <div>
            <p className="text-xs text-[#9C92A8]">Лестница фракции</p>
            <p className="mt-1 font-display text-xl font-semibold text-[#F3EEF7] tabular-nums">От Отокума до Шико</p>
          </div>
          <div>
            <p className="text-xs text-[#9C92A8]">Ежедневная квота</p>
            <p className="mt-1 font-display text-xl font-semibold text-[#F3EEF7] tabular-nums">60 – 90 минут в день</p>
          </div>
        </div>
      </div>
    </section>
  );
}
