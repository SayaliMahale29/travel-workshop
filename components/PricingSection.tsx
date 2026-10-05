import BgSection from "@/components/BgSection";
import RegisterCta from "@/components/RegisterCta";
import SeatsProgress from "@/components/SeatsProgress";
import type { SiteContent } from "@/lib/types";

type Props = {
  content: SiteContent;
  registerHref: string;
  registrationCount: number;
};

export default function PricingSection({ content, registerHref, registrationCount }: Props) {
  const { workshop } = content;

  if (!workshop.registrationOpen) {
    return (
      <section className="section-padding bg-[#FAF7F2]">
        <div className="container-text text-center">
          <h2 className="font-hand text-4xl font-bold text-stone-900">Registration closed</h2>
          <p className="mt-4 text-stone-700">
            All 10 slots for this Hampi batch are full. Follow @akasheyess on Instagram for future
            workshops.
          </p>
        </div>
      </section>
    );
  }

  return (
    <BgSection id="pricing" image="/images/akash-sunset-view.jpg" tone="dark" className="section-padding">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-amber-400 px-4 py-1 text-xs font-bold uppercase tracking-wider text-stone-950 shadow-sm">
            Strictly 10 Slots Only
          </span>
          <h2 className="font-hand mt-3 text-4xl font-bold text-white sm:text-6xl">
            Choose Your Workshop Package
          </h2>
          <p className="mt-3 text-base text-stone-200 sm:text-lg">
            Confirm your slot today with a flexible <strong>₹5,000 advance payment</strong>.
            Remaining balance payable before 25th October.
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <SeatsProgress registrationCount={registrationCount} variant="dark" />
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* PACKAGE 1: WORKSHOP ONLY */}
          <div className="flex flex-col justify-between rounded-3xl border border-stone-200 bg-white p-7 shadow-2xl sm:p-9">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-stone-800">
                  Option 1 · Self Travel
                </span>
                <span className="text-xs font-semibold text-stone-500">31 Oct – 2 Nov 2026</span>
              </div>

              <h3 className="font-hand mt-3 text-3xl font-bold text-stone-950 sm:text-4xl">
                Workshop Fee
              </h3>
              <p className="mt-1 text-sm text-stone-600">
                For creators traveling to Hampi on their own
              </p>

              <div className="mt-5 border-y border-stone-200 py-4">
                <p className="font-hand text-5xl font-bold text-stone-950 sm:text-6xl">
                  ₹21,999
                </p>
                <div className="mt-3 rounded-2xl border border-amber-300 bg-amber-50/80 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    💳 Flexible Payment Plan
                  </p>
                  <p className="mt-1 text-sm font-semibold text-stone-900">
                    • <strong>₹5,000</strong> — Advance at the time of booking to confirm your slot
                  </p>
                  <p className="mt-1 text-sm text-stone-700">
                    • <strong>₹16,999</strong> — Remaining amount, payable before 25th October
                  </p>
                </div>
              </div>

              <h4 className="mt-5 text-xs font-bold uppercase tracking-wider text-stone-500">
                What&apos;s Included:
              </h4>
              <ul className="mt-3 space-y-2.5 text-sm text-stone-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">✓</span>
                  <span>Full 3 Days Practical Workshop with Akash Mahale &amp; Siddhi Dalvi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">✓</span>
                  <span>Night 1 Stay @ Hampi Nature Cottage (Bali-themed Hippie Island)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">✓</span>
                  <span>Night 2 Stay @ Rocky Guest House (near Virupaksha Temple)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">✓</span>
                  <span>All Authentic South Indian Vegetarian Meals (Breakfast, Lunch, Tea, Dinner)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">✓</span>
                  <span>1-on-1 Scriptwriting, Voiceover Modulation &amp; Live Video Editing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">✓</span>
                  <span>Outdoor shooting guidance among ancient boulders &amp; heritage sites</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">✓</span>
                  <span>Screening, review, and leave with 1 fully curated &amp; edited video</span>
                </li>
                <li className="flex items-start gap-2 text-stone-500">
                  <span className="font-bold text-stone-400">•</span>
                  <span className="italic">Travel to &amp; from Hampi managed directly by you</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 border-t border-stone-200 pt-6">
              <RegisterCta
                href={`${registerHref}?package=workshop`}
                className="inline-block w-full rounded-2xl border-2 border-stone-900 bg-white py-4 text-center text-base font-bold text-stone-950 transition hover:bg-stone-50"
              >
                Book Workshop Fee — ₹21,999 (Pay ₹5,000 Advance) →
              </RegisterCta>
            </div>
          </div>

          {/* PACKAGE 2: TRAVEL INCLUDED (RECOMMENDED) */}
          <div className="relative flex flex-col justify-between rounded-3xl border-2 border-amber-400 bg-white p-7 shadow-2xl sm:p-9">
            <div className="absolute -top-3.5 right-6 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-stone-950 shadow-md">
              ★ Most Convenient
            </div>

            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-950">
                  Option 2 · Full Travel Package
                </span>
                <span className="text-xs font-semibold text-stone-500">30 Oct – 3 Nov 2026</span>
              </div>

              <h3 className="font-hand mt-3 text-3xl font-bold text-stone-950 sm:text-4xl">
                Travel Included Package
              </h3>
              <p className="mt-1 text-sm text-stone-600">
                Workshop + Complete AC bus travel from Mumbai &amp; Pune
              </p>

              <div className="mt-5 border-y border-stone-200 py-4">
                <p className="font-hand text-5xl font-bold text-amber-600 sm:text-6xl">
                  ₹24,999
                </p>
                <div className="mt-3 rounded-2xl border border-amber-300 bg-amber-50/80 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    💳 Flexible Payment Plan
                  </p>
                  <p className="mt-1 text-sm font-semibold text-stone-900">
                    • <strong>₹5,000</strong> — Advance at the time of booking to confirm your slot
                  </p>
                  <p className="mt-1 text-sm text-stone-700">
                    • <strong>₹19,999</strong> — Remaining amount, payable before 25th October
                  </p>
                </div>
              </div>

              <h4 className="mt-5 text-xs font-bold uppercase tracking-wider text-stone-500">
                This Package Includes:
              </h4>
              <ul className="mt-3 space-y-2.5 text-sm text-stone-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">✓</span>
                  <span><strong>Full Workshop Access:</strong> Mentorship, Stays &amp; All Meals included</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">✓</span>
                  <span><strong>AC Bus Travel:</strong> Comfortable AC sleeper/seater transport</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">✓</span>
                  <span><strong>Mumbai &amp; Pune Pickup:</strong> Board evening 30th October</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">✓</span>
                  <span><strong>Direct Travel:</strong> Straight to the workshop location in Hampi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">✓</span>
                  <span><strong>Local Transportation:</strong> From Hampi bus stop to our resort</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">✓</span>
                  <span><strong>Return Journey:</strong> Hampi → Pune &amp; Mumbai (arrives 3rd Nov)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">✓</span>
                  <span><strong>Zero Travel Stress:</strong> Complete travel arranged &amp; managed by team</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 border-t border-stone-200 pt-6">
              <RegisterCta
                href={`${registerHref}?package=travel`}
                className="inline-block w-full rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 py-4 text-center text-base font-bold text-stone-950 shadow-lg shadow-amber-500/25 transition hover:from-amber-400 hover:to-amber-500"
              >
                Book Travel Package — ₹24,999 (Pay ₹5,000 Advance) →
              </RegisterCta>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-stone-300">
          Click any package button to register, select full or advance payment, and upload your UPI screenshot.
          <br />
          Any queries? Contact <a href="mailto:Dalvisiddhi51@gmail.com" className="underline hover:text-white">Dalvisiddhi51@gmail.com</a>
        </p>
      </div>
    </BgSection>
  );
}
