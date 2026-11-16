import { ASSETS, FACTION_GOALS, FACTION_IDENTITY, LORE_QUOTES } from '../data/factionData';

export function AboutAndLoreSection() {
  return (
    <section id="about" className="relative border-b border-[#F3EEF7]/10 bg-[#0A080C] py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Part 1: Origin & Sanctum Split */}
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative overflow-hidden border border-[#F3EEF7]/12 bg-[#120F17] h-full min-h-[340px]">
              <img
                src={ASSETS.sanctumArt}
                alt="Ночной кабинет учёных-демонов со свитками и тушечницей"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0A080C] via-transparent to-transparent opacity-80"
                aria-hidden="true"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs tracking-widest uppercase text-[#C9A24D]">Архив Ночи</p>
                <p className="mt-1 text-sm text-[#D8D0E0]">
                  Наследие учёных и наставников, отдавших смертность за бесконечное познание.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs tracking-widest uppercase text-[#C9A24D]">01. Происхождение и суть</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold leading-tight text-[#F3EEF7] text-balance">
              Бывшие учёные, принявшие дар Даки и Гютаро
            </h2>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-[#D8D0E0] max-w-[68ch]">
              <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-5xl first-letter:font-semibold first-letter:leading-none first-letter:text-[#9E1B32]">
                {FACTION_IDENTITY.originLore}
              </p>
              <p>{FACTION_IDENTITY.essence}</p>
            </div>

            <div className="mt-8 border-t border-b border-[#F3EEF7]/10 py-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#B8B0C2]">
              <div>
                <span className="text-[#9C92A8]">Покровительство: </span>
                <span className="font-medium text-[#F3EEF7]">Главы Отряда Даки и Гютаро</span>
              </div>
              <div>
                <span className="text-[#9C92A8]">Положение: </span>
                <span className="font-medium text-[#F3EEF7]">Не последние в иерархии</span>
              </div>
              <div>
                <span className="text-[#9C92A8]">Основа: </span>
                <span className="font-medium text-[#F2B8C6]">Знания, дисциплина и сила</span>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: 6 Goals and Objectives */}
        <div className="mt-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-[#F3EEF7]/10 pb-6">
            <div>
              <p className="text-xs tracking-widest uppercase text-[#C9A24D]">02. Цели и задачи отряда</p>
              <h3 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#F3EEF7]">
                Шесть столпов служения Инструкторов
              </h3>
            </div>
            <p className="text-sm text-[#9C92A8] max-w-md">
              Каждая задача определяет место отряда во фракции — от поиска новых лиц среди людей до сохранения вековой базы знаний.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-px bg-[#F3EEF7]/10 md:grid-cols-2 lg:grid-cols-3 border border-[#F3EEF7]/10">
            {FACTION_GOALS.map((goal) => (
              <article
                key={goal.index}
                className="bg-[#120F17] p-7 transition-colors duration-150 hover:bg-[#17121E]"
              >
                <span className="font-mono text-xs font-medium tracking-widest text-[#C9A24D] tabular-nums">
                  {goal.index}.
                </span>
                <h4 className="mt-3 font-display text-2xl font-semibold leading-snug text-[#F3EEF7]">
                  {goal.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-[#B8B0C2]">{goal.description}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Part 3: Atmospheric Lore Voices */}
        <div className="mt-20">
          <p className="text-xs tracking-widest uppercase text-[#C9A24D]">Хроники Ночи</p>
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {LORE_QUOTES.map((item) => (
              <blockquote
                key={item.speaker}
                className="border-t border-b border-[#C9A24D]/25 py-6 flex flex-col justify-between"
              >
                <p className="font-display text-xl italic leading-relaxed text-[#F3EEF7]">
                  {item.quote}
                </p>
                <footer className="mt-5 flex items-center gap-2 text-xs text-[#B8B0C2]">
                  <span className="font-semibold text-[#F2B8C6]">{item.speaker}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.title}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
