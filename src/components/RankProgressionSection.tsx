import { useState } from 'react';
import { ChevronRight, Lock } from 'lucide-react';
import { COOLDOWN_TIERS, FACTION_RANKS } from '../data/factionData';

export function RankProgressionSection() {
  const [selectedRankId, setSelectedRankId] = useState<string>(FACTION_RANKS[0].id);

  const activeRank =
    FACTION_RANKS.find((rank) => rank.id === selectedRankId) ?? FACTION_RANKS[0];

  return (
    <section
      id="ranks"
      className="relative border-b border-[#F3EEF7]/10 bg-[#120F17]/40 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs tracking-widest uppercase text-[#C9A24D]">
            06. Система Повышения Отряда
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold text-[#F3EEF7] text-balance">
            Двенадцать рангов фракции: от Отокума до Шико
          </h2>
          <p className="mt-4 text-base text-[#B8B0C2]">
            Каждый переход регламентирован временем выдержки (КД) и перечнем обязательных испытаний. Выберите ранг на ленте ниже, чтобы изучить условия повышения.
          </p>
        </div>

        {/* Cooldown Reference Bar */}
        <div className="mt-10 grid grid-cols-1 gap-px bg-[#F3EEF7]/10 border border-[#F3EEF7]/10 sm:grid-cols-2 lg:grid-cols-5">
          {COOLDOWN_TIERS.map((tier) => (
            <div key={tier.label} className="bg-[#0A080C] p-4">
              <p className="font-mono text-xs font-medium text-[#C9A24D]">{tier.cooldown}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#D8D0E0]">{tier.label}</p>
            </div>
          ))}
        </div>

        {/* Interactive 12-Rank Selector Grid */}
        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {FACTION_RANKS.map((rank) => {
            const isSelected = rank.id === activeRank.id;
            return (
              <button
                key={rank.id}
                type="button"
                onClick={() => setSelectedRankId(rank.id)}
                className={`group flex flex-col justify-between border px-4 py-3.5 text-left transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A24D] ${
                  isSelected
                    ? 'border-[#9E1B32] bg-[#1D121B]'
                    : 'border-[#F3EEF7]/10 bg-[#0A080C] hover:border-[#C9A24D]/40 hover:bg-[#14101A]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-[#9C92A8] tabular-nums">
                    {String(rank.order).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[11px] text-[#C9A24D] whitespace-nowrap">
                    {rank.cooldownDays}
                  </span>
                </div>
                <span className="mt-2 font-display text-xl font-semibold text-[#F3EEF7] truncate">
                  {rank.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Rank Detail Panel */}
        <div className="mt-8 border border-[#F3EEF7]/12 bg-[#0A080C] p-7 lg:p-10">
          <div className="flex flex-col gap-6 border-b border-[#F3EEF7]/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#C9A24D]">
                <span className="font-mono tabular-nums">
                  Ступень {String(activeRank.order).padStart(2, '0')} / 12
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeRank.cooldownGroup}</span>
                <span aria-hidden="true">·</span>
                <span>{activeRank.cooldownDays}</span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h3 className="font-display text-3xl sm:text-4xl font-semibold text-[#F3EEF7]">
                  {activeRank.name}
                </h3>
                {activeRank.nextRank && (
                  <>
                    <ChevronRight className="h-5 w-5 text-[#9E1B32]" aria-hidden="true" />
                    <span className="font-display text-2xl sm:text-3xl text-[#F2B8C6]">
                      {activeRank.nextRank}
                    </span>
                  </>
                )}
              </div>

              <p className="mt-2 text-sm text-[#B8B0C2]">{activeRank.statusNote}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {activeRank.order > 1 && (
                <button
                  type="button"
                  onClick={() => setSelectedRankId(FACTION_RANKS[activeRank.order - 2].id)}
                  className="border border-[#F3EEF7]/15 px-4 py-2 text-xs text-[#D8D0E0] hover:border-[#C9A24D] hover:text-[#F3EEF7] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Предыдущий ранг
                </button>
              )}
              {activeRank.order < FACTION_RANKS.length && (
                <button
                  type="button"
                  onClick={() => setSelectedRankId(FACTION_RANKS[activeRank.order].id)}
                  className="bg-[#9E1B32] hover:bg-[#B8203B] px-4 py-2 text-xs font-semibold text-[#F3EEF7] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Следующий ранг
                </button>
              )}
            </div>
          </div>

          {/* Requirements List */}
          <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="text-xs tracking-widest uppercase text-[#9C92A8]">
                {activeRank.nextRank
                  ? `Условия перехода на ранг «${activeRank.nextRank}»`
                  : 'Полномочия высшего ранга «Шико»'}
              </p>

              <ol className="mt-4 space-y-3">
                {activeRank.transitionRequirements.map((req, idx) => (
                  <li
                    key={`${activeRank.id}-${idx}`}
                    className="flex items-start gap-3.5 border border-[#F3EEF7]/10 bg-[#120F17] px-4 py-3.5"
                  >
                    <span className="font-mono text-xs font-medium text-[#C9A24D] tabular-nums mt-0.5 shrink-0">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <span className="text-sm leading-relaxed text-[#D8D0E0]">{req}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-4 border border-[#F3EEF7]/10 bg-[#120F17] p-6 flex flex-col justify-between">
              <div>
                <p className="text-xs tracking-widest uppercase text-[#C9A24D]">
                  Ускорение через баллы
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#D8D0E0]">
                  Один пункт из списка повышения можно пропустить за{' '}
                  <strong className="font-mono text-[#C9A24D]">200 баллов</strong> (не более 2 раз за один ранг).
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#B8B0C2]">
                  Для немедленного скачка на одну ступень доступно внеочередное повышение за{' '}
                  <strong className="font-mono text-[#F2B8C6]">400 баллов</strong> (разрешено 1 раз в месяц).
                </p>
              </div>

              {activeRank.id === 'tsukomon' || activeRank.id === 'shiko' ? (
                <div className="mt-6 flex items-start gap-2.5 border-t border-[#F3EEF7]/10 pt-4 text-xs text-[#F2B8C6]">
                  <Lock className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>
                    Финальная ступень контролируется лично Главами Отряда — Даки и Гютаро.
                  </span>
                </div>
              ) : (
                <div className="mt-6 border-t border-[#F3EEF7]/10 pt-4 text-xs text-[#9C92A8]">
                  Повышение фиксируется после выполнения всех условий и истечения КД.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
