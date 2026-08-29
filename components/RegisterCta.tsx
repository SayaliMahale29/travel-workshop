type Props = {
  href: string;
  className: string;
  children: React.ReactNode;
};

export default function RegisterCta({ href, className, children }: Props) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
