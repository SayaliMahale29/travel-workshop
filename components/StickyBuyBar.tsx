import Link from "next/link";

type Props = {
  price: number;
  originalPrice: number;
  registrationOpen: boolean;
};

export default function StickyBuyBar({ price, originalPrice, registrationOpen }: Props) {
  if (!registrationOpen) return null;

  return (
    <div className="sticky bottom-0 z-40 border-t border-brand-100 bg-white/95 backdrop-blur">
      <div className="container-narrow flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="leading-tight">
          <p className="text-sm text-ink-500 line-through">₹{originalPrice}</p>
          <p className="text-2xl font-bold text-ink-950 sm:text-3xl">₹{price}</p>
        </div>
        <Link
          href="/register"
          className="rounded-xl bg-amber-400 px-8 py-3.5 text-base font-semibold text-ink-950 shadow-sm transition hover:bg-amber-300 sm:px-12 sm:text-lg"
        >
          Buy now
        </Link>
      </div>
    </div>
  );
}
