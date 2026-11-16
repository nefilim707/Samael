import { useState } from 'react';
import { ArrowDown, Clock, ShieldCheck } from 'lucide-react';
import {
  ASSETS,
  HIERARCHY_PROMOTION_RULES,
  QUOTA_ROLES,
  SQUAD_HIERARCHY,
} from '../data/factionData';

export function HierarchyAndQuotasSection() {
  const [selectedLevelId, setSelectedLevelId] = useState<string>(SQUAD_HIERARCHY[0].id);

  const activeTier =
    SQUAD_HIERARCHY.find((item) => item.id === selectedLevelId) ?? SQUAD_HIERARCHY[0];

  return (
    <section
      id="hierarchy"
      className="relative border-b border-[#F3EEF7]/10 bg-[#120F17]/50 pattern-lacquer py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Section Heading */}
        <div className="max-w-2xl">
          <p className="text-xs tracking-widest uppercase text-[#C9A24D]">03. Вертикаль власти</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold text-[#F3EEF7] text-balance">
            Иерархия Отряда и порядок назначения
          </h2>
          <p className="mt-4 text-base text-[#B8B0C2]">
            Субординация внутри отряда незыблема. Нажмите на любую ступень иерархии, чтобы увидеть зону ответственности и полномочия чина.
          </p>
        </div>

        {/* Two-column Split: Leaders Artwork + Interactive Hierarchy Chain */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
          {/* Left: Leaders Visual + Selected Tier Brief */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="relative overflow-hidden border border-[#F3EEF7]/12 bg-[#0A080C] flex-1 min-h-[340px]">
              <img
                src={ASSETS.leadersArt}
                alt="Силуэты Даки и Гютаро под алой луной"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0A080C] via-[#0A080C]/25 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs tracking-widest uppercase text-[#F2B8C6]">Верховная Воля</p>
                <p className="mt-1 font-display text-2xl font-semibold text-[#F3EEF7]">
                  Даки и Гютаро
                </p>
                <p className="mt-1 text-xs text-[#B8B0C2]">
                  Дар обращения, верховный суд и финальные обзвоны на командные посты.
                </p>
              </div>
            </div>

            {/* Promotion Rules Box */}
            <div className="border border-[#C9A24D]/25 bg-[#0A080C] p-6">
              <p className="text-xs tracking-widest uppercase text-[#C9A24D]">
                Повышение по иерархии отряда
              </p>
              <div className="mt-4 space-y-4">
                {HIERARCHY_PROMOTION_RULES.map((rule) => (
                  <div key={rule.transition} className="border-t border-[#F3EEF7]/10 pt-3 first:border-t-0 first:pt-0">
                    <p className="text-sm font-semibold text-[#F3EEF7]">{rule.transition}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#B8B0C2]">{rule.requirement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: 6-step Vertical Hierarchy Ladder */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-2">
              {SQUAD_HIERARCHY.map((tier, idx) => {
                const isSelected = tier.id === selectedLevelId;
                return (
                  <div key={tier.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedLevelId(tier.id)}
                      className={`w-full text-left border px-6 py-4 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A24D] ${
                        isSelected
                          ? 'border-[#9E1B32] bg-[#19121D]'
                          : 'border-[#F3EEF7]/10 bg-[#0A080C]/90 hover:border-[#C9A24D]/45 hover:bg-[#14101A]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-baseline gap-4 min-w-0">
                          <span className="font-mono text-xs text-[#C9A24D] tabular-nums shrink-0">
                            0{tier.level}
                          </span>
                          <span className="font-display text-2xl font-semibold text-[#F3EEF7] truncate">
                            {tier.title}
                          </span>
                        </div>
                        <span className="text-xs text-[#9C92A8] shrink-0 whitespace-nowrap">
                          {tier.kanji}
                        </span>
                      </div>

                      {isSelected && (
                        <div className="mt-3 border-t border-[#F3EEF7]/10 pt-3">
                          <p className="text-sm leading-relaxed text-[#D8D0E0]">
                            {tier.roleSummary}
                          </p>
                          {tier.note && (
                            <p className="mt-2 text-xs font-medium text-[#F2B8C6]">{tier.note}</p>
                          )}
                        </div>
                      )}
                    </button>

                    {idx < SQUAD_HIERARCHY.length - 1 && (
                      <div className="flex justify-center py-1 text-[#C9A24D]/60" aria-hidden="true">
                        <ArrowDown className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between border border-[#F3EEF7]/10 bg-[#0A080C] px-5 py-3.5 text-xs text-[#B8B0C2]">
              <span>Выбранная ступень: <strong className="text-[#F3EEF7]">{activeTier.title}</strong></span>
              <span className="text-[#F2B8C6]">Примечание: Младший инструктор — испытательный срок</span>
            </div>
          </div>
        </div>

        {/* Part 2: Quota / Duties Matrix */}
        <div id="quotas-points" className="mt-24 pt-16 border-t border-[#F3EEF7]/10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs tracking-widest uppercase text-[#C9A24D]">04. Квота и обязанности</p>
              <h3 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#F3EEF7]">
                Ежедневный онлайн и недельная норма
              </h3>
            </div>
            <p className="text-sm text-[#9C92A8] max-w-md">
              Невыполнение установленной квоты ведёт к отрядному выговору. Дисциплина — основа сохранения статуса.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {QUOTA_ROLES.map((quota) => (
              <div
                key={quota.role}
                className="border border-[#F3EEF7]/12 bg-[#0A080C] p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 border-b border-[#F3EEF7]/10 pb-5">
                    <div>
                      <h4 className="font-display text-2xl font-semibold text-[#F3EEF7]">
                        {quota.role}
                      </h4>
                      <p className="mt-1 text-xs text-[#9C92A8]">{quota.oversightFocus}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="inline-flex items-center gap-1.5 font-mono text-xl font-medium text-[#C9A24D] tabular-nums">
                        <Clock className="h-4 w-4 text-[#9E1B32]" />
                        <span>{quota.dailyOnlineMinutes} мин</span>
                      </div>
                      <p className="text-[11px] text-[#9C92A8]">в день</p>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {quota.weeklyDuties.map((duty) => (
                      <li key={duty} className="flex items-start gap-2.5 text-sm text-[#D8D0E0]">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#9E1B32]" />
                        <span>{duty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
