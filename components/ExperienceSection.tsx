import Image from "next/image";
import BgSection from "@/components/BgSection";

export default function ExperienceSection() {
  return (
    <BgSection id="experience" image="/images/bg/stone-chariot.jpg" tone="dark" className="section-padding">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
            What we arrange for you
          </p>
          <h2 className="font-hand mt-3 text-4xl font-bold leading-tight text-white sm:text-6xl">
            Two Stays. Authentic Food. Dedicated Travel.
          </h2>
          <p className="mt-4 text-base text-stone-200 sm:text-lg">
            We provide comfortable, curated stays in two contrasting parts of Hampi, authentic
            vegetarian meals, and an optional end-to-end travel package.
          </p>
        </div>

        {/* Travel Package Banner */}
        <div className="mt-12 rounded-3xl border-2 border-amber-400 bg-white p-7 shadow-2xl sm:p-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-3xl shadow-sm">
                🚌
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-stone-950">
                    Travel Included Package — ₹24,999
                  </span>
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">
                    30th Oct – 3rd Nov
                  </span>
                </div>
                <h3 className="font-hand mt-2 text-2xl font-bold text-stone-950 sm:text-3xl">
                  AC Bus Travel with Mumbai &amp; Pune Pick-up
                </h3>
                <p className="mt-2 text-sm text-stone-700 sm:text-base">
                  Don&apos;t want the hassle of booking trains or buses? Choose our Travel Included
                  Package and our team will handle your complete journey:
                </p>
                <ul className="mt-3 grid gap-2 text-sm text-stone-800 sm:grid-cols-2">
                  <li className="flex items-center gap-2">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Comfortable AC Bus Travel</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Mumbai &amp; Pune Pickup (30th Oct evening)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Direct travel to workshop location in Hampi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Local transportation from bus stop to hotel</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Hampi → Mumbai/Pune return journey</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Complete travel arranged by the team</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="shrink-0 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center lg:w-56">
              <p className="text-xs font-semibold text-stone-600">Traveling on your own?</p>
              <p className="font-hand mt-1 text-xl font-bold text-stone-900">
                Workshop Fee: ₹21,999
              </p>
              <p className="mt-1 text-xs text-stone-500">Reach Hampi directly (31 Oct – 2 Nov)</p>
            </div>
          </div>
        </div>

        {/* Stays Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Stay 1: Hampi Nature Cottage */}
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl">
            <div className="relative aspect-[16/10] w-full bg-stone-100">
              <Image
                src="/images/hampi-nature-cottage.jpg"
                alt="Hampi Nature Cottage - Bali-themed retreat surrounded by boulders"
                fill
                className="object-cover"
              />
              <div className="absolute left-4 top-4 rounded-full bg-stone-950/80 px-3.5 py-1 text-xs font-bold text-amber-300 backdrop-blur">
                Night 1 · Hippie Island
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="font-hand text-3xl font-bold text-stone-900">
                Hampi Nature Cottage 🛖🌴
              </h3>
              <p className="mt-1 text-sm font-semibold text-amber-800">
                Bali-Themed Retreat in the Hills
              </p>
              <p className="mt-4 text-sm leading-relaxed text-stone-700 sm:text-base">
                Nestled peacefully in the lap of Hampi&apos;s hills, this picturesque Bali-themed
                cottage property surrounded by lush green coconut palms and boulder views is where
                our creative journey begins.
              </p>
              <div className="mt-5 rounded-xl bg-amber-50/80 p-4 text-xs font-medium italic text-stone-800">
                &ldquo;ही Property Bali-themed आहे 🛖🌴 आणि खरं सांगायचं तर मी स्वतः जेव्हा ही जागा
                पहिल्यांदा पाहिली, तेव्हा खूप खुश झालो होतो.&rdquo;
              </div>
            </div>
          </div>

          {/* Stay 2: Rocky Guest House */}
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl">
            <div className="relative aspect-[16/10] w-full bg-stone-100">
              <Image
                src="/images/akash-virupaksha-night.jpg"
                alt="Virupaksha Temple at night near Rocky Guest House"
                fill
                className="object-cover"
              />
              <div className="absolute left-4 top-4 rounded-full bg-stone-950/80 px-3.5 py-1 text-xs font-bold text-amber-300 backdrop-blur">
                Night 2 · Virupaksha Heritage
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="font-hand text-3xl font-bold text-stone-900">
                Rocky Guest House, Hampi 🛕
              </h3>
              <p className="mt-1 text-sm font-semibold text-amber-800">
                Steps Away from Virupaksha Temple
              </p>
              <p className="mt-4 text-sm leading-relaxed text-stone-700 sm:text-base">
                On Day 2, we travel to the vibrant cultural heart of Hampi. Staying near the
                majestic Virupaksha Temple gives us immediate access to ancient Dravidian
                architecture, local artisans, dynamic street stories, and evening monument shoots.
              </p>
              <div className="mt-5 rounded-xl bg-stone-100 p-4 text-xs font-medium text-stone-700">
                &ldquo;We want you to meet new people, explore new locations, understand Hampi&apos;s
                living soul, and find your storyline through a different creative lens.&rdquo;
              </div>
            </div>
          </div>
        </div>

        {/* Food & Hospitality Showcase */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl">
          <div className="grid items-center gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Authentic Cuisine Included
              </span>
              <h3 className="font-hand mt-1 text-3xl font-bold text-stone-950 sm:text-4xl">
                Delicious South Indian Vegetarian Food
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-700 sm:text-base">
                All workshop meals are freshly prepared and served with warm South Indian
                hospitality. Enjoy traditional thali lunches, regional breakfasts, evening
                refreshments, and hearty dinners.
              </p>
              <ul className="mt-4 space-y-2 text-xs font-medium text-stone-700 sm:text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>Day 1: Welcome Breakfast, Thali Lunch, Tea &amp; Group Dinner</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>Day 2: Scenic Cafe Breakfast, South Indian Lunch, Tea &amp; Celebration Dinner</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>Pure vegetarian food arranged for all participants</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:col-span-7">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
                <Image
                  src="/images/south-indian-thali.jpg"
                  alt="Delicious authentic South Indian thali meal"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
                <Image
                  src="/images/akash-riverside-cafe.png"
                  alt="Akash having food at a cafe in Hampi"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BgSection>
  );
}
