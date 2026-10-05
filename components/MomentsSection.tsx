import Image from "next/image";

const MOMENTS = [
  {
    src: "/images/moments/auto-boulders.jpg",
    alt: "Akash, Siddhi and a friend in front of Hampi's boulder hills",
    caption: "Hampi vibes & boulder hills ✨",
    width: 792,
    height: 1024,
    tilt: "-rotate-[6deg]",
  },
  {
    src: "/images/moments/coconut-cheers.jpg",
    alt: "Friends sharing tender coconuts in the paddy fields",
    caption: "Fields of Hampi 🥥",
    width: 1024,
    height: 696,
    tilt: "rotate-[5deg]",
  },
  {
    src: "/images/moments/coracle-ride.jpg",
    alt: "On the Tungabhadra river",
    caption: "By the Tungabhadra river 🛶",
    width: 768,
    height: 1024,
    tilt: "rotate-[7deg]",
  },
  {
    src: "/images/moments/fields-view.jpg",
    alt: "Looking out over green paddy fields",
    caption: "Stories in every frame 🌾",
    width: 1024,
    height: 617,
    tilt: "-rotate-[5deg]",
  },
  {
    src: "/images/moments/akash-cottage.jpg",
    alt: "Akash outside a thatched cottage in Hampi",
    caption: "Cottage life in the hills 🛖",
    width: 738,
    height: 1024,
    tilt: "-rotate-[7deg]",
  },
  {
    src: "/images/moments/akash-fields.jpg",
    alt: "Akash looking at the fields",
    caption: "Quiet Hampi mornings ☀️",
    width: 510,
    height: 585,
    tilt: "rotate-[6deg]",
  },
];

export default function MomentsSection() {
  return (
    <section
      id="moments"
      className="section-padding relative overflow-hidden bg-gradient-to-b from-[#F5EFE6] via-[#FFFDF5] to-[#F5EFE6]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#b45309_0.5px,transparent_0.5px)] opacity-15 [background-size:20px_20px]" />

      <div className="container-narrow relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800">
            Travel &amp; Learn with Akash
          </p>
          <h2 className="font-hand mt-2 text-4xl font-bold text-stone-950 sm:text-6xl">
            Moments from Hampi
          </h2>
          <p className="mt-3 text-base text-stone-700 sm:text-lg">
            Glimpses, frames, and memories from Akash and Siddhi&apos;s creative journeys in Hampi.
          </p>
        </div>

        <div className="mt-14 columns-1 gap-10 sm:columns-2 lg:columns-3">
          {MOMENTS.map((moment) => (
            <figure
              key={moment.src}
              className={`polaroid-card mb-12 break-inside-avoid ${moment.tilt}`}
            >
              <Image
                src={moment.src}
                alt={moment.alt}
                width={moment.width}
                height={moment.height}
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
                className="h-auto w-full"
              />
              <figcaption className="font-hand mt-3 text-center text-xl font-bold text-stone-800 sm:text-2xl">
                {moment.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="font-hand -rotate-2 text-center text-3xl font-bold text-amber-800 sm:text-4xl">
          Same places. New perspectives ↗
        </p>
      </div>
    </section>
  );
}
