import Image from "next/image";

type Props = {
  id?: string;
  image: string;
  tone?: "dark" | "light";
  className?: string;
  children: React.ReactNode;
};

const OVERLAYS = {
  dark: "bg-gradient-to-b from-stone-950/92 via-stone-950/85 to-stone-950/94",
  light: "bg-gradient-to-b from-[#FAF7F2]/97 via-[#FAF7F2]/94 to-[#FAF7F2]/98",
};

export default function BgSection({ id, image, tone = "dark", className = "", children }: Props) {
  return (
    <section id={id} className={`relative isolate overflow-hidden ${className}`}>
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className={`-z-20 object-cover ${tone === "light" ? "opacity-35 blur-[1px]" : "opacity-60"}`}
      />
      <div className={`absolute inset-0 -z-10 ${OVERLAYS[tone]}`} />
      {children}
    </section>
  );
}
