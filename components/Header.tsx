import Link from "next/link";
import RegisterCta from "@/components/RegisterCta";

type Props = {
  siteName: string;
  registrationOpen: boolean;
  registerHref: string;
};

export default function Header({ siteName, registrationOpen, registerHref }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-800 bg-[#1C1917]/95 backdrop-blur-md">
      <div className="container-narrow flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link
          href="/"
          className="font-hand flex items-center gap-2 text-lg font-bold text-[#FBBF24] transition hover:text-amber-300 sm:text-xl lg:text-2xl"
        >
          <span className="text-xl">⛺</span>
          <span>{siteName}</span>
        </Link>
        <nav className="flex shrink-0 items-center gap-3 sm:gap-6">
          <Link
            href="/#about-hampi"
            className="hidden text-sm font-medium text-stone-300 hover:text-[#FBBF24] lg:inline"
          >
            Why Hampi
          </Link>
          <Link
            href="/#moments"
            className="hidden text-sm font-medium text-stone-300 hover:text-[#FBBF24] lg:inline"
          >
            Moments
          </Link>
          <Link
            href="/#experience"
            className="hidden text-sm font-medium text-stone-300 hover:text-[#FBBF24] lg:inline"
          >
            Stays & Food
          </Link>
          <Link
            href="/#workshop"
            className="hidden text-sm font-medium text-stone-300 hover:text-[#FBBF24] lg:inline"
          >
            Itinerary
          </Link>
          <Link
            href="/#creator"
            className="hidden text-sm font-medium text-stone-300 hover:text-[#FBBF24] lg:inline"
          >
            Mentors
          </Link>
          {registrationOpen ? (
            <RegisterCta
              href={registerHref}
              className="rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-sm font-bold text-stone-950 shadow-md shadow-amber-500/20 transition hover:from-amber-300 hover:to-amber-400 sm:px-5"
            >
              Enroll Now · 10 Slots
            </RegisterCta>
          ) : (
            <span className="rounded-full bg-stone-800 px-4 py-2 text-sm text-stone-400">
              Closed
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}
