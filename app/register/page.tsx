import RegisterForm from "@/components/RegisterForm";
import { getSiteContent } from "@/lib/storage";

export default async function RegisterPage() {
  const content = await getSiteContent();
  const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "";

  return (
    <section className="section-padding min-h-[70vh] bg-brand-50/30">
      <div className="container-narrow">
        <div className="mx-auto max-w-lg">
          {!razorpayKeyId && (
            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Payment is not configured yet. Add Razorpay keys to <code>.env.local</code> — see{" "}
              <strong>SETUP-GUIDE.md</strong>.
            </div>
          )}
          <RegisterForm
            workshop={{
              title: content.title,
              price: content.workshop.price,
              dates: content.workshop.dates,
              registrationOpen: content.workshop.registrationOpen,
            }}
            razorpayKeyId={razorpayKeyId}
          />
        </div>
      </div>
    </section>
  );
}
