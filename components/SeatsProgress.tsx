const WORKSHOP_START = new Date("2026-10-31T00:00:00+05:30");

export function daysUntilWorkshop() {
  const msLeft = WORKSHOP_START.getTime() - Date.now();
  return Math.max(0, Math.ceil(msLeft / (24 * 60 * 60 * 1000)));
}

type Props = {
  variant?: "light" | "dark";
};

export default function SeatsProgress({ variant = "light" }: Props) {
  const daysLeft = daysUntilWorkshop();
  const dark = variant === "dark";

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-2xl border px-5 py-3 ${
        dark
          ? "border-white/15 bg-stone-950/55 text-white backdrop-blur-md"
          : "border-amber-200 bg-amber-50/80 text-stone-800"
      }`}
    >
      <span className="text-2xl">⏳</span>
      <p className={`font-hand text-2xl font-bold ${dark ? "text-amber-200" : "text-amber-800"}`}>
        {daysLeft > 0 ? `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left` : "Workshop has started"}
      </p>
    </div>
  );
}
