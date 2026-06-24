"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownToLine,
  ChevronDown,
  Eye,
  FileText,
  Files,
  RotateCcw,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InstitutionalLogo } from "@/components/ui/InstitutionalLogo";
import { trackActivity } from "@/lib/activityClient";
import {
  documentModels,
  type DocumentModel,
  type DocumentType,
} from "@/lib/documentModels";
import type { SectionId } from "@/lib/navigation";

type DocumentTone = "blue" | "green" | "purple" | "teal" | "amber" | "red";

const typeTones: Record<DocumentType, DocumentTone> = {
  Nota: "blue",
  Pase: "green",
  Memorándum: "purple",
  Circular: "teal",
  Informe: "amber",
  Constancia: "red",
};

const toneClasses: Record<
  DocumentTone,
  { icon: string; soft: string; line: string }
> = {
  blue: {
    icon: "text-[#0866cf]",
    soft: "bg-[#eaf3ff] text-[#075cc5]",
    line: "bg-[#1473dc]",
  },
  green: {
    icon: "text-[#15975c]",
    soft: "bg-[#e7f7ed] text-[#16844a]",
    line: "bg-[#21a665]",
  },
  purple: {
    icon: "text-[#7650dc]",
    soft: "bg-[#f1ebff] text-[#7452d6]",
    line: "bg-[#7d5ae1]",
  },
  teal: {
    icon: "text-[#11939b]",
    soft: "bg-[#e4f7f7] text-[#0c7f86]",
    line: "bg-[#17a0a7]",
  },
  amber: {
    icon: "text-[#c58b00]",
    soft: "bg-[#fff5d9] text-[#a97700]",
    line: "bg-[#d9a10d]",
  },
  red: {
    icon: "text-[#df593d]",
    soft: "bg-[#ffede8] text-[#c84c33]",
    line: "bg-[#ea6548]",
  },
};

const featuredTypes: DocumentType[] = [
  "Nota",
  "Pase",
  "Memorándum",
  "Circular",
];

export function ModelosSection({
  onNavigate,
  onUseModel,
}: {
  onNavigate: (section: SectionId) => void;
  onUseModel: (modelId: string) => void;
}) {
  const [selectedModel, setSelectedModel] = useState<DocumentModel | null>(null);
  const featuredModels = featuredTypes
    .map((type) => documentModels.find((model) => model.type === type))
    .filter((model): model is DocumentModel => Boolean(model));

  useEffect(() => {
    if (!selectedModel) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedModel(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedModel]);

  const handleUseModel = (model: DocumentModel) => {
    trackActivity({
      eventType: "model_use_generator",
      section: "Modelos",
      detail: model.title,
      documentType: model.type,
      modelId: model.id,
    });
    setSelectedModel(null);
    onUseModel(model.id);
  };

  const handleOpenModel = (model: DocumentModel) => {
    trackActivity({
      eventType: "model_view",
      section: "Modelos",
      detail: model.title,
      documentType: model.type,
      modelId: model.id,
    });
    setSelectedModel(model);
  };

  return (
    <section className="section-stage space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-[24px] font-bold tracking-[-0.025em] text-[#10264c]">
            Modelos
          </h2>
          <p className="mt-1 text-sm text-[#637594]">
            Explorá y utilizá modelos oficiales de documentos administrativos.
          </p>
        </div>
        <Button className="h-10 gap-2 self-start sm:self-auto">
          <Files size={16} />
          Ver mis documentos generados
        </Button>
      </div>

      <Card className="decorated-panel border-[#bcd8f5] bg-[linear-gradient(135deg,#edf6ff,#f9fcff)] p-6">
        <div className="mb-4 flex items-center gap-2">
          <Star size={19} className="text-[#0865cd]" />
          <h3 className="text-sm font-bold text-[#075cc5]">
            Modelos más usados
          </h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featuredModels.map((model) => (
            <FeaturedModelCard
              key={model.type}
              model={model}
              onOpen={() => handleOpenModel(model)}
            />
          ))}
        </div>
      </Card>

      <Card className="flex flex-col gap-3 border-[#ccddea] bg-white/92 p-4 xl:flex-row xl:items-center">
        <div className="grid flex-1 gap-3 sm:grid-cols-3">
          <FilterButton label="Tipo de documento" />
          <FilterButton label="Área/Dependencia" />
          <FilterButton label="Formato" />
        </div>
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 px-2 text-xs font-semibold text-[#075cc5]"
        >
          <RotateCcw size={15} />
          Limpiar filtros
        </button>
        <FilterButton label="Ordenar por: Más usados" className="xl:w-[205px]" />
      </Card>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {documentModels.map((model) => (
          <DocumentModelCard
            key={model.id}
            model={model}
            onOpen={() => handleOpenModel(model)}
            onUse={() => handleUseModel(model)}
          />
        ))}
      </div>

      <Card className="decorated-panel overflow-hidden border-dashed border-[#8fc0ef] bg-gradient-to-r from-[#e9f4ff] to-[#f9fcff]">
        <div className="flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center lg:px-8">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-[#dcecff] text-[#0863c8]">
            <Sparkles size={30} strokeWidth={1.8} />
          </span>
          <div className="flex-1">
            <h3 className="text-base font-bold text-[#075cc5]">
              ¿No encontrás lo que buscás?
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#526987]">
              Generá un documento desde cero con la ayuda de IA o solicitá un
              nuevo modelo.
            </p>
          </div>
          <Button
            variant="primary"
            className="h-10 gap-2"
            onClick={() => onNavigate("generador")}
          >
            <Sparkles size={16} />
            Ir al Generador IA
          </Button>
        </div>
      </Card>

      {selectedModel && (
        <ModelDetailModal
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
          onUse={() => handleUseModel(selectedModel)}
        />
      )}
    </section>
  );
}

function FeaturedModelCard({
  model,
  onOpen,
}: {
  model: DocumentModel;
  onOpen: () => void;
}) {
  const tone = toneClasses[typeTones[model.type]];

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative min-h-[132px] overflow-hidden rounded-2xl border border-[#c9dcee] bg-white/95 p-4 text-left shadow-[0_7px_20px_rgba(30,64,115,0.045)] transition-all hover:-translate-y-0.5 hover:border-[#8eb8e7] hover:shadow-[0_12px_25px_rgba(30,75,130,0.08)]"
    >
      <span className={`absolute inset-x-0 top-0 h-[3px] ${tone.line}`} />
      <div className="flex items-center gap-2">
        <FileText size={21} className={tone.icon} strokeWidth={1.8} />
        <h4 className="text-xs font-bold text-[#173055]">
          {model.type.toUpperCase()}
        </h4>
        <span
          className={`ml-auto rounded-md px-2 py-1 text-[9px] font-semibold ${tone.soft}`}
        >
          {model.scope}
        </span>
      </div>
      <p className="mt-4 line-clamp-3 text-[11px] leading-5 text-[#566b89]">
        {model.description}
      </p>
    </button>
  );
}

function DocumentModelCard({
  model,
  onOpen,
  onUse,
}: {
  model: DocumentModel;
  onOpen: () => void;
  onUse: () => void;
}) {
  const tone = toneClasses[typeTones[model.type]];

  return (
    <Card className="group flex min-h-[485px] flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#abc9ed] hover:shadow-[0_16px_34px_rgba(30,75,130,0.09)]">
      <DocumentPreview model={model} />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-md px-2 py-1 text-[9px] font-semibold ${tone.soft}`}
          >
            {model.type.toUpperCase()}
          </span>
          <span className="rounded-md bg-[#eef3f8] px-2 py-1 text-[9px] font-semibold text-[#566b89]">
            {model.scope}
          </span>
          {model.editable && (
            <span className="rounded-md bg-[#e6f7eb] px-2 py-1 text-[9px] font-semibold text-[#16844a]">
              Editable
            </span>
          )}
        </div>

        <h3 className="mt-3 text-[13px] font-bold leading-[1.45] tracking-[0.015em] text-[#075cc5]">
          {model.title.toUpperCase()}
        </h3>
        <p className="mt-2 text-[12px] leading-5 text-[#526987]">
          {model.description}
        </p>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center gap-2">
            <Button className="gap-2" onClick={onOpen}>
              <Eye size={15} />
              Ver
            </Button>
            <button
              type="button"
              className="inline-flex h-8 items-center gap-2 px-2 text-xs font-medium text-[#506784] transition-colors hover:text-[#075cc5]"
            >
              <ArrowDownToLine size={15} />
              Descargar
            </button>
          </div>
          <Button className="mt-3 w-full gap-2" onClick={onUse}>
            <Sparkles size={15} />
            Usar en generador
          </Button>
        </div>
      </div>
    </Card>
  );
}

function DocumentPreview({ model }: { model: DocumentModel }) {
  const toneStyle = toneClasses[typeTones[model.type]];

  return (
    <div className="document-paper relative h-[205px] overflow-hidden border-b border-[#dce6ef] bg-gradient-to-b from-white to-[#f7faff] px-5 py-4">
      <div className="absolute -right-12 -top-12 size-28 rounded-full border border-[#5e9edc]/10 shadow-[0_0_0_18px_rgba(49,125,201,0.025)]" />
      <div className="flex items-start justify-between gap-5">
        <InstitutionalLogo className="w-[76px]" />
        <div className="text-right">
          <div className={`ml-auto h-1 w-14 rounded-full ${toneStyle.line}`} />
          <p className="mt-2 text-[7px] font-bold uppercase tracking-[0.08em] text-[#526987]">
            {model.type.toUpperCase()}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {model.previewLines.map((line, index) => (
          <div key={`${model.id}-${index}`} className="flex items-start gap-2">
            <span
              className={`mt-1.5 size-1 shrink-0 rounded-full ${toneStyle.line}`}
            />
            <p
            className={`relative truncate text-[7px] leading-3 ${
                index < 2
                  ? "font-semibold text-[#344d6e]"
                  : "text-[#6c7d95]"
              }`}
            >
              {line}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModelDetailModal({
  model,
  onClose,
  onUse,
}: {
  model: DocumentModel;
  onClose: () => void;
  onUse: () => void;
}) {
  const tone = toneClasses[typeTones[model.type]];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#071a35]/55 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="model-detail-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-[#c9d9ea] bg-white shadow-[0_24px_70px_rgba(5,30,65,0.28)]">
        <header className="sticky top-0 z-10 flex items-start gap-4 border-b border-[#dbe5ef] bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
          <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${tone.soft}`}>
            <FileText size={22} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap gap-2">
              <span className={`rounded-md px-2 py-1 text-[9px] font-semibold ${tone.soft}`}>
                {model.type.toUpperCase()}
              </span>
              <span className="rounded-md bg-[#eef3f8] px-2 py-1 text-[9px] font-semibold text-[#566b89]">
                {model.category}
              </span>
            </div>
            <h3
              id="model-detail-title"
              className="mt-2 text-base font-bold leading-6 tracking-[0.01em] text-[#10264c] sm:text-lg"
            >
              {model.title.toUpperCase()}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalle"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-[#657894] transition-colors hover:bg-[#edf4fb] hover:text-[#075cc5]"
          >
            <X size={20} />
          </button>
        </header>

        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-5">
            <DetailBlock title="Caso de uso">
              <p className="text-sm leading-6 text-[#526987]">
                {model.useCase}
              </p>
            </DetailBlock>

            <DetailBlock title="Campos requeridos">
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {model.fields.map((field) => (
                  <li
                    key={field}
                    className="flex items-start gap-2 text-xs leading-5 text-[#526987]"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#237bd5]" />
                    {field}
                  </li>
                ))}
              </ul>
            </DetailBlock>

            <DetailBlock title="Estructura">
              <ol className="space-y-2">
                {model.structure.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-xs leading-5 text-[#526987]"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#eaf3ff] text-[9px] font-bold text-[#075cc5]">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </DetailBlock>
          </div>

          <DetailBlock title="Plantilla completa">
            <div className="rounded-xl border border-[#d5e0ec] bg-[#f8fafc] p-4 sm:p-5">
              <pre className="whitespace-pre-wrap font-sans text-[11px] leading-5 text-[#2e4665]">
                {model.template}
              </pre>
            </div>
          </DetailBlock>
        </div>

        <footer className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-[#dbe5ef] bg-white/95 px-5 py-4 backdrop-blur sm:flex-row sm:justify-end sm:px-7">
          <Button className="h-10 px-5" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="primary" className="h-10 gap-2 px-5" onClick={onUse}>
            <Sparkles size={16} />
            Usar en generador
          </Button>
        </footer>
      </div>
    </div>
  );
}

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.06em] text-[#075cc5]">
        {title}
      </h4>
      {children}
    </section>
  );
}

function FilterButton({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`flex h-10 items-center justify-between gap-3 rounded-xl border border-[#cbd9e8] bg-[#fbfdff] px-4 text-xs font-medium text-[#526987] shadow-[0_1px_2px_rgba(31,68,111,0.025)] transition-colors hover:border-[#91b9e3] ${className}`}
    >
      {label}
      <ChevronDown size={15} />
    </button>
  );
}
