const DISPLAY_SEATS = 10;
const REGISTRATIONS_PER_DISPLAYED_SEAT = 2;
const WORKSHOP_START = new Date("2026-10-31T00:00:00+05:30");

export function seatStats(registrationCount: number) {
  const sold = Math.min(
    DISPLAY_SEATS,
    Math.floor(registrationCount / REGISTRATIONS_PER_DISPLAYED_SEAT)
  );
  const msLeft = WORKSHOP_START.getTime() - Date.now();
  const daysLeft = Math.max(0, Math.ceil(msLeft / (24 * 60 * 60 * 1000)));
  return { sold, total: DISPLAY_SEATS, daysLeft };
}

type Props = {
  registrationCount: number;
  variant?: "light" | "dark";
};

export default function SeatsProgress({ registrationCount, variant = "light" }: Props) {
  const { sold, total, daysLeft } = seatStats(registrationCount);
  const percent = Math.round((sold / total) * 100);
  const dark = variant === "dark";

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 ${
        dark
          ? "border-white/15 bg-stone-950/55 text-white backdrop-blur-md"
          : "border-amber-200 bg-amber-50/80 text-stone-800"
      }`}
    >
      <p className="text-lg sm:text-xl">
        <span className={`font-bold ${dark ? "text-amber-300" : "text-stone-950"}`}>{sold}</span>{" "}
        <span className={dark ? "text-stone-200" : "text-stone-600"}>
          sold out of {total}
        </span>
      </p>
      <div
        className={`mt-3 h-3 w-full overflow-hidden rounded-full ${
          dark ? "bg-white/15" : "bg-stone-200"
        }`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400"
          style={{ width: `${Math.max(percent, sold > 0 ? 4 : 0)}%` }}
        />
      </div>
      <p className={`font-hand mt-3 text-lg font-bold ${dark ? "text-amber-200" : "text-amber-800"}`}>
        {daysLeft > 0 ? `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left` : "Workshop has started"}
      </p>
    </div>
  );
}
