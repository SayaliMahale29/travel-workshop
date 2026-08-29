import RegisterCta from "@/components/RegisterCta";
import type { SiteContent } from "@/lib/types";

type Props = {
  content: SiteContent;
  registerHref: string;
};

export default function PricingSection({ content, registerHref }: Props) {
  const { workshop } = content;

  if (!workshop.registrationOpen) {
    return (
      <section className="section-padding bg-white">
        <div className="container-text text-center">
          <h2 className="font-display text-3xl font-bold text-ink-950">Registration closed</h2>
          <p className="mt-4 text-ink-700">This batch is full. Follow Akash for the next workshop.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="container-narrow">
        <div className="mx-auto max-w-xl rounded-3xl border-2 border-brand-200 bg-gradient-to-b from-brand-50 to-white p-8 text-center shadow-lg sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Workshop fee
          </p>
          <p className="mt-4 text-lg text-ink-500 line-through">₹{workshop.originalPrice}</p>
          <p className="mt-2 text-5xl font-bold text-brand-600">₹{workshop.price}</p>
          <p className="mt-2 text-sm text-ink-600">
            First-workshop introductory discount · Limited seats
          </p>

          <ul className="mt-8 space-y-3 text-left text-sm text-ink-700">
            <li>✓ {workshop.dates}</li>
            <li>✓ {workshop.time}</li>
            <li>✓ {workshop.duration}</li>
            <li>✓ Confirmation after payment verification</li>
          </ul>

          <RegisterCta
            href={registerHref}
            className="mt-8 inline-block w-full rounded-xl bg-amber-400 px-8 py-4 text-lg font-semibold text-ink-950 transition hover:bg-amber-300"
          >
            Buy now — ₹{workshop.price}
          </RegisterCta>

          <p className="mt-4 text-xs text-ink-500">
            Register, pay by UPI, and upload your payment screenshot
          </p>
        </div>
      </div>
    </section>
  );
}
