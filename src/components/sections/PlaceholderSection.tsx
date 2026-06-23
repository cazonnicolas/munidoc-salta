import { Construction } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function PlaceholderSection({ title }: { title: string }) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#10264c]">
          {title}
        </h2>
        <p className="mt-1 text-sm text-[#637594]">
          Esta sección se incorporará en la próxima etapa de MuniDoc Salta.
        </p>
      </div>
      <Card className="flex min-h-[420px] flex-col items-center justify-center p-8 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-[#eaf3ff] text-[#0964c8]">
          <Construction size={30} strokeWidth={1.7} />
        </span>
        <h3 className="mt-5 text-lg font-bold text-[#173055]">
          Sección en preparación
        </h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-[#637594]">
          La navegación ya está activa. El contenido específico de {title} se
          desarrollará manteniendo esta misma estética institucional.
        </p>
      </Card>
    </section>
  );
}
