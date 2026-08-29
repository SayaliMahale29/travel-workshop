import RegisterForm from "@/components/RegisterForm";
import { getSiteContent } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const content = await getSiteContent();

  return (
    <section className="section-padding min-h-[70vh] bg-brand-50/30">
      <div className="container-narrow">
        <div className="mx-auto max-w-3xl">
          <RegisterForm
            workshop={{
              title: content.title,
              price: content.workshop.price,
              dates: content.workshop.dates,
              registrationOpen: content.workshop.registrationOpen,
            }}
          />
        </div>
      </div>
    </section>
  );
}
