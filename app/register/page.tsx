import RegisterForm from "@/components/RegisterForm";
import { getSiteContent } from "@/lib/storage";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ package?: string }>;
};

export default async function RegisterPage({ searchParams }: Props) {
  const content = await getSiteContent();
  const { package: selectedPackage } = await searchParams;

  return (
    <section className="section-padding min-h-[70vh] bg-[#FAF7F2]">
      <div className="container-narrow">
        <div className="mx-auto max-w-3xl">
          <RegisterForm
            workshop={{
              title: content.title,
              price: content.workshop.price,
              workshopPrice: content.workshop.workshopPrice ?? 21999,
              travelPrice: content.workshop.travelPrice ?? 24999,
              advanceAmount: content.workshop.advanceAmount ?? 5000,
              balanceDueDate: content.workshop.balanceDueDate ?? "25th October 2026",
              dates: content.workshop.dates,
              travelDates: content.workshop.travelDates ?? "30th October – 3rd November 2026",
              registrationOpen: content.workshop.registrationOpen,
              defaultPackage: selectedPackage === "travel" ? "travel" : "workshop",
            }}
          />
        </div>
      </div>
    </section>
  );
}
