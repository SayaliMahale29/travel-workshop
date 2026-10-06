import RegisterForm from "@/components/RegisterForm";
import { getSiteContent } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const content = await getSiteContent();

  return (
    <section className="section-padding min-h-[70vh] bg-[#FAF7F2]">
      <div className="container-narrow">
        <div className="mx-auto max-w-3xl">
          <RegisterForm
            workshop={{
              price: content.workshop.price,
              originalPrice: content.workshop.originalPrice,
              advanceAmount: content.workshop.advanceAmount,
              balanceDueDate: content.workshop.balanceDueDate,
              dates: content.workshop.dates,
              registrationOpen: content.workshop.registrationOpen,
              joinDetails: content.workshop.joinDetails,
            }}
          />
        </div>
      </div>
    </section>
  );
}
