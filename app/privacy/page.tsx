import { getSiteContent } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function PrivacyPage() {
  const content = await getSiteContent();

  return (
    <section className="section-padding bg-[#FAF7F2]">
      <div className="container-text prose prose-stone max-w-none">
        <h1 className="font-display text-3xl font-bold text-stone-950">Privacy & Refunds</h1>

        <h2 className="mt-8 text-xl font-semibold text-stone-900">Contact</h2>
        <p className="text-stone-700">
          Questions? Email{" "}
          <a href={`mailto:${content.privacy.contactEmail}`} className="font-semibold text-amber-800 underline">
            {content.privacy.contactEmail}
          </a>
        </p>

        <h2 className="mt-8 text-xl font-semibold text-stone-900">Refund policy</h2>
        <p className="text-stone-700">{content.privacy.refundPolicy}</p>

        <h2 className="mt-8 text-xl font-semibold text-stone-900">Data we collect</h2>
        <p className="text-stone-700">
          When you register, we collect the information you enter, your travel/bus preferences,
          your UPI transaction reference, and your payment screenshot to verify payment, allocate
          cottage rooms, and send travel instructions. Payment screenshots are protected and
          available only to the workshop organizers.
        </p>
      </div>
    </section>
  );
}
