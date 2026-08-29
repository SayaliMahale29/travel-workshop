import type { SiteContent } from "@/lib/types";

type Props = {
  content: SiteContent;
};

export default function CreatorSection({ content }: Props) {
  const { creator } = content;

  return (
    <section id="creator" className="section-padding bg-white">
      <div className="container-text">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          Meet the creator
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold text-ink-950 sm:text-4xl">
          Hi, I&apos;m {creator.name}!
        </h2>
        <p className="mt-6 text-base leading-relaxed text-ink-700 sm:text-lg">{creator.intro}</p>
        <p className="mt-6 text-base leading-relaxed text-ink-700">
          Join me for a beginner-friendly, 2-day online workshop where you&apos;ll learn
          storytelling, script writing, shooting, editing and voiceover — everything you need to
          start creating, experiment, and find your own style.
        </p>
      </div>
    </section>
  );
}
