import Hero from "@/components/Hero";
import CreatorSection from "@/components/CreatorSection";
import ExperienceSection from "@/components/ExperienceSection";
import MomentsSection from "@/components/MomentsSection";
import WorkshopSection from "@/components/WorkshopSection";
import PricingSection from "@/components/PricingSection";
import StickyBuyBar from "@/components/StickyBuyBar";
import { getSiteContent } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <>
      <Hero content={content} />
      <CreatorSection content={content} />
      <MomentsSection />
      <ExperienceSection />
      <WorkshopSection content={content} />
      <PricingSection content={content} registerHref="/register" />
      <StickyBuyBar
        price={content.workshop.price}
        originalPrice={content.workshop.originalPrice}
        registrationOpen={content.workshop.registrationOpen}
        registerHref="/register"
      />
    </>
  );
}
