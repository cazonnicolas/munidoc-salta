import Image from "next/image";

export function InstitutionalLogo({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo-salta.png"
      alt="Municipalidad de Salta"
      width={516}
      height={222}
      priority={priority}
      className={`h-auto object-contain ${className}`}
    />
  );
}
