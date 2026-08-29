import type { SiteContent, WorkshopDay } from "@/lib/types";

type Props = {
  content: SiteContent;
};

function DayCard({ day }: { day: WorkshopDay }) {
  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
      <h3 className="font-display text-xl font-bold text-ink-950 sm:text-2xl">{day.title}</h3>
      <div className="mt-6 space-y-8">
        {day.sections.map((section) => (
          <div key={section.title}>
            <h4 className="text-lg font-semibold text-brand-700">{section.title}</h4>
            {section.subtitle && (
              <p className="mt-1 text-sm italic text-ink-500">{section.subtitle}</p>
            )}
            <ul className="mt-3 space-y-2">
              {section.items.map((item) => (
                <li key={item} className="flex gap-2 text-ink-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WorkshopSection({ content }: Props) {
  const { workshop } = content;

  return (
    <section id="workshop" className="section-padding bg-brand-50/50">
      <div className="container-narrow">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            What you&apos;ll learn
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink-950 sm:text-4xl">
            Workshop curriculum
          </h2>
          <p className="mt-4 text-ink-700">
            {workshop.duration} · {workshop.mode} · {workshop.time}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <DayCard day={workshop.day1} />
          <DayCard day={workshop.day2} />
        </div>

        <div className="mt-12 rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">
          <h3 className="font-display text-2xl font-bold text-ink-950">Find Your Own Voice</h3>
          <p className="mx-auto mt-4 max-w-2xl text-ink-700">{content.creator.voiceSection}</p>
        </div>
      </div>
    </section>
  );
}
