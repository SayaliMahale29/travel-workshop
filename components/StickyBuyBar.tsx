import RegisterCta from "@/components/RegisterCta";

type Props = {
  price: number;
  originalPrice?: number;
  registrationOpen: boolean;
  registerHref: string;
};

export default function StickyBuyBar({
  price,
  originalPrice,
  registrationOpen,
  registerHref,
}: Props) {
  if (!registrationOpen) return null;

  return (
    <div className="sticky bottom-0 z-40 border-t border-amber-200/80 bg-white/95 backdrop-blur shadow-lg">
      <div className="container-narrow flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="leading-tight">
          <div className="flex items-center gap-2">
            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900">
              🪔 Diwali Special
            </span>
            <span className="text-xs font-semibold text-stone-600">
              Lock slot with ₹5,000 advance (non-refundable)
            </span>
          </div>
          <p className="font-hand text-2xl font-bold text-stone-950 sm:text-3xl">
            {originalPrice && originalPrice > price && (
              <span className="mr-2 text-lg text-stone-400 line-through sm:text-xl">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
            )}
            ₹{price.toLocaleString("en-IN")}
          </p>
        </div>
        <RegisterCta
          href={registerHref}
          className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-7 py-3 text-sm font-bold text-stone-950 shadow-md shadow-amber-500/20 transition hover:from-amber-400 hover:to-amber-500 sm:px-10 sm:text-base"
        >
          Enroll Now →
        </RegisterCta>
      </div>
    </div>
  );
}
