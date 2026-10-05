import Image from "next/image";

type Props = {
  id?: string;
  image: string;
  tone?: "dark" | "light";
  className?: string;
  children: React.ReactNode;
};

const OVERLAYS = {
  dark: "bg-gradient-to-b from-stone-950/85 via-stone-950/75 to-stone-950/90",
  light: "bg-gradient-to-b from-[#FAF7F2]/92 via-[#F5EFE6]/88 to-[#FAF7F2]/95",
};

export default function BgSection({ id, image, tone = "dark", className = "", children }: Props) {
  return (
    <section id={id} className={`relative isolate overflow-hidden ${className}`}>
      <Image src={image} alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div className={`absolute inset-0 -z-10 ${OVERLAYS[tone]}`} />
      {children}
    </section>
  );
}
