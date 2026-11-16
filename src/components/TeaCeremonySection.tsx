import { useState } from 'react';
import { ASSETS, TEA_CEREMONY_DATA } from '../data/factionData';

export function TeaCeremonySection() {
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  return (
    <section
      id="tea-ceremony"
      className="relative border-b border-[#F3EEF7]/10 bg-[#0A080C] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Top Editorial Split: Visual + Philosophy & 4 Principles */}
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs tracking-widest uppercase text-[#C9A24D]">
              {TEA_CEREMONY_DATA.kicker}
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold leading-tight text-[#F3EEF7] text-balance">
              {TEA_CEREMONY_DATA.title}
            </h2>

            <p className="mt-5 text-base leading-relaxed text-[#D8D0E0] max-w-[65ch]">
              {TEA_CEREMONY_DATA.lead}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#B8B0C2] max-w-[65ch]">
              {TEA_CEREMONY_DATA.purpose}
            </p>

            {/* 4 Principles Grid */}
            <div className="mt-8 grid grid-cols-1 gap-px bg-[#F3EEF7]/10 border border-[#F3EEF7]/10 sm:grid-cols-2">
              {TEA_CEREMONY_DATA.principles.map((item) => (
                <div key={item.id} className="bg-[#120F17] p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold text-[#F3EEF7]">
                      {item.name}
                    </h3>
                    <span className="font-display text-2xl text-[#C9A24D]/80 shrink-0">
                      {item.kanji}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#B8B0C2]">{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="relative overflow-hidden border border-[#F3EEF7]/12 bg-[#120F17] flex-1 min-h-[340px]">
              <img
                src={ASSETS.teaCeremonyArt}
                alt="Ночная японская чайная церемония: чёрная чаша раку, бамбуковый венчик и лепестки сакуры при свете фонаря"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0A080C] via-transparent to-transparent opacity-85"
                aria-hidden="true"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs tracking-widest uppercase text-[#F2B8C6]">Тясицу · Павильон тишины</p>
                <p className="mt-1 text-sm text-[#D8D0E0]">
                  Чёрная керамика раку, лепестки сакуры и строгий порядок жестов под присмотром старших наставников.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Ritual Order & Etiquette */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Stages Selector + Detail */}
          <div className="lg:col-span-8 border border-[#F3EEF7]/12 bg-[#120F17] p-6 sm:p-8">
            <p className="text-xs tracking-widest uppercase text-[#C9A24D]">
              Порядок проведения ритуала
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {TEA_CEREMONY_DATA.stages.map((stage, idx) => {
                const isActive = idx === activeStageIdx;
                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => setActiveStageIdx(idx)}
                    className={`border px-3.5 py-3 text-left transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A24D] ${
                      isActive
                        ? 'border-[#9E1B32] bg-[#1D121B]'
                        : 'border-[#F3EEF7]/10 bg-[#0A080C] hover:border-[#C9A24D]/40'
                    }`}
                  >
                    <span className="font-mono text-xs text-[#C9A24D] tabular-nums">
                      Этап {stage.step}
                    </span>
                    <p className="mt-1 text-xs font-medium text-[#F3EEF7] line-clamp-2">
                      {stage.title}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 border-t border-[#F3EEF7]/10 pt-6">
              <p className="font-mono text-xs text-[#C9A24D] tabular-nums">
                Этап {TEA_CEREMONY_DATA.stages[activeStageIdx].step} / 04
              </p>
              <h3 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#F3EEF7]">
                {TEA_CEREMONY_DATA.stages[activeStageIdx].title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#D8D0E0]">
                {TEA_CEREMONY_DATA.stages[activeStageIdx].detail}
              </p>
            </div>
          </div>

          {/* Etiquette Rules */}
          <div className="lg:col-span-4 border border-[#F3EEF7]/12 bg-[#120F17] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs tracking-widest uppercase text-[#C9A24D]">
                Этикет чайного стола
              </p>
              <ul className="mt-5 space-y-4">
                {TEA_CEREMONY_DATA.etiquette.map((rule, idx) => (
                  <li
                    key={rule}
                    className="border-b border-[#F3EEF7]/10 pb-3.5 last:border-b-0 last:pb-0 text-sm leading-relaxed text-[#D8D0E0] flex items-start gap-3"
                  >
                    <span className="font-mono text-xs text-[#9E1B32] tabular-nums mt-0.5 shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
