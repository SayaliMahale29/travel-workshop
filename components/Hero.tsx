import Image from "next/image";
import Link from "next/link";
import BgSection from "@/components/BgSection";
import RegisterCta from "@/components/RegisterCta";
import SeatsProgress from "@/components/SeatsProgress";
import type { SiteContent } from "@/lib/types";

type Props = {
  content: SiteContent;
};

export default function Hero({ content }: Props) {
  const { workshop } = content;

  return (
    <BgSection image="/images/bg/virupaksha.jpg" tone="dark" className="pb-16 pt-10 sm:pb-24 sm:pt-16">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300 sm:text-sm">
              ✦ 3-Day Practical Workshop · Hampi
            </p>
            <h1 className="font-hand mt-4 text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              Content Creation
              <br />
              <span className="text-amber-300">&amp; Storytelling</span>
            </h1>
            <p className="font-hand mt-3 text-2xl text-amber-100 sm:text-3xl">
              ——— with Akash
            </p>
            <p className="font-hand mt-6 text-2xl font-bold text-white sm:text-3xl">
              Explore · Learn · Create
            </p>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-stone-200 sm:text-lg lg:mx-0">
              {content.tagline}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
                🗓️ {workshop.dates}
              </span>
              <span className="rounded-full border border-amber-400/40 bg-amber-400/20 px-4 py-1.5 text-sm font-bold text-amber-300 backdrop-blur">
                🪔 Diwali Special ₹{workshop.price.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="mt-6">
              <SeatsProgress variant="dark" />
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <RegisterCta
                href="/register"
                className="w-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-8 py-4 text-center text-lg font-bold text-stone-950 shadow-lg shadow-amber-500/30 transition hover:from-amber-300 hover:to-amber-400 sm:w-auto"
              >
                Join the Workshop →
              </RegisterCta>
              <Link
                href="/#workshop"
                className="w-full rounded-full border border-white/30 px-8 py-4 text-center font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                View Itinerary ↓
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="rotate-2 rounded-2xl bg-white p-3 pb-10 shadow-2xl shadow-black/50 transition-transform duration-500 hover:rotate-0">
              <Image
                src="/images/hampi-poster-yellow.jpg"
                alt="Learn Complete Content Creation in Hampi by Akash — 3 Days Practical Workshop"
                width={1600}
                height={1067}
                className="h-auto w-full rounded-lg"
                priority
              />
              <p className="font-hand mt-3 text-center text-xl font-bold text-stone-800">
                Same places. New perspectives ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </BgSection>
  );
}
