import Image from "next/image";
import BgSection from "@/components/BgSection";
import type { SiteContent } from "@/lib/types";

type Props = {
  content: SiteContent;
};

type Step = { title: string; note?: string; points?: string[] };

type Day = {
  label: string;
  date: string;
  motto: string;
  stay: string;
  steps: Step[];
  polaroid: { src: string; alt: string; caption: string; tilt: string };
  scribble: string;
};

const DAYS: Day[] = [
  {
    label: "Day 1",
    date: "31st October 2026",
    motto: "Explore · Learn · Create",
    stay: "🛖 Stay @ Hampi Nature Cottage (Hippie Island)",
    steps: [
      {
        title: "Breakfast & Gamified Introduction",
        note: "Welcome and introduction of participants, Akash and the team.",
      },
      {
        title: "Session 1: Storytelling Fundamentals with Akash",
        points: [
          "Write meaningful short-form scripts",
          "Create hooks nobody wants to skip",
          "Break down Akash's real scripts and videos",
          "Create endings that leave a meaningful impact",
        ],
      },
      { title: "Lunch Break", note: "Delicious South Indian vegetarian food." },
      {
        title: "Session 2: Visual Learning & Cinematography",
        note: "Special lecture by Siddhi Dalvi — Actor | Model | Assistant Director | DOP Assistant",
        points: [
          "Bring emotions to life through visuals",
          "The aesthetic behind a frame",
          "Angles, framing, shot sizes and their meaning",
          "Shooting effective B-rolls and why they matter",
        ],
      },
      {
        title: "📽️ Practical: Outdoor Shooting Exercise",
        note: "In the picturesque fields of Hampi, surrounded by its historic rocks.",
      },
      { title: "☕️ Tea Break & Session 3: Basic Editing with Akash" },
      {
        title: "Dinner & Night Activity",
        note: "Edit the day's footage, then a group screening and review by Akash and the team.",
      },
    ],
    polaroid: {
      src: "/images/siddhi-dalvi-session.jpg",
      alt: "Siddhi Dalvi teaching participants outdoors",
      caption: "Hands-on field training",
      tilt: "-rotate-[7deg]",
    },
    scribble: "From idea to visuals ↗",
  },
  {
    label: "Day 2",
    date: "1st November 2026",
    motto: "Shoot · Edit · Build",
    stay: "🛕 Stay @ Rocky Guest House (near Virupaksha Temple)",
    steps: [
      {
        title: "Travel to Our Second Stay",
        note: "Check in and breakfast at a picturesque restaurant with Hampi views.",
      },
      {
        title: "Session 1: Storytelling & Scriptwriting with Akash",
        points: [
          "Voiceover: sound natural — modulation, pauses, delivery",
          "Turn real-life experiences into stories worth telling",
          "How to start and end a story",
          "Build emotion and keep your audience engaged",
        ],
      },
      { title: "Lunch Break" },
      {
        title: "Session 2: Advanced Editing with Akash",
        points: [
          "How Akash edits his videos from start to finish",
          "Visuals, sound, music, stickers and pacing together",
          "A look at Akash's actual editing timelines",
          "Watch him write, shoot and edit a video live",
        ],
      },
      {
        title: "📽️ Practical: Outdoor Storytelling & Shooting",
        note: "A new location near Virupaksha Temple.",
      },
      { title: "☕️ Tea Break & South Indian Dinner" },
      {
        title: "Group Activity",
        note: "Collaborative evening, creative exchange and community interaction.",
      },
    ],
    polaroid: {
      src: "/images/akash-temple-pillars.jpg",
      alt: "Akash among the temple pillars of Hampi",
      caption: "Virupaksha heritage",
      tilt: "rotate-[7deg]",
    },
    scribble: "Better content. Bigger dreams ↗",
  },
];

export default function WorkshopSection({ content }: Props) {
  const { workshop } = content;

  return (
    <BgSection id="workshop" image="/images/bg/vittala.jpg" tone="dark" className="section-padding">
      <div className="container-narrow">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
            The itinerary
          </p>
          <h2 className="font-hand mt-2 text-4xl font-bold text-white sm:text-6xl">
            Two Days. A Million Stories.
          </h2>
          <p className="mt-3 text-base text-stone-200 sm:text-lg">
            A perfect blend of learning, creating and exploring.
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-stone-300">
            {workshop.dates} · {workshop.seats}
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-8">
          {DAYS.map((day) => (
            <DayCard key={day.label} day={day} />
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/15 bg-stone-950/60 p-6 backdrop-blur-md sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-2xl">
                🚌
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  2nd November 2026
                </p>
                <h4 className="font-hand text-3xl font-bold text-white">
                  Day 3 — Journey Home
                </h4>
                <p className="text-sm text-stone-300">
                  Return AC bus journey from Hampi back to Pune &amp; Mumbai (for Travel Package holders).
                </p>
              </div>
            </div>
            <p className="font-hand text-xl text-amber-200">Hope to see you there!</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border-2 border-amber-400/60 bg-amber-400/10 p-6 text-center backdrop-blur-sm sm:p-10">
          <p className="font-hand text-3xl font-bold text-amber-300 sm:text-4xl">
            You leave with 1 curated video — shot &amp; edited by you.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-stone-200 sm:text-base">
            {content.creator.quoteMarathi}
          </p>
        </div>
      </div>
    </BgSection>
  );
}

function DayCard({ day }: { day: Day }) {
  return (
    <div className="parchment-sheet relative rounded-3xl p-6 pb-8 shadow-2xl sm:p-8">
      <div className="mx-auto -mt-10 mb-4 h-6 w-28 rotate-2 rounded bg-amber-300/80 shadow-sm" />

      <div className="border-b border-stone-300 pb-5">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-800">{day.date}</p>
        <h3 className="font-hand text-5xl font-bold text-stone-950">{day.label}</h3>
        <p className="font-hand mt-1 text-2xl font-bold text-amber-800">{day.motto}</p>
        <p className="mt-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-950">
          {day.stay}
        </p>
      </div>

      <ol className="mt-6 space-y-5 border-l-2 border-dashed border-amber-400 pl-5">
        {day.steps.map((step) => (
          <li key={step.title} className="relative">
            <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-amber-500" />
            <h4 className="font-bold text-stone-950">{step.title}</h4>
            {step.note && <p className="mt-0.5 text-sm text-stone-700">{step.note}</p>}
            {step.points && (
              <ul className="mt-1.5 space-y-1 text-sm text-stone-700">
                {step.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className={`polaroid-card w-full max-w-[300px] ${day.polaroid.tilt}`}>
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={day.polaroid.src}
              alt={day.polaroid.alt}
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
          <p className="font-hand mt-3 text-center text-xl font-bold text-stone-800">
            {day.polaroid.caption}
          </p>
        </div>
        <p className="font-hand -rotate-6 text-2xl font-bold text-amber-800 sm:text-3xl">
          {day.scribble}
        </p>
      </div>
    </div>
  );
}
