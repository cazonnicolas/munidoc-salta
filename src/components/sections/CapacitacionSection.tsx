import {
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  Download,
  FileText,
  GraduationCap,
  Lock,
  Play,
  PlayCircle,
  Sparkles,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { SectionId } from "@/lib/navigation";

const modules = [
  {
    number: 1,
    title: "Introducción a los documentos administrativos",
    progress: 100,
    status: "Completado",
  },
  {
    number: 2,
    title: "Redacción clara y precisa",
    progress: 60,
  },
  {
    number: 3,
    title: "Abreviaturas y siglas",
    progress: 20,
  },
  {
    number: 4,
    title: "Conectores",
    progress: 0,
  },
  {
    number: 5,
    title: "Modelos y práctica",
    progress: 0,
  },
];

const lessons = [
  ["¿Qué es un documento administrativo?", "08:15"],
  ["Tipos de documentos administrativos", "07:40"],
  ["Estructura básica de un documento", "09:30"],
  ["Elementos indispensables", "06:25"],
  ["Buenas prácticas en la gestión documental", "07:10"],
  ["Repaso y cierre del módulo", "06:00"],
];

const materials = [
  ["Guía rápida de redacción administrativa", "PDF"],
  ["Ejemplos de documentos comunes", "PDF"],
  ["Glosario de términos administrativos", "PDF"],
  ["Normativa de referencia", "DOCX"],
];

export function CapacitacionSection({
  onNavigate,
}: {
  onNavigate: (section: SectionId) => void;
}) {
  return (
    <section className="space-y-5">
      <header className="flex flex-col gap-4 rounded-xl border border-[#d7e2ee] bg-white p-5 shadow-[0_1px_2px_rgba(30,64,115,0.04)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold text-[#687b98]">
            Capacitación <span className="px-1 text-[#a0aec0]">&gt;</span>{" "}
            <span className="text-[#075cc5]">Módulo 1</span>
          </p>
          <div className="mt-3 flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f3ff] text-[#0863c8]">
              <GraduationCap size={24} strokeWidth={1.8} />
            </span>
            <div>
              <h2 className="text-[24px] font-bold tracking-[-0.025em] text-[#10264c]">
                Ruta de capacitación
              </h2>
              <p className="mt-1 text-sm text-[#637594]">
                Desarrollá tus competencias en redacción y gestión de
                documentos administrativos.
              </p>
            </div>
          </div>
        </div>
        <Button className="h-10 gap-2 self-start sm:self-auto">
          <Award size={17} />
          Ver certificado
        </Button>
      </header>

      <div className="grid items-start gap-5 xl:grid-cols-[270px_minmax(0,1fr)_260px]">
        <ModulesPanel />
        <ModuleContent />
        <ProgressSidebar onNavigate={onNavigate} />
      </div>
    </section>
  );
}

function ModulesPanel() {
  return (
    <div className="space-y-4 xl:sticky xl:top-[115px]">
      <Card className="overflow-hidden">
        <div className="border-b border-[#e2e9f1] bg-[#f5f9fe] px-4 py-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-[#173055]">
            <BookOpen size={18} className="text-[#0863c8]" />
            Módulos
          </h3>
          <p className="mt-1 text-[10px] text-[#74859e]">
            Tu recorrido de aprendizaje
          </p>
        </div>

        <div className="space-y-2 p-2">
          {modules.map((module, index) => (
            <button
              key={module.number}
              type="button"
              className={`w-full rounded-lg border p-3 text-left transition-colors ${
                index === 0
                  ? "border-[#9fc4ec] bg-[#eaf4ff]"
                  : "border-transparent hover:border-[#d9e4ef] hover:bg-[#f8fbfe]"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    index === 0
                      ? "bg-[#0863c8] text-white"
                      : module.progress > 0
                        ? "bg-[#dcecff] text-[#0863c8]"
                        : "bg-[#edf2f7] text-[#718199]"
                  }`}
                >
                  {module.progress === 100 ? (
                    <Check size={14} strokeWidth={2.5} />
                  ) : (
                    module.number
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-bold leading-4 text-[#243d60]">
                    Módulo {module.number}
                  </span>
                  <span className="mt-1 block text-[10px] leading-4 text-[#586e8d]">
                    {module.title}
                  </span>
                </span>
                {module.progress === 0 && (
                  <Lock size={13} className="shrink-0 text-[#9aa7b9]" />
                )}
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-[9px]">
                  <span
                    className={
                      module.progress === 100
                        ? "font-semibold text-[#16844a]"
                        : "text-[#718199]"
                    }
                  >
                    {module.status ?? `${module.progress}% completado`}
                  </span>
                  <span className="font-semibold text-[#526987]">
                    {module.progress}%
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e4ebf3]">
                  <div
                    className={`h-full rounded-full ${
                      module.progress === 100
                        ? "bg-[#22a963]"
                        : "bg-[#0870d6]"
                    }`}
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      <Card className="border-[#c8dcf2] bg-[#f1f7ff] p-4">
        <span className="flex size-9 items-center justify-center rounded-lg bg-white text-[#0863c8]">
          <Award size={19} />
        </span>
        <h3 className="mt-3 text-sm font-bold text-[#173055]">
          Certificación
        </h3>
        <p className="mt-2 text-[10px] leading-4 text-[#5e7391]">
          Completá todos los módulos y obtené tu certificado de capacitación.
        </p>
      </Card>
    </div>
  );
}

function ModuleContent() {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-[#dfe7f0] bg-gradient-to-r from-[#f5f9ff] to-white p-5 lg:p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0870d6]">
          Módulo 1
        </p>
        <h3 className="mt-2 text-xl font-bold leading-7 text-[#10264c]">
          Introducción a los documentos administrativos
        </h3>
        <p className="mt-3 max-w-3xl text-[12px] leading-5 text-[#536987]">
          Conocé los tipos de documentos administrativos, su propósito,
          estructura básica y buenas prácticas de uso.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <InfoChip icon={BookOpen} text="6 lecciones" />
          <InfoChip icon={Clock3} text="45 min" />
          <InfoChip icon={Sparkles} text="Nivel básico" />
        </div>
      </div>

      <div className="p-5 lg:p-6">
        <div className="grid overflow-hidden rounded-xl border border-[#b9d4ef] bg-[#f5faff] md:grid-cols-[1fr_240px]">
          <div className="flex flex-col p-5">
            <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#0870d6]">
              Lección destacada
            </span>
            <h4 className="mt-2 text-base font-bold text-[#173055]">
              ¿Qué es un documento administrativo?
            </h4>
            <p className="mt-2 max-w-lg text-[11px] leading-5 text-[#586e8d]">
              Conocé la definición, función y características de los documentos
              en la gestión municipal.
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
              <Button variant="primary" className="h-9 gap-2">
                <Play size={14} fill="currentColor" />
                Continuar lección
              </Button>
              <span className="inline-flex items-center gap-1.5 text-[10px] text-[#647894]">
                <Clock3 size={14} />
                08:15 min
              </span>
            </div>
          </div>
          <div className="relative flex min-h-[190px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#0871dc] to-[#064eac] p-5 text-white">
            <div className="absolute -right-10 -top-10 size-36 rounded-full border border-white/15" />
            <div className="absolute -bottom-14 -left-10 size-40 rounded-full border border-white/10" />
            <div className="relative text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                <Play size={23} fill="white" />
              </span>
              <p className="mt-4 text-sm font-bold">
                Documento administrativo
              </p>
              <p className="mt-1 text-[10px] text-white/75">
                Definición, función y características
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-6 overflow-x-auto border-b border-[#dfe7f0]">
          {[
            "Contenido del módulo",
            "Materiales",
            "Ejercicios prácticos",
          ].map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={`shrink-0 border-b-2 px-1 pb-3 text-[11px] font-semibold ${
                index === 0
                  ? "border-[#0863c8] text-[#075cc5]"
                  : "border-transparent text-[#718199]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-3 divide-y divide-[#e5ebf2]">
          {lessons.map(([title, duration], index) => (
            <button
              key={title}
              type="button"
              className="flex w-full items-center gap-3 py-3 text-left"
            >
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                  index === 0
                    ? "bg-[#e5f6eb] text-[#16884c]"
                    : "bg-[#edf5ff] text-[#0863c8]"
                }`}
              >
                {index === 0 ? (
                  <CheckCircle2 size={17} />
                ) : (
                  <PlayCircle size={17} />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold text-[#2b4363]">
                  {index + 1}. {title}
                </span>
              </span>
              <span className="inline-flex items-center gap-1 text-[9px] text-[#718199]">
                <Clock3 size={12} />
                {duration}
              </span>
              <ChevronRight size={15} className="text-[#718199]" />
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-4 rounded-xl border border-[#b9dfc7] bg-[#edf9f1] p-5 sm:flex-row sm:items-center">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-[#1a9a56]">
            <CheckCircle2 size={23} />
          </span>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-[#176f43]">
              Módulo completado
            </h4>
            <p className="mt-1 text-[11px] text-[#4f7964]">
              ¡Excelente trabajo! Continuá con el siguiente módulo.
            </p>
          </div>
          <Button variant="primary" className="h-9 gap-2">
            Ir al módulo 2
            <ChevronRight size={15} />
          </Button>
        </div>
      </div>
    </Card>
  );
}

function ProgressSidebar({
  onNavigate,
}: {
  onNavigate: (section: SectionId) => void;
}) {
  return (
    <aside className="space-y-4">
      <Card className="p-4">
        <h3 className="text-sm font-bold text-[#173055]">Tu progreso</h3>
        <div className="mt-4 flex items-end justify-between">
          <span className="text-3xl font-bold text-[#0863c8]">34%</span>
          <span className="text-[9px] text-[#718199]">Progreso general</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e3ebf4]">
          <div className="h-full w-[34%] rounded-full bg-[#0870d6]" />
        </div>
        <div className="mt-4 space-y-3 border-t border-[#e5ebf2] pt-4">
          <ProgressLine value="2 de 5" label="módulos completados" />
          <ProgressLine value="12 de 30" label="lecciones completadas" />
          <ProgressLine value="6h 25m" label="tiempo total de estudio" />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-[#126fcf] to-[#0854ad] p-4 text-white">
          <div className="flex items-center gap-2 text-[10px] font-semibold text-white/80">
            <Video size={15} />
            Próxima clase
          </div>
          <h3 className="mt-3 text-sm font-bold leading-5">
            La claridad en la comunicación administrativa
          </h3>
          <div className="mt-3 flex gap-3 text-[9px] text-white/80">
            <span className="inline-flex items-center gap-1">
              <Clock3 size={12} />
              10:30 min
            </span>
            <span>Nivel básico</span>
          </div>
        </div>
        <div className="p-3">
          <Button className="h-9 w-full gap-2">
            <Play size={14} fill="currentColor" />
            Continuar
          </Button>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-bold text-[#173055]">
          Material complementario
        </h3>
        <div className="mt-3 divide-y divide-[#e5ebf2]">
          {materials.map(([title, type]) => (
            <button
              key={title}
              type="button"
              className="flex w-full items-center gap-2 py-3 text-left"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#edf5ff] text-[#0863c8]">
                <FileText size={15} />
              </span>
              <span className="min-w-0 flex-1 text-[9px] font-medium leading-4 text-[#415978]">
                {title}
              </span>
              <span className="rounded bg-[#edf2f8] px-1.5 py-1 text-[8px] font-bold text-[#607491]">
                {type}
              </span>
              <Download size={13} className="text-[#718199]" />
            </button>
          ))}
        </div>
      </Card>

      <Card className="border-[#c9dcf1] bg-[#f2f7fd] p-4">
        <span className="flex size-9 items-center justify-center rounded-lg bg-white text-[#0863c8]">
          <CircleHelp size={18} />
        </span>
        <h3 className="mt-3 text-sm font-bold text-[#173055]">
          ¿Necesitás ayuda?
        </h3>
        <p className="mt-2 text-[10px] leading-4 text-[#607491]">
          Visitá nuestra sección de ayuda o escribinos.
        </p>
        <Button
          className="mt-3 h-9 w-full"
          onClick={() => onNavigate("ayuda")}
        >
          Ir a Ayuda
        </Button>
      </Card>
    </aside>
  );
}

function InfoChip({
  icon: Icon,
  text,
}: {
  icon: typeof Clock3;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#edf5ff] px-3 py-1.5 text-[9px] font-semibold text-[#47617f]">
      <Icon size={13} className="text-[#0863c8]" />
      {text}
    </span>
  );
}

function ProgressLine({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="min-w-[58px] text-[11px] font-bold text-[#173055]">
        {value}
      </span>
      <span className="text-[9px] leading-4 text-[#718199]">{label}</span>
    </div>
  );
}
