import Link from "next/link";
import RegisterCta from "@/components/RegisterCta";

type Props = {
  siteName: string;
  registrationOpen: boolean;
  registerHref: string;
};

export default function Header({ siteName, registrationOpen, registerHref }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-teal-900/40 bg-[#0d3d4d]/95 backdrop-blur-md">
      <div className="container-narrow flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link
          href="/"
          className="font-title text-base uppercase leading-tight tracking-tight text-[#FDD800] sm:text-lg lg:text-2xl"
        >
          {siteName}
        </Link>
        <nav className="flex shrink-0 items-center gap-3 sm:gap-6">
          <Link
            href="/#workshop"
            className="hidden text-sm text-white/80 hover:text-[#FDD800] lg:inline"
          >
            Workshop
          </Link>
          <Link
            href="/#creator"
            className="hidden text-sm text-white/80 hover:text-[#FDD800] lg:inline"
          >
            About
          </Link>
          {registrationOpen ? (
            <RegisterCta
              href={registerHref}
              className="rounded-full bg-[#FDD800] px-4 py-2 text-sm font-medium text-[#0d3d4d] transition hover:bg-yellow-300 sm:px-5"
            >
              Register
            </RegisterCta>
          ) : (
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/70">
              Closed
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}
