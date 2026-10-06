import Image from "next/image";
import BgSection from "@/components/BgSection";
import type { SiteContent } from "@/lib/types";

type Props = {
  content: SiteContent;
};

const SIDDHI_INSTAGRAM = "https://www.instagram.com/_siddhidalvi?utm_source=qr";

export default function CreatorSection({ content }: Props) {
  const { creator } = content;

  return (
    <BgSection id="creator" image="/images/bg/bazaar.jpg" tone="light" className="section-padding">
      <div id="about-hampi" className="container-narrow">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Tilted Polaroid Collage */}
          <div className="relative mx-auto w-full max-w-sm py-6 lg:col-span-5">
            <div className="polaroid-card -rotate-[5deg]">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/images/akash-sunset-view.jpg"
                  alt="Akash overlooking Hampi ruins at sunset"
                  fill
                  sizes="(max-width: 768px) 80vw, 380px"
                  className="object-cover"
                />
              </div>
              <p className="font-hand mt-3 text-center text-xl font-bold text-stone-800">
                Akash · Travel Creator | Storyteller
              </p>
            </div>
          </div>

          {/* Right Column: High-contrast Card Container (fixes readability issue) */}
          <div className="rounded-3xl border border-stone-200/90 bg-white p-7 shadow-2xl sm:p-10 lg:col-span-7">
            <span className="inline-block rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-900">
              About the workshop
            </span>
            <h2 className="font-hand mt-3 text-4xl font-bold leading-tight text-stone-950 sm:text-5xl">
              It&apos;s not just a workshop,
              <br />
              it&apos;s an experience.
            </h2>
            <p className="font-hand mt-2 text-xl font-bold text-amber-800">
              &ldquo;Hampi helped me discover the artist within me.&rdquo;
            </p>
            <p className="mt-5 text-base leading-relaxed text-stone-700 sm:text-lg">
              {creator.intro}
            </p>

            {creator.quoteMarathi && (
              <blockquote className="mt-6 rounded-2xl border-l-4 border-amber-500 bg-amber-50/80 p-5 text-sm font-medium leading-relaxed text-stone-900 shadow-sm sm:text-base">
                &ldquo;{creator.quoteMarathi}&rdquo;
              </blockquote>
            )}
          </div>
        </div>

        {/* Mentors Section */}
        <div className="mt-20">
          <div className="text-center">
            <span className="inline-block rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-900">
              Creative Mentorship
            </span>
            <h3 className="font-hand mt-2 text-4xl font-bold text-stone-950 sm:text-5xl">
              Meet your mentors
            </h3>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <MentorCard
              image="/images/akash-virupaksha-night.jpg"
              name="Akash Mahale"
              role="Travel Creator & Storyteller"
              handle="@akasheyess"
              instagram={creator.social.instagram}
              description="Coming from a small town, Akash built his name in the Marathi travel storytelling space with 50M+ views, 2.5L+ followers, and series like 'Akash Challa 36 Divas 36 Jile' and 'Unplanned Hampi'. He teaches how to find stories, approach new people, and edit them into something that feels truly yours."
              tags={["Scriptwriting", "Voiceover", "Editing", "50M+ Views"]}
            />
            <MentorCard
              image="/images/siddhi-dalvi-session.jpg"
              name="Siddhi Dalvi"
              role="Actor | Model | Assistant Director | DOP Assistant"
              handle="@_siddhidalvi"
              instagram={SIDDHI_INSTAGRAM}
              description="Siddhi leads the Visual Learning & Cinematography session — how to bring emotions to life through visuals, the aesthetic behind a frame, angles, framing and shot sizes, and how to shoot B-rolls that make your story work."
              tags={["Visual Storytelling", "Framing & Angles", "B-Rolls", "Outdoor Shoots"]}
            />
          </div>
        </div>
      </div>
    </BgSection>
  );
}

function MentorCard({
  image,
  name,
  role,
  handle,
  instagram,
  description,
  tags,
}: {
  image: string;
  name: string;
  role: string;
  handle: string;
  instagram: string;
  description: string;
  tags: string[];
}) {
  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-xl sm:p-8">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-amber-400 shadow">
          <Image src={image} alt={name} fill sizes="80px" className="object-cover" />
        </div>
        <div>
          <h4 className="font-hand text-3xl font-bold text-stone-950">{name}</h4>
          <p className="text-sm font-semibold text-amber-800">{role}</p>
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-pink-700 hover:underline"
          >
            📸 {handle}
          </a>
        </div>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-stone-700">{description}</p>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-stone-700">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-amber-100 px-3 py-1 text-amber-900">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
