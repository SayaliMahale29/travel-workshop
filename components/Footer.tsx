import Link from "next/link";

type Props = {
  siteName: string;
  contactEmail: string;
  instagram?: string;
};

export default function Footer({ siteName, contactEmail, instagram }: Props) {
  return (
    <footer className="border-t border-stone-800 bg-[#1C1917] pb-24 text-stone-300 sm:pb-16">
      <div className="container-narrow section-padding !py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-bold text-amber-400">{siteName}</p>
            <p className="mt-1 text-sm text-stone-400">
              3-Day Practical Content Creation Workshop in Hampi
            </p>
            <p className="mt-1 text-xs text-stone-500">
              Pick-up &amp; Drop: Mumbai &amp; Pune · 31st Oct – 2nd Nov 2026
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm sm:items-end">
            <span className="text-xs uppercase tracking-wider text-stone-400">For inquiries:</span>
            <a
              href={`mailto:${contactEmail}`}
              className="font-medium text-amber-400 transition hover:text-amber-300"
            >
              {contactEmail}
            </a>
            <Link href="/privacy" className="text-xs text-stone-400 hover:text-stone-200">
              Privacy &amp; Refund Policy
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-stone-800 pt-8 sm:flex-row">
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>

          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-stone-700 bg-stone-900/80 px-5 py-2.5 text-xs font-semibold text-stone-200 transition hover:border-amber-400 hover:text-amber-300"
            >
              <span>📸</span> Follow @akasheyess on Instagram
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
