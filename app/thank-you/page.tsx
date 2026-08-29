import Link from "next/link";
import { getSiteContent, findRegistrationById } from "@/lib/storage";

type Props = {
  searchParams: Promise<{ reg?: string }>;
};

export default async function ThankYouPage({ searchParams }: Props) {
  const { reg: regId } = await searchParams;
  const content = await getSiteContent();
  const registration = regId ? await findRegistrationById(regId) : null;

  return (
    <section className="section-padding min-h-[70vh] bg-gradient-to-b from-brand-50 to-white">
      <div className="container-text text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
          ✓
        </div>
        <h1 className="font-display text-3xl font-bold text-ink-950 sm:text-4xl">
          You&apos;re registered!
        </h1>
        <p className="mt-4 text-lg text-ink-700">
          Payment received{registration ? `, ${registration.name}` : ""}. Check your email and
          WhatsApp for workshop details.
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-2xl bg-white p-6 text-left shadow-sm">
          <h2 className="font-semibold text-ink-950">{content.title}</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-700">
            <li>📅 {content.workshop.dates}</li>
            <li>⏰ {content.workshop.time}</li>
            <li>💻 {content.workshop.mode}</li>
          </ul>
          <p className="mt-4 text-sm text-ink-600">{content.workshop.joinDetails}</p>
        </div>

        <Link
          href="/"
          className="mt-8 inline-block text-brand-600 hover:text-brand-700"
        >
          ← Back to home
        </Link>
      </div>
    </section>
  );
}
