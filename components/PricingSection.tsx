import BgSection from "@/components/BgSection";
import RegisterCta from "@/components/RegisterCta";
import SeatsProgress from "@/components/SeatsProgress";
import type { SiteContent } from "@/lib/types";

type Props = {
  content: SiteContent;
  registerHref: string;
};

const INCLUDED = [
  "Full 3 Days Practical Workshop with Akash Mahale & Siddhi Dalvi",
  "Night 1 Stay @ Hampi Nature Cottage (Bali-themed Hippie Island)",
  "Night 2 Stay @ Rocky Guest House (near Virupaksha Temple)",
  "All Authentic South Indian Vegetarian Meals (Breakfast, Lunch, Tea, Dinner)",
  "Scriptwriting, Voiceover Modulation & Live Video Editing",
  "Outdoor shooting guidance among ancient boulders & heritage sites",
  "Morning yoga near Virupaksha Temple & community activities on Day 3",
  "Screening, review, and leave with 1 fully curated & edited video",
];

export default function PricingSection({ content, registerHref }: Props) {
  const { workshop } = content;
  const price = workshop.price;
  const originalPrice = workshop.originalPrice;
  const balance = price - workshop.advanceAmount;
  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  if (!workshop.registrationOpen) {
    return (
      <section className="section-padding bg-[#FAF7F2]">
        <div className="container-text text-center">
          <h2 className="font-hand text-4xl font-bold text-stone-900">Registration closed</h2>
          <p className="mt-4 text-stone-700">
            All slots for this Hampi batch are full. Follow @akasheyess on Instagram for future
            workshops.
          </p>
        </div>
      </section>
    );
  }

  return (
    <BgSection id="pricing" image="/images/akash-sunset-view.jpg" tone="dark" className="section-padding">
      <div className="container-narrow">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-amber-400 px-4 py-1 text-xs font-bold uppercase tracking-wider text-stone-950 shadow-sm">
            🪔 Diwali Special Offer
          </span>
          <h2 className="font-hand mt-3 text-4xl font-bold text-white sm:text-6xl">
            Book Your Slot
          </h2>
          <p className="mt-3 text-base text-stone-200 sm:text-lg">
            A slot for 10 people · {workshop.dates}
          </p>
          <div className="mt-6">
            <SeatsProgress variant="dark" />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-3xl border-2 border-amber-400 bg-white p-7 shadow-2xl sm:p-10">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Workshop Fee
            </p>
            {originalPrice && originalPrice > price && (
              <p className="mt-2 text-xl font-semibold text-stone-400 line-through">
                {inr(originalPrice)}
              </p>
            )}
            <p className="font-hand text-6xl font-bold text-amber-600 sm:text-7xl">{inr(price)}</p>
            <p className="mt-1 text-sm font-semibold text-emerald-700">
              Final Diwali Special price
              {originalPrice && originalPrice > price
                ? ` — you save ${inr(originalPrice - price)}`
                : ""}
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50/80 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
              💳 Payment Plan
            </p>
            <p className="mt-1 text-sm font-semibold text-stone-900">
              • <strong>{inr(workshop.advanceAmount)}</strong> — Advance at the time of booking to
              confirm your slot <span className="font-bold text-stone-950">(non-refundable)</span>
            </p>
            <p className="mt-1 text-sm text-stone-700">
              • <strong>{inr(balance)}</strong> — Remaining amount, payable before{" "}
              {workshop.balanceDueDate}
            </p>
          </div>

          <h3 className="mt-6 text-xs font-bold uppercase tracking-wider text-stone-500">
            What&apos;s Included:
          </h3>
          <ul className="mt-3 space-y-2.5 text-sm text-stone-700">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="font-bold text-amber-600">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900">
            💬 {workshop.joinDetails}
          </div>

          <RegisterCta
            href={registerHref}
            className="mt-6 inline-block w-full rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 py-4 text-center text-base font-bold text-stone-950 shadow-lg shadow-amber-500/25 transition hover:from-amber-400 hover:to-amber-500"
          >
            Enroll Now — {inr(price)} (Pay {inr(workshop.advanceAmount)} Advance, non-refundable) →
          </RegisterCta>
        </div>

        <p className="mt-8 text-center text-xs text-stone-300">
          Any queries? Contact{" "}
          <a href="mailto:Dalvisiddhi51@gmail.com" className="underline hover:text-white">
            Dalvisiddhi51@gmail.com
          </a>
        </p>
      </div>
    </BgSection>
  );
}
