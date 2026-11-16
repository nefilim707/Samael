import { POINT_ACTIVITIES, POINT_REWARDS } from '../data/factionData';

export function PointsAndRewardsSection() {
  return (
    <section className="border-b border-[#F3EEF7]/10 bg-[#0A080C] py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs tracking-widest uppercase text-[#C9A24D]">05. Система баллов</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold text-[#F3EEF7] text-balance">
            Внутренняя валюта отряда и обмен на награды
          </h2>
          <p className="mt-4 text-base text-[#B8B0C2]">
            Баллы — внутренняя валюта отряда. Баллы можно обменять на награды, ускоряющие развитие демонической силы.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left: Earning Activities Table */}
          <div className="lg:col-span-7 border border-[#F3EEF7]/12 bg-[#120F17]">
            <div className="border-b border-[#F3EEF7]/10 px-6 py-4">
              <h3 className="font-display text-2xl font-semibold text-[#F3EEF7]">
                За что дают баллы
              </h3>
            </div>

            <div className="divide-y divide-[#F3EEF7]/10">
              {POINT_ACTIVITIES.map((act) => (
                <div
                  key={act.id}
                  className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 pr-4">
                    <p className="text-base font-medium text-[#F3EEF7]">{act.title}</p>
                    {act.note && <p className="mt-1.5 text-xs text-[#9C92A8]">{act.note}</p>}
                  </div>

                  <div className="flex items-center gap-3 shrink-0 sm:flex-col sm:items-end sm:gap-1">
                    <span className="font-mono text-base font-medium text-[#C9A24D] tabular-nums">
                      +{act.points} баллов
                    </span>
                    <span className="text-xs text-[#9C92A8] tabular-nums">
                      до {act.weeklyLimit} раз в неделю
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Rewards Exchange */}
          <div className="lg:col-span-5 border border-[#F3EEF7]/12 bg-[#120F17] flex flex-col justify-between">
            <div>
              <div className="border-b border-[#F3EEF7]/10 px-6 py-4">
                <h3 className="font-display text-2xl font-semibold text-[#F3EEF7]">
                  Награды за баллы
                </h3>
              </div>

              <div className="divide-y divide-[#F3EEF7]/10">
                {POINT_REWARDS.map((reward) => (
                  <div key={reward.id} className="px-6 py-5">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-base font-semibold text-[#F3EEF7]">{reward.title}</p>
                      <span className="font-mono text-sm font-medium text-[#C9A24D] tabular-nums shrink-0">
                        {reward.cost} баллов
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#B8B0C2]">
                      {reward.restriction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#F3EEF7]/10 bg-[#0A080C] px-6 py-4 text-xs text-[#9C92A8]">
              Обмен накопленных баллов на награды производится через руководство отряда.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
