import Link from "next/link";
import { getSiteContent, findRegistrationById } from "@/lib/storage";

type Props = {
  searchParams: Promise<{ reg?: string; manual?: string }>;
};

export const dynamic = "force-dynamic";

export default async function ThankYouPage({ searchParams }: Props) {
  const { reg: regId, manual } = await searchParams;
  const content = await getSiteContent();
  const registration = regId ? await findRegistrationById(regId) : null;

  return (
    <section className="section-padding min-h-[70vh] bg-gradient-to-b from-amber-50/50 via-[#FAF7F2] to-white">
      <div className="container-text text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-800 shadow-sm">
          ✓
        </div>
        <h1 className="font-display text-3xl font-bold text-stone-950 sm:text-4xl">
          {manual ? "Registration submitted!" : "You're registered!"}
        </h1>
        <p className="mt-4 text-base text-stone-700 sm:text-lg">
          {manual ? (
            <>
              Thank you{registration ? `, ${registration.name}` : ""}. We received your details
              and payment screenshot. {content.workshop.joinDetails}
            </>
          ) : (
            <>
              Payment received{registration ? `, ${registration.name}` : ""}. Check your email
              and WhatsApp for workshop details.
            </>
          )}
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-amber-200/80 bg-white p-6 text-left shadow-md">
          <h2 className="font-display text-lg font-bold text-stone-950">{content.title}</h2>
          <ul className="mt-4 space-y-2 text-sm text-stone-700">
            <li>📅 {content.workshop.dates}</li>
            <li>📍 {content.workshop.mode}</li>
          </ul>
          <p className="mt-4 border-t border-stone-100 pt-3 text-xs leading-relaxed text-stone-600">
            {manual
              ? "Please keep your transaction ID and payment screenshot handy. The team will share stay details and everything you need before the workshop."
              : content.workshop.joinDetails}
          </p>
        </div>

        <Link
          href="/"
          className="mt-8 inline-block font-semibold text-amber-800 hover:text-amber-900 underline"
        >
          ← Back to home
        </Link>
      </div>
    </section>
  );
}
