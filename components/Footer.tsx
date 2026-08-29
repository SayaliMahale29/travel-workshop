import Link from "next/link";

type Props = {
  siteName: string;
  contactEmail: string;
  instagram?: string;
};

export default function Footer({ siteName, contactEmail, instagram }: Props) {
  return (
    <footer className="border-t border-brand-100 bg-white pb-24">
      <div className="container-narrow section-padding !py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-base font-semibold text-ink-950">{siteName}</p>
            <p className="mt-1 text-sm text-ink-500">Online storytelling workshop</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-ink-700 sm:items-end">
            <a href={`mailto:${contactEmail}`} className="hover:text-brand-600">
              {contactEmail}
            </a>
            <Link href="/privacy" className="hover:text-brand-600">
              Privacy & Refunds
            </Link>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-ink-500 sm:text-left">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </p>
        {instagram && (
          <div className="mt-8 flex justify-center border-t border-brand-100 pt-8 pb-4">
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
            >
              Follow @akasheyess on Instagram
            </a>
          </div>
        )}
      </div>
    </footer>
  );
}
