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
            Two Stays. Authentic Food.
          </h2>
          <p className="mt-4 text-base text-stone-200 sm:text-lg">
            We provide comfortable, curated stays in two contrasting parts of Hampi and authentic
            vegetarian meals.
          </p>
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
                On Day 2, we move to the vibrant cultural heart of Hampi. Staying near the
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
