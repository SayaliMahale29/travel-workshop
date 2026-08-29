import { getSiteContent } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function PrivacyPage() {
  const content = await getSiteContent();

  return (
    <section className="section-padding bg-white">
      <div className="container-text prose prose-slate max-w-none">
        <h1 className="font-display text-3xl font-bold text-ink-950">Privacy & Refunds</h1>

        <h2 className="mt-8 text-xl font-semibold">Contact</h2>
        <p className="text-ink-700">
          Questions? Email{" "}
          <a href={`mailto:${content.privacy.contactEmail}`} className="text-brand-600">
            {content.privacy.contactEmail}
          </a>
        </p>

        <h2 className="mt-8 text-xl font-semibold">Refund policy</h2>
        <p className="text-ink-700">{content.privacy.refundPolicy}</p>

        <h2 className="mt-8 text-xl font-semibold">Data we collect</h2>
        <p className="text-ink-700">
          When you register, we collect the information you enter, your transaction reference,
          and your payment screenshot to verify payment, send workshop details, and contact you
          about the event. Payment screenshots are protected and available only to the workshop
          admin.
        </p>
      </div>
    </section>
  );
}
