import Image from "next/image";
import type { SiteContent } from "@/lib/types";

type Props = {
  content: SiteContent;
};

export default function Hero({ content }: Props) {
  const { workshop } = content;

  return (
    <section className="relative overflow-hidden bg-[#d7ecff]">
      <div className="container-narrow relative px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-xl shadow-brand-700/10">
          <Image
            src="/images/akash-banner.jpg"
            alt="Learn Complete Storytelling by Akash — beginner-friendly two-day online workshop"
            width={1600}
            height={900}
            className="h-auto w-full"
            priority
          />
        </div>

        <p className="mt-6 text-center text-base font-semibold text-ink-900 sm:text-lg">
          {workshop.dates} · {workshop.time}
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-center text-ink-700">{content.tagline}</p>
      </div>
    </section>
  );
}
